var button = document.querySelector("#send");
var textArea = document.querySelector(".messages");
var input = document.querySelector("#msg");

function sendMessage(){
    var p = document.createElement("p");
    p.textContent = input.value;

    textArea.appendChild(p);
    input.value = "";
};

button.addEventListener('click', sendMessage);

input.addEventListener("keypress", function (event) {
    if (event.keyCode == 13) {
        button.click();
        event.preventDefault();
    }
});
