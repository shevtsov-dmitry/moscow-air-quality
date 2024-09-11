import {server_url} from "../Constants/CONSTANTS"

const wipeDataBtn = document.querySelector(".wipe-data")
const errorOnWipe = document.querySelector('#caution-on-failed-wipe')

wipeDataBtn.addEventListener('click', async () => {
    const url = `${server_url}/wipe-all-data`
    const res = await fetch(url, {
        method: 'DELETE',
    })
    if (res.status === 200) {
        location.reload()
    } else {
        errorOnWipe.textContent = "Не удалось очистить сохранённый датасет в базе данных. Статус ошибки: " + res.status
    }
})