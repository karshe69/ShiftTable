document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://salty-dawn-75430.herokuapp.com"
    fetch(API_URL + "/read/test")
    .then((response) => {
        return(response.json())
    })
    .then((data) => {
        console.log(data);
    })
})