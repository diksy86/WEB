$(document).ready(function() {
    console.log("Hello World");
})

$("li:first").css("border-bottom", "1px solid black");
//$("li:first").addClass("border-bottom");
$("li").css("text-transform", "uppercase");
$("li.active").css("color", "red");

//$('li:not(:first-child):not(:last-child)').css('color', 'red');
$("li:nth-child(3)").css("background-color", "yellow");