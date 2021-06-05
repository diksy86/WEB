function alertNav() {
    var a = document.querySelector('li');
    a.firstChild = alert(a.firstChild.textContent);
}

function replaceText(text) {
    var b = document.querySelector('ul');
    b.lastElementChild.textContent = text;
}

function myFunction() {
    var s = document.createElement('mySelect');
    var x = document.getElementById("mySelect");
    var option = document.createElement("option");
    option.text = "Kiwi";
    x.add(option);
    
  }


mySelect.options.add(new Option("text", "1"), mySelect.options[0]);

//alertNav();
replaceText("Promotions");