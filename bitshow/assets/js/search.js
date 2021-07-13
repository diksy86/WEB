var searchTimer;
var searchXHR;
var maxSearchItems = 10;

$(document).ready( () => {
    $(document).on('keyup change search', '#search', function(e) {
        /**
         * To avoid calling "search" function multiple times in short period of time 
         * on each keyup, we set a timeout that will trigger "search" function.
         * 
         * Each keyup event STOPS previously started timeout and starts a new one,
         * so if user triggers keyup multiple times within short period of time, "search" will
         * be called, in this case, 300ms after last keyup.
         */
    
        //Clear previously set timeout
        clearTimeout(searchTimer);
        //start new timeout and store it's ID in variable so clearTimeout can be called on next keyup if needed.
        searchTimer = setTimeout(search, 300);
    });
    $(document).on('click', '#search-dropdown button', function(e) {
        e.preventDefault();

        let id = $(this).attr('data-show_id');
        load_show_info(id);
        $('#search').val('');
        clear_search_dropdown();
    })
})

let search = () => {
    let searchTerm = $('#search').val().trim();
    if(!searchTerm) {
        clear_search_dropdown();
        return;
    }
    
    if(typeof searchXHR !== "undefined")
        searchXHR.abort();

    searchXHR = $.ajax({
        url: '//api.tvmaze.com/search/shows',
        method: 'GET',
        data: {
            q: searchTerm
        }
    }).done((response) => {
        render_search_dropdown(response);
    }).fail((jqXHR, textStatus, errorThrown) => {
        error_search_dropdown(errorThrown);
    });
}

let clear_search_dropdown = () => {
    //Clear content of dropdown and hide it.
    $('#search-dropdown').html('').addClass('visually-hidden');
}

let error_search_dropdown = (errorThrown) => {
    //Clear dropdown before displaying error.
    clear_search_dropdown();
    
    errorThrown = errorThrown || 'Search not available.';
    //Add our custom error message.
    let searchItem = $('<button class="list-group-item list-group-item-action text-danger" disabled></button>');
    searchItem.html(errorThrown);

    $('#search-dropdown').append(searchItem).removeClass('visually-hidden');
}
let render_search_dropdown = (items) => {
    //Clear dropdown before adding new items.
    clear_search_dropdown();

    let searchList = $('#search-dropdown');

    //If we have results, go through them and add them to search dropdown.
    if(items.length) {
        items = items.slice(0, maxSearchItems);
        items.forEach((item, index) => {
            //Add item to dropdown.
            let searchItem = $(`<button class="list-group-item list-group-item-action">${item.show.name}</button>`);
            searchItem.attr('data-show_id', item.show.id);
            searchList.append(searchItem);
        });
    }
    //No results? Add "not found" item to search dropdown.
    else {
        let searchItem = $('<button class="list-group-item list-group-item-action" disabled>No results found</button>');
        searchList.append(searchItem);
    }

    //Finally, show dropdown.
    searchList.removeClass('visually-hidden');
}