
import { app } from "/auth.js"

import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js';

document.getElementById("login-btn-auth").addEventListener("click", authenticate);

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "/"
} else {
  }
});

function authenticate() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const auth = getAuth();
    if (validateEmail(email)) {
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                return signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        console.log(user);
                        console.log("logged in");
                        // ...
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorMessage);
                    });

            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
    else {
        console.log("invalid email");
    }
}

function validateEmail(email) {
    return /^[^@]+@\w+(\.\w+)+\w$/.test(email);
}



// document.addEventListener("DOMContentLoaded", () => {
//     const API_URL = "https://table-shift.herokuapp.com"
//     fetch(API_URL + "/read/test")
//         .then((response) => {
//             return (response.json())
//         })
//         .then((data) => {
//             console.log(data);
//         })
// })

// var elements = document.getElementById("main").style.display = "none";