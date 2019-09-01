$(document).ready(function() {
    // Open sidebar menu on mobile
    $('.ms-mob-nav-btn-wrapper').on('click', function() {
        $('.ms-header-container nav, .ms-overlay').addClass('ms-active');
    });

    // Close sidebar menu on mobile
    $('.ms-overlay, .ms-nav-close-btn').on('click', function() {
        $('.ms-header-container nav, .ms-overlay').removeClass('ms-active');
    });
});