import { server_url } from "../Constants/CONSTANTS"

const form = document.querySelector("#form-with-data");
const loginHeader = document.querySelector(".login-header");
const attemptsCounter = document.querySelector(".attempts-counter");

let iterator = 0;

form.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent default form submission behavior
    const login = form.querySelector("#username").value;
    const password = form.querySelector("#password").value;
    const formData = {
        login: login,
        password: password
    }
    const url = `${server_url}/admins/verify`;

    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not completed');
            }
            else return response.json();
        })
        .then(bool => { // utf's ✓ ❌
            if (bool) {
                loginHeader.style.color = "green";
                loginHeader.textContent = `Login ✓`;
                setTimeout(() => {
                    window.location.href = "/html/admin_page.html";
                }, 200
                )
            }
            else {
                attemptsCounter.style.display = "block";
                iterator++;
                attemptsCounter.textContent = `attempts: ${iterator}`;
                // header css change
                loginHeader.style.color = "red";
                loginHeader.textContent = "Login ❌";
            }
        })
        .catch(error => {
            attemptsCounter.style.display = "block";
            attemptsCounter.textContent = "Сервер недоступен.";
            attemptsCounter.style.color = "#9D0000";
        });

})
