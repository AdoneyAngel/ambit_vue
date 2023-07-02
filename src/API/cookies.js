const cookies = document.cookie.split(";").map(currentCookie => {
    const cookie = {
        [currentCookie.split("=")[0]]: [currentCookie.split("=")[1]]
    }
    return cookie
})

export default cookies