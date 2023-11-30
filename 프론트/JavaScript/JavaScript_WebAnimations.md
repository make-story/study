# Web Animations (애니메이션)

https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API

https://aerotwist.com/blog/flip-your-animations/

```javascript
// Get the first position.
var first = el.getBoundingClientRect();

// Now set the element to the last position.
el.classList.add("totes-at-the-end");

// Read again. This forces a sync
// layout, so be careful.
var last = el.getBoundingClientRect();

// You can do this for other computed
// styles as well, if needed. Just be
// sure to stick to compositor-only
// props like transform and opacity
// where possible.
var invert = first.top - last.top;

// Invert.
el.style.transform = `translateY(${invert}px)`;

// Wait for the next frame so we
// know all the style changes have
// taken hold.
requestAnimationFrame(function () {
  // Switch on animations.
  el.classList.add("animate-on-transforms");

  // GO GO GOOOOOO!
  el.style.transform = "";
});

// Capture the end with transitionend
el.addEventListener("transitionend", tidyUpAnimations);
```

Web Animations 활용 방식

```javascript
// Get the first position.
var first = el.getBoundingClientRect();

// Move it to the end.
el.classList.add("totes-at-the-end");

// Get the last position.
var last = el.getBoundingClientRect();

// Invert.
var invert = first.top - last.top;

// Go from the inverted position to last.
var player = el.animate(
  [{ transform: `translateY(${invert}px)` }, { transform: "translateY(0)" }],
  {
    duration: 300,
    easing: "cubic-bezier(0,0,0.32,1)",
  }
);

// Do any tidy up at the end
// of the animation.
player.addEventListener("finish", tidyUpAnimations);
```
