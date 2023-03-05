const form = document.querySelector("#form-with-data");
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
    const url = "http://localhost:8080/";
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
    .then(data => console.log("Response data from server" + data))
    .catch(error =>console.log("Error sending your request" +"\n" + error));

    console.log(formData)
})
