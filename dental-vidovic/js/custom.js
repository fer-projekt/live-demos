/* ------------------------------------------------

[ Custom settings ]

1. ScrollIt
2. Preloader 
3. Navbar scrolling background 
4. Close navbar-collapse when a  clicked
5. Sections background image from data background 
6. Animations
7. Slider & Slider Fade OwlCarousel
8. Slider owlCarousel - (Inner Page Slider)
9. Slider owlCarousel (Homepage Slider)
10. Services 1 owlCarousel
11. Services 2 owlCarousel
12. Services 3 owlCarousel
13. Services 4 owlCarousel
14. Testimonials owlCarousel
15. Team owlCarousel
16. Blog owlCarousel
17. Isotope Active Masonry Gallery
18. MagnificPopup Gallery
19. Smooth Scrolling
20. Scroll back to top
21. Accordion Box (for Faqs)
22. Parallaxie
23. Progress Skills
24. Tooltip
25. Wow Animated
26. Reveal Effect
27. YouTubePopUp
28. Magnet Cursor
29. Mouse Cursor
30. Before-After
31. Buttons
32. Image Rotate 

------------------------------------------------ */

$(function () {
    "use strict";
    var wind = $(window);
    var isRtl = $("html").attr("dir") === "rtl";
    
    // ScrollIt
    $.scrollIt({
        upKey: 38, // key code to navigate to the next section
        downKey: 40, // key code to navigate to the previous section
        easing: 'swing', // the easing function for animation
        scrollTime: 600, // animation duration
        activeClass: 'active', // class for active nav item
        onPageChange: null,
        topOffset: -100 // offset for fixed header
    });
    
    // Preloader
    var CustomApp = {
        init: function () {
            this.handlePreloader();
        },
        handlePreloader: function () {
            $("#preloader").fadeOut(500);
            $(".preloader-bg").delay(300).fadeOut(500);
        }
    };
    CustomApp.init();
    
    // Navbar scrolling background 
    wind.on("scroll", function () {
        var bodyScroll = wind.scrollTop(),
            navbar = $(".navbar"),
            logo = $(".navbar .logo> img");
        if (bodyScroll > 100) {
            navbar.addClass("nav-scroll");
        } else {
            navbar.removeClass("nav-scroll");
        }
        logo.attr('src', 'img/logo.svg');
    });
    
    // Close navbar-collapse when a  clicked 
    $(document).on('click', '.navbar-nav .dropdown-item a', function () {
        $(".navbar-collapse").removeClass("show");
    });
    
    // Sections background image from data background 
    var pageSection = $(".bg-img, section");
    pageSection.each(function (indx) {
        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });
    
    // Animations
    var contentWayPoint = function () {
        var i = 0;
        $('.animate-box').waypoint(function (direction) {
            if (direction === 'down' && !$(this.element).hasClass('animated')) {
                i++;
                $(this.element).addClass('item-animate');
                setTimeout(function () {
                    $('body .animate-box.item-animate').each(function (k) {
                        var el = $(this);
                        setTimeout(function () {
                            var effect = el.data('animate-effect');
                            if (effect === 'fadeIn') {
                                el.addClass('fadeIn animated');
                            } else if (effect === 'fadeInLeft') {
                                el.addClass('fadeInLeft animated');
                            } else if (effect === 'fadeInRight') {
                                el.addClass('fadeInRight animated');
                            } else {
                                el.addClass('fadeInUp animated');
                            }
                            el.removeClass('item-animate');
                        }, k * 200, 'easeInOutExpo');
                    });
                }, 100);
            }
        }, {
            offset: '85%'
        });
    };
    contentWayPoint();
    
    // Slider & Slider Fade OwlCarousel 
    var owl = $('.header .owl-carousel');
    
    // Slider owlCarousel - (Inner Page Slider)
    $('.slider .owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        rtl: isRtl,
        dots: true,
        margin: 0,
        autoplay: false,
        autoplayTimeout: 5000,
        nav: false,
        navText: ['<i class="ti-angle-left" aria-hidden="true"></i>', '<i class="ti-angle-right" aria-hidden="true"></i>'],
        responsiveClass: true,
        responsive: {
            0: {
                dots: true
            },
            600: {
                dots: true
            },
            1000: {
                dots: true
            }
        }
    });
    
    // Slider owlCarousel (Homepage Slider)
    $('.slider-fade .owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        rtl: isRtl,
        dots: true,
        margin: 0,
        autoplay: false,
        autoplayTimeout: 5000,
        animateOut: 'fadeOut',
        nav: false,
        navText: ['<i class="ti-angle-left" aria-hidden="true"></i>', '<i class="ti-angle-right" aria-hidden="true"></i>'],
        responsiveClass: true,
        responsive: {
            0: {
                dots: true
            },
            600: {
                dots: true
            },
            1000: {
                dots: true
            }
        }
    });
    owl.on('changed.owl.carousel', function (event) {
        var item = event.item.index - 2; // Position of the current item
        $('span.icon').removeClass('animated fadeInUp');
        $('h5').removeClass('wow animated fadeInUp');
        $('h4').removeClass('wow animated fadeInUp');
        $('h3').removeClass('wow animated fadeInUp');
        $('h2').removeClass('wow animated fadeInUp');
        $('h1').removeClass('wow animated fadeInUp');
        $('h1 span').removeClass('wow animated zoomIn');
        $('p').removeClass('wow animated fadeInUp');
        $('.durubtn').removeClass('wow animated fadeInUp');
        $('.durubtn2').removeClass('wow animated fadeInUp');
        $('.durubtn3').removeClass('wow animated fadeInUp');
        $('.durubtn4').removeClass('wow animated fadeInUp');
        $('.durubtn5').removeClass('wow animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('span.icon').addClass('wow animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('h5').addClass('wow animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('h4').addClass('wow animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('h3').addClass('wow animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('h2').addClass('wow animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('h1').addClass('wow animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('h1 span').addClass('wow animated zoomIn');
        $('.owl-item').not('.cloned').eq(item).find('p').addClass('wow animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('.durubtn').addClass('wow animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('.durubtn2').addClass('wow animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('.durubtn3').addClass('wow animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('.durubtn4').addClass('wow animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('.durubtn5').addClass('wow animated fadeInUp');
    });
    
    // Services 1 owlCarousel
    $('.services .owl-carousel').owlCarousel({
        loop: true,
        rtl: isRtl,
        margin: 20,
        mouseDrag: true,
        autoplay: false,
        autoplayTimeout: 5000,
        smartSpeed: 1000,
        dots: true,
        nav: false,
        navText: ["<span class='lnr ti-angle-left'></span>", "<span class='lnr ti-angle-right'></span>"],
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 4,
            }
        }
    });

    // Services 2 owlCarousel
    $('.services2 .owl-carousel').owlCarousel({
        loop: true,
        rtl: isRtl,
        margin: 20,
        mouseDrag: true,
        autoplay: false,
        autoplayTimeout: 5000,
        smartSpeed: 1000,
        dots: true,   // bez točkica se ne vidi da su usluge slider
        nav: false,
        navText: ["<span class='lnr ti-angle-left'></span>", "<span class='lnr ti-angle-right'></span>"],
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 2,
            }
        }
    });
    
    // Services 3 owlCarousel
    $('.services3 .owl-carousel').owlCarousel({
        loop: true,
        rtl: isRtl,
        margin: 20,
        mouseDrag: true,
        autoplay: false,
        autoplayTimeout: 5000,
        smartSpeed: 1000,
        dots: true,
        nav: false,
        navText: ["<span class='lnr ti-angle-left'></span>", "<span class='lnr ti-angle-right'></span>"],
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
            }
        }
    });
    
    // Services 4 owlCarousel 
    $('.services4').each(function(index, value) {
            var valueObj = $(value),
                totalWidth = valueObj.outerWidth(),
                slidingLength = valueObj.find('.item').length,
                devideRightPadding = parseInt(valueObj.css('padding-right')) / slidingLength,
                devideLeftPadding = parseInt(valueObj.css('padding-left')) / slidingLength,
                usageWidth = (slidingLength * 12.5) + 12.5 + devideRightPadding + devideLeftPadding,
                useWidth = totalWidth - usageWidth,
                devideLength = slidingLength + 1,
                devideWidth = (useWidth / devideLength),
                activeWidth = devideWidth * 2;
            valueObj.find('.item, .img, .item .cont').css('width', devideWidth);
            valueObj.find('.item .cont').css('left', devideWidth);
            valueObj.find('.item.active').css('width', activeWidth);
            $(document).on('mouseenter', '.services4 .item', function() {
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
                valueObj.find('.item, .img, .item .cont').css('width', devideWidth);
                valueObj.find('.item .cont').css('left', devideWidth);
                valueObj.find('.item.active').css('width', activeWidth);
            });
        });

    // Testimonials owlCarousel
    $('.testimonials .owl-carousel').owlCarousel({
        loop: true,
        rtl: isRtl,
        margin: 30,
        mouseDrag: true,
        autoplay: false,
        autoplayTimeout: 7000,
        smartSpeed: 1000,
        dots: true,   // recenzije su karusel, točkice to moraju pokazati
        nav: false,
        navText: ["<span class='fa-light fa-angle-left'></span>", "<span class='lnr fa-light fa-angle-right'></span>"],
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
            }
        }
    });
    
    // Team owlCarousel
    $('.team .owl-carousel').owlCarousel({
        loop: true,
        rtl: isRtl,
        margin: 20,
        mouseDrag: true,
        autoplay: false,
        autoplayTimeout: 3000,
        smartSpeed: 1000,
        dots: false,
        nav: false,
        navText: ["<span class='lnr ti-angle-left'></span>", "<span class='lnr ti-angle-right'></span>"],
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                dots: true
            },
            600: {
                items: 2,
            },
            1000: {
                items: 4,
            }
        }
    });
    
    // Pricing owlCarousel
    $('.pricing .owl-carousel').owlCarousel({
        loop: true,
        rtl: isRtl,
        margin: 20,
        mouseDrag: true,
        autoplay: false,
        autoplayTimeout: 3000,
        smartSpeed: 1000,
        dots: true,
        nav: false,
        navText: ["<span class='lnr ti-angle-left'></span>", "<span class='lnr ti-angle-right'></span>"],
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
            // Točkice se prikazuju samo dok su kartice skrivene. Od 1080px sve tri
            // stanu u red, pa nema što listati i točkice bi zbunjivale.
            0: {
                items: 1,
                dots: true,
            },
            640: {
                items: 2,
                dots: true,
            },
            1080: {
                items: 3,
                dots: false,
            }
        }
    });
    
    // Blog owlCarousel 
    $('.blog .owl-carousel').owlCarousel({
        loop: true,
        rtl: isRtl,
        margin: 20,
        mouseDrag: true,
        autoplay: false,
        dots: false,
        autoplayHoverPause: true,
        nav: false,
        navText: ["<span class='lnr fa-light fa-angle-left'></span>", "<span class='lnr fa-light fa-angle-right'></span>"],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                dots: true
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
            }
        }
    });
    
    // Isotope Active Masonry Gallery
    $('.gallery-items').imagesLoaded(function () {
        // Add isotope on click filter function
        $('.gallery-filter li').on('click', function () {
            $(".gallery-filter li").removeClass("active");
            $(this).addClass("active");
            var selector = $(this).attr('data-filter');
            $(".gallery-items").isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false,
                }
            });
            return false;
        });
        $(".gallery-items").isotope({
            itemSelector: '.single-item',
            layoutMode: 'masonry',
        });
    });
    
    // MagnificPopup Gallery
    $('.gallery').magnificPopup({
        delegate: '.popimg',
        type: 'image',
        gallery: {
            enabled: true
        }
    });
    $(".img-zoom").magnificPopup({
        type: "image",
        closeOnContentClick: !0,
        mainClass: "mfp-fade",
        gallery: {
            enabled: !0,
            navigateByImgClick: !0,
            preload: [0, 1]
        }
    })
    $('.magnific-youtube, .magnific-vimeo, .magnific-custom').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 300,
        preloader: false,
        fixedContentPos: false
    });
    $('.image-popup-vertical-fit').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-img-mobile',
        image: {
            verticalFit: true
        }
    });
    
    // Smooth Scrolling
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').on('click', function (event) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function () {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });
    
    // Scroll back to top
    var progressPath = document.querySelector('.progress-wrap path');
    if (progressPath) { // null guard
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(window).on('scroll', updateProgress);
        var offset = 150;
        var duration = 550;
        jQuery(window).on('scroll', function () {
            if (jQuery(this).scrollTop() > offset) {
                jQuery('.progress-wrap').addClass('active-progress');
            } else {
                jQuery('.progress-wrap').removeClass('active-progress');
            }
        });
        jQuery('.progress-wrap').on('click', function (event) {
            event.preventDefault();
            jQuery('html, body').animate({
                scrollTop: 0
            }, duration);
            return false;
        });
    }
    
    // Accordion Box (for Faqs)
    if ($(".accordion-box").length) {
        $(".accordion-box .acc-content").hide();
        $(".accordion-box").on("click", ".accordion.block", function () {
            var block = $(this);
            var outerBox = block.closest(".accordion-box");
            if (block.find(".acc-content").is(":visible")) {
                block.find(".acc-content").slideUp(300);
                block.children(".number").removeClass("active");
                block.removeClass("active-block");
            } else {
                outerBox.find(".accordion.block .acc-content").slideUp(300);
                outerBox.find(".accordion.block").removeClass("active-block");
                outerBox.find(".accordion.block").children(".number").removeClass("active");
                block.find(".acc-content").slideDown(300);
                block.addClass("active-block");
                block.children(".number").addClass("active");
            }
        });
    }
    
    //  Parallaxie
    $('.parallaxie').parallaxie({
        speed: 0.2
        , size: "cover"
    });
    
    // Progress Skills
    var c4 = $('.circle');
    var myVal = $(this).attr('data-value');
    $(".sk-progress .circle").each(function () {
        c4.circleProgress({
            startAngle: -Math.PI / 2 * 1
            , value: myVal
            , thickness: 4
            , fill: {
                gradient: ["#222222", "#777"]
            }
        });
    });
      
    //  Tooltip
    $('[data-tooltip-tit]').hover(function () {
        $('<div class="div-tooltip-tit"></div>').text($(this).attr('data-tooltip-tit')).appendTo('body').fadeIn('slow');
    }, function () {
        $('.div-tooltip-tit').remove();
    }).mousemove(function (e) {
        $('.div-tooltip-tit').css({
            top: e.pageY + 10
            , left: e.pageX + 20
        })
    });
    $('[data-tooltip-sub]').hover(function () {
        $('<div class="div-tooltip-sub"></div>').text($(this).attr('data-tooltip-sub')).appendTo('body').fadeIn('slow');
    }, function () {
        $('.div-tooltip-sub').remove();
    }).mousemove(function (e) {
        $('.div-tooltip-sub').css({
            top: e.pageY + 60
            , left: e.pageX + 20
        })
    });

    // Wow Animated
    var wow = new WOW({
        animateClass: 'animated'
        , offset: 100
    });
    wow.init();
    
    // Reveal Effect
    var scroll = window.requestAnimationFrame ||
    // IE Fallback
    function (callback) {
            window.setTimeout(callback, 3000)
        };
    var elementsToShow = document.querySelectorAll('.reveal-effect');
    function loop() {
        Array.prototype.forEach.call(elementsToShow, function (element) {
            if (isElementInViewport(element)) {
                element.classList.add('animated');
            }
        });
        scroll(loop);
    }
    // Call the loop for the first time
    loop();
    function isElementInViewport(el) {
        // special bonus for those using jQuery
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }
        var rect = el.getBoundingClientRect();
        return (
            (rect.top <= 0 && rect.bottom >= 0) || (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) && rect.top <= (window.innerHeight || document.documentElement.clientHeight)) || (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)));
    }
    
    // YouTubePopUp 
    $(document).on('click', 'a.vid', function (e) {
        e.preventDefault();
        $(this).YouTubePopUp();
    });
    
    // Magnet Cursor
    function magnetize(el, e) {
        const mX = e.pageX;
        const mY = e.pageY;
        const item = $(el);
        const customDist = item.data('dist') * 20 || 80;
        const centerX = item.offset().left + (item.width() / 2);
        const centerY = item.offset().top + (item.height() / 2);
        const deltaX = Math.floor(centerX - mX) * -0.35;
        const deltaY = Math.floor(centerY - mY) * -0.35;
        const distance = parseInt(calculateDistance(item, mX, mY), 10);
        if (distance < customDist) {
            TweenMax.to(item, 0.5, {
                y: deltaY,
                x: deltaX,
                scale: 1
            });
            item.addClass('magnet');
        } else {
            TweenMax.to(item, 0.6, {
                y: 0,
                x: 0,
                scale: 1
            });
            item.removeClass('magnet');
        }
    }
    function calculateDistance(elem, mouseX, mouseY) {
        return parseInt(Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left + elem.width() / 2), 2) + Math.pow(mouseY - (elem.offset().top + elem.height() / 2), 2))), 10);
    }
    function lerp(a, b, n) {
        return (1 - n) * a + n * b;
    }
    
    // Mouse Cursor
    class Cursor {
        constructor() {
            this.cursor = document.querySelector('.js-cursor');
            this.mouseCurrent = {
                x: 0,
                y: 0
            };
            this.mouseLast = {
                x: 0,
                y: 0
            };
            this.rAF = null;
        ['getMousePosition', 'run'].forEach(fn => this[fn] = this[fn].bind(this));
        }
        getMousePosition(e) {
            this.mouseCurrent = {
                x: e.clientX,
                y: e.clientY
            };
        }
        run() {
            this.mouseLast.x = lerp(this.mouseLast.x, this.mouseCurrent.x, 0.2);
            this.mouseLast.y = lerp(this.mouseLast.y, this.mouseCurrent.y, 0.2);
            this.mouseLast.x = Math.floor(this.mouseLast.x * 100) / 100;
            this.mouseLast.y = Math.floor(this.mouseLast.y * 100) / 100;
            this.cursor.style.transform = `translate3d(${this.mouseLast.x}px, ${this.mouseLast.y}px, 0)`;
            this.rAF = requestAnimationFrame(this.run);
        }
        requestAnimationFrame() {
            this.rAF = requestAnimationFrame(this.run);
        }
        addEvents() {
            window.addEventListener('mousemove', this.getMousePosition, false);
        }
        on() {
            this.addEvents();
            this.requestAnimationFrame();
        }
        init() {
            this.on();
        }
    }
    if ($('.js-cursor').length > 0) {
        const cursor = new Cursor();
        cursor.init();
        const dragItems = '.pricing .owl-theme .item, .blog .owl-theme .item';
        $(dragItems).on('mouseenter', function () {
            $('.cursor').addClass('drag');
        }).on('mouseleave', function () {
            $('.cursor').removeClass('drag active');
        });
        $(dragItems).find('a').on('mouseenter', function () {
            $('.cursor').removeClass('drag active');
        }).on('mouseleave', function () {
            $('.cursor').addClass('drag');
        });
        $(document).on('mousedown', function () {
            if ($('.cursor').hasClass('drag')) {
                $('.cursor').addClass('active');
            }
        }).on('mouseup', function () {
            $('.cursor').removeClass('active');
        });
        $('a').on('mouseenter', function () {
            $('.cursor').addClass('link-hover');
        }).on('mouseleave', function () {
            $('.cursor').removeClass('link-hover');
        });
    }
    
    // Before-After 
    const items = document.querySelectorAll('.before-after .item');
      items.forEach((container) => {
        const overlay = container.querySelector('.item-overlay');
        const handle = container.querySelector('.handle');
        let isDragging = false;
        const setPosition = (x) => {
          const rect = container.getBoundingClientRect();
          let offsetX = x - rect.left;
          if (offsetX < 0) offsetX = 0;
          if (offsetX > rect.width) offsetX = rect.width;
          const percent = (offsetX / rect.width) * 100;
          overlay.style.width = percent + "%";
          handle.style.left = percent + "%";
        };
        handle.addEventListener('mousedown', () => { isDragging = true; });
        window.addEventListener('mouseup', () => { isDragging = false; });
        window.addEventListener('mousemove', (e) => {
          if (!isDragging) return;
          setPosition(e.clientX);
        });
        // touch support
        handle.addEventListener('touchstart', () => { isDragging = true; });
        window.addEventListener('touchend', () => { isDragging = false; });
        window.addEventListener('touchmove', (e) => {
          if (!isDragging) return;
          setPosition(e.touches[0].clientX);
        });
      });
    
    // Buttons
    $(document).on('click', '.durubtn, .durubtn2, .durubtn3, .durubtn4, .durubtn5', function () {
        $(this).toggleClass('active');
    });
    
    /* Image Rotate */
    document.querySelectorAll(".faqs .img").forEach((card) => {
      const image = card.querySelector(".tilt-image");
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 20;  // sağ-sol
        const rotateX = ((y / rect.height) - 0.5) * -20; // üst-alt (negatif ters çevirir)
        image.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      });
      card.addEventListener("mouseleave", () => {
        image.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
      });
    });

});