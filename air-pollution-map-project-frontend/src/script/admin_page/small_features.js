// * show buttons which will show table
const show_buttons_btn  = document.querySelector('.show-action-button')
const selectors = document.querySelector('.selectors')
show_buttons_btn.addEventListener('click', ()=>{
    selectors.style.display = 'flex'
})

// show gif when upload file