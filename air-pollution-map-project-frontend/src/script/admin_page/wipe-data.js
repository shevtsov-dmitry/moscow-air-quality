const wipe_data_btn = document.querySelector(".wipe-data")

wipe_data_btn.addEventListener('click', ()=>{
    try{
        event.preventDefault()
        const url = 'http://localhost:8080/wipeData'
        // TODO write fetch method to wipe data
        fetch(url, {
            method: 'GET',
        })
        .then(response =>{
            if(!response.ok) {
                throw new Error("Error wiping data")
            }
            console.log("data wiped successfully")
            location.reload()
        })
    }
    catch (error){console.log(error)}
})