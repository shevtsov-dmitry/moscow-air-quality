// * show buttons which will show table
const show_selectors_button  = document.querySelector('.show-action-button')
show_selectors_button.addEventListener('click', ()=> {
    show(selectors)
    hide(id_form)
})

// functions either hide or display DOM element
function hide(value){
    value.style.display = "none"
}
function show(value){
    value.style.display = "flex"
}
// divs of form
const selectors = document.querySelector('.selectors')
const id_div = document.querySelector('.choose-list-div')
const form_filled_with_variants = document.querySelector('.form-filled-with-variants')

id_div.innerHTML += `<div class="idForm">
            <input class="id-form-text-input" type="text" placeholder="Введите ID">
            <button class="fn-btn">accept</button>
        </div>`

const id_form = document.querySelector('.idForm')
const fn_btn = document.querySelector('.fn-btn')
const tables = document.querySelector('.tables')
function alignTableLeft(){
    tables.style.justifyContent = "left"
}

fn_btn.addEventListener('click',()=>{
    hide(selectors)
})
// buttons
const btn_everything = document.querySelector(".btn_everything")
const btn_ID = document.querySelector(".btn_ID")
const btn_station_name = document.querySelector(".btn_station_name")
const btn_parameter = document.querySelector(".btn_parameter")

// functions of buttons which manages show or hide each other on click
btn_everything.addEventListener('click',()=>{
    hide(close_sign)
    hide(form_filled_with_variants)
    hide(id_form)
    hide(selectors)

    alignTableLeft()
})
btn_ID.addEventListener('click',()=>{
    hide(close_sign)
    hide(selectors)

    show(id_form)

    alignTableLeft()
})
btn_station_name.addEventListener('click',()=>{
    hide(id_form)

    show(close_sign)
    show(form_filled_with_variants)

    alignTableLeft()
})
btn_parameter.addEventListener('click', ()=>{
    hide(id_form)

    show(close_sign)
    show(form_filled_with_variants)

    alignTableLeft()
})

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
        hide(close_sign)
        hide(form_filled_with_variants)
        form_filled_with_variants.innerHTML = ''
    },200)
})

form_filled_with_variants.addEventListener('click',()=>{
    setTimeout(()=>{
        hide(close_sign)
        hide(form_filled_with_variants)
        form_filled_with_variants.innerHTML = ""
    },500)
})

