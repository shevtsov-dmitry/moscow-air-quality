const form = document.querySelector(".login-form");
form.addEventListener("submit", (event)=>{
    // блокирую стандартное выполнение формы
    event.preventDefault();
    
const formData = new formData(form);
const url = "http://localhost:8080/";
    // отправляю данные на сервер для проверки действительности

fetch(url,{
    method:"POST",
    body: formData
})
.then(response=> response.json())
.then(data => console.log(data))
.catch(console.log("didn't send"));

})