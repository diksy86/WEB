

function alertNav() {
    var a = document.querySelector('ul');
    a.firstElementChild = alert(a.firstElementChild.textContent);
}

function replaceText(text) {
    var b = document.querySelector('ul');
    b.lastElementChild.textContent = text;
}

function myFunction(arr, div) {
    var myLabel = document.createElement("label");
    var mySelect = document.createElement("select");
        for (var i = 0; i < arr.length; i++) {
            var myOption = document.createElement("option");
            myOption.innerHTML = arr[i];
            mySelect.appendChild(myOption);
        }

    var body = document.querySelector("body");
    var node = document.createElement(div);
    body.prepend(node);
    node.prepend(myLabel);
    node.appendChild(mySelect);
    
  }
replaceText("Promotions");
myFunction(["Apple", "Banana", "Kiwi"], 'div');