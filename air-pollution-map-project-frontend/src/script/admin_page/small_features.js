// * show buttons which will show table
const show_buttons_btn  = document.querySelector('.show-action-button')
const selectors = document.querySelector('.selectors')
show_buttons_btn.addEventListener('click', ()=>{
    selectors.style.display = 'flex'
})

const id_div = document.querySelector('.choose-list-div')
id_div.innerHTML += `<div class="idForm">
            <input class="id-form-text-input" type="text" placeholder="Введите ID">
            <button class="fn_btn">accept</button>
        </div>`
const idForm = document.querySelector('.idForm')

// buttons
const btn_everything = document.querySelector(".btn_everything")
const btn_ID = document.querySelector(".btn_ID")
const btn_station_name = document.querySelector(".btn_station_name")
const btn_parameter = document.querySelector(".btn_parameter")

// functions of buttons

btn_everything.addEventListener('click',()=>{
    form_filled_with_variants.innerHTML=""
    hideCloseSign()
    hideForm()
    hideIdForm()
})
btn_ID.addEventListener('click',()=>{
    hideCloseSign()
    hideForm()
    showIdForm()
})
btn_station_name.addEventListener('click',()=>{
    hideIdForm()
    showCloseSign()
    showForm()
})
btn_parameter.addEventListener('click', ()=>{
    hideIdForm()
    showCloseSign()
    showForm()
})

function hideIdForm(){
    idForm.style.display = 'none'
}
function showIdForm(){
    idForm.style.display = 'initial'
}

const submit_btn = document.querySelector('.submitUploadBtn')
const loading_gif = document.querySelector('.loading-gif')

// * show gif when upload file and hide the panel where user inputted value
submit_btn.addEventListener('click', ()=>{
    loading_gif.style.display = 'initial'
    setTimeout(()=>{
        form_filled_with_variants.innerHTML = ''
    },400)
})

// * close sign actions
const close_sign = document.querySelector('.close-sign')
close_sign.addEventListener('click',()=>{
    setTimeout(()=>{
        hideCloseSign()
        hideForm()
        form_filled_with_variants.innerHTML = ''
    },200)
})

function showCloseSign(){
    close_sign.style.display = 'block'
}
function hideCloseSign(){
    close_sign.style.display = 'none'
}

const form_filled_with_variants = document.querySelector('.form-filled-with-variants')
function showForm(){
    form_filled_with_variants.style.display = 'initial'
}
function hideForm(){
    form_filled_with_variants.style.display = 'none'
}

form_filled_with_variants.addEventListener('click',()=>{
    setTimeout(()=>{
        hideCloseSign()
        form_filled_with_variants.innerHTML = ""
        hideForm()
    },500)
})

