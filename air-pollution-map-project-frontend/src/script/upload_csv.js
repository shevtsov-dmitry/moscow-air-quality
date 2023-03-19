//const CSVFile = document.querySelector(".CSVfile");
const CSVFile = document.querySelector('input[type="file"]');
const submitUploadBtn = document.querySelector(".submitUploadBtn");
// когда кнопка "Загрузить" нажата
submitUploadBtn.addEventListener("click", () => {
    try{
        const file = CSVFile.files[0];
        //const FileObject = new FormData();
        //FileObject.append('file',file) // ???
        
        const url = 'http://localhost:8080/uploadCSV';

        fetch(url, {
            method: 'POST',
            body: file,
            headers: {
                'Content-Type': 'text/csv; charset=utf-8'
              },
          })
    }
    catch(error){console.log("Произошла ошибка: " + error)};
})
// display incomming text from request to database
const temptext = document.querySelector(".temptext")
const url = "http://localhost:8080/dataTableToWebsite"
function displayIncomingText(url, textBlock){
    fetch(url)
    .then(response => response.json())
    .then(data => {
        textBlock.textContent = data; // do something with data
    })
    .catch(error =>{
        textBlock.textContent = `Something went wrong: ${error}`
    })
}
displayIncomingText(url,temptext)