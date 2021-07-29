console.log('hola bola')

const POKEAPI_URL = 'https://pokeapi.co/api/v2';

$(document).ready(() => {
    var $navLinks = $('a.nav-link');
    $navLinks.on('click', event => {
        var $navLink = $(event.target);
        $navLinks.removeClass('active');
        $navLink.addClass('active');

        var type = $navLink.text().toLowerCase();
        $.getJSON(`${POKEAPI_URL}/type/${type}/`, response => {
            console.log('response', response);
        })
    });
});
