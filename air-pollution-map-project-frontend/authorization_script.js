const form = document.querySelector("#form-with-data");
form.addEventListener("submit", (event)=>{
    // блокирую стандартное выполнение формы
    event.preventDefault();
const formData = new FormData(form);
const url = "http://localhost:8080/";
    // отправляю данные на сервер для проверки действительности

    fetch(url,{
        method:"POST",
        body: formData
    })
    .then(response=> response.json())
    .then(data => console.log(data))
    .catch(error =>console.log("didn't send" +"\n" + error));

    console.log(formData)
})
