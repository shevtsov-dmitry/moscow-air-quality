// * show buttons which will show table
const show_buttons_btn  = document.querySelector('.show-action-button')
const selectors = document.querySelector('.selectors')
show_buttons_btn.addEventListener('click', ()=>{
    selectors.style.display = 'flex'
})


const upload_btn = document.querySelector('.submitUploadBtn')
const loading_gif = document.querySelector('.loading-gif')

// * show gif when upload file
upload_btn.addEventListener('click', ()=>{
    loading_gif.style.display = 'initial'
})