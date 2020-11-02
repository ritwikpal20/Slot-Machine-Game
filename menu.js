let btnNext = document.getElementById('btnNext')
localStorage.removeItem('speedSlot')


//Store the speed of slot in local , so that it can be  used in next webpage
btnNext.onclick = function () {
    localStorage.setItem('speedSlot', inpSpeed.value)
}