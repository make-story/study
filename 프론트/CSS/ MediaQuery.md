
# 미디어쿼리로 터치디바이스, 마우스디바이스 구분  
https://www.smashingmagazine.com/2022/03/guide-hover-pointer-media-queries/  

## Media Query Hover: Detecting A Pointer
```html
<style>
  .button {
    padding: 0.5em 1em;
    font-size: 1.125rem;
    border-radius: 0.6em;
    background-color: coral;
    font-weight: bold;
    border: 1px solid transparent;
    transition: background-color 200ms ease-in-out;
  }

  @media (hover: hover) {
    .button:hover {
      background-color: hotpink;
    }
  }
</style>

<button class="button">Hover over me</button>
```

## Media Query Pointer: Detecting A Pointer’s Accuracy
```html
<style>
@media screen and (pointer: coarse) {
  .form-grid {
    gap: 0.5em;
  }

  label {
    font-size: 1.05em;
  }

  input[type="checkbox"] {
    width: 1.625rem;
    height: 1.625rem;
  }

  button[type="button"] {
    min-height: 3rem;
  }
}
</style>
<form action="post">
  <fieldset>
    <legend>Which programming languages do you want to learn?</legend>
    <div class="form-grid">
      <label for="c"> <input type="checkbox" id="c" /> C </label>
      <label for="c+"> <input type="checkbox" id="c+" /> C+ </label>
      <label for="c++"> <input type="checkbox" id="c++" /> C++ </label>
      <label for="c-sharp"> <input type="checkbox" id="c-sharp" /> C# </label>
      <label for="kotlin"> <input type="checkbox" id="kotlin" /> Kotlin </label>
      <label for="java"> <input type="checkbox" id="java" /> Java </label>
      <label for="javascript">
        <input type="checkbox" id="javascript" /> JavaScript
      </label>
      <label for="go"> <input type="checkbox" id="go" /> Go </label>
      <label for="objective-c">
        <input type="checkbox" id="objective-c" /> Objective-C
      </label>
      <label for="php"> <input type="checkbox" id="php" /> PHP </label>
      <label for="python"> <input type="checkbox" id="python" /> Python </label>
      <label for="ruby"> <input type="checkbox" id="ruby" /> Ruby </label>
      <label for="rust"> <input type="checkbox" id="rust" /> Rust </label>
      <label for="scala"> <input type="checkbox" id="scala" /> Scala </label>
      <label for="swift"> <input type="checkbox" id="swift" /> Swift </label>
      <label for="other"> <input type="checkbox" id="other" /> Another </label>
    </div>
    <button type="button">Submit</button>
  </fieldset>
</form>
```

## Combining Media Queries 
Media query hover’s value / Media query pointer’s value	/ Device  
none / coarse / Smartphones, touchscreens
none / fine / Stylus-based screens
hover / coarse / Smart TVs, video game consoles
hover / fine / Desktop computers, laptops, touchpads

