// import '../node_modules/pikaday';
// import Handsontable from '../node_modules/handsontable';
import '../node_modules/handsontable/dist/handsontable.full.min.css';

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
let CSVtable;
// get incomming JSON table from request to database
const temptext = document.querySelector(".temptext")
const url = "http://localhost:8080/dataTableToWebsite"
function displayIncomingText(url, textBlock){
    fetch(url)
    .then(response => response.json())
    .then(data => {
        textBlock.innerHTML =JSON.stringify(data); // do something with data
        CSVtable = data;
    })
    .catch(error =>{
        textBlock.textContent = `Something went wrong: ${error}`
    })
}
displayIncomingText(url,temptext)
// display table with handsontable API

let HTtable = document.querySelector('.HTtable')

var data = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Mary', age: 30 },
    { id: 3, name: 'Peter', age: 40 }
  ];
  
  // Create Handsontable instance and fill it with data from JSON object
  let hot = new Handsontable(HTtable, {
    data: data,
    colHeaders: ['ID', 'Name', 'Age'],
    columns: [
      { data: 'id' },
      { data: 'name' },
      { data: 'age' }
    ],
    licenseKey: 'non-commercial-and-evaluation'
  });