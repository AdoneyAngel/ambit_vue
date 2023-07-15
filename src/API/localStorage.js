
const storage = window.localStorage
export default storage

export function userIsLogged(){
    const mail = storage.getItem("userMail") ? true : false

    return mail
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