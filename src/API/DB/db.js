// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { getData, setUser } from "../localStorage";
import { setNotification } from "@/assets/notifications";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjf6dFbQI4eWuoGGpOJOEXuRLftY7nTRE",
  authDomain: "ambit-1350d.firebaseapp.com",
  projectId: "ambit-1350d",
  storageBucket: "ambit-1350d.appspot.com",
  messagingSenderId: "1079902965847",
  appId: "1:1079902965847:web:daadb0d7ea8ced42585312"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db

//------------------------------------------------------------------------------FirebaseFunctions

export async function getUsers(){
  const docs = await getDocs(collection(db, "users"))

  return (docs.docs.map(doc => doc.data()))
}

export async function createUser(userMail, nickname, password){

  try{
    const userExist = await checkUserExist(userMail, nickname)

    if(!validatedUserData(userMail, nickname, password)){
      setNotification("Invalid data", "error")
      throw new Error("Invalid data")
    }

    if (userExist.mail){
      setNotification("This mail is already in use", "error")
      throw new Error("This mail is already in use")

    }else if(userExist.nickname){
      setNotification("The nickname is already in use", "error")
      throw new Error("The nickname is already in use")
    }

    const newUser = {
      guides: [],
      joinedGuides: [],
      profile: {
          name: nickname,
          mail: userMail,
          password: password,
      }
  }

  await addDoc(collection(db, "users"), newUser)

  }catch(ex){
    console.error("Something has happened while the user was being created: ", ex.message)

  }
}

export async function getUserProfile(data)/*mail or nickname*/{
  const users = await getUsers()

  const userFound = users.find(user => user.profile.mail.toLowerCase() === data.toLowerCase() || user.profile.name === data)

  return userFound ? userFound : false
}

export async function getUserGuides(mail){
  const userProfile = await getUserProfile(mail)

  const guides = userProfile.guides

  return guides
}

async function getUserDoc(userMail){
  const userDocs = await getDocs(collection(db, "users"))

  let userDoc = false

  userDocs.docs.forEach(user => {
    if(user.data().profile.mail === userMail){

      userDoc = user
    }
  })
  
  return userDoc
}

export async function updateUser(userMail, newUserData){

  const userDoc = await getUserDoc(userMail)
  
  const ref = doc(db, "users", userDoc.id)
  
  await setDoc(ref, newUserData)

  return true
  
}

export async function createGuide(userMail){
  const date = new Date()
  let profile = await getUserProfile(userMail)
  
  return generateGuideCode().then(async code => {
    
    const newGuide = {
      code,
      name: "New Guide",
      privated:  true,
      allowedUsers: [],
      date: {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        seconds: date.getSeconds()
      },
      steps: [
          {
              title: "Step one",
              content: [
                  {
                      type: "text",
                      value: "Content of this step"
                  }
              ]
          }
      ]
  
  }

  profile.guides.push(newGuide)

  await updateUser(userMail, profile)

  return code

  })

}

async function getAllGuides(owner){
  const users = await getUsers()

  let guides = []

  users.forEach(user => {
    user.guides.forEach(guide => {
      
      if(owner){
          guides.push({
            guide,
            owner: {
              mail: user.profile.mail,
              nickname: user.profile.name
            }
          })

      }else{
          guides.push(guide)

      }

    })
  })

  return guides
}

export async function getGuide(code){
  const guides = await getAllGuides()

  const guideFound = guides.find(guide => guide.code === code)

  return guideFound ? guideFound : false
}

export async function getGuideData(code){
  const users = await getUsers()

  let owner
  let privated
  let allowedUsers 
  let nickname

  users.forEach(user => {
    user.guides.forEach(guide => {

      if(guide.code === code){
        owner = user.profile.mail
        privated = guide.privated
        allowedUsers = guide.allowedUsers
        nickname = user.profile.name

      }

    })
  })

  return {
    owner,
    privated,
    allowedUsers,
    nickname
  }

}

export async function userIsAllowed(userMail, guideCode){
  const guideData = await getGuideData(guideCode)

  const userIsAllowed = guideData.allowedUsers.indexOf(userMail) ? true : guideData.owner === userMail

  return userIsAllowed
}

export async function updateGuide(userMail, guideCode, newGuide){
  const isAllowed = await userIsAllowed(userMail, guideCode)

  if(!isAllowed){
    return false
  }

  const guideData = await getGuideData(guideCode)

  const owner = guideData.owner
  const ownerProfile = await getUserProfile(owner)
  let newOwnerProfile = {...ownerProfile}
  
  newOwnerProfile.guides = newOwnerProfile.guides.map(guide => {

    if(guide.code === guideCode){
      return newGuide
    }else{
      return guide
    }

  })

  updateUser(owner, newOwnerProfile)
}

//------------------------------------------------------------------------------FUNTIONS

