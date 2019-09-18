$(document).ready(function() {

    setUp();
    afterSetUp();

    /* SET UP function - sets up elements on the page and their initial state */
    function setUp() {
        // Add visibility to the first HEADER SLIDER element
        $('ul.ms-header-slider-list li:first-child').addClass('ms-active');

        // Create SLIDER BULLETS
        var sliderBullet = '<li class="ms-header-slider-bullet"></li>',
            numbrOfSlides = $('.ms-header-slider-list li').length;
        for(var i = 0; i < numbrOfSlides; i++) {
            $('.ms-heder-slider-bullet-list').append(sliderBullet);
        }

        // Set activation to the first HEADER BULLET
        $('ul.ms-heder-slider-bullet-list li:first-child').addClass('ms-active');
    }
    
    /* AFTER SET UP function - different functionalities and client-page interaction */
    function afterSetUp() {
        // Fixate header MENU
        $(document).on('scroll', function() {
            $('.ms-header-container').addClass('ms-on-scroll');
            if($('.ms-header-container').offset().top === 0) {
                $('.ms-header-container').removeClass('ms-on-scroll');
            } else {
                $('.ms-header-container').addClass('ms-on-scroll');
            }
        });

        // Open SIDEBAR MENU on mobile
        $('.ms-mob-nav-btn-wrapper').on('click', function() {
            $('.ms-header-container nav, .ms-overlay, .ms-header-container').addClass('ms-active');
        });

        // Close SIDEBAR MENU on mobile
        $('.ms-overlay, .ms-nav-close-btn').on('click', function() {
            $('.ms-header-container nav, .ms-overlay, .ms-header-container').removeClass('ms-active');
            $('.ms-gallery-section-image-holder-container').detach();
            $('body').removeClass('no-scroll');
            $('.ms-header-container').addClass('ms-on-scroll');
        });

        // Scroll to the MENU ITEM when selected from the main menu
        $('.ms-header-wrapper nav ul li').on('click', function() {
            var selectedMenuItemIndex;
            
            $(this).addClass('ms-clicked');
            $('.ms-header-wrapper nav ul li').each(function(index) {
                if($(this).hasClass('ms-clicked')) {
                    selectedMenuItemIndex = index;
                }
            });
            $('.ms-header-wrapper nav ul li.ms-clicked').removeClass('ms-clicked');

            $('.ms-menu-item').each(function(index) {
                var menuItemOffsetTop,
                    selectedMenuItem;
                if(index === selectedMenuItemIndex) {
                    selectedMenuItem = $(this);
                    menuItemOffsetTop = $(selectedMenuItem).offset().top - 220;
                    $(document).scrollTop(menuItemOffsetTop);

                    $('.ms-header-wrapper nav').removeClass('ms-active');
                    $('.ms-overlay').removeClass('ms-active');
                }
            });
        });

        // HEADER SLIDER functionality
        setInterval(function() {
            var currentSlide = $('ul.ms-header-slider-list li.ms-active'),
                nextSlide = $('ul.ms-header-slider-list li.ms-active+li'),
                currentBullet = $('ul.ms-heder-slider-bullet-list li.ms-active'),
                nextBullet = $('ul.ms-heder-slider-bullet-list li.ms-active+li');
            if(!$(nextSlide).length) {
                $(currentSlide).removeClass('ms-active');
                $('ul.ms-header-slider-list li:first-child').addClass('ms-active');

                $(currentBullet).removeClass('ms-active');
                $('ul.ms-heder-slider-bullet-list li:first-child').addClass('ms-active');
            } else {
                $(currentSlide).removeClass('ms-active');
                $(nextSlide).addClass('ms-active');

                $(currentBullet).removeClass('ms-active');
                $(nextBullet).addClass('ms-active');
            }
        }
        , 5000);

        // Change SLIDE on BULLET click
        $('.ms-heder-slider-bullet-list .ms-header-slider-bullet').on('click', function() {
            // initally remove .ms-active from slides and bullets
            $('.ms-heder-slider-bullet-list .ms-header-slider-bullet.ms-active').removeClass('ms-active');
            $('.ms-header-slider-list li.ms-active').removeClass('ms-active');

            var thisBullet = $(this),
                currentBulletIndex;
            // add class ms-active to the selected bullet
            $(thisBullet).addClass('ms-active');
            // find bullet index
            $('.ms-heder-slider-bullet-list .ms-header-slider-bullet').each(function(index) {
                if($(this).hasClass('ms-active')) {
                    currentBulletIndex = index;
                }
            });
            // adjust slide index
            $('.ms-header-slider-list li').each(function(indexs) {
                if(indexs === currentBulletIndex) {
                    $(this).addClass('ms-active');
                }
            });
        });

        // On GALLERY image select - create large image
        $('.ms-gallery-section img').on('click', function() {
            var largerImage = $(this).clone(),
                imageHolder = '<div class="ms-gallery-section-image-holder-container"><div class="ms-gallery-section-image-holder-wrapper"><i class="fa fa-times-thin fa-2x" aria-hidden="true"></i></div></div>';
            
            if(!$('.ms-gallery-section-image-holder').length) {
                $('.ms-gallery-section').append(imageHolder);
                $('.ms-overlay').addClass('ms-active');
                $('body').addClass('no-scroll');
                $('.ms-header-container.ms-on-scroll').removeClass('ms-on-scroll');
            }
            $('.ms-gallery-section-image-holder-wrapper').append(largerImage);

            // Close GALLERY large image
            $('.ms-gallery-section-image-holder-wrapper i').on('click', function() {
                $(this).parents('.ms-gallery-section-image-holder-container').detach();
                $('.ms-overlay').removeClass('ms-active');
                $('body').removeClass('no-scroll');
                $('.ms-header-container').addClass('ms-on-scroll');
            });
        });

        // CUSTOMERS SLIDER functionality
        setInterval(function() {
            var currentCustomer = $('.ms-customer-container.ms-active'),
                nextCustomer = $('.ms-customer-container.ms-active+.ms-customer-container');
            if(!$(nextCustomer).length) {
                $(currentCustomer).removeClass('ms-active');
                $('.ms-customer-container').first().addClass('ms-active');
            } else {
                $(currentCustomer).removeClass('ms-active');
                $(nextCustomer).addClass('ms-active');
            }
        }
        , 5000);
    }

});