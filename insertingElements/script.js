$(document).ready(function() {
    $("body").prepend("<h1>Gallery</h1>");
    init_gallery();
});
    
   


var images =[
    "http://farm9.staticflickr.com/8241/8589392310_7b6127e243_s.jpg",
    "http://farm9.staticflickr.com/8379/8588290361_ecf8c27021_s.jpg",
    "http://farm4.staticflickr.com/3721/9207329484_ba28755ec4_o.jpg",
    "http://farm9.staticflickr.com/8241/8589392310_7b6127e243_s.jpg",
    "http://farm9.staticflickr.com/8379/8588290361_ecf8c27021_s.jpg",
    "http://farm4.staticflickr.com/3721/9207329484_ba28755ec4_o.jpg"
    
];
        

    // $(arrOfImgLinks).each(function(index,element){
    //     var createImg=$("<img>");
    //     $("h1").after(createImg);
    //     $("img:first").attr("src", arrOfImgLinks[index]);
    // });
    
function init_gallery() {
    var gallery = jQuery('#gallery');
    
    $(images).each(function( index, value) {
        var link = $('<a>');
        link.attr('href', value);
    
        var newImage = $('<img>');
        newImage.attr('src', value);
        link.append(newImage);
        gallery.append(link);     
     });
    
    $('#gallery a').magnificPopup({type:'image'});
    
    
    var stopCheck = false;

    $('#gallery img').each(function( index, element ) {
        var widthPx =  Math.random() * (250 - 130) + 130;
    
        $( element ).css("width", widthPx + "px");

        console.log(widthPx);
            
        if(!stopCheck) {
            if ( widthPx < 200 ) {
                $( element ).css( "border" , "5px solid red" );
                } 
                else  {
                    stopCheck = true;
                }
            }
            console.log(stopCheck);
    
    });
};

    