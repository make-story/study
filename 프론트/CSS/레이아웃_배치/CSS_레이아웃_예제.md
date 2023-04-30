# grid 예제

https://ishadeed.com/article/rebuild-featured-news-modern-css/

https://cdpn.io/pen/debug/NWOdJVd/c65292968aa48890b107e6525b2e4a3b

````html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <style>
      .wrapper {
        max-width: 1120px;
        margin: 1rem auto;
        padding-inline: 1rem;
        container-name: main;
        container-type: inline-size;
      }

      .c-newspaper {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      @media (min-width: 550px) {
        .c-newspaper {
          grid-template-columns: 1fr 1fr 1fr;
        }
      }
      @media (min-width: 880px) {
        .c-newspaper {
          grid-template-columns: 1fr 2fr 1fr;
        }
      }

      .c-newspaper__col {
        --gap: 20px;
        display: flex;
        flex-direction: column;
        /* Stuff to test subgrid. */
      }
      @media (min-width: 550px) {
        .c-newspaper__col:nth-child(1) .c-newspaper__item:not(:last-child):after,
        .c-newspaper__col:nth-child(2) .c-newspaper__item:not(:last-child):after {
          content: '';
          display: block;
          height: 1px;
          background-color: lightgrey;
          margin-block: var(--gap);
        }
        .c-newspaper__col:last-child {
          border-top: 1px solid lightgrey;
          padding-top: var(--gap);
        }
      }
      @media (min-width: 880px) {
        .c-newspaper__col:last-child {
          padding-top: 0;
          border-top: 0;
        }
        .c-newspaper__col:last-child .c-newspaper__item:not(:last-child):after {
          content: '';
          display: block;
          height: 1px;
          background-color: lightgrey;
          margin-block: var(--gap);
        }
      }
      @media (min-width: 550px) {
        .c-newspaper__col:first-child {
          grid-column: 2/4;
        }
      }
      @media (min-width: 880px) {
        .c-newspaper__col:first-child {
          grid-column: 2/3;
        }
      }
      @media (min-width: 550px) {
        .c-newspaper__col:nth-child(2) {
          grid-column: 1/2;
          grid-row: 1;
        }
      }
      .c-newspaper__col:last-child > * {
        flex: 1;
      }
      @media (min-width: 550px) {
        .c-newspaper__col:last-child {
          flex-direction: row;
          grid-column: 1/4;
        }
      }
      @media (min-width: 880px) {
        .c-newspaper__col:last-child {
          flex-direction: column;
          grid-column: 3/4;
        }
        .c-newspaper__col:last-child > * {
          flex: initial;
        }
      }

      .c-newspaper__item {
        container-type: inline-size;
        container-name: card;
        design: cool;
      }

      .c-card {
        --flow-space: 1.25rem;
      }

      .c-card__thumb {
        flex: 0 0 30%;
      }
      .c-card__thumb img {
        width: 100%;
      }

      .c-card__content {
        --flow-space: 0.25rem;
      }

      .c-card__title {
        font-weight: bold;
        font-size: 17px;
        color: #4c4e4d;
        text-wrap: balance;
      }

      .card__tease {
        color: #666666;
        font-size: 14px;
      }

      .c-card__meta {
        font-size: 14px;
        color: #666;
      }
      .c-card__meta a {
        color: #4f7177;
        text-decoration: none;
      }

      @container main (min-width: 1px) {
        .c-card__meta {
          font-family: 'Playfair Display', serif;
        }
      }
      @container card (min-width: 280px) and style(--horizontal: true) {
        .c-card {
          display: flex;
          gap: 1rem;
        }
      }
      @container main (min-width: 550px) {
        @container card style(--flipped: true) {
          .c-card__thumb {
            order: 2;
          }
        }
      }
      @container style(--thumb: mobile-only) {
        .c-card__thumb {
          display: none;
        }
      }
      @media (min-width: 550px) {
        @container style(--thumb: grid-2) {
          .c-card__thumb {
            display: none;
          }
        }
      }
      @media (min-width: 880px) {
        @container style(--thumb: grid-2) {
          .c-card__thumb {
            display: block;
          }
        }
      }
      @container card (min-width: 280px) and style(--horizontal: true) and style(--thumb: mobile-only) {
        .c-card__thumb {
          display: block;
        }
      }
      @container style(--featured: true) {
        .c-card {
          display: flex;
          gap: 1rem;
        }

        .c-card__thumb {
          flex: 0 0 50%;
        }
      }
      /* Cool things... */
      @container main (min-width: 550px) {
        @container card style(--featured: true) {
          .c-card {
            flex-direction: column;
            gap: 0;
          }

          .c-card__title {
            font-size: clamp(1rem, 6cqw, 2rem);
          }

          .c-card__content {
            text-align: center;
          }

          .c-card__tease {
            font-family: 'Playfair Display', serif;
            font-size: 19px;
          }
        }
      }
      @container main (min-width: 550px) {
        @container card style(--compact: 2) {
          .c-card__title {
            font-size: 19px;
          }
        }
      }
      /* Shit happens */
      img {
        max-width: 100%;
        -o-object-fit: cover;
        object-fit: cover;
      }

      .u-flow > * + * {
        margin-top: var(--flow-space, 0.5rem);
      }

      /*font-family: 'Inter', sans-serif;
font-family: 'Playfair Display', serif;
*/
      body {
        font-family: 'Inter', sans-serif;
        line-height: 1.35;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="c-newspaper">
        <div class="c-newspaper__col">
          <div class="c-newspaper__item" style="--featured: true;">
            <article class="c-card u-flow">
              <div class="c-card__thumb">
                <img src="https://placehold.co/620x370" alt="" />
              </div>
              <div class="c-card__content u-flow">
                <h3 class="c-card__title">Exquisite Appetizer Ideas</h3>
                <p class="c-card__tease">Kick off your dinner party with these amazing appetizers.</p>
                <p class="c-card__meta">By <a href="#">Ahmad Shadeed</a></p>
              </div>
            </article>
          </div>

          <div class="c-newspaper__item" style="--horizontal: true; --flipped: true;">
            <article class="c-card u-flow">
              <div class="c-card__thumb">
                <img src="https://placehold.co/300x225" alt="" />
              </div>
              <div class="c-card__content u-flow">
                <h3 class="c-card__title">Creative Salad Inspirations</h3>
                <p class="c-card__tease">Transform your salads with these fresh and unique ideas.</p>
                <p class="c-card__meta">By <a href="#">Ahmad Shadeed</a></p>
              </div>
            </article>
          </div>

          <!--       <div class="c-newspaper__item" style="display: none; --horizontal: true; --flipped: true;">
        <article class="c-card u-flow">
          <div class="c-card__thumb">
            <img src="https://placehold.co/300x225" alt="">
          </div>
          <div class="c-card__content u-flow">
            <h3 class="c-card__title">Creative Salad Inspirations</h3>
            <p class="c-card__tease">Transform your salads with these fresh and unique ideas.</p>
            <p class="c-card__meta">By <a href="#">Ahmad Shadeed</a></p>
          </div>
        </article>
      </div> -->
        </div>
        <div class="c-newspaper__col">
          <div class="c-newspaper__item" style="--compact: 2; --horizontal: true;">
            <article class="c-card u-flow">
              <div class="c-card__thumb">
                <img src="https://placehold.co/300x225" alt="" />
              </div>
              <div class="c-card__content u-flow">
                <h3 class="c-card__title">Savory Italian Pasta Dishes</h3>
                <p class="c-card__tease">Discover the best pasta recipes for your next dinner party.</p>
                <p class="c-card__meta">By <a href="#">Ahmad Shadeed</a></p>
              </div>
            </article>
          </div>

          <div class="c-newspaper__item" style="--horizontal: true; --thumb: mobile-only;/">
            <article class="c-card u-flow">
              <div class="c-card__thumb">
                <img src="https://placehold.co/300x225" alt="" />
              </div>
              <div class="c-card__content u-flow">
                <h3 class="c-card__title">Mouthwatering Vegan Desserts</h3>
                <p class="c-card__tease">Indulge in these delicious vegan treats without any guilt.</p>
                <p class="c-card__meta">By <a href="#">Ahmad Shadeed</a></p>
              </div>
            </article>
          </div>

          <div class="c-newspaper__item" style="--horizontal: true; --thumb: mobile-only;">
            <article class="c-card u-flow">
              <div class="c-card__thumb">
                <img src="https://placehold.co/300x225" alt="" />
              </div>
              <div class="c-card__content u-flow">
                <h3 class="c-card__title">Hearty Homemade Soups</h3>
                <p class="c-card__tease">Warm up with these comforting soup recipes perfect for winter.</p>
                <p class="c-card__meta">By <a href="#">Ahmad Shadeed</a></p>
              </div>
            </article>
          </div>
        </div>
        <div class="c-newspaper__col">
          <div class="c-newspaper__item" style="--compact: 2; --horizontal: true; --thumb: grid-2">
            <article class="c-card u-flow">
              <div class="c-card__thumb">
                <img src="https://placehold.co/300x225" alt="" />
              </div>
              <div class="c-card__content u-flow">
                <h3 class="c-card__title">Tasty Breakfast Smoothies</h3>
                <p class="c-card__tease">Jumpstart your day with these energizing smoothie recipes.</p>
                <p class="c-card__meta">By <a href="#">Ahmad Shadeed</a></p>
              </div>
            </article>
          </div>

          <div class="c-newspaper__item" style="--horizontal: true; --thumb: mobile-only;">
            <article class="c-card u-flow">
              <div class="c-card__thumb">
                <img src="https://placehold.co/300x225" alt="" />
              </div>
              <div class="c-card__content u-flow">
                <h3 class="c-card__title">Delightful Low-Carb Meals</h3>
                <p class="c-card__tease">Enjoy these tasty low-carb dishes without compromising flavor.</p>
                <p class="c-card__meta">By <a href="#">Ahmad Shadeed</a></p>
              </div>
            </article>
          </div>

          <div class="c-newspaper__item third" style="--horizontal: true; --thumb: mobile-only;">
            <article class="c-card u-flow">
              <div class="c-card__thumb">
                <img src="https://placehold.co/300x225" alt="" />
              </div>
              <div class="c-card__content u-flow">
                <h3 class="c-card__title">Irresistible Chocolate Desserts</h3>
                <p class="c-card__tease">Satisfy your sweet tooth with these chocolatey delights.</p>
                <p class="c-card__meta">By <a href="#">Ahmad Shadeed</a></p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
```
````
