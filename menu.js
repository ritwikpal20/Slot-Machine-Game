let inpEmoji = document.getElementById('inpEmoji')
let inpSpeed = document.getElementById('inpSpeed')

let btnNext = document.getElementById('btnNext')
localStorage.removeItem('speedSlot')

btnNext.onclick = function () {
    localStorage.setItem('speedSlot', inpSpeed.value)
}