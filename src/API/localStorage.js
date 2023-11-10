import { checkUserExist } from "./DB/db"

const storage = window.localStorage
export default storage

export async function userIsLogged(){
    const mail = storage.getItem("userMail")
    const nickname = storage.getItem("userNickname")
    let userExist = undefined

    if(mail) {
        userExist = await checkUserExist(mail, nickname);

    }

    return userExist
}

export function setData(name, value){
    storage.setItem(name, value)

    return true
}

export function setUser(mail, nickname){
    setData("userMail", mail)
    setData("userNickname", nickname)

    return true
}

export function getData(name){
    return storage.getItem(name)

}