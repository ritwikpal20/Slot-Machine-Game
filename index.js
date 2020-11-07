//The play button had initially display:none, but we changed it to inherit so that it comes to our display after 3s
let play = document.getElementById('play')
setTimeout(() => {
    play.style.display = 'inherit'
}, 3000)

$("#play").click(function(){
    window.location.href = "./menu.html";
});