export function validatedUserData(userMail, nickname, password){

  const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

  try{
    //Check if exist all data
    if(!userMail){
      throw new Error("I need a valid user mail")
    }
    if(!nickname){
      throw new Error("I need a valid nickname")
    }
    if(!password){
      throw new Error("I need a valid password")
    }

    //Check valid data
    if(validEmail.test(userMail)){
      true

    }else{

      throw new Error("Invalid user mail, we need a valid email")
    }

    return true
  }
  catch(ex){
    console.error("Error while validating user data: ", ex.message)

    return false
  }
}

export async function checkUserExist(userMail, nickname){
  try{

    if(!validatedUserData(userMail, nickname, true)){
      throw new Error("Something has happened while was validating")

    }

    userMail = userMail.toLowerCase()
    nickname = nickname.toLowerCase()

    const users = await getUsers()

    const userMailExist = users.find(user => user.profile.mail.toLowerCase() === userMail) ? true : false
    const nicknameExist = users.find(user => user.profile.name.toLowerCase() === nickname) ? true : false

    const matchingData = {
      mail: userMailExist,
      nickname: nicknameExist
    }

    return matchingData    
  }
  catch(ex){
    console.error("Something has happened!: ", ex.message)

    return undefined

  }

}

export async function loginUser(userMail, password){ 
  userMail = userMail.toLowerCase()
  
  try{
    if(!validatedUserData(userMail, true, password)){
      throw new Error("Invalid user data")
    }

    const users = await getUsers()

    const userFound = users.find(user => user.profile.mail.toLowerCase() === userMail && user.profile.password === password)


    if(userFound){
      const profile = await getUserProfile(userMail)

      setUser(profile.profile.mail, profile.profile.name)

      return true

    }else{

      setNotification("Email or password is not valid", "error")

      throw new Error("Email or password is not valid")
    }

  }catch(ex){
    console.error("Impossible to login: ", ex.message)
  }
}

async function generateGuideCode(){
  const users = await getUsers()

  let code = crypto.randomUUID()

  let codeExist = false

  for(const user in users){
    if(user.guides){
      codeExist = user.guides.forEach(guide => guide.code === code)

      if (codeExist){
        break
      }
    }
  }

  if(codeExist){
    generateGuideCode()

  }else{
    return code
  }
}

export async function searchAllGuides(guideName){
  const guides = await getAllGuides(true)

  guideName = guideName.toLowerCase()

  const guidesFound = guides.filter(guide => guide.guide.name.toLowerCase().indexOf(guideName) != -1)

  return guidesFound
}

export async function searchAllAllowedGuides(guideName){
  const userMail = getData("userMail")
  const guidesFound = await searchAllGuides(guideName)

  const allowedGuides = guidesFound.filter(guide => ((guide.guide.allowedUsers.indexOf(userMail) != -1 && guide.guide.privated) || (!guide.guide.privated) || (guide.owner.mail === userMail)))

  return allowedGuides
}

export async function joinUserToGuide(userMail, guideCode){
  let user = await getUserProfile(userMail)

  let updatedUser = {...user}

  updatedUser.joinedGuides.push(guideCode)

  await updateUser(userMail, updatedUser)

  return true

}

export async function getGuideRelation(userMail, guideCode){
  const guideData = await getGuideData(guideCode)
  const userProfile = await getUserProfile(userMail)

  const isOwner = guideData.owner === userMail

  const isAllowed = guideData.allowedUsers.indexOf(userMail) != -1 || !guideData.privated

  const isJoined = userProfile.joinedGuides.indexOf(guideCode) != -1

  return {
    isOwner,
    isAllowed,
    isJoined
  }

}

export async function getJoinedGuides(userMail){

  const profile = await getUserProfile(userMail)

  let joinedGuides = []

  for(const guide of profile.joinedGuides){
    const guideData = await getGuide(guide)

    joinedGuides.push(guideData)
  }

  return joinedGuides

}

export async function deleteGuide(guideCode){
  const guideData = await getGuideData(guideCode)

  const userProfile = await getUserProfile(guideData.owner)

  let newProfile = {...userProfile}
  newProfile.guides = newProfile.guides.filter(guide => guide.code != guideCode)

  await updateUser(guideData.owner, newProfile)

  return true
}

export async function deleteJoinedGuide(userMail, guideCode){
  const userProfile = await getUserProfile(userMail)

  let newProfile = {...userProfile}
  newProfile.joinedGuides = newProfile.joinedGuides.filter(guide => guide !== guideCode)

  await updateUser(userMail, newProfile)

  return true
}

export async function searchSimilarUser(name) {
  const allUsers = await getUsers()

  const usersFound = {
    name: allUsers.filter(user => user.profile.name.toLowerCase().includes(name.toLowerCase())).map(user => {return {name: user.profile.name, mail: user.profile.mail}}),
    mail:  allUsers.filter(user => user.profile.mail.toLowerCase().includes(name.toLowerCase())).map(user => {return {name: user.profile.name, mail: user.profile.mail}})
  }
  
  
  return usersFound
}