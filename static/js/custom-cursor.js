// document.addEventListener('DOMContentLoaded', (e)=> {
//     // let cursor_back = document.querySelector('.custom-cursor')
//     //
//     //
//     // window.addEventListener('mousemove', (e) => {
//     //     cursor_back.style.left = e.pageX - 20 + 'px';
//     //     cursor_back.style.top = e.pageY - window.pageYOffset - 10 + 'px';
//     // });
//
//     let cursorInit = !1;
//     const cursor = document.getElementById("ink-cursor"),
//         amount = 20,
//         sineDots = Math.floor(.3 * amount),
//         width = 26,
//         idleTimeout = 150;
//     let timeoutID, hoverButton, hoverTL, lastFrame = 0,
//         mousePosition = {
//             x: 0,
//             y: 0
//         },
//         dots = [],
//         idle = !1;
//
//     class HoverButton {
//         constructor (e) {
//             this.hovered = !1, this.animatingHover = !1, this.forceOut = !1, this.timing = .65, this.el = document
//                 .getElementById(e)
//         }
//
//         onMouseEnter () {
//             this.hoverInAnim()
//         }
//
//         hoverInAnim () {
//             this.hovered || (this.hovered = !0, this.animatingHover = !0, this.forceOut = !1, TweenMax.fromTo(this
//                 .bg, this.timing, {
//                 x: "-112%"
//             }, {
//                 x: "-12%",
//                 ease: Power3.easeOut,
//                 onComplete: () => {
//                     this.animatingHover = !1, this.forceOut && (this.foceOut = !1, this
//                         .hoverOutAnim())
//                 }
//             }))
//         }
//
//         onMouseLeave () {
//             this.animatingHover ? this.forceOut = !0 : this.hoverOutAnim()
//         }
//
//         hoverOutAnim () {
//             this.hovered = !1, TweenMax.to(this.bg, this.timing, {
//                 x: "100%",
//                 ease: Power3.easeOut,
//                 onComplete: () => {
//                 }
//             })
//         }
//     }
//
//     class Dot {
//         constructor (e = 0) {
//             this.index = e, this.anglespeed = .05, this.x = 0, this.y = 0, this.scale = 1 - .05 * e, this.range =
//                 width / 2 - width / 2 * this.scale + 2, this.limit = .75 * width * this.scale, this.element =
//                 document.createElement("span"), TweenMax.set(this.element, {
//                 scale: this.scale
//             }), cursor.appendChild(this.element)
//         }
//
//         lock () {
//             this.lockX = this.x, this.lockY = this.y, this.angleX = 2 * Math.PI * Math.random(), this.angleY = 2 *
//                 Math.PI * Math.random()
//         }
//
//         draw (e) {
//             !idle || this.index <= sineDots ? TweenMax.set(this.element, {
//                 x: this.x,
//                 y: this.y
//             }) : (this.angleX += this.anglespeed, this.angleY += this.anglespeed, this.y = this.lockY + Math
//                 .sin(this.angleY) * this.range, this.x = this.lockX + Math.sin(this.angleX) * this.range,
//                 TweenMax.set(this.element, {
//                     x: this.x,
//                     y: this.y
//                 }))
//         }
//     }
//
//     class Circle {
//         constructor (e) {
//             const t = document.getElementById(e);
//             t.parentElement.removeChild(t)
//         }
//     }
//
//     function init () {
//         // let iframe = document.getElementsByTagName('iframe')[0]
//         // iframe.contentDocument.addEventListener("mousemove", onMouseMove),
//         window.addEventListener("mousemove", onMouseMove), window.addEventListener("touchmove", onTouchMove),
//             hoverButton = new HoverButton("button"), lastFrame += new Date, buildDots(), render()
//     }
//
//     function startIdleTimer () {
//         timeoutID = setTimeout(goInactive, idleTimeout), idle = !1
//     }
//
//     function resetIdleTimer () {
//         clearTimeout(timeoutID), startIdleTimer()
//     }
//
//     function goInactive () {
//         idle = !0;
//         for (let e of dots) e.lock()
//     }
//
//     function buildDots () {
//         for (let e = 0; e < amount; e++) {
//             let t = new Dot(e);
//             dots.push(t)
//         }
//     }
//
//     const onMouseMove = e => {
//             mousePosition.x = e.clientX - width / 2, mousePosition.y = e.clientY - width / 2, resetIdleTimer()
//         },
//         onTouchMove = () => {
//             mousePosition.x = event.touches[0].clientX - width / 2, mousePosition.y = event.touches[0].clientY - width /
//                 2, resetIdleTimer()
//         },
//         render = e => {
//             positionCursor(e - lastFrame), lastFrame = e, requestAnimationFrame(render)
//         },
//         positionCursor = e => {
//             let t = mousePosition.x,
//                 i = mousePosition.y;
//             dots.forEach((o, s, n) => {
//                 let h = n[s + 1] || n[0];
//                 if (o.x = t, o.y = i, o.draw(e), !idle || s <= sineDots) {
//                     const e = .35 * (h.x - o.x),
//                         s = .35 * (h.y - o.y);
//                     t += e, i += s
//                 }
//             })
//         },
//         inkTablet = window.matchMedia("(max-width: 991px)"),
//         inkMobile = window.matchMedia("(max-width: 479px)"),
//         inkMediaObserver = () => {
//             inkMobile.matches || inkTablet.matches || cursorInit || (cursorInit = !0, init())
//         };
//
//     const noise = () => {
//         let canvas, ctx;
//
//         let wWidth, wHeight;
//
//         let noiseData = [];
//         let frame = 0;
//
//         let loopTimeout;
//
//
//         // Create Noise
//         const createNoise = () => {
//             const idata = ctx.createImageData(wWidth, wHeight);
//             const buffer32 = new Uint32Array(idata.data.buffer);
//             const len = buffer32.length;
//
//             for (let i = 0; i < len; i++) {
//                 if (Math.random() < 0.5) {
//                     buffer32[i] = 0xff000000;
//                 }
//             }
//
//             noiseData.push(idata);
//         };
//
//
//         // Play Noise
//         const paintNoise = () => {
//             if (frame === 9) {
//                 frame = 0;
//             } else {
//                 frame++;
//             }
//
//             ctx.putImageData(noiseData[frame], 0, 0);
//         };
//
//
//         // Loop
//         const loop = () => {
//             paintNoise(frame);
//
//             loopTimeout = window.setTimeout(() => {
//                 window.requestAnimationFrame(loop);
//             }, (1000 / 25));
//         };
//
//
//         // Setup
//         const setup = () => {
//             wWidth = window.innerWidth;
//             wHeight = window.innerHeight;
//
//             canvas.width = wWidth;
//             canvas.height = wHeight;
//
//             for (let i = 0; i < 10; i++) {
//                 createNoise();
//             }
//
//             loop();
//         };
//
//
//         // Reset
//         let resizeThrottle;
//         const reset = () => {
//             window.addEventListener('resize', () => {
//                 window.clearTimeout(resizeThrottle);
//
//                 resizeThrottle = window.setTimeout(() => {
//                     window.clearTimeout(loopTimeout);
//                     setup();
//                 }, 200);
//             }, false);
//         };
//
//
//         // Init
//         const init = (() => {
//             canvas = document.getElementById('noise');
//             ctx = canvas.getContext('2d');
//
//             setup();
//         })();
//     };
//
//
//
//
//     window.onload = function() {
//         if(window.innerWidth > 991) {
//             noise();
//             inkMediaObserver(), inkTablet.addListener(inkMediaObserver), inkMobile.addListener(inkMediaObserver);
//         }
//     }
//
//
// });
//
//

