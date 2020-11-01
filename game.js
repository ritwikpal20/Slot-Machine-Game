let value1 = document.getElementById('value1')
let value2 = document.getElementById('value2')
let value3 = document.getElementById('value3')
let btnSpin = document.getElementById('btnSpin')
let btnStop = document.getElementById('btnStop')
let value = document.getElementsByClassName('value')

let values = [['😀'], ['😋', '😏', '🥱'], ['🤔', '🤨', '🙂'], ['🤩'], ['😀', '🤩'], ['🙄'], ['😀', '🤩', '🙄'], ['😎'], ['😁', '😂', '🤣'], ['😍'], ['😎', '😍'], ['😘'], ['🥰'], ['😉', '😚', '😌'], ['😴'], ['🤔', '🤨', '🙂'], ['😫'], ['😴', '🥰', '😘'], ['😪'], ['🤔', '🤨', '🙂'], ['🤐'], ['😫', '😪', '🤐'], ['😫', '🤩', '🙄']]

let speedSlot = parseInt(localStorage.getItem("speedSlot"))
let randomValueIntervalId
if (!isNaN(speedSlot))
    document.documentElement.style.setProperty('--speed', speedSlot)
else
    speedSlot = 5

function getRandomValue(emojiSet) {
    return emojiSet[Math.floor(Math.random() * parseInt(emojiSet.length))]
}

//Setting Difficulty Level
let difficultyLevel
if (speedSlot < 2)
    difficultyLevel = 'Easy'
else if (speedSlot >= 2 && speedSlot <= 5)
    difficultyLevel = 'Medium'
else
    difficultyLevel = 'Hard'

let difficulty = document.getElementById('difficulty')
difficulty.innerText = `Difficulty Level: ${difficultyLevel}`



//Setting Score
let score = document.getElementById('score')
let scoreCounter = 0
score.innerText = `Your Score: ${scoreCounter}`



//Setting toWin
let toWin = document.getElementById('toWin')
let win = 5
toWin.innerText = `To win: ${win}`


//Setting Chances
let chances = document.getElementById('chances')
let chance = 10
chances.innerText = `Chances left: ${chance}`


//button spin function
btnStop.disabled = true
btnSpin.onclick = function () {

    let emojichangetime = (1 / speedSlot) * (1000)
    randomValueIntervalId = setInterval(() => {
        let selectEmojiSet = Math.floor(Math.random() * values.length)
        let emojiSet = values[selectEmojiSet]
        value1.innerText = getRandomValue(emojiSet)
        value2.innerText = getRandomValue(emojiSet)
        value3.innerText = getRandomValue(emojiSet)
    }, emojichangetime)

    btnStop.disabled = false

    value[0].style.animationPlayState = 'running'
    value[1].style.animationPlayState = 'running'
    value[2].style.animationPlayState = 'running'

    chance--
    btnSpin.disabled = true
    chances.innerText = `Chances left: ${chance}`

    btnSpin.innerText = 'Click Stop'
}

btnStop.onclick = function () {
    if (randomValueIntervalId) {
        clearInterval(randomValueIntervalId)
        value[0].style.animation = 'spinstopping 2s 1'
        value[1].style.animation = 'spinstopping 2s 1'
        value[2].style.animation = 'spinstopping 2s 1'
        btnStop.disabled = true
        setTimeout(() => {

            if (value1.innerText == value2.innerText && value2.innerText == value3.innerText) {
                scoreCounter++
                score.innerText = `Your Score: ${scoreCounter}`
                setTimeout(() => {
                    if (scoreCounter == win) {
                        alert("Congrats, You Won the match !!! Play Again")
                        location.reload()
                    }
                }, 60)
            }
            if (chance == 0) {

                if (scoreCounter == win)
                    alert("Congrats, You Won the match !!! Play Again")
                else
                    alert("You Lose!!! Better Luck Next Time")
                location.reload()
            }

            btnSpin.innerText = 'Spin'
            btnSpin.disabled = false
            let speedOld
            speedOld = 1 / speedSlot;
            value[0].style.animation = `slotspin ${speedOld}s infinite`
            value[1].style.animation = `slotspin ${speedOld}s infinite`
            value[2].style.animation = `slotspin ${speedOld}s infinite`
            value[0].style.animationTimingFunction = 'linear'
            value[1].style.animationTimingFunction = 'linear'
            value[2].style.animationTimingFunction = 'linear'
            value[0].style.animationPlayState = 'paused'
            value[1].style.animationPlayState = 'paused'
            value[2].style.animationPlayState = 'paused'
        }, 2000)
    }


}
