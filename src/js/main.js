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

    let menuItemTween = gsap.from(".menu-item", {
        autoAlpha: 0,
        x: -100,
        duration: .5,
        stagger: {
            each: 0.1,
            ease: Linear.easeNone,
        }
    });
    let loc = '.loc-mobile';

    installMediaQueryWatcher("(max-width: 980px)", function (matches) {

        if (matches) {

            /*       $(".card--bottom").on("click", function () {
                       let parent = $(this).parent();
                       if (!(parent.hasClass('card1'))) {
                           //parent.toggleClass('active');
                           parent.find('.cards-desc').slideToggle();
                           $('html, body').animate({scrollTop: $(parent).offset().top - 65}, 1000);
                           /!*card2Swiper.update();
                           card3Swiper.update();
                           card4Swiper.update();
                           card5Swiper.update();*!/
                       }
                   });*/
            loc = '.loc-mobile';


            /**/
            /*  $(".card--bottom").click(playAnimation);

              function playAnimation(event) {
                  event.preventDefault();

                  let $this = $(this).parent();
                  let $thisContent = $this.find(".cards-desc");
                  let parent = $(this).parent();

                  // close any open ones
                  // TweenMax.to(".expanded .cards-desc", 0.2, { height: "0", ease: Sine.easeInOut });
                  TweenMax.to(".expanded", 0.2, {ease: Sine.easeInOut});

                  $this.toggleClass("expanded");

                  if ($(parent).hasClass("expanded")) {
                      var self = this;
                      TweenMax.to($this, 0.2, {height: "0", ease: Sine.easeInOut});
                      /!*    setTimeout(function() {
                              TweenMax.to(window, 1, { scrollTo: $(parent).offset().top - 65 });
                          }, 310);
      *!/
                      TweenMax.set($thisContent[0], {height: "auto"});
                      TweenMax.from($thisContent[0], 0.2, {height: 0});
                  }

              }*/

            var site = document.querySelector(".content-area")
            var c = site.querySelectorAll(".card-ex");
            c.length && c.forEach(function (e) {
                var a = e.querySelector(".card--bottom"),
                    t = e.querySelector(".cards-wrapper"),
                    o = t.querySelector(".cards-desc .col-left").offsetHeight + t.querySelector(".cards-desc .col-right").offsetHeight;

                a.addEventListener("click", function () {
                    e.classList.contains("expanded") ? (e.classList.remove("expanded"), TweenLite.to(t, .5, {
                        height: 0,
                        ease: Sine.easeInOut
                    })) : (e.classList.add("expanded"), TweenLite.to(t, .5, {height: o, ease: Sine.easeInOut}))
                })
            })


            /**/


            $(window).on('load resize', function () {
                if (window.matchMedia("(orientation: portrait)").matches) {
                    if ($(".rotationOverlay").length) {
                        $(".rotationOverlay").remove();
                    }
                }

                if (window.matchMedia("(orientation: landscape)").matches) {
                    $("body").append('<div class="mobile rotationOverlay" style="position: fixed; z-index: 10000; left: 0; right: 0; top: 0; bottom: 0; background: #2d202c; display: flex; align-items: center; justify-content: center;color: white;">Этот сайт адаптирован под вертикальный режим. Переверните телефон.</div>')
                }

                Line(loc);

            });


        } else {
            loc = '.loc-desktop';
            $(window).on('load resize', function () {

                if ($(".rotationOverlay").length) {
                    $(".rotationOverlay").remove();
                }
                Line(loc);
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

            //tl3.fromTo(shapes3, {drawSVG: "0 0"}, {duration: 2, drawSVG: "100%"});


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


            let shapes0 = "#anim-desk path, #anim-desk rect",
                tl0_sh = gsap.timeline({
                    repeat: 0,
                    yoyo: true,
                    scrollTrigger: {
                        trigger: "#section5",
                        start: "-=100% top", // when the top of the trigger hits the top of the viewport
                        end: "+=50% bottom", // end after scrolling 500px beyond the start
                        scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
                    }
                });

            tl0_sh.fromTo(shapes0, {drawSVG: "0 0"}, {duration: 2, drawSVG: "100%"});


            let shapes = "#anim-cleaning path, #anim-cleaning rect",
                tl_sh = gsap.timeline({
                    repeat: 0,
                    yoyo: true,
                    scrollTrigger: {
                        trigger: "#section5",
                        start: "-=15% top", // when the top of the trigger hits the top of the viewport
                        end: "+=50% bottom", // end after scrolling 500px beyond the start
                        scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
                    }
                });

            tl_sh.fromTo(shapes, {drawSVG: "0 0"}, {duration: 2, drawSVG: "100%"});

            let shapes2 = "#anim-video path, #anim-video rect",
                tl2_sh = gsap.timeline({
                    repeat: 0,
                    yoyo: true,
                    scrollTrigger: {
                        trigger: "#section5",
                        start: "-=15% top", // when the top of the trigger hits the top of the viewport
                        end: "+=50% bottom", // end after scrolling 500px beyond the start
                        scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar

                    }
                });

            tl2_sh.fromTo(shapes2, {drawSVG: "0 0"}, {duration: 2, drawSVG: "100%"});




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

    /*gsap.fromTo('.j_parallaxEl',
        {duration: 2, opacity: 0.9, scale: 1.12, ease: 'expo'},
        {duration: 2, opacity: 1, scale: 1, ease: 'expo'}
    );*/


    gsap.fromTo('.j_parallaxEl', {duration: 2, opacity: 1, scale: 1.12, ease: 'expo'}, {
        scrollTrigger: {
            trigger: '#landing-page',
            start: "top top", // when the top of the trigger hits the top of the viewport
            end: "+=100%", // end after scrolling 500px beyond the start
            scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar

        },
        scale: 1,
        delay: 1
    })


    function zoomImage(sliderDOM) {
        const slideActive = sliderDOM.find('.swiper-slide-active, .swiper-slide-duplicate-active');
        const imageSlide = slideActive.find('.j_topImage');

        gsap.to(imageSlide, {duration: 2, scale: 1, ease: 'expo'});
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
        /* autoplay: {
             delay: 5000,
         },*/
        runCallbacksOnInit: true,
        on: {
            init: function () {
                zoomImage(this.$el);
                //moveDownText(this.$el);
            },
            slideNextTransitionStart: function () {
                zoomImage(this.$el);
                //moveDownText(this.$el);
            },
            slidePrevTransitionStart: function () {
                zoomImage(this.$el);
                // moveDownText(this.$el);
            }
        }
    })

    $(".a_scrollto").click(function (e) {
        e.preventDefault();

        let $anchor = $(this).attr('href');
        let offset = $($anchor).offset().top;
        TweenLite.to(window, 1, {scrollTo: {y: offset}});
        closeMobileMenu();
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


    /*let card2Swiper = new Swiper('.card2 .swiper-container', {
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
    })*/
// let card3Swiper = new Swiper('.card3 .swiper-container', {
//     slidesPerView: 1,
//     spaceBetween: 0,
//     slidesOffsetAfter: 0,
//     slideToClickedSlide: true,
//     watchOverflow: true,
//     loop: true,
//     lazy: {
//         loadPrevNext: true
//     },
//     preloadImages: true,
//     speed: 1000,
//     navigation: {
//         nextEl: '#rightArrow4',
//         prevEl: '#leftArrow4',
//     },
//     effect: 'fade',
//     fadeEffect: {
//         crossFade: true
//     },
// })
    /*let card4Swiper = new Swiper('.card4 .swiper-container', {
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
    })*/
    /* let card5Swiper = new Swiper('.card5 .swiper-container', {
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
     });*/

    let coworkSwiper = new Swiper('.card1 .swiper-container', {
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
            nextEl: '#rightArrowCow',
            prevEl: '#leftArrowCow',
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
        speed: 300,
        navigation: {
            nextEl: '#rightArrow9',
            prevEl: '#leftArrow9',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: false
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

    /* let sec10Swiper = new Swiper('#section10 .swiper-container', {
         slidesPerView: 1,
         spaceBetween: 0,
         slidesOffsetAfter: 0,
         slideToClickedSlide: true,
         watchOverflow: true,
         loop: false,
         lazy: {
             loadPrevNext: true
         },
         parallax: true,
         preloadImages: true,
         speed: 1000,
         runCallbacksOnInit: true,
         on: {
             slideNextTransitionStart: function () {
                 $('#section10 .slide-desc ul').find('li').eq(this.activeIndex).addClass('active');
             },
             slidePrevTransitionStart: function () {

             }
         }
     });*/

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
        // console.log($dataPoint);
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
            Line(loc);
            $(`${loc} .svg-line`).addClass('active');
        }
    });
    panomapTween1.play();

    let panomapTween2 = gsap.from(".panomap2", {
        scale: 1.12,
        duration: 0.75,
        ease: Linear.easeNone,
        onComplete: () => {
            $(`${loc} .svg-line`).removeClass('active');
        }
    });
    panomapTween2.pause();

    $('.switcher').click(function (e) {
        e.preventDefault();
        if ($(this).hasClass('left')) {
            if (loc === '.loc-mobile') {
                //$('.loc-mobile--wrap').css("paddingTop","100%")
            }
            $(this).removeClass('left');
            $('.panomap1, .switcher-w .left').removeClass('active');
            $('.panomap2, .switcher-w .right').addClass('active');
            panomapTween1.reverse();
            panomapTween2.restart();
            Line(loc);
        } else {
            if (loc === '.loc-mobile') {
                // $('.loc-mobile--wrap').css("paddingTop","100%")
            }
            $(this).addClass('left');
            $('.panomap1, .switcher-w .left').addClass('active');
            $('.panomap2, .switcher-w .right').removeClass('active');
            panomapTween2.reverse();
            panomapTween1.restart();
            Line(loc);
        }
    });

    gsap.fromTo('#section6 .j_parallaxEl', {duration: 2, opacity: 1, scale: 1.12, ease: 'expo'}, {
        scrollTrigger: {
            trigger: '#section6',
            start: "-=70%", // when the top of the trigger hits the top of the viewport
            end: "+=130%", // end after scrolling 500px beyond the start
            scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        },
        scale: 1,
        delay: 1
    });

    gsap.fromTo('#section7 .j_parallaxEl', {duration: 2, opacity: 1, scale: 1.12, ease: 'expo'}, {
        scrollTrigger: {
            trigger: '#section7',
            start: "-=70%", // when the top of the trigger hits the top of the viewport
            end: "+=130%", // end after scrolling 500px beyond the start
            scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        },
        scale: 1,
        delay: 1
    });

    gsap.fromTo('#section8 .j_parallaxEl', {duration: 2, opacity: 1, scale: 1.12, ease: 'expo'}, {
        scrollTrigger: {
            trigger: '#section8',
            start: "-=70%", // when the top of the trigger hits the top of the viewport
            end: "+=130%", // end after scrolling 500px beyond the start
            scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        },
        scale: 1,
        delay: 1
    });

    ScrollTrigger.create({
        trigger: '#section10',
        start: 'top +150',
        end: 'bottom bottom',
        onEnter: () => {
            $('#section10 .btn').addClass('active');
        },
        onLeaveBack: () => {
            $('#section10 .btn').removeClass('active');
        }
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

    if (s.length) {
        s.each(function () {
            let a = $(this).find(".dragger__el"), t = $(this).find(".dragger__el").width(),
                o = $(this).find(".dragger__trigger"),
                n = $(this).find(".dragger__arrow"),
                diff = 45;
            $(this).hasClass('towers_d') ? diff = 1 : diff = 50;
            Draggable.create(n, {
                type: "x",
                bounds: o,
                zIndexBoost: !1,
                onPress: function () {
                    n.addClass("dragger__arrow_dragged")
                },
                onDrag: function () {
                    // console.log(t);
                    // console.log(this.maxX);
                    TweenLite.to(a, .3, {xPercent: -100 * (t - $(window).width() - diff) / t * (this.x / this.maxX)})
                },
                onRelease: function () {
                    n.removeClass("dragger__arrow_dragged"), this.maxX - 10 <= this.endX && !n.hasClass("dragger__arrow_reversed") ? n.addClass("dragger__arrow_reversed") : this.endX <= 10 && n.hasClass("dragger__arrow_reversed") && n.removeClass("dragger__arrow_reversed")
                }
            })
        });


    }//if

    $('.tabs .tab_trigger').click(function () {
        let index = $(this).index();
        $(this).parent().parent().find(".tab_trigger").removeClass("active");
        $(this).addClass("active");
        $(this).parent().parent().find(".tab-content").removeClass("active");
        $(this).parent().parent().find(".tab-content").eq(index).addClass("active");
    });

})
;


function Line(target) {

    let wrap = $(`${target} .panomap`);

    // console.log(target);

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

    /*    let item5 = wrap.find('.map-point5'),
            num5 = wrap.find('.map-logo'),
            num5X = num5.position().left + num5.width() / 2,
            num5Y = num5.position().top + num5.height() / 2,
            item5X = item5.position().left + item5.width() / 2,
            item5Y = item5.position().top + item5.height() / 2;*/

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


    let svg = $(`${target} .svg-line`);

    let line1 = svg.find('.line-1'),
        line2 = svg.find('.line-2'),
        line3 = svg.find('.line-3'),
        line4 = svg.find('.line-4'),
        //line5 = svg.find('.line-5'),
        line6 = svg.find('.line-6'),
        line7 = svg.find('.line-7');

    line1.attr({'x1': num1X, 'y1': num1Y, 'x2': item1X, 'y2': item1Y});
    line2.attr({'x1': num2X, 'y1': num2Y, 'x2': item2X, 'y2': item2Y});
    line3.attr({'x1': num3X, 'y1': num3Y, 'x2': item3X, 'y2': item3Y});
    line4.attr({'x1': num4X, 'y1': num4Y, 'x2': item4X, 'y2': item4Y});
    //line5.attr({'x1': num5X, 'y1': num5Y, 'x2': item5X, 'y2': item5Y});
    line6.attr({'x1': num6X, 'y1': num6Y, 'x2': item6X, 'y2': item6Y});
    line7.attr({'x1': num7X, 'y1': num7Y, 'x2': item7X, 'y2': item7Y});
}


let apartSwiper;
let aparts_array = [
    {
        slug: 'studio',
        html: '<div class="swiper-slide h_100  d_f ai_c jc_c" data-plan-pic="1"><a href="/wp-content/themes/twentytwentyone/img/plans/studio.svg" data-fancybox data-width="420" data-height="1140"><img src="/wp-content/themes/twentytwentyone/img/plans/studio.svg" alt="studio" data-swiper-parallax-y="0" data-swiper-parallax-scale="1.2"/></a></div>',
        thumb: '<li class="active"><img src="../wp-content/themes/twentytwentyone/img/plans/studio1-mini.jpg" alt=""></li>'
    },
    {
        slug: 'bed1',
        html: '<div class="swiper-slide h_100  d_f ai_c jc_c" data-plan-pic="1"><a href="/wp-content/themes/twentytwentyone/img/plans/1bed.svg" data-fancybox data-width="738" data-height="1148"><img src="/wp-content/themes/twentytwentyone/img/plans/1bed.svg" alt="1 bed" data-swiper-parallax-y="0" data-swiper-parallax-scale="1.2"/></a></div>',
        thumb: '<li class="active"><img src="../wp-content/themes/twentytwentyone/img/plans/1bed-1-mini.jpg" alt=""></li>'
    },
    {
        slug: 'bed2',
        html: '<div class="swiper-slide h_100  d_f ai_c jc_c" data-plan-pic="1"><a href="/wp-content/themes/twentytwentyone/img/plans/2bed.svg" data-fancybox data-width="1138" data-height="1344"><img src="/wp-content/themes/twentytwentyone/img/plans/2bed.svg" alt="2 beds" data-swiper-parallax-y="0" data-swiper-parallax-scale="1.2"/></a></div>',
        thumb: '<li class="active"><img src="../wp-content/themes/twentytwentyone/img/plans/2bed-1-mini.jpg" alt=""></li>'
    },
    {
        slug: 'bed3',
        html: '<div class="swiper-slide h_100  d_f ai_c jc_c" data-plan-pic="1"><a href="/wp-content/themes/twentytwentyone/img/plans/3bed.svg" data-fancybox data-width="475" data-height="1231"><img src="/wp-content/themes/twentytwentyone/img/plans/3bed.svg" alt="3 beds" data-swiper-parallax-y="0" data-swiper-parallax-scale="1.2"/></a></div>',
        thumb: '<li class="active"><img src="../wp-content/themes/twentytwentyone/img/plans/2bed-2-mini.jpg" alt=""></li>'
    },
];


$(document).ready(function () {
    const apart_array_studio = [];
    if (aparts_array.length > 0) {
        for (const [i, arr] of aparts_array.entries()) {
            if (arr['slug'] === 'studio') {
                apart_array_studio.push(arr['html'])
            }
        }
    }
    apartSwiper = new Swiper('#section10 .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        slidesOffsetAfter: 0,
        slideToClickedSlide: true,
        watchOverflow: true,
        loop: false,
        lazy: {
            loadPrevNext: true
        },
        parallax: true,
        preloadImages: true,
        speed: 1000,
        runCallbacksOnInit: true,
        on: {
            slideNextTransitionStart: function () {
                $('#section10 .my-swiper-thumbs ul').find('li').removeClass('active');
                $('#section10 .my-swiper-thumbs ul').find('li').eq(this.activeIndex).addClass('active');
            },
            slidePrevTransitionStart: function () {
                $('#section10 .my-swiper-thumbs ul').find('li').removeClass('active');
                $('#section10 .my-swiper-thumbs ul').find('li').eq(this.activeIndex).addClass('active');
            }
        }
    });


    apartSwiper.appendSlide(apart_array_studio);
    apartSwiper.lazy.load();

    $('.my-swiper-thumbs').on('click', 'li', function () {
        let index = $(this).index()
        apartSwiper.slideTo(index, 1000);
    });

    $(".apart-switcher-wrap li").on("click", function () {

        let slug = $(this).data('slug').toString();
        let array = aparts_array;
        let $thumb = $('.my-swiper-thumbs ul');
        let temp_array = [];
        let temp_thumbs = [];

        if (array) {
            if (slug) {
                for (const [i, arr] of array.entries()) {
                    if (arr['slug'] === slug) {
                        temp_array.push(arr['html']);
                        temp_thumbs.push(arr['thumb']);
                    }
                }
            }
        }

        $(this).parents(".apart-switcher-wrap").find("li").removeClass("active");
        $(this).addClass("active");
        $(".plan-desc").removeClass("active");
        $(".plan-desc[data-plan=" + slug + "]").addClass("active");

        $thumb.html('');
        $thumb.append(temp_thumbs);

        apartSwiper.removeAllSlides();
        apartSwiper.appendSlide(temp_array);
        apartSwiper.update();
        apartSwiper.slideTo(0, 0);
        apartSwiper.lazy.load();
    });


    let remontSwiper = new Swiper('#section6 .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        slidesOffsetAfter: 0,
        slideToClickedSlide: true,
        watchOverflow: true,
        loop: false,
        lazy: {
            loadPrevNext: true
        },
        parallax: true,
        preloadImages: true,
        speed: 1000,
        runCallbacksOnInit: true,
        on: {
            slideNextTransitionStart: function () {
                $('#section6 .remont-thumbs ul, #section6 .remont-bottoms ul').find('li').removeClass('active');
                $('#section6 .remont-thumbs ul').find('li').eq(this.activeIndex).addClass('active');
                $('#section6 .remont-bottoms ul').find('li').eq(this.activeIndex).addClass('active');

            },
            slidePrevTransitionStart: function () {
                $('#section6 .remont-thumbs ul, #section6 .remont-bottoms ul').find('li').removeClass('active');
                $('#section6 .remont-thumbs ul').find('li').eq(this.activeIndex).addClass('active');
                $('#section6 .remont-bottoms ul').find('li').eq(this.activeIndex).addClass('active');
            }
        }
    });

    $('.remont-thumbs li').on('click', function () {
        let index = $(this).index()
        remontSwiper.slideTo(index, 1000);
    });

    $('[data-fancybox="images"], [data-fancybox="images2"], [data-fancybox="images3"]').fancybox({
        buttons: ["close"],
        loop: true,
        baseTpl:
            '<div class="fancybox-container" role="dialog" tabindex="-1">' +
            '<div class="fancybox-bg"></div>' +
            '<div class="fancybox-inner">' +
            '<div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div>' +
            '<div class="fancybox-toolbar">{{buttons}}</div>' +
            '<div class="fancybox-navigation imgs">{{arrows}}</div>' +
            '<div class="fancybox-stage"></div>' +
            '<div class="fancybox-caption"><div class=""fancybox-caption__body"></div></div>' +
            '</div>' +
            '</div>',
        btnTpl: {
            close:
                '<button data-fancybox-close class="fancybox-button imgs fancybox-button--close" title="{{CLOSE}}">' +
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg>' +
                "</button>",
            arrowLeft:
                '<svg data-fancybox-prev class="arrow leftarrow" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(180deg) skew(360deg, 0deg);" tabIndex="0" role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-21291e7fc212c387">\n' +
                '                            <path d="M43.999 0H0V43.999H43.999V0Z" fill="#362633"></path>\n' +
                '                            <path d="M20.563 15.444L26.522 21.403L20.563 27.362" stroke="#D2CDCC" stroke-width="2" stroke-miterlimit="10"></path>\n' +
                '                        </svg>',
            arrowRight:
                '<svg data-fancybox-next class="arrow rightarrow" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: translate(0px, 0px);" tabIndex="0" role="button" aria-label="Next slide" aria-controls="swiper-wrapper-4a39e10e7104eaa853">\n' +
                '                            <path d="M43.999 0H0V43.999H43.999V0Z" fill="#362633"></path>\n' +
                '                            <path d="M20.563 15.444L26.522 21.403L20.563 27.362" stroke="#D2CDCC" stroke-width="2" stroke-miterlimit="10"></path>\n' +
                '                        </svg>',
        },
    });


})


/*
* ToDo:

*  -1. Кнопка ватсап на покупаемрадиодетали HEADER

*
*/


// We listen to the resize event
window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});