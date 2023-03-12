const form = document.querySelector("#form-with-data");
let loginHeader = document.querySelector(".login-header");
let attemptsCounter = document.querySelector(".attempts-counter");
let iterator = 0;
// Функция: отправить форму на обработку на сервер
form.addEventListener("submit", (event)=>{
    // блокирую стандартное выполнение формы
    event.preventDefault();
    const login = form.querySelector("#username").value;
    const password = form.querySelector("#password").value;
    const formData = {
        login: login,
        password: password
    }
    const url = "http://localhost:8080/admin";
    // отправляю данные на сервер для проверки действительности

    fetch(url,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response =>{
        if(!response.ok){
            throw new Error('Network response was not completed');
        }
        else return response.json();
    })
    .then(bool =>{ // utf's ✓ ❌
        console.log(`Response success from server: ${bool}`);
        if(bool){
            loginHeader.style.color = "green";
            loginHeader.textContent = `Login ✓`;
                setTimeout( ()=> {
                    window.location.href = "/html/admin_page.html";
                }, 300
            )
        }
        else{
            // attempts ++
            attemptsCounter.style.display = "block";
            iterator++;
            attemptsCounter.textContent = `attempts: ${iterator}`;
            // header css change
            loginHeader.style.color = "red";
            loginHeader.textContent =  "Login ❌";
        }
    }) // xxxxxxxxxxxxxxx  
    .catch(error =>console.log("Error sending your request" +"\n" + error));

    console.log(formData) // xxxxxxxxxxxxxxx 
    console.log(form.lastChild);
})
// console.log(loginHeader)