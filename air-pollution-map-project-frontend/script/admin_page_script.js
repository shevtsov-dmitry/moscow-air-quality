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
                'Content-Type': 'text/csv'
              },
          })
        //   .then((response) =>{
        //     let responseTXT = document.querySelector(".temptext")
        //     responseTXT.textContent(response)
        //     return response.json();
        //   })
    }
    catch(error){console.log("Произошла ошибка: " + error)};
})