jQuery(document).ready(function ($) {

    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(CSSRulePlugin);


    const sections = document.querySelectorAll("section");

    function goToSection(section, anim) {
        gsap.to(window, {
            scrollTo: {y: section, autoKill: false},
            duration: 1
        });

        if (anim) {
            anim.restart();
        }
    }


    /*my*/

    gsap.from('.main-menu', {
        duration: 1, x: '-100%', ease: 'expo',
        onStart: () => {
            if(!($('body').hasClass('leftMenuThin'))) {
                $('.main-menu').addClass('active');
            }
        }
    });

    gsap.from('.arrow', {
        duration: 2,
        y: -50,
        ease: 'expo',
        stagger: { // wrap advanced options in an object
            each: 0.1,
            ease: "power2.inOut",
        }
    });

    gsap.fromTo('.j_parallaxEl',
        {duration: 2, opacity: 0.9, scale: 1.12, ease: 'expo'},
        {duration: 2, opacity: 1, scale: 1, ease: 'expo'}
    );

    let menuItemTween = gsap.from(".menu-item", {
        autoAlpha: 0,
        x: -100,
        stagger: { // wrap advanced options in an object
            each: 0.1,
            ease: Linear.easeNone,
        }
    });

    let menuLogoTween = gsap.from(".logo", {
        autoAlpha: 0,
        x: -100,
        duration: 1,
        ease: Linear.easeNone,
    });

    let menuLogo2Tween = gsap.from(".logo-s", {
        autoAlpha: 0,
        y: -100,
        duration: 0.75,
        ease: Linear.easeNone,
    });
    menuLogo2Tween.pause();

    let rule = CSSRulePlugin.getRule(".logo-w::after");
    let menuBgTween = gsap.from(rule, {
        backgroundPosition: "-100% 0px",
        ease: Linear.easeNone,
        duration: 1
    });


    $("#main-menu").hover(function () {
        if($('body').hasClass('leftMenuThin')){
            menuItemTween.restart();
            menuLogoTween.restart();
            menuBgTween.restart();
            menuLogo2Tween.reverse();
        }
        $(this).addClass("active");

    }, function () {
        if($('body').hasClass('leftMenuThin')){
            $(this).removeClass("active");
            menuItemTween.reverse();
            menuLogoTween.reverse();
            menuBgTween.reverse();
            menuLogo2Tween.restart();
        }
    });


    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        onEnter: () => {
            $('body').addClass('leftMenuThin');
            $('.main-menu').removeClass('active');
            menuItemTween.reverse();
            menuLogoTween.reverse();
            menuBgTween.reverse();
            menuLogo2Tween.play();
            },
        onLeaveBack: () => {
            $('body').removeClass('leftMenuThin');
            $('.main-menu').addClass('active');
            menuItemTween.play();
            menuLogoTween.play();
            menuBgTween.play();
            menuLogo2Tween.reverse();
        }
    });

    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: {className: 'visible', targets: '.top-menu'},
    });

    gsap.fromTo('.j_parallaxEl', {duration: 2, opacity: 1, scale: 1, ease: 'expo'}, {
        scrollTrigger: {
            trigger: '#landing-page',
            start: "top top", // when the top of the trigger hits the top of the viewport
            end: "+=100%", // end after scrolling 500px beyond the start
            scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
            snap: {
                snapTo: 0.1, // snap to the closest label in the timeline
                duration: {min: 0.2, max: 3}, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
                delay: 0.5, // wait 0.2 seconds from the last scroll event before doing the snapping
                ease: "power1.inOut" // the ease of the snap animation ("power3" by default)
            }
        },
        scale: 1.12,
        delay: 1
    })

    function zoomImage(sliderDOM) {
        const slideActive = sliderDOM.find('.swiper-slide-active, .swiper-slide-duplicate-active');
        const imageSlide = slideActive.find('.j_parallaxEl');

        gsap.fromTo(imageSlide,
            {duration: 2, opacity: 0.9, scale: 1.12, ease: 'expo'},
            {duration: 2, opacity: 1, scale: 1, ease: 'expo'}
        );
    }

    function moveDownText(sliderDOM) {
        const slideActive = sliderDOM.find('.swiper-slide-active');
        const slideSquare = slideActive.find('.slider-square');
        const slideCaption = slideActive.find('h1');
        const slideDesc = slideActive.find('.j_parlxContent .desc');

        gsap.set(slideSquare, { autoAlpha: 0 });
        gsap.to(slideSquare, { duration: 3, delay: 0.5, ease: Power4.easeOut, startAt: {autoAlpha: 0, y: "50%", rotationX:-90, }, autoAlpha: 1, y: "4%", rotationX:0, display: "flex"});

        gsap.set(slideCaption, { autoAlpha: 0 });
        gsap.to(slideCaption, { duration: 3, ease: Power4.easeOut, startAt: {autoAlpha: 0, y: "-100%" }, autoAlpha: 1, y: "4%", display: "block"});

        gsap.set(slideDesc, { autoAlpha: 0 });
        gsap.to(slideDesc, { duration: 3, delay: 0.5, ease: Power4.easeOut, startAt: {autoAlpha: 0, y: "-50%", rotationX:-90, }, autoAlpha: 1, y: "4%", rotationX:0, display: "flex"});

        let tl = gsap.timeline(),
            mySplitText = new SplitText(slideCaption, {type:"words,chars"}),
            chars = mySplitText.chars;

        tl.from(chars, {duration: 2, opacity:0,  y:80, rotationX:180, transformOrigin:"0% 50% -50",  ease:"expo",}, "+=0");

    }


    let bannerSwiper = new Swiper('#panelWrap .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        slidesOffsetAfter: 0,
        slideToClickedSlide: true,
        watchOverflow: true,
        loop: true,
        speed: 1000,
        navigation: {
            nextEl: '#rightArrow',
            prevEl: '#leftArrow',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
       /* autoplay: {
            delay: 5000,
        },*/
        runCallbacksOnInit: true,
        on: {
            init: function () {
                zoomImage(this.$el);
                moveDownText(this.$el);
            },
            slideNextTransitionStart: function () {
                zoomImage(this.$el);
                moveDownText(this.$el);
            },
            slidePrevTransitionStart: function () {
                zoomImage(this.$el);
                moveDownText(this.$el);
            }
        }
    })

    $(".a_scrollto").click(function (e){
        e.preventDefault();
        let $anchor = $(this).attr('href');
        let offset = $($anchor).offset().top;
        console.log($anchor);
        console.log(offset);
        TweenLite.to(window, 1, {scrollTo:{y:offset}});
    })

    let locationSwiper = new Swiper('#section2 .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        slidesOffsetAfter: 0,
        slideToClickedSlide: true,
        watchOverflow: true,
        loop: true,
        speed: 1000,
        navigation: {
            nextEl: '#rightArrow2',
            prevEl: '#leftArrow2',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        /* autoplay: {
             delay: 5000,
         },*/
        runCallbacksOnInit: true,
        on: {
            init: function () {
                zoomImage(this.$el);
            },
            slideNextTransitionStart: function () {
                zoomImage(this.$el);
            },
            slidePrevTransitionStart: function () {
                zoomImage(this.$el);
            }
        }
    })
    $(function () {
        // Paver
        $('div.panorama').paver();
    });


});