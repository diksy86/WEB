var body = document.querySelector("body");
var img = document.querySelectorAll("img");
var special = document.querySelector("#special");

img.forEach(function (image) {
    image.addEventListener("click", changeBorder);
});


function changeBorder(event) {
    this.style.border = "1px solid red";
    if (this.width === 300) {
        event.stopPropagation();
    }
}

document.addEventListener("click", function (event) {
    console.log(event.target);

});