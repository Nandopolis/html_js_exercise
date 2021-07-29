console.log('hola bola')

$(document).ready(() => {
    var $navLinks = $('a.nav-link');
    $navLinks.on('click', event => {
        $navLinks.removeClass('active');
        $(event.target).addClass('active');
    });
});
