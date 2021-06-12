
var toggleEnabled = true;

var buttonHandler = function(e) {
    if(!toggleEnabled)
        return;

    var body = document.querySelector(".container");
    body.classList.toggle('light');
}

var offHandler = function(e) {
    toggleEnabled = !toggleEnabled;
    e.target.innerHTML = toggleEnabled ? 'Turn Off' : 'Turn On';
}
var toggle = document.querySelector('.toggle');
toggle.addEventListener("click", buttonHandler);


var off = document.querySelector('.off');
off.addEventListener('click', offHandler);



