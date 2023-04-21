const wipe_data_btn = document.querySelector(".wipe-data")

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
            // TODO output this into the div not in console
            console.log("data wiped successfully")
            location.reload()
        })
    }
    catch (error){console.log(error)}
})