jQuery(document).ready(function ($) {


    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(DrawSVGPlugin);
    gsap.registerPlugin(Draggable);

    function installMediaQueryWatcher(mediaQuery, layoutChangedCallback) {
        var mql = window.matchMedia(mediaQuery);
        mql.addListener(function (e) {
            return layoutChangedCallback(e.matches);
        });
        layoutChangedCallback(mql.matches);
    }


    /*
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
    */


    /*my*/

    installMediaQueryWatcher("(max-width: 980px)", function (matches) {

        if (matches) {

            console.log('mobile sizes');

            $(".card--bottom").on("click", function () {
                let parent = $(this).parent();
                if (!(parent.hasClass('card1'))) {
                    parent.toggleClass('active');
                    $('html, body').animate({scrollTop: $(parent).offset().top - 65}, 1000);
                    card2Swiper.update();
                    card3Swiper.update();
                    card4Swiper.update();
                    card5Swiper.update();
                }
            });

            $(window).on('load resize', function () {
                if (window.matchMedia("(orientation: portrait)").matches) {
                    if ($(".rotationOverlay").length) {
                        $(".rotationOverlay").remove();
                    }
                }

                if (window.matchMedia("(orientation: landscape)").matches) {
                    $("body").append('<div class="mobile rotationOverlay" style="position: fixed; z-index: 10000; left: 0; right: 0; top: 0; bottom: 0; background: #2d202c; display: flex; align-items: center; justify-content: center;color: white;">Переверни телефон, пёс!</div>')
                }
            });

        } else {

            $(window).on('load resize', function () {

                    if ($(".rotationOverlay").length) {
                        $(".rotationOverlay").remove();
                    }

            });

            if ($(".rotationOverlay").length) {
                $(".rotationOverlay").remove();
            }

            gsap.from('.main-menu', {
                duration: 1, x: '-100%', ease: 'expo',
                onStart: () => {
                    if (!($('body').hasClass('leftMenuThin'))) {
                        $('.main-menu').addClass('active');
                    }
                }
            });

            let cardsAnim = gsap.to(".cards:not(:last-child)", {
                yPercent: -100,
                ease: "power1.inOut",
                stagger: 0.5,
                scrollTrigger: {
                    trigger: "#uniqPage",
                    start: "top top",
                    end: "+=300%",
                    scrub: true,
                    pin: true
                }
            });

            ScrollTrigger.create({
                start: 'top -80',
                end: 99999,
                toggleClass: {className: 'visible', targets: '.top-menu'},
            });

            let shapes3 = "#anim-desk path, #anim-desk rect, #anim-cleaning path, #anim-cleaning rect, #anim-video path, #anim-video rect",
                tl3 = gsap.timeline({
                    repeat: 1,
                    yoyo: true,
                    scrollTrigger: {
                        trigger: "#section5",
                        start: "-=50% top", // when the top of the trigger hits the top of the viewport
                        end: "+=100%", // end after scrolling 500px beyond the start
                        scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar

                    }
                });

            tl3.fromTo(shapes3, {drawSVG: "0 0"}, {duration: 2, drawSVG: "100%"});


            $("#main-menu").hover(function () {
                if ($('body').hasClass('leftMenuThin')) {
                    menuItemTween.restart();
                    //  menuLogoTween.restart();
                    //menuBgTween.restart();
                    //  menuLogo2Tween.reverse();
                }
                $(this).addClass("active");

            }, function () {
                if ($('body').hasClass('leftMenuThin')) {
                    $(this).removeClass("active");
                    menuItemTween.reverse().duration(0.3);
                    //  menuLogoTween.reverse();
                    // menuBgTween.reverse();
                    //  menuLogo2Tween.restart();
                }
            });

            ScrollTrigger.create({
                start: 'top -80',
                end: 99999,
                onEnter: () => {
                    $('body').addClass('leftMenuThin');
                    $('.main-menu').removeClass('active');
                    menuItemTween.reverse();
                    // menuLogoTween.reverse();
                    // menuBgTween.reverse();
                    // menuLogo2Tween.play();
                },
                onLeaveBack: () => {
                    $('body').removeClass('leftMenuThin');
                    $('.main-menu').addClass('active');
                    menuItemTween.play();
                    // menuLogoTween.play();
                    // menuBgTween.play();
                    // menuLogo2Tween.reverse();
                }
            });

        } //desktop only
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
        duration: .5,
        stagger: { // wrap advanced options in an object
            each: 0.1,
            ease: Linear.easeNone,
        }
    });


    gsap.fromTo('.j_parallaxEl', {duration: 2, opacity: 1, scale: 1, ease: 'expo'}, {
        scrollTrigger: {
            trigger: '#landing-page',
            start: "top top", // when the top of the trigger hits the top of the viewport
            end: "+=100%", // end after scrolling 500px beyond the start
            scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar

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

        gsap.set(slideSquare, {autoAlpha: 0});
        gsap.to(slideSquare, {
            duration: 3,
            delay: 0.5,
            ease: Power4.easeOut,
            startAt: {autoAlpha: 0, y: "50%", rotationX: -90,},
            autoAlpha: 1,
            y: "4%",
            rotationX: 0,
            display: "flex"
        });

        gsap.set(slideCaption, {autoAlpha: 0});
        gsap.to(slideCaption, {
            duration: 3,
            ease: Power4.easeOut,
            startAt: {autoAlpha: 0, y: "-100%"},
            autoAlpha: 1,
            y: "4%",
            display: "block"
        });

        gsap.set(slideDesc, {autoAlpha: 0});
        gsap.to(slideDesc, {
            duration: 3,
            delay: 0.5,
            ease: Power4.easeOut,
            startAt: {autoAlpha: 0, y: "-50%", rotationX: -90,},
            autoAlpha: 1,
            y: "4%",
            rotationX: 0,
            display: "flex"
        });

        let tl = gsap.timeline(),
            mySplitText = new SplitText(slideCaption, {type: "words,chars"}),
            chars = mySplitText.chars;

        tl.from(chars, {
            duration: 2,
            opacity: 0,
            y: 80,
            rotationX: 180,
            transformOrigin: "0% 50% -50",
            ease: "expo",
        }, "+=0");

    }


    let bannerSwiper = new Swiper('#panelWrap .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        slidesOffsetAfter: 0,
        slideToClickedSlide: true,
        watchOverflow: true,
        loop: true,
        lazy: {
            loadPrevNext: true
        },
        preloadImages: true,
        speed: 1000,
        navigation: {
            nextEl: '#rightArrow',
            prevEl: '#leftArrow',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 5000,
        },
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

    $(".a_scrollto").click(function (e) {
        e.preventDefault();
        let $anchor = $(this).attr('href');
        let offset = $($anchor).offset().top;
        TweenLite.to(window, 1, {scrollTo: {y: offset}});
    })

    let locationSwiper = new Swiper('#section2 .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        slidesOffsetAfter: 0,
        slideToClickedSlide: true,
        watchOverflow: true,
        loop: true,
        lazy: {
            loadPrevNext: true
        },
        preloadImages: true,
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


    let card2Swiper = new Swiper('.card2 .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        slidesOffsetAfter: 0,
        slideToClickedSlide: true,
        watchOverflow: true,
        loop: true,
        lazy: {
            loadPrevNext: true
        },
        preloadImages: true,
        speed: 1000,
        navigation: {
            nextEl: '#rightArrow3',
            prevEl: '#leftArrow3',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    })
    let card3Swiper = new Swiper('.card3 .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        slidesOffsetAfter: 0,
        slideToClickedSlide: true,
        watchOverflow: true,
        loop: true,
        lazy: {
            loadPrevNext: true
        },
        preloadImages: true,
        speed: 1000,
        navigation: {
            nextEl: '#rightArrow4',
            prevEl: '#leftArrow4',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    })
    let card4Swiper = new Swiper('.card4 .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        slidesOffsetAfter: 0,
        slideToClickedSlide: true,
        watchOverflow: true,
        loop: true,
        lazy: {
            loadPrevNext: true
        },
        preloadImages: true,
        speed: 1000,
        navigation: {
            nextEl: '#rightArrow5',
            prevEl: '#leftArrow5',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    })
    let card5Swiper = new Swiper('.card5 .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        slidesOffsetAfter: 0,
        slideToClickedSlide: true,
        watchOverflow: true,
        loop: true,
        lazy: {
            loadPrevNext: true
        },
        preloadImages: true,
        speed: 1000,
        navigation: {
            nextEl: '#rightArrow6',
            prevEl: '#leftArrow6',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    });
    let sec9Swiper = new Swiper('#section9 .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        slidesOffsetAfter: 0,
        slideToClickedSlide: true,
        watchOverflow: true,
        loop: false,
        lazy: {
            loadPrevNext: true
        },
        preloadImages: true,
        speed: 1000,
        navigation: {
            nextEl: '#rightArrow9',
            prevEl: '#leftArrow9',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        runCallbacksOnInit: true,
        on: {
            slideNextTransitionStart: function () {
                $('#section9 .slide-desc ul li').removeClass('active');
                $('#section9 .slide-desc ul').find('li').eq(this.activeIndex).addClass('active');
            },
            slidePrevTransitionStart: function () {
                $('#section9 .slide-desc ul li').removeClass('active');
                $('#section9 .slide-desc ul').find('li').eq(this.activeIndex).addClass('active');
            }
        }
    });

    $('.map--legend li').hover(function () {
        let $dataPoint = $(this).attr('data-point');
        let $linePoint = $(this).attr('data-point') + '-line';
        $('.panomap').find($dataPoint).addClass('active');
        $('.panomap').find($linePoint).addClass('active');
    }, function () {
        let $dataPoint = $(this).attr('data-point');
        let $linePoint = $(this).attr('data-point') + '-line';
        $('.panomap').find($dataPoint).removeClass('active');
        $('.panomap').find($linePoint).removeClass('active');
    });

    $('.map-point').hover(function () {
        let $dataPoint = $(this).attr('data-point');
        console.log($dataPoint);
        let $linePoint = $(this).attr('data-point') + '-line';
        $('.map--legend').find('li[data-point="' + $dataPoint + '"]').addClass('active');
        $('.panomap').find($linePoint).addClass('active');
    }, function () {
        let $dataPoint = $(this).attr('data-point');
        let $linePoint = $(this).attr('data-point') + '-line';
        $('.panomap').find($linePoint).removeClass('active');
        $('.map--legend').find('li[data-point="' + $dataPoint + '"]').removeClass('active');
    });


    const filterScroll = function () {
        $('.j-filter-scrollbar-wrapper .scrollbar-inner').scrollbar({
            //autoScrollSize:!1,
            autoUpdate: true,
            disableBodyScroll: false
        });
    };
    /*запускаем кастом скролл при загрузке документа*/
    filterScroll();

    let panomapTween1 = gsap.from(".panomap1", {
        scale: 1.12,
        duration: 0.75,
        ease: Linear.easeNone,
        onComplete: () => {
           // Line();
            $("#svg-line").addClass('active');
        }
    });
    panomapTween1.play();

    let panomapTween2 = gsap.from(".panomap2", {
        scale: 1.12,
        duration: 0.75,
        ease: Linear.easeNone,
        onComplete: () => {
            $("#svg-line").removeClass('active');
        }
    });
    panomapTween2.pause();

    $('.switcher').click(function (e) {
        e.preventDefault();
        if ($(this).hasClass('left')) {
            console.log('has left');
            $(this).removeClass('left');
            $('.panomap1, .switcher-w .left').removeClass('active');
            $('.panomap2, .switcher-w .right').addClass('active');
            panomapTween1.reverse();
            panomapTween2.restart();
            Line();
        } else {
            console.log('has not left');
            $(this).addClass('left');
            $('.panomap1, .switcher-w .left').addClass('active');
            $('.panomap2, .switcher-w .right').removeClass('active');
            panomapTween2.reverse();
            panomapTween1.restart();
            Line();
        }
    });


    /*    let shapes = "#anim-cleaning path, #anim-cleaning rect",
            tl = gsap.timeline({
                repeat:1,
                yoyo:true,
                scrollTrigger:  {
                    trigger: "#section5",
                    start: "-=50% top", // when the top of the trigger hits the top of the viewport
                    end: "bottom bottom", // end after scrolling 500px beyond the start
                    scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar

                }
            });

        tl.to(shapes, {drawSVG:"0 0"}, {duration: 1, drawSVG:"100%"});

        let shapes2 = "#anim-video path, #anim-video rect",
            tl2 = gsap.timeline({
                repeat:1,
                yoyo:true,
                scrollTrigger:  {
                    trigger: "#section5",
                    start: "-=50% top", // when the top of the trigger hits the top of the viewport
                    end: "bottom bottom", // end after scrolling 500px beyond the start
                    scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar

                }
            });

        tl2.to(shapes2, {drawSVG:"0 0"}, {duration: 1, drawSVG:"100%"});*/


    /*
        let shapes4 = "#anim-kind path",
            tl4 = gsap.timeline({
                repeat:1,
                yoyo:true,
                scrollTrigger:  {
                    trigger: "#card2",
                    start: "-=50% top", // when the top of the trigger hits the top of the viewport
                    end: "bottom bottom", // end after scrolling 500px beyond the start
                    scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar

                }
            });

        tl4.to(shapes4, {drawSVG:"0 0"}, {duration: 1, drawSVG:"100%"});
    */


    gsap.fromTo('#section6 .j_parallaxEl', {duration: 2, opacity: 1, scale: 1, ease: 'expo'}, {
        scrollTrigger: {
            trigger: '#section6',
            start: "-=70%", // when the top of the trigger hits the top of the viewport
            end: "+=130%", // end after scrolling 500px beyond the start
            scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        },
        scale: 1.12,
        delay: 1
    });

    gsap.fromTo('#section7 .j_parallaxEl', {duration: 2, opacity: 1, scale: 1, ease: 'expo'}, {
        scrollTrigger: {
            trigger: '#section7',
            start: "-=70%", // when the top of the trigger hits the top of the viewport
            end: "+=130%", // end after scrolling 500px beyond the start
            scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        },
        scale: 1.12,
        delay: 1
    });

    gsap.fromTo('#section8 .j_parallaxEl', {duration: 2, opacity: 1, scale: 1, ease: 'expo'}, {
        scrollTrigger: {
            trigger: '#section8',
            start: "-=70%", // when the top of the trigger hits the top of the viewport
            end: "+=130%", // end after scrolling 500px beyond the start
            scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        },
        scale: 1.12,
        delay: 1
    });


    $(".apart-switcher-wrap li").click(function () {
        let dataPlan = $(this).data("plan");
        $(".plan-img").removeClass("active");
        $(".plan-desc").removeClass("active");
        $(".apart-switcher-wrap li").removeClass("active");
        $(".plan-img[data-plan=" + dataPlan + "]").addClass("active");
        $(".plan-desc[data-plan=" + dataPlan + "]").addClass("active");
        $(this).addClass("active");
    });

    $(".menu-trigger").on('click touch', function () {
        gsap.to('#mobile-header', {
            duration: 0.5,
            y: "-=100%",
            ease: Power0.easeInOut
        });
        menuItemTween.restart();
        $('#main-menu').addClass("active");
    });

    let closeMobileMenu = () => {
        gsap.to('#mobile-header', {
            duration: 0.5,
            y: "+=100%",
            ease: Power0.easeInOut
        });
        menuItemTween.reverse();
        $('#main-menu').removeClass("active");
    }

    $(".cls-btn, .layout").on('click touch', function () {
        closeMobileMenu();
    });


    let s = $(".dragger");
    if(s.length)  {
        let a = $(".dragger").find(".dragger__el"), t = $(".dragger__el").width(), o = $(".dragger").find(".dragger__trigger"),
            n = $(".dragger").find(".dragger__arrow");
        Draggable.create(n, {
            type: "x", bounds: s, zIndexBoost: !1,
            onPress: function () {
                n.addClass("dragger__arrow_dragged")
            }, onDrag: function () {
                console.log($(window).width());
                console.log(t);
                TweenLite.to(a, .3, {xPercent: -100 * (t- $(window).width()) / t * (this.x / this.maxX)})
            }, onRelease: function () {
                n.removeClass("dragger__arrow_dragged"), this.maxX - 10 <= this.endX && !n.hasClass("dragger__arrow_reversed") ? n.addClass("dragger__arrow_reversed") : this.endX <= 10 && n.hasClass("dragger__arrow_reversed") && n.removeClass("dragger__arrow_reversed")
            }
        })
    }


});

/*
function Line() {

    let wrap = $('.panomap');

    let item1 = wrap.find('.map-point1'),
        num1 = wrap.find('.map-logo'),
        num1X = num1.position().left + num1.width() / 2,
        num1Y = num1.position().top + num1.height() / 2,
        item1X = item1.position().left + item1.width() / 2,
        item1Y = item1.position().top + item1.height() / 2;

    let item2 = wrap.find('.map-point2'),
        num2 = wrap.find('.map-logo'),
        num2X = num2.position().left + num2.width() / 2,
        num2Y = num2.position().top + num2.height() / 2,
        item2X = item2.position().left + item2.width() / 2,
        item2Y = item2.position().top + item2.height() / 2;

    let item3 = wrap.find('.map-point3'),
        num3 = wrap.find('.map-logo'),
        num3X = num3.position().left + num3.width() / 2,
        num3Y = num3.position().top + num3.height() / 2,
        item3X = item3.position().left + item3.width() / 2,
        item3Y = item3.position().top + item3.height() / 2;

    let item4 = wrap.find('.map-point4'),
        num4 = wrap.find('.map-logo'),
        num4X = num4.position().left + num4.width() / 2,
        num4Y = num4.position().top + num4.height() / 2,
        item4X = item4.position().left + item4.width() / 2,
        item4Y = item4.position().top + item4.height() / 2;

    let item5 = wrap.find('.map-point5'),
        num5 = wrap.find('.map-logo'),
        num5X = num5.position().left + num5.width() / 2,
        num5Y = num5.position().top + num5.height() / 2,
        item5X = item5.position().left + item5.width() / 2,
        item5Y = item5.position().top + item5.height() / 2;

    let item6 = wrap.find('.map-point6'),
        num6 = wrap.find('.map-logo'),
        num6X = num6.position().left + num6.width() / 2,
        num6Y = num6.position().top + num6.height() / 2,
        item6X = item6.position().left + item6.width() / 2,
        item6Y = item6.position().top + item6.height() / 2;

    let item7 = wrap.find('.map-point7'),
        num7 = wrap.find('.map-logo'),
        num7X = num7.position().left + num7.width() / 2,
        num7Y = num7.position().top + num7.height() / 2,
        item7X = item7.position().left + item7.width() / 2,
        item7Y = item7.position().top + item7.height() / 2;


    let svg = $('#svg-line');

    let line1 = svg.find('.line-1'),
        line2 = svg.find('.line-2'),
        line3 = svg.find('.line-3'),
        line4 = svg.find('.line-4'),
        line5 = svg.find('.line-5'),
        line6 = svg.find('.line-6'),
        line7 = svg.find('.line-7');

    line1.attr({'x1': num1X, 'y1': num1Y, 'x2': item1X, 'y2': item1Y});
    line2.attr({'x1': num2X, 'y1': num2Y, 'x2': item2X, 'y2': item2Y});
    line3.attr({'x1': num3X, 'y1': num3Y, 'x2': item3X, 'y2': item3Y});
    line4.attr({'x1': num4X, 'y1': num4Y, 'x2': item4X, 'y2': item4Y});
    line5.attr({'x1': num5X, 'y1': num5Y, 'x2': item5X, 'y2': item5Y});
    line6.attr({'x1': num6X, 'y1': num6Y, 'x2': item6X, 'y2': item6Y});
    line7.attr({'x1': num7X, 'y1': num7Y, 'x2': item7X, 'y2': item7Y});
}*/

$(window).on('load resize', function () {
   // Line();
});
