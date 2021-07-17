
var maxShows = 50;

$(document).ready(() => {
    
    $(document).on('click', '#btn-back', function(e) {
        render_show_list();
    });
    
    $(document).on('click', '#shows-list .card', function(e) {
       let item = $(this).parent();
       let id = item.attr('data-show_id');
       load_show_info(id);
    });

    
    load_shows();
});

let load_show_info = (id) => {
    $('#shows-list').addClass('visually-hidden');
    $('#show-info').removeClass('visually-hidden');
    $('#show-info-inner').addClass('visually-hidden');
    $('#show-info-loading').removeClass('visually-hidden');

    let showJSON, seasonsJSON, castJSON;

    fetch(`//api.tvmaze.com/shows/${id}`)
        .then((show) => show.json())
        .then((show) => {
            showJSON = show;
            return fetch(`//api.tvmaze.com/shows/${id}/seasons`);
        })
        .then((seasons) => seasons.json())
        .then((seasons) => {
            seasonsJSON = seasons;
            return fetch(`//api.tvmaze.com/shows/${id}/cast`);
        })
        .then((cast) => cast.json())
        .then((cast) => {
            castJSON = cast;
            render_show_info(showJSON, seasonsJSON, castJSON);
        })
        .catch((error) => {
            if(showJSON)
                render_show_info(showJSON, seasonsJSON || [], castJSON || []);
        
            else 
                show_info_error(error);
        });
    /*
    $.ajax({
        url: `//api.tvmaze.com/shows/${id}`,
        method: 'GET'
    }).done((show) => {
        //Show received?
        //Get Seasons
        $.ajax({
            url: `//api.tvmaze.com/shows/${id}/seasons`,
            method: 'GET'
        }).done((seasons) => {
            //Seasons received?
            //Get Cast
            $.ajax({
                url: `//api.tvmaze.com/shows/${id}/cast`,
                method: 'GET'
            }).done((cast) => {
                //Finally, render Show with all data we collected.
                render_show_info(show, seasons, cast);
            }).fail((jqXHR, textStatus, errorThrown) => {
                //cast fetch failed
                render_show_info(show, seasons, []);
            });
        }).fail((jqXHR, textStatus, errorThrown) => {
            //seasons fetch failed
            //Get Cast
            $.ajax({
                url: `//api.tvmaze.com/shows/${id}/cast`,
                method: 'GET'
            }).done((cast) => {
                //Finally, render Show with all data we collected.
                render_show_info(show, [], cast)
            }).fail((jqXHR, textStatus, errorThrown) => {
                //cast fetch failed
                render_show_info(show, [], []);
            });
        });
    }).fail((jqXHR, textStatus, errorThrown) => {
        show_info_error(errorThrown);
    }); */
}
let render_show_list = () => {
    $('#shows-list').removeClass('visually-hidden');
    $('#show-info').addClass('visually-hidden');
}
let show_info_error = function(errorThrown) {
    errorThrown = errorThrown || 'Unknown error occured';
    alert(`Couldn\'t load show: ${errorThrown}`);
    render_show_list();
    
}
let render_show_info = (show, seasons, cast) => {

    $('#show-info-loading').addClass('visually-hidden');
    $('#show-info-inner').removeClass('visually-hidden');
    $('#show-title').html(show.name);
    $('#show-description').html(show.summary);

    let seasonsList = $('#seasons-list');
    let castList = $('#cast-list');

    let thumb = $('#show-thumbnail');

    if(show.image && show.image.original)
        thumb.attr('src', show.image.original);
    else
        thumb.attr('src', thumb.attr('data-default_src'));

    $('#seasons-count').html(seasons.length);
    //Seasons
    if(seasons.length) {
        seasonsList.html('');
        seasons.forEach((season, index) => {
            let endDate = season.endDate || 'TBA';
            if(season.premiereDate)
                seasonsList.append(`<li>${season.premiereDate} - ${endDate}</li>`);
            else 
                seasonsList.append(`<li>Invalid season data</li>`);
        });
    }
    else {
        $('#seasons-list').replaceWith('<div class="text-muted mt-4">No season data.</div>');
    }

    if(cast.length) {
        castList.html('');
        cast.forEach((c, index) => {
            castList.append(`<li>${c.character.name} - <a href="${c.person.url}" target="_blank">${c.person.name}</a></li>`);
        });
    }
    else {
        $('#cast-list').replaceWith('<div class="text-muted mt-4">No cast data.</div>');
    }
}
let load_shows = () => {
    fetch('//api.tvmaze.com/shows')
    .then((response) => response.json())
        .then((response) => {
            responseJSON = response;
            render_shows(response);
        })
        .catch((errorThrown) => {
            error_shows(errorThrown);
        });

    // $.ajax({
    //     url: '//api.tvmaze.com/shows',
    //     method: 'GET'
    // }).done((response) => {
    //     render_shows(response);
    // }).fail((jqXHR, textStatus, errorThrown) => {
    //     error_shows(errorThrown);
    // });
}

let error_shows = (errorThrown) => {
    $('#loading').remove();
    errorThrown = errorThrown || 'Unknown, please refresh the page.';

    $('#shows-list-inner').html(`<h5 class="text-danger text-center my-5">Shows could not be loaded:</h5><h2 class="text-center">${errorThrown}</h2>`);
}
let render_shows = (items) => {
    $('#loading').remove();
    let showsList = $('#shows-list-inner');
    showsList.html('');

    if(items.length) {
        //Sort Shows by rating.
        items.sort(function(a, b) {
            if(a.rating.average > b.rating.average)
                return -1;
            if(a.rating.average < b.rating.average)
                return 1;
            return 0;
        });

        items = items.slice(0, maxShows);
        items.forEach((item, index) => {
            //Add item to list.
            let card = $('#show-template').clone();
            card.removeAttr('id').removeClass('visually-hidden');
            card.attr('data-show_id', item.id);
            let img_src = "";

            if(item.image.medium)
                img_src = item.image.medium;
            else if(item.image.original)
                img_src = item.image.original;

            if(img_src)
            card.find('img').attr('src', img_src);

            
            card.find('.card-title').html(item.name);
            card.find('.card-text').html(`Avg. Rating ${item.rating.average} / 10`);
            showsList.append(card);
        });
    }
    else {
        //show no results
        showsList.html('<div class="text-muted text-center py-5">No shows found.</div>');
    }
}