document.addEventListener('DOMContentLoaded', ()=> {

    var cursor = {
        delay: 8,
        _x: 0,
        _y: 0,
        endX: (window.innerWidth / 2),
        endY: (window.innerHeight / 2),
        cursorVisible: true,
        cursorEnlarged: false,
        $dot: document.querySelector('.cursor-dot'),
        $outline: document.querySelector('.cursor-dot-outline'),

        init: function() {
            // Set up element sizes
            this.dotSize = this.$dot.offsetWidth;
            this.outlineSize = this.$outline.offsetWidth;

            this.setupEventListeners();
            this.animateDotOutline();
        },

        /*updateCursor: function(e) {
        var self = this;

        console.log(e)

        // Show the cursor
        self.cursorVisible = true;
        self.toggleCursorVisibility();

        // Position the dot
        self.endX = e.pageX;
        self.endY = e.pageY;
        self.$dot.style.top = self.endY + 'px';
        self.$dot.style.left = self.endX + 'px';
    },*/

        setupEventListeners: function() {
            var self = this;

            // Anchor hovering
            document.querySelectorAll('a').forEach(function(el) {
                el.addEventListener('mouseover', function() {
                    //self.$outline.style.background = "filter()";

                    self.cursorEnlarged = true;
                    self.toggleCursorSize();
                    self.$outline.style.filter = "url('#goo')";
                    self.$outline.style.mixBlendMode = "difference";
                });
                el.addEventListener('mouseout', function() {
                    self.cursorEnlarged = false;
                    self.toggleCursorSize();
                    self.$outline.style.filter = "none";
                    self.$outline.style.mixBlendMode = "unset";
                });
            });
            document.querySelectorAll('img').forEach(function(el) {
                el.addEventListener('mouseover', function() {
                    //self.$outline.style.background = "filter()";

                    self.cursorEnlarged = true;
                    self.toggleCursorSize();
                    self.$outline.style.filter = "url('#goo')";
                    self.$outline.style.mixBlendMode = "difference";
                });
                el.addEventListener('mouseout', function() {
                    self.cursorEnlarged = false;
                    self.toggleCursorSize();
                    self.$outline.style.filter = "none";
                    self.$outline.style.mixBlendMode = "unset";
                });
            });


            // Click events
            document.addEventListener('mousedown', function() {
                self.cursorEnlarged = true;
                self.toggleCursorSize();
            });
            document.addEventListener('mouseup', function() {
                self.cursorEnlarged = false;
                self.toggleCursorSize();
            });



            document.addEventListener('mousemove', function(e) {
                // Show the cursor
                self.cursorVisible = true;
                self.toggleCursorVisibility();

                // Position the dot
                self.endX = e.pageX;
                self.endY = e.pageY  - window.pageYOffset;
                self.$dot.style.top = self.endY + 'px';
                self.$dot.style.left = self.endX + 'px';
            });

            // Hide/show cursor
            document.addEventListener('mouseenter', function(e) {
                self.cursorVisible = true;
                self.toggleCursorVisibility();
                self.$dot.style.opacity = 1;
                self.$outline.style.opacity = 1;
            });

            document.addEventListener('mouseleave', function(e) {
                self.cursorVisible = true;
                self.toggleCursorVisibility();
                self.$dot.style.opacity = 0;
                self.$outline.style.opacity = 0;
            });
        },

        animateDotOutline: function() {
            var self = this;

            self._x += (self.endX - self._x) / self.delay;
            self._y += (self.endY - self._y) / self.delay;
            self.$outline.style.top = self._y + 'px';
            self.$outline.style.left = self._x + 'px';

            requestAnimationFrame(this.animateDotOutline.bind(self));
        },

        toggleCursorSize: function() {
            var self = this;

            if (self.cursorEnlarged) {
                self.$dot.style.transform = 'translate(-50%, -50%) scale(0.75)';
                self.$outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            } else {
                self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
                self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        },

        toggleCursorVisibility: function() {
            var self = this;

            if (self.cursorVisible) {
                self.$dot.style.opacity = 1;
                self.$outline.style.opacity = 1;
            } else {
                self.$dot.style.opacity = 0;
                self.$outline.style.opacity = 0;
            }
        }
    }

    cursor.init();

})