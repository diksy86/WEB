function doStuff() {
    var lee = document.getElementsByClassName('active')[0];
    lee.classList.remove("active");
    lee.parentElement.parentElement.previousElementSibling.firstElementChild.firstElementChild.className = "active";
}
doStuff();
