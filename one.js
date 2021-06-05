

document.addEventListener('DOMContentLoaded', function () {
    console.log(document.querySelectorAll("body ul"))
    var ul1 = document.querySelectorAll("body ul")[0];
    ul1.setAttribute("id", "secondList")
    updateListElements(ul1.querySelectorAll("li"), "list-element", false);
    var ul2 = document.querySelectorAll("body ul")[2];
    updateListElements(ul2.querySelectorAll("li"), "third-list-element", true)
});

var listItem= document.createElement('li');
var text = document.createTextNode('some text');



function updateListElements(elements, className, toUpperCase) {
    var length = elements.length;
    console.log(elements);
    console.log(length);
    for (var i = 0; i < length; i++) {
        var li = elements[i];
        console.log(li);
        li.className = className;
        if (toUpperCase) {
            li.innerHTML = li.innerHTML.toUpperCase();
        }
    }
}