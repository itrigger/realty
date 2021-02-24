gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

ScrollTrigger.defaults({
    toggleActions: "restart pause resume pause"
});



/* Panels */
/*const panels = gsap.utils.toArray("#panels-container .panel");
gsap.to(panels, {
    xPercent: -100 * ( panels.length - 1 ),
    ease: "none",
    scrollTrigger: {
        trigger: "#panels-container",
        pin: true,
        start: "top top",
        scrub: 1,
        snap: {
            snapTo: 1 / ( panels.length - 1 ),
            duration: {min: 0.1, max: 0.1}
        },
        end: () => "+=" + (panelsContainer.offsetWidth - innerWidth)
    }
});*/

gsap.to(".box", {
    scrollTrigger: ".box", // start the animation when ".box" enters the viewport (once)
    x: 500,
    stagger: 0.1
});
gsap.to(".box2", {
    scrollTrigger: ".box2", // start the animation when ".box" enters the viewport (once)
    x: 500
});
gsap.to(".box3", {
    scrollTrigger: ".box3", // start the animation when ".box" enters the viewport (once)
    x: 500
});