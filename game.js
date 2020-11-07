let btnSpin = document.getElementById('btnSpin')
let btnStop = document.getElementById('btnStop')


let value = document.getElementsByClassName('value')
let values = [['😀'], ['😋', '😏', '🥱'], ['🤔', '🤨', '🙂'], ['🤩'], ['😀', '🤩'], ['🙄'], ['😀', '🤩', '🙄'], ['😎'], ['😁', '😂', '🤣'], ['😑', '😐', '😶'], ['😍'], ['😎', '😍'], ['😘'], ['😫', '😣', '😮'], ['🥰'], ['😉', '😚', '😌'], ['😴'], ['😍', '😊'], ['🤔', '🤨', '🙂'], ['😫'], ['😴', '🥰', '😘'], ['😪'], ['🤔', '🤨', '🙂'], ['🤐'], ['😫', '😪', '🤐'], ['😫', '🤩', '🙄']]


//Retrieving the speed of slot from local storage that was saved  from previous webpage and assigning it to 
//css variable "speed"
//the default speed of slot is 2 and it's already set in game.css
let speedSlot = parseInt(localStorage.getItem("speedSlot"))
if (!isNaN(speedSlot))
    document.documentElement.style.setProperty('--speed', speedSlot)
else
    speedSlot = 2

function getRandomValue(emojiSet) {
    return emojiSet[Math.floor(Math.random() * parseInt(emojiSet.length))]
}

//Setting Difficulty Level
let difficultyLevel
if (speedSlot < 4)
    difficultyLevel = 'Easy'
else if (speedSlot >= 4 && speedSlot <= 7)
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
let randomValueIntervalId
btnStop.disabled = true

let h1Stats = document.getElementById('h1Stats')
btnSpin.onclick = function () {

    let emojichangetime = (2 / speedSlot) * (1000)
    h1Stats.innerText = "Spinning the wheel"
    randomValueIntervalId = setInterval(() => {

        let selectEmojiSet = Math.floor(Math.random() * values.length)
        let emojiSet = values[selectEmojiSet]
        value1.innerText = getRandomValue(emojiSet)
        value2.innerText = getRandomValue(emojiSet)
        value3.innerText = getRandomValue(emojiSet)
    }, emojichangetime)

    setTimeout(() => {
        h1Stats.innerText = "You can now stop the wheel"
        btnStop.disabled = false
    }, 2000)


    value[0].style.animationPlayState = 'running'
    value[1].style.animationPlayState = 'running'
    value[2].style.animationPlayState = 'running'

    chance--
    btnSpin.disabled = true
    chances.innerText = `Chances left: ${chance}`

    btnSpin.innerText = 'Click Stop'
}

btnStop.onclick = function () {
    h1Stats.innerText = "Wheel Stopped"
    if (randomValueIntervalId) {
        clearInterval(randomValueIntervalId)
        value[0].style.animation = 'spinstopping 2s 1';
        setTimeout(function(){
            value[1].style.animation = 'spinstopping 2s 1';
        },100);
        setTimeout(function(){
            value[2].style.animation = 'spinstopping 2s 1';
        },200);
        btnStop.disabled = true
        setTimeout(() => {

            if (value1.innerText == value2.innerText && value2.innerText == value3.innerText) {
                scoreCounter++
                score.innerText = `Your Score: ${scoreCounter}`
                h1Stats.innerText = "1 point added to Score"
                h1Stats.style.color = "#814865"
                //This if statement had be written inside setTimeout , other score.innerText does not changes on winning because the browser will do performance option by reading all the lines and then displaying the last line . If we do set time out we are giving browser the time to render on screen.
                setTimeout(() => {
                    if (scoreCounter == win) {
                        alert("Congrats, You Won the match !!! Play Again")
                        location.reload()
                    }
                }, 60)
            }
            else {
                h1Stats.innerText = "0 point added to Score"
                h1Stats.style.color = "#814865"
            }
            if (chance == 0) {

                if (scoreCounter == win)
                    alert("Congrats, You Won the match !!! Play Again")
                else
                    alert("You Lose!!! Better Luck Next Time")
                location.reload()
            }
            setTimeout(() => {
                h1Stats.innerText = "Spin the Wheel"
                h1Stats.style.color = "#5D2E46"
                btnSpin.innerText = 'Spin'
                btnSpin.disabled = false
            }, 3000)
            let speedOld
            speedOld = (1 / speedSlot) * 2;
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
