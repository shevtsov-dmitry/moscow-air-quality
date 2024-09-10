import {server_url} from "../Constants/CONSTANTS"

const CSVFile = document.querySelector('input[type="file"]');
const submitUploadBtn = document.querySelector(".submitUploadBtn");

submitUploadBtn.addEventListener("click", () => {
    event.preventDefault();
    try{
        const file = CSVFile.files[0]; // actual file user has chosen to upload
        const url = `${server_url}/uploadCSV`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/csv; charset=utf-8'
            },
            body: file,
        })
        .then(()=>{
            setTimeout(()=>{
                location.reload()
            },1000)
        })
    }
    catch(error){console.log("Произошла ошибка: " + error)};
})