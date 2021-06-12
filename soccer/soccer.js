var movementEnabled = true;

var movementHandler = function(e) {
    movementEnabled = !movementEnabled;
    e.target.innerHTML = movementEnabled ? 'Stop Movement' : 'Start Movement';
}

var player = document.querySelector("#player");
var field = document.querySelector(".field");
var stopBtn = document.querySelector(".disable-btn");

function movingPlayer(event) {
    if(!movementEnabled)
        return;
    var xPosition = event.offsetX - 100;
    var yPosition = event.offsetY - 100;

    player.style.top = yPosition + "px";
    player.style.left = xPosition + "px";
}


field.addEventListener("click", movingPlayer);
stopBtn.addEventListener("click", movementHandler);