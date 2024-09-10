import {server_url} from "../Constants/CONSTANTS"

const wipe_data_btn = document.querySelector(".wipe-data")
const error_on_wipe = document.querySelector('.cation-on-failed-wipe')

wipe_data_btn.addEventListener('click', ()=>{
    try{
        event.preventDefault()
        const url = `${server_url}/wipeData`
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
    catch (error){
        error_on_wipe.innerHTML = error
    }
})