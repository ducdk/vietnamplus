(function() {
	const dot = document.querySelector(".dot");
	const circle = document.querySelector(".dot circle");
	const text1 = document.querySelector(".dot .text1");
	const text2 = document.querySelector(".dot .text2");
	const link = document.querySelector(".section__link");
	const link2 = document.querySelector(".section__link2");
	let mouse = {
		x: 0,
		y: 0
	};
	let mouseStored = Object.assign({}, mouse);

	gsap.set(circle, {transformOrigin: "50% 50%"});

	// Set event listeners
	window.addEventListener("mousemove", function(e) {
		setMouseCoords(e);
	});

	// And use the ticker to update the rotation accordingly
	gsap.ticker.add(animateDot);

	// "load in" the dot
	gsap.to(dot, {
		duration: 1,
		delay: 0,
		scale: 1,
		opacity: 1,
		ease: "Power3.easeInOut",
	});

	// Set up additional effects for when links are hovered
	link.addEventListener("mouseenter", (e) => {
		gsap.to(link, {
			duration: 0.4,
			delay: 0.15,
			scale: 1,
			ease: "Power3.easeInOut",
		});
		gsap.to(circle, {
			duration: 0.4,
			scale: 6,
			fill: "#b21413bf",
			ease: "Power3.easeInOut",
		});
		gsap.to(text1, {
			duration: 0.3,
			delay: 0.1,
			opacity: 1,
			ease: "Power3.easeInOut",
		}, "<");
	});

	link.addEventListener("mouseleave", (e) => {
		gsap.to(link, {
			duration: 0.3,
			scale: 1,
			ease: "Power3.easeOut",
		});
		gsap.to(circle, {
			duration: 0.3,
			scale: 1,
			delay: 0.1,
			fill: "#b21413bf",
			ease: "Power3.easeOut",
		});
		gsap.to(text1, {
			duration: 0.25,
			opacity: 0,
			ease: "Power3.easeOut",
		}, "<");
	});

    link2.addEventListener("mouseenter", (e) => {
		gsap.to(link2, {
			duration: 0.4,
			delay: 0.15,
			scale: 1,
			ease: "Power3.easeInOut",
		});
		gsap.to(circle, {
			duration: 0.4,
			scale: 6,
			fill: "#b21413bf",
			ease: "Power3.easeInOut",
		});
		gsap.to(text2, {
			duration: 0.3,
			delay: 0.1,
			opacity: 1,
			ease: "Power3.easeInOut",
		}, "<");
	});

	link2.addEventListener("mouseleave", (e) => {
		gsap.to(link2, {
			duration: 0.3,
			scale: 1,
			ease: "Power3.easeOut",
		});
		gsap.to(circle, {
			duration: 0.3,
			scale: 1,
			delay: 0.1,
			fill: "#b21413bf",
			ease: "Power3.easeOut",
		});
		gsap.to(text2, {
			duration: 0.25,
			opacity: 0,
			ease: "Power3.easeOut",
		}, "<");
	});

	function setMouseCoords(event) {
		mouse.x = event.clientX;
		mouse.y = event.clientY;
	}

	function animateDot() {
		if (mouseStored.x === mouse.x && mouseStored.y === mouse.y) return;

		gsap.to(dot, {
			x: mouse.x,
			y: mouse.y,
			ease: "Power3.easeOut",
			duration: 1.5,
			delay: 0
		});

		// Store the mouse position for the next tick
		mouseStored.x = mouse.x;
		mouseStored.y = mouse.y;
	}
}());


// document.addEventListener("DOMContentLoaded", function(event) {
//     var cursor = document.querySelector(".custom-cursor");
//     var links = document.querySelectorAll(".section__link");
//     var initCursor = false;
  
//     for (var i = 0; i < links.length; i++) {
//       var selfLink = links[i];
  
//       selfLink.addEventListener("mouseover", function() {
//         cursor.classList.add("custom-cursor--link");
//       });
//       selfLink.addEventListener("mouseout", function() {
//         cursor.classList.remove("custom-cursor--link");
//       });
//     }
  
//     window.onmousemove = function(e) {
//       var mouseX = e.clientX;
//       var mouseY = e.clientY;
  
//       if (!initCursor) {
//         // cursor.style.opacity = 1;
//         TweenLite.to(cursor, 0.3, {
//           opacity: 1
//         });
//         initCursor = true;
//       }
  
//       TweenLite.to(cursor, 0, {
//         top: mouseY + "px",
//         left: mouseX + "px"
//       });
//     };
  
//     window.onmouseout = function(e) {
//       TweenLite.to(cursor, 0.3, {
//         opacity: 0
//       });
//       initCursor = false;
//     };
//   });
  