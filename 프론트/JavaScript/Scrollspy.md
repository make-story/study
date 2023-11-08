# Scrollspy

특정 엘리먼트의 화면 노출에 따라, 관련있는 버튼(예를 들어 카테고리 또는 메뉴 등) 토글

https://www.cssscript.com/tag/scrollspy/

## 참고 코드

```javascript
const links = document.querySelectorAll(".scrollspy-link");
const sections = document.querySelectorAll(".scrollspy-section");
const indicator = document.querySelector(".scrollspy-indicator");

links.forEach((link) => {
  link.onclick = () => {
    sections.forEach((section) => {
      if (link.dataset.target === section.id) {
        document.documentElement.scrollTop = section.offsetTop;
      }
    });
  };
});

window.onscroll = () => scrollspy();
window.onload = () => scrollspy();
window.onresize = () => scrollspy();

const scrollspy = () => {
  const pageYPosition =
    document.documentElement.scrollTop || document.body.scrollTop;
  sections.forEach((section) => {
    const sectionYPosition = section.offsetTop;

    if (pageYPosition > sectionYPosition - 60) {
      links.forEach((link) => {
        if (link.dataset.target === section.id) {
          indicator.style.left = `${link.offsetLeft}px`;
          indicator.style.width = `${link.offsetWidth}px`;
        }
      });
    }
  });
};

scrollspy();
```

```css
.scrollspy-nav {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: sticky;
  top: 0;
  left: 0;
  background: rgb(255, 255, 255);
}

.scrollspy-nav .scrollspy-link {
  text-decoration: none;
  color: #333;
  font-family: sans-serif;
  transition: 0.3s ease;
  font-weight: bold;
  margin: 0px 10px;
  padding: 0px 5px;
  cursor: pointer;
}

.scrollspy-nav .scrollspy-link:hover {
  color: #000;
}

.scrollspy-nav .scrollspy-indicator {
  position: absolute;
  height: 3px;
  width: 0;
  background: red;
  bottom: 0;
  left: 0;
  transition: width 0.3s, left 0.1s;
}

.scrollspy-section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: xx-large;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Scrollspy</title>
  </head>
  <body>
    <nav class="scrollspy-nav">
      <a class="scrollspy-link" data-target="home">Home</a>
      <a class="scrollspy-link" data-target="about">About</a>
      <a class="scrollspy-link" data-target="services">Services</a>
      <a class="scrollspy-link" data-target="pro">GO pro</a>
      <a class="scrollspy-link" data-target="contact">Contact</a>
      <span class="scrollspy-indicator"></span>
    </nav>
    <section class="scrollspy-section" id="home">Home</section>
    <section class="scrollspy-section" id="about">About</section>
    <section class="scrollspy-section" id="services">Services</section>
    <section class="scrollspy-section" id="pro">GO pro</section>
    <section class="scrollspy-section" id="contact">Contact</section>
  </body>
</html>
```
