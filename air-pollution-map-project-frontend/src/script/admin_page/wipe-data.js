const wipe_data_btn = document.querySelector(".wipe-data")
const error_on_wipe = document.querySelector('.cation-on-failed-wipe')

// function, which will send request to the server
// to wipe all data from mySQL database table
wipe_data_btn.addEventListener('click', ()=>{
    try{
        event.preventDefault()
        const url = 'http://localhost:8080/wipeData'
        fetch(url, {
            method: 'GET',
        })
        .then(response =>{
            if(!response.ok) {
                throw new Error("Error wiping data")
            }
            location.reload()
        })
    }
    // * show an error message after unsuccessful wipe of data
    catch (error){
        error_on_wipe.innerHTML = error
    }
})