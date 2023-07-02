// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { setUser } from "../localStorage";
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

//FUNTIONS

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

export async function getUsers(){
    const docs = await getDocs(collection(db, "users"))

    return (docs.docs.map(doc => doc.data()))
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

  console.log(1)

  const userFound = users.find(user => user.profile.mail === data || user.profile.name === data)

  console.log(userFound)

  return userFound ? userFound : false
}

export async function loginUser(userMail, password){ 
  userMail = userMail.toLowerCase()
  password = password.toLowerCase()
  
  try{
    if(!validatedUserData(userMail, true, password)){
      throw new Error("Invalid user data")
    }

    const users = await getUsers()

    const userFound = users.find(user => user.profile.mail === userMail && user.profile.password === password)

    if(userFound){
      const profile = await getUserProfile(userMail)

      console.log(profile)

      setUser(profile.profile.mail, profile.profile.name)

      return true

    }else{

      throw new Error("Email or password is not valid")
    }

  }catch(ex){
    console.error("Impossible to login: ", ex.message)
  }
}