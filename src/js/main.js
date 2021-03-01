jQuery(document).ready(function ($) {

    gsap.registerPlugin(ScrollTrigger);
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

    gsap.from('#main-menu', {duration: 1, x: '-100%', ease: 'expo'});
    gsap.fromTo('.j_parallaxEl',
        {duration: 2, opacity: 0.9, scale: 1.12, ease: 'expo'},
        {duration: 2, opacity: 1, scale: 1, ease: 'expo'}
    );

    $("#main-menu").hover(function () {
        $(this).removeClass("active");

    }, function () {
        $(this).addClass("active");
    });

    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: {className: 'active', targets: '.main-menu'}
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


    ScrollTrigger.create({
        trigger: ".sticky-today",
        start: "top bottom-=150",
        endTrigger: ".today-content",
        end: "bottom bottom-=75",
        pin: true,
        pinSpacing: false
    });


    sections.forEach(section => {
        const intoAnim = gsap.timeline({paused: true})
            .from(section.querySelector(".right-col"), {yPercent: 50, duration: 1})

        ScrollTrigger.create({
            trigger: section,
            onEnter: () => goToSection(section, intoAnim),
        });

        ScrollTrigger.create({
            trigger: section,
            start: "bottom bottom",
            onEnterBack: () => goToSection(section),
        });
    });

    ScrollTrigger.create({
        trigger: ".sticky-today",
        start: "top bottom-=150",
        endTrigger: ".today-content",
        end: "bottom bottom-=75",
        pin: true,
        pinSpacing: false
    });

// keep at top
    ScrollTrigger.create({
        trigger: ".sticky-today",
        start: "top top+=75",
        endTrigger: "html",
        end: "bottom bottom",
        pin: true,
        pinSpacing: false
    });


// Tomorrow header handling
// keep at bottom
    ScrollTrigger.create({
        trigger: ".sticky-tomorrow",
        start: "top bottom-=75",
        endTrigger: ".tomorrow-content",
        end: "bottom bottom-=75",
        pin: true,
        pinSpacing: false
    });

// keep at top
    ScrollTrigger.create({
        trigger: ".sticky-tomorrow",
        start: "top top+=150",
        endTrigger: "html",
        end: "bottom bottom",
        pin: true,
        pinSpacing: false
    });


    // ⚰️ STORE SOME VARIABLES
    var section1 = $("#section-1"),
        section2 = $("#section-2"),
        section3 = $("#section-3"),
        section4 = $("#section-4"),
        section5 = $("#section-5"),

        circlesIntro = $(".circles-intro"),
        circleIntro1 = $("#circle-intro-1"),
        circleIntro2 = $("#circle-intro-2"),
        circleIntro3 = $("#circle-intro-3"),
        circleLeft = $("#circle-left"),
        circleRight = $("#circle-right"),
        // circlePath = $("#circle-path"),
        circlePieChart = $("#circle-piechart"),

        circleRadar1 = $("#circle-radar-1"),
        circleRadar2 = $("#circle-radar-2"),
        circleRadar3 = $("#circle-radar-3"),
        circleRadar4 = $("#circle-radar-4"),

        circleLeftHeight = circleLeft.height(),
        circleLeftHeightHalf = circleLeftHeight / 2,
        circleGrow = $("#circle-grow"),

        wraperWidth = $(".wrapper-content").width(),
        wraperWidthHalf = wraperWidth * 0.75,
        wrapper2 = $("#wrapper-content-2"),
        wrapper3 = $("#wrapper-content-3"),
        wrapper4 = $("#wrapper-content-4"),
        wrapper5 = $("#wrapper-content-5"),

        wrapperTitle = $(".wrapper-content__title"),
        wrapperPrgph = $(".container-txt"),
        wrapperLines = $(".wrapper-content .container-txt__line"),
        wrapperLinesContent = $(".p-content"),

        hoverElement2 = $(".hover-2"),
        hoverElement3 = $(".hover-3");


    // 🎬 GSAP: Timelines 🎬
    // Reveal sections content (store and call on section load)
    /* var contentReveal = function(){
         // refresh the variables and create a timeline
         var activeTitle = $(".active .wrapper-content__title"),
             activeLines = $(".active .wrapper-content .container-txt__line"),
             tl_Text = new TimelineMax({paused:true});

         // define the timeline
         tl_Text
             .fromTo(activeTitle, 0.75,
                 { autoAlpha: 0, y: -50, rotationX: 25, transformPerspective: 1000, transformOrigin: "center" },
                 { autoAlpha: 1, y:0, rotationX: 0 },
                 0)

             .staggerFromTo(activeLines, 0.75,
                 { autoAlpha: 0, y: -25, rotationX: 25, transformPerspective: 1000, transformOrigin: "center" },
                 { autoAlpha: 1, y:0, rotationX: 0 },
                 0.25, "-=0.25");

         // play the function
         tl_Text.restart().timeScale(1);
         // console.log("reveal");
     };

     // Store this function and call it on section leave
     var contentHide = function(){
         // refresh the variables and create a timeline
         var activeTitle = $(".active .wrapper-content__title"),
             activeLines = $(".active .wrapper-content .container-txt__line"),
             tl_Text = new TimelineMax({paused:true});

         // repeat the same timeline as "onload" event
         tl_Text
             .fromTo(activeTitle, 1,
                 { autoAlpha: 0, y: -50, rotationX: 25, transformPerspective: 1000, transformOrigin: "center" },
                 { autoAlpha: 1, y:0, rotationX: 0, },
                 0)

             .staggerFromTo(activeLines, 0.75,
                 { autoAlpha: 0, y: -25, rotationX: 25, transformPerspective: 1000, transformOrigin: "center" },
                 { autoAlpha: 1, y:0, rotationX: 0 },
                 0.25, "+=0.5");

         // play this function backward and 3x faster
         tl_Text.reverse().timeScale(3);
         // console.log("hide");
     };


     // 🎞️1️⃣ Timeline #1: total duration of 1.5s
     var tl_section1 = new TimelineMax({ paused: false });
     tl_section1
         // Circle grows
         .to(circleIntro1, 0.9, { autoAlpha: 1, width: "50%", height: "50%", fill: "#F3A712" })
         .to(circleIntro2, 0.75, { autoAlpha: 1, width: "40%", height: "40%", fill: "blue" }, "-=0.3")
         .to(circleIntro3, 0.4, { autoAlpha: 1, width: "30%", height: "30%", fill: "yellow" }, "-=0.25");

     // 🎞️2️⃣  Timeline #2: total duration of 1.5s
     var tl_section2 = new TimelineMax({ paused: false });
     tl_section2
         // Let the two circles met
         .to(circleLeft, 1, { width: "50%", height: "50%", fill: "#F3A712" }, 0)
         .to(circleRight, 1, { width: "50%", height: "50%", fill: "#DB2B39" }, "-=1")
         .fromTo(circleLeft, 1, { xPercent: -100, left: 0, y: "-50%", force3D: true }, { xPercent: 150, left: 0, y: "-50%", force3D: true }, "-=1")
         .fromTo(circleRight, 1,{ xPercent: 100, left: "100%", y: "-50%", force3D: true },{ xPercent: 150, left: 0, y: "-50%", force3D: true }, "-=1.5" );

     // 🎞️3️⃣ Timeline #3: total duration of 1.5s 🎞️
     var tl_section3 = new TimelineMax({ paused: false });
     tl_section3
         // Expand the circle
         .fromTo(circleGrow, 1.5, { width: 0, height: 0, fill: "#DB2B39"}, {ease: Elastic.easeOut.config(2, 1), width: "50%", height: "50%"});

     // 🎞️4️⃣ Timeline #4: total duration of 1.5s 🎞️
     var tl_section4 = new TimelineMax({ paused: false });
     tl_section4
         // Fill the pie
         .to(circlePieChart, 1.5, { strokeDasharray: "99,0,0,0"})
     ;

     // tl_section4
     //     Draw the path
     //     .fromTo(circlePath, 1.5, { strokeDasharray: 1271.8306884765625, strokeDashoffset: 1271.8306884765625 }, { strokeDasharray: 1271.8306884765625, strokeDashoffset: 0 })
     // ;

     // 🎞️5️⃣ Timeline #5: total duration of 1.5s 🎞️
     var tl_section5 = new TimelineMax({ paused: false });
     tl_section5
         .fromTo(circleRadar1, 1.5,
             {autoAlpha: 0.8, stroke: "white"},
             { autoAlpha: 0.8, stroke: "white", strokeWidth: "1px", scale: 1, transformOrigin: "50% 50%" }
             ,"-=1")
         .to(circleRadar2, 1,
             { autoAlpha: 0.6, stroke: "white", strokeWidth: "1px", scale: 1.2, transformOrigin: "50% 50%" },"-=1.5")
         .to(circleRadar3, 1,
             { autoAlpha: 0.4, stroke: "white", strokeWidth: "1px", scale: 1.4, transformOrigin: "50% 50%" },"-=1.5")
         .to(circleRadar4, 1,
             { autoAlpha: 0.2, stroke: "white", strokeWidth: "1px", scale: 1.6, transformOrigin: "50% 50%" },"-=1.5")
     ;

     // Timeline fade in
     // var tl_section1fadeIn = new TimelineMax({ paused: true });
     // tl_section1fadeIn
     // .fromTo(section1, 0.3, { ease: Power4.easeInOut, autoAlpha: 0.9 }, { autoAlpha: 1 })
     // ;
     // Timeline fade out
     // var tl_section1fadeOut = new TimelineMax({ paused: true });
     // tl_section1fadeOut
     // .fromTo(section1, 0.3, { ease: Power4.easeInOut, autoAlpha: 1 }, { ease: Power4.easeInOut, autoAlpha: 0.9 })
     // ;



     // 🚀 HOVER 🚀
     // useful tip: use the 'overwrite:"all"' parameter within the out tween
     // 🚀2️⃣ SECTION #2
     function inOut2() {
         var tl2 = new TimelineMax({ paused: false });
         tl2.to(circleLeft, 0.5, { xPercent: 145, left: 0, y: "-50%", force3D: true }, 0)
             .to(circleRight, 0.5, { xPercent: 155, left: 0, y: "-50%", force3D: true }, 0);
         return tl2;
     }
     // call this function anytime and store a reference to the timeline that was created,
     // so that it can be control later
     var expand2 = inOut2();
     // target the hover elements which is not visible during the scroll
     hoverElement2.hover(over2, out2);
     function over2() {
         //expand2.restart();
     }
     function out2() {
         //expand2.reverse();
     }
 //     hoverElement2.hover(over2, out2);
 //     function over2(){
 //         TweenMax.to(circleLeft, 0.5, { xPercent: 145, left: 0, y: "-50%", force3D: true }, 0)
 //         TweenMax.to(circleRight, 0.5, { xPercent: 155, left: 0, y: "-50%", force3D: true }, 0);
 //     }

 //     function out2(){
 //         TweenMax.to(circleLeft, 0.5, { xPercent: 150, left: 0, y: "-50%", force3D: true, overwrite:"all" }, 0)
 //         TweenMax.to(circleRight, 0.5, { xPercent: 150, left: 0, y: "-50%", force3D: true, overwrite:"all" }, 0);
 //     }

     // 🚀3️⃣ SECTION #3
     // create a specific function
     function inOut3() {
         var tl3 = new TimelineMax({ paused: false });
         tl3.to(circleGrow, 0.3, { width: "55%", height:"55%" });
         return tl3;
     }
     // call this function anytime and store a reference to the timeline that was created,
     // so that it can be control later
     var expand3 = inOut3();
     // target the hover elements which is not visible during the scroll
     hoverElement3.hover(over3, out3);
     function over3() {
         expand3.restart();
     }
     function out3() {
         expand3.reverse();
     }


     // 🚀4️⃣ SECTION #4
     wrapper4.hover(over4, out4);
     function over4() {
         // TweenMax.to(circlePath, 1.5, { strokeDasharray: 1271.8306884765625, strokeDashoffset: 1271.8306884765625});
     }
     function out4() {
         // TweenMax.to(circlePath, 1.5, { strokeDasharray: 1271.8306884765625, strokeDashoffset: 0, overwrite:"all" });
     }

     // 🚀5️⃣ SECTION #5
     var tl_hover5 = new TimelineMax({ paused: false });
     tl_hover5
         .to(circleRadar1, 1.5, {autoAlpha: 0.8, stroke: "white"} ,"-=1")
         .to(circleRadar2, 1, { autoAlpha: 0.6, stroke: "white", strokeWidth: "1px", scale: 1, transformOrigin: "50% 50%" },"-=1.5")
         .to(circleRadar3, 1, { autoAlpha: 0.4, stroke: "white", strokeWidth: "1px", scale: 1, transformOrigin: "50% 50%" },"-=1.5")
         .to(circleRadar4, 1, { autoAlpha: 0.2, stroke: "white", strokeWidth: "1px", scale: 1, transformOrigin: "50% 50%" },"-=1.5");

     //play and reverse each tween for each element
     wrapper5.hover(
         function(){
             tl_hover5.restart();
         },
         function() {
             tl_hover5.reverse();
         });

 */
    // 🏁 FULLPAGE INIT + OPTIONS 🏁
    /* $("#fullpage").fullpage({
         // touchSensitivity:1,
         scrollingSpeed: 700, // increase the speed to avoid double slides scroll (default 700)
         navigation: true,
         navigationPosition: "right",
         navigationTooltips: ["Главная", "Расположение", "Уникальность", "Как купить", "Контакты"],
         menu: '#main-menu',
         anchors: ['homePage', 'locPage', 'uniqPage', 'howtoPage', 'contactPage'],
         // 🛬 SECTION IS LOADED 🛬
         afterLoad: function(anchorLink, index) {
             var loadedSection = $(this);
             if (index === 1) {
                 $(".main-menu").addClass("active");
             } else {
                 $(".main-menu").removeClass("active");
             }
             // Slide #1 is loaded
             if (index == 1) {
                 // tl_section1fadeIn.restart();
                 tl_section1.restart().timeScale(1);
                 contentReveal();

             }

             // Slide #2 is loaded
             else if (index == 2) {
                 tl_section2.restart().timeScale(1);
                 contentReveal();

             }

             // Slide #3 is loaded
             else if (index == 3) {
                 tl_section3.restart().timeScale(1);
                 contentReveal();
             }

             // Slide #4 is loaded
             else if (index == 4) {
                 tl_section4.restart().timeScale(1);
                 contentReveal();
             }

             // Slide #5 is loaded
             else if (index == 5) {
                 tl_section5.restart().timeScale(1);
                 contentReveal();
             }
         }, // end of "onLoad" events


         // 🛫 SECTION IS LEAVED 🛫
         onLeave: function(index, nextIndex, direction) {
             var leavingSection = $(this);

             // Slide #1 is leaved
             if (index == 1) {
                 tl_section1.reverse().timeScale(3);
                 contentHide();
             }

             // Slide #2 is leaved
             else if (index == 2) {
                 tl_section2.reverse().timeScale(3);
                 contentHide();
             }

             // Slide #3 is leaved
             else if (index == 3) {
                 // TweenMax.to(circleGrow, 0.5, {ease: Elastic.easeOut.config(2, 1), width: 0, height: 0 });
                 tl_section3.reverse().timeScale(3);
                 contentHide();
             }

             // Slide #4 is leaved
             else if (index == 4) {
                 tl_section4.reverse().timeScale(3);
                 contentHide();
             }

             // Slide #5 is leaved
             else if (index == 5) {
                 tl_section5.reverse().timeScale(3);
                 tl_hover5.reverse();
                 contentHide();
             }

             // Scroll Down
             if(direction =='down'){
                 // functionDown();
                 // console.log("en bas");
             }

             // Scroll Up
             else if(direction == 'up'){
                 // functionUp();
                 $(function() {
                     //   console.log("en haut");
                 });
             }

         } // end of "onLeave" events

     }); // end of fullpage.js options*/

    // get duration of the timeline including repeats and delays
    // console.log('tl_section1 duration is: ' + tl_section1.totalDuration());
    // console.log('tl_section2 duration is: ' + tl_section2.totalDuration());
    // console.log('tl_section3 duration is: ' + tl_section3.totalDuration());
    // console.log('tl_section4 duration is: ' + tl_section4.totalDuration());
    // console.log('tl_section5 duration is: ' + tl_section5.totalDuration());

    $(".main-menu").click(function () {
        $(".main-menu").hasClass("active") ? $(".main-menu").removeClass("active") : $(".main-menu").addClass("active");
    });

}); // end of jQuery