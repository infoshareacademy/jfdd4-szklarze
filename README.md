# jfdd4-szklarze

# Janusz - Project Guidelines

## General rules

### Styling

In this project we use specific set of styles and you should be consistent in using them.
The styles are in _style-basic.scss_ file. The styles are as follows.

##### Colors

``` 
Sass variables for colors:

$yellow: #ffc10e;
$yellow-dark: #dda20e;

$blue: #465676;
$blue-dark: #262e3e;
$blue-dark-transparent: rgba(38, 46, 62, 0.71);

$grey: #aaaaaa;
$grey-light: #f5f5f5;

$white: #ffffff;
```

##### Fonts

We use "Roboto" font from GoogleFonts. You need to add these lines of code to use it:

```
HTML:
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&subset=latin-ext">
```

###### Font settings

```
$font-main: 'Roboto', sans-serif;

body {
  margin: 0;
  font: 500 1em/1.4em $font-main;
  color: $blue-dark;
}

h1, h2, h3, h5, h5, h6 {
  font: 700 1em/1.4em $font-main;
  margin: 0.5em;
}

h1 {
  font-size: 2.4em;
}

h2 {
  font-size: 2em;
}

h3 {
  font-size: 1.8em;
}

h4 {
  font-size: 1.6em;
}

h5 {
  font-size: 1.4em;
}

h6 {
  font-size: 1.2em;
}

p {
  margin: 0.2em 0;
}
```

###### Fonts on small devices

If it is possible, try targeting only "the oldest" ancestor to change font size on smaller devices.
That way all the descendants will be smaller - this is the privilege of using "em" units. 

```
body {
    font-size: 1em;
}

@media screen and (max-width: 350px){
    body {
        font-size: 0.8em;
    }
}
```

###### Margins and paddings

There is a fixed navigation bar, which is **60px high**. Make sure that every section of the page has 60px top padding, so as the navigation won't cover the content, when the navigation link is clicked.
Try to use relative units for margins and paddings where it is possible.

##### Media Queries

Stick to these breakpoints for media queries:

1. ```@media screen and (max-width: 350px) {}```
2. ```@media screen and (min-width: 351px) and (max-width: 600px) {}```
3. ```@media screen and (min-width: 601px) and (max-width: 800px) {}```
4. ```@media screen and (min-width: 801px) and (max-width: 1200px) {}```

You can use other ranges and variants, e.g.:
 ```@media screen and (min-width: 800px) {}```, but remember to use only these 4 breakpoints (350px, 600px, 800px, 1200px) with formatting presented above.
If you have some spare time, try to rebuild code for the "mobile first" approach.

### Git

Rule #1 - Use English! We are Polish team and work on project with polish content but you have to make sure that the whole ropository is understandible for English speakers.

#### Branches

There are 4 types of branches:

1. ```main```    - the main branch where the source code of HEAD always reflects a production-ready state,
2. ```develop``` - the main branch where the source code of HEAD always reflects a state with the latest delivered development changes for the next release, so called the “integration branch”,
3. ```feature``` - these are used to develop new features for the upcoming or a distant future release. In this project you use this type when you are working on any particular task/sub-task from your project tracking software (here: JIRA).
                   If you are making any minor changes or improvements, use also this type of branch.
4. ```hotfix```  - they are made for resolving critical bugs in a production version.

General rules:

* ```main``` and ```develop``` branches are permanent and never to be deleted.
* ```feature``` and ```hotfix``` branches must always be deleted after marging them with main branches.
* ```feature``` branch is always created on most up to date ```develop``` branch and is marged back to it
* ```hotfix``` can be created on ```main``` or ```develop```. If it is created on ```main``` than it is marged back both to ```main``` and ```develop```. Otherwise marge it only with ```devlop```.  

#### Marging - the right way

F.e. you have task called _MP-1 add search engine_, so lets create branch for it.

1. Checkout **develop** branch - `git checkout develop`
1. Pull **develop** to be up to date - `git pull`
1. Create new branch **feature/MP-1-add-search-engine** here, on the top of **develop**
    * Create commits on branch **feature/MP-1-add-search-engine**, put there your changes connected to this feature
    * Push **feature/MP-1-add-search-engine** to server - do it frequently. Without push you won't have it on GitHub :)
1. When you're ready - take all changes from **develop** to your branch. Be up to date with your collagues changes!
    * checkout **develop** again. - `git checkout develop` 
    * pull **develop** To be up to date with others collagues work - `git pull`
    * get back to your branch - and merge current **develop** into it. `git checkout feature/MP-1-add-search-engine` and then `git merge develop`
1. When your're up to date with develop and resolve all merge conflicts. Not its finally time to close your feature :)
    * checkout **develop** again. - `git checkout develop` 
    * merge your feature to develop (or create pull request for it) - `git merge feature/MP-1-add-search-engine`
    * push your changes (so your merge on **develop**, you should be still on **develop** branch) - `git push`
1. Congrats - now the whole team can `git fetch` and `git pull` **develop** to have your changes :wink:

#### Branch names and commit messages

Always name branches like this 
```
type/very-short-title
```
where:

* ```type``` is one of supporting branches - ```feature``` or ```hotfix```
* ```very-short-title``` is a description of the taks you are working with. Try to make it maximum 3 words seperated with hyphens.

When you commit, use message format like this 
```
ABC-01 Progress description
```
where:

* ```ABC-01``` is the task number from JIRA. If you REALLY can't assign a commit to any task than create a new one or use "**XX-XXX**", but avoid the last solution.
* ```Progress description``` is the place where you can write anything worth mentioning about the progress with the task. If you just want to save your progress, write "**Checkpoint commit**".

### Code formatting

This project was made in Webstorm IDE and uses it's default settings for code maintenance.
General rules:

* Avoid lines of code longer than 90 characters. 
* Break lines on multiple attributes in HTML,
* Leave only one blank line at the end of the code,


There are the examples of code formatting below.

```
*.html

<!-- End - Previous block of code -->

<!-- Start - Block of code -->
<section class="blocks-name"
         id="blocks-id">
    <div class="some-class">
        <ul>
            <li>Abcsdg aslkhjdhf aslkhjdhf aslkhjdhf aslkhjdhf aslkhjdhf aslkhjdhffs</li>
            <li>Abcsdg aslkhjdhf aslkhjdhf aslkhjdhf aslkhjdhf aslkhjdhf aslkhjdhffs dfsa
                fdafdasb asbrgney 
            </li>
            <li>Abcsdg aslkhjdhf aslkhjdhf aslkhjf aslkhjdhffs</li>
        </ul>
    </div><!--White spaces clearance.
 --><div class="another-class">
        <ul>
            <li>Abcsdg aslkhjdhf aslkhjdhf aslkhjdhf aslkhjdhf aslkhjdhf aslkhjdhffs</li>
            <li>Abcsdg aslkhjdhf aslkhjdhf aslkhjdhf aslkhjdhf aslkhjdhffs</li>
            <li>Abcsdg aslkhjdhf aslkhjdhf aslkhjf aslkhjdhffs</li>
        </ul>
    </div>
</section>
<!-- End - Block of code-->

<!-- Start - Next block of code -->
```


```
*.scss

.previous-selector {
...
}

.selector {
  property: value;
    
  element:pseudo-class {
    property: value;
    property: value;
  }
    
  element:pseudo-class {
    property: value;
    property: value;
    
    li {
      property: value;
      property: value;
    }
  }
}

.next-selector {
...
}

.last-selector {
...
}

@media {
Media Queries declarations
}
```

```javascript

// End - Previous block of code

// Start - Block of code

    function nameOfFunction() {
        var $aButton = $('button'),
            $section = $('.section'),
            elementProperty = $section.getProperty();    
   
        $('#id').click(function () {
            $('#anotherId').toggleClass('different-class');
            $('.class').toggleClass('change-class');
        });
    }
    
    function nameOfOtherFunction() {
        $('#id').click(function () {
            $('#anotherId').toggleClass('different-class');
            $('.class').toggleClass('change-class');
        });
    }

// End - Block of code

// Start - Next block of code

```
### Files naming and grouping

All files need to be grouped in folders, according to their type:

* styles
* images
* scripts

SCSS files are named after the class name of a particular section on a page. They must begin with an underscore. All ```_example.scss``` files are attached to ```style-basic.scss``` using **@import** declaration.

```
HTML
<section class="sect-name"></section>

File name:
_sect-name.scss

Marging styles in style-basic.scss:
@import _sect-name.scss
```

## HTML

### Semantics

HTML5 provides us with lots of semantic elements aimed to describe precisely the content. Make sure you benefit from its rich vocabulary.

```html
<!-- bad -->
<div id="main">
  <div class="article">
    <div class="header">
      <h1>Blog post</h1>
      <p>Published: <span>21st Feb, 2015</span></p>
    </div>
    <p>…</p>
  </div>
</div>

<!-- good -->
<main>
  <article>
    <header>
      <h1>Blog post</h1>
      <p>Published: <time datetime="2015-02-21">21st Feb, 2015</time></p>
    </header>
    <p>…</p>
  </article>
</main>
```

Make sure you understand the semantics of the elements you're using. It's worse to use a semantic
element in a wrong way than staying neutral.

```html
<!-- bad -->
<h1>
  <figure>
    <img alt=Company src=logo.png>
  </figure>
</h1>

<!-- good -->
<h1>
  <img alt=Company src=logo.png>
</h1>
```


### Accessibility

Accessibility shouldn't be an afterthought. Fix the little things that make a huge difference, such as:

* learning to use the `alt` attribute properly
* making sure your links and buttons are marked as such (no `<div class=button>` atrocities)
* not relying exclusively on colors to communicate information
* explicitly labelling form controls

```html
<!-- bad -->
<h1><img alt="Logo" src="logo.png"></h1>

<!-- good -->
<h1><img alt="My Company, Inc." src="logo.png"></h1>
```

### Language

While defining the language and character encoding is optional, it's recommended to always declare
both at document level, even if they're specified in your HTTP headers. Favor UTF-8 over any other
character encoding. The page is for Polish customers, so use Polish language.

```html
<!-- bad -->
<!doctype html>
<title>Hello, world.</title>

<!-- good -->
<!doctype html>
<html lang=pl>
  <meta charset=utf-8>
  <title>Hello, world.</title>
</html>
```

### Performance

It is a good idea to place scripts at the bottom of the <body> element.
This can improve page load, because script compilation can slow down the display.

```html
<!-- bad -->
<html lang="pl">
    <head>
        ...
            <script src="js/script.js"></script>
        ...
    </head>
    <body>...</body>
</html

<!-- good -->
<html lang="pl">
    <head>...</head>
    <body>
        ...
        <script src="js/script.js"></script>
    </body>
</html
```

## SCSS

This site is styled using Sass preprocessor in strict mode (*.scss files)

### Semicolons

While the semicolon is technically a separator in CSS, always treat it as a terminator.

```css
/* bad */
div {
  color: red
}

/* good */
div {
  color: red;
}
```

### Box model

The box model should ideally be the same for the entire document. 
Don't change the default box model.

```css
/* bad */
div {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

/* bad */
* { box-sizing: border-box; }

/* good */
div {
  padding: 10px;
}
```

### Flow

Don't change the default behavior of an element if you can avoid it. Keep elements in the
natural document flow as much as you can. For example, removing the white-space below an
image shouldn't make you change its default display:

```css
/* bad */
img {
  display: block;
}

/* good */
img {
  vertical-align: middle;
}
```

Similarly, don't take an element off the flow if you can avoid it.

```css
/* bad */
div {
  width: 100px;
  position: absolute;
  right: 0;
}

/* good */
div {
  width: 100px;
  margin-left: auto;
}
```

### Positioning

There are many ways to position elements in CSS but try to restrict yourself to the
properties/values below. By order of preference:

```
display: block;
display: flex;
position: relative;
position: sticky;
position: absolute;
position: fixed;
```

Use flexbox instead of floating and clearing, wherever possible.

```css
/* bad */
.float-container div {
  float: left;
}
.float-container:after {
  clear: both;
}

/* good */
.flexbox-container {
  display: flex;
  justify-content: flex-start;
}
```

### Selectors

Minimize selectors tightly coupled to the DOM. Consider adding a class to the elements
you want to match when your selector exceeds 3 structural pseudo-classes, descendant or
sibling combinators.

```css
/* bad */
div:first-of-type :last-child > p ~ *

/* good */
div:first-of-type .info
```

Avoid overloading your selectors when you don't need to.

```css
/* bad */
img[src$=svg], ul > li:first-child {
  opacity: 0;
}

/* good */
[src$=svg], ul > :first-child {
  opacity: 0;
}
```

Use classes that indicates the area of the page you are working on.

```html
<!--bad-->
<nav>
    ...
</nav>
<nav>
    ...
</nav>

<!--good-->
<nav class="nav-top">
    ...
</nav>
<nav class="nav-footer">
    ...
</nav>
```

### Specificity

Don't make values and selectors hard to override. Minimize the use of `id` for styling
and avoid `!important`.

```css
/* bad */
.bar {
  color: green !important;
}
#foo {
  color: red;
}

/* good */
.foo.bar {
  color: green;
}
.foo {
  color: red;
}
```

### Overriding

Overriding styles makes selectors and debugging harder. Avoid it when possible.

```css
/* bad */
li {
  visibility: hidden;
}
li:first-child {
  visibility: visible;
}

/* good */
li + li {
  visibility: hidden;
}
```

### Inheritance

Don't duplicate style declarations that can be inherited.

```css
/* bad */
div h1, div p {
  text-shadow: 0 1px 0 #fff;
}

/* good */
div {
  text-shadow: 0 1px 0 #fff;
}
```

### Brevity

Keep your code terse. Use shorthand properties and avoid using multiple properties when
it's not needed.

```css
/* bad */
div {
  transition: all 1s;
  top: 50%;
  margin-top: -10px;
  padding-top: 5px;
  padding-right: 10px;
  padding-bottom: 20px;
  padding-left: 10px;
}

/* good */
div {
  transition: 1s;
  top: calc(50% - 10px);
  padding: 5px 10px 20px;
}
```

### Vendor prefixes

Do not use them in this project.

### Animations

Favor transitions over animations. Avoid animating other properties than
`opacity` and `transform`.

```css
/* bad */
div:hover {
  animation: move 1s forwards;
}
@keyframes move {
  100% {
    margin-left: 100px;
  }
}

/* good */
div:hover {
  transition: 1s;
  transform: translateX(100px);
}
```

### Units

Use unitless values when you can. Use `em` for font size. Prefer seconds over
milliseconds.

```css
/* bad */
div {
  margin: 0px;
  font-size: 12px;
  line-height: 22px;
  transition: 500ms;
}

/* good */
div {
  margin: 0;
  font-size: .9em;
  line-height: 1.5;
  transition: .5s;
}
```

### Colors

If you need transparency, use `rgba`. Otherwise, always use the hexadecimal format.

```css
/* bad */
div {
  color: hsl(103, 54%, 43%);
}

/* good */
div {
  color: #5a3;
}
```

### Drawing

Avoid HTTP requests when the resources are easily replicable with CSS.

```css
/* bad */
div::before {
  content: url(white-circle.svg);
}

/* good */
div::before {
  content: "";
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
}
```

### Hacks

Don't use them.

```css
/* bad */
div {
  // position: relative;
  transform: translateZ(0);
}

/* good */
div {
  /* position: relative; */
  will-change: transform;
}
```


## JavaScript

### Readability

Don't obfuscate the intent of your code by using seemingly smart tricks.

```javascript
// bad
foo || doSomething();

// good
if (!foo) doSomething();
```
```javascript
// bad
void function() { /* IIFE */ }();

// good
(function() { /* IIFE */ }());
```
```javascript
// bad
const n = ~~3.14;

// good
const n = Math.floor(3.14);
```


Always use names that mean something and provide information on what the function does/variable is.

```javascript
// bad
function functionNo1() {
    //code
}

//good
function hasTheUserCompletedForm() {
    //code
}

function activateButton() {
    $button.click(function() {
        doThat();
        doThis();
        makeSomethingElse();
    }
}
```
```javascript
// bad
var variableA;

//good
var buttonThatIsClicked,
    valueFromUser;

```

### Code reuse

Don't be afraid of creating lots of small, highly composable and reusable functions. Avoid global variables!

```javascript
// bad
arr[arr.length - 1];

// good
const first = arr => arr[0];
const last = arr => first(arr.slice(-1));
last(arr);
```
```javascript
// bad
const product = (a, b) => a * b;
const triple = n => n * 3;

// good
const product = (a, b) => a * b;
const triple = product.bind(null, 3);
```
```javascript
// bad
    var importantValue = 99;
    $('.class').text();
    $('.anotherclass').click(function () {
        $(this).do(thing).do(anotherThing);
        if (otherThing == true || very-complicated-condition) {
            $anArray.map().filter().doOtherThings()
            $anObject.doEvenMoreThings()
        }
    });

// good

function doTaskOne() {
    $('.class').text();
}

function doTaskTwo() {
    $(this).do(thing).do(anotherThing);
}

function doTaskThree() {
    $anArray.map().filter().doOtherThings();
    $anObject.doEvenMoreThings();
}

function resolveCondition() {
   return otherThing == true || very-complicated-condition;
}

function joinTogetherSmallTasks (passedArgument) {
    var importantValue = passedArgument;
    
    doTaskOne();
    $('.anotherclass').click(function () {
        doTaskTwo();
        if ( resolveCondition() ) {
            doTaskThree();
        }
    });
}

joinTogetherSmallTasks(99);

```

### Performance

Favor readability, correctness and expressiveness over performance. JavaScript will basically never
be your performance bottleneck. Optimize things like image compression, network access and DOM
reflows instead. If you remember just one guideline from this document, choose this one.

```javascript
// bad (albeit way faster)
const arr = [1, 2, 3, 4];
const len = arr.length;
var i = -1;
var result = [];
while (++i < len) {
  var n = arr[i];
  if (n % 2 > 0) continue;
  result.push(n * n);
}

// good
const arr = [1, 2, 3, 4];
const isEven = n => n % 2 == 0;
const square = n => n * n;

const result = arr.filter(isEven).map(square);
```


#!!!THE PART BELOW NEEDS TO BE UPDATED!!!
### Statelessness

Try to keep your functions pure. All functions should ideally produce no side-effects, use no outside data and return new objects instead of mutating existing ones.

```javascript
// bad
const merge = (target, ...sources) => Object.assign(target, ...sources);
merge({ foo: "foo" }, { bar: "bar" }); // => { foo: "foo", bar: "bar" }

// good
const merge = (...sources) => Object.assign({}, ...sources);
merge({ foo: "foo" }, { bar: "bar" }); // => { foo: "foo", bar: "bar" }
```

### Natives

Rely on native methods as much as possible.

```javascript
// bad
const toArray = obj => [].slice.call(obj);

// good
const toArray = (() =>
  Array.from ? Array.from : obj => [].slice.call(obj)
)();
```

### Coercion

Embrace implicit coercion when it makes sense. Avoid it otherwise. Don't cargo-cult.

```javascript
// bad
if (x === undefined || x === null) { ... }

// good
if (x == undefined) { ... }
```

### Loops

Don't use loops as they force you to use mutable objects. Rely on `array.prototype` methods.

```javascript
// bad
const sum = arr => {
  var sum = 0;
  var i = -1;
  for (;arr[++i];) {
    sum += arr[i];
  }
  return sum;
};

sum([1, 2, 3]); // => 6

// good
const sum = arr =>
  arr.reduce((x, y) => x + y);

sum([1, 2, 3]); // => 6
```
If you can't, or if using `array.prototype` methods is arguably abusive, use recursion.

```javascript
// bad
const createDivs = howMany => {
  while (howMany--) {
    document.body.insertAdjacentHTML("beforeend", "<div></div>");
  }
};
createDivs(5);

// bad
const createDivs = howMany =>
  [...Array(howMany)].forEach(() =>
    document.body.insertAdjacentHTML("beforeend", "<div></div>")
  );
createDivs(5);

// good
const createDivs = howMany => {
  if (!howMany) return;
  document.body.insertAdjacentHTML("beforeend", "<div></div>");
  return createDivs(howMany - 1);
};
createDivs(5);
```

Here's a [generic loop function](https://gist.github.com/bendc/6cb2db4a44ec30208e86) making recursion easier to use.

### Arguments

Forget about the `arguments` object. The rest parameter is always a better option because:

1. it's named, so it gives you a better idea of the arguments the function is expecting
2. it's a real array, which makes it easier to use.

```javascript
// bad
const sortNumbers = () =>
  Array.prototype.slice.call(arguments).sort();

// good
const sortNumbers = (...numbers) => numbers.sort();
```

### Apply

Forget about `apply()`. Use the spread operator instead.

```javascript
const greet = (first, last) => `Hi ${first} ${last}`;
const person = ["John", "Doe"];

// bad
greet.apply(null, person);

// good
greet(...person);
```

### Bind

Don't `bind()` when there's a more idiomatic approach.

```javascript
// bad
["foo", "bar"].forEach(func.bind(this));

// good
["foo", "bar"].forEach(func, this);
```
```javascript
// bad
const person = {
  first: "John",
  last: "Doe",
  greet() {
    const full = function() {
      return `${this.first} ${this.last}`;
    }.bind(this);
    return `Hello ${full()}`;
  }
}

// good
const person = {
  first: "John",
  last: "Doe",
  greet() {
    const full = () => `${this.first} ${this.last}`;
    return `Hello ${full()}`;
  }
}
```

### Higher-order functions

Avoid nesting functions when you don't have to.

```javascript
// bad
[1, 2, 3].map(num => String(num));

// good
[1, 2, 3].map(String);
```

### Composition

Avoid multiple nested function calls. Use composition instead.

```javascript
const plus1 = a => a + 1;
const mult2 = a => a * 2;

// bad
mult2(plus1(5)); // => 12

// good
const pipeline = (...funcs) => val => funcs.reduce((a, b) => b(a), val);
const addThenMult = pipeline(plus1, mult2);
addThenMult(5); // => 12
```

### Caching

Cache feature tests, large data structures and any expensive operation.

```javascript
// bad
const contains = (arr, value) =>
  Array.prototype.includes
    ? arr.includes(value)
    : arr.some(el => el === value);
contains(["foo", "bar"], "baz"); // => false

// good
const contains = (() =>
  Array.prototype.includes
    ? (arr, value) => arr.includes(value)
    : (arr, value) => arr.some(el => el === value)
)();
contains(["foo", "bar"], "baz"); // => false
```

### Variables

Favor `const` over `let` and `let` over `var`.

```javascript
// bad
var me = new Map();
me.set("name", "Ben").set("country", "Belgium");

// good
const me = new Map();
me.set("name", "Ben").set("country", "Belgium");
```

### Conditions

Favor IIFE's and return statements over if, else if, else and switch statements.

```javascript
// bad
var grade;
if (result < 50)
  grade = "bad";
else if (result < 90)
  grade = "good";
else
  grade = "excellent";

// good
const grade = (() => {
  if (result < 50)
    return "bad";
  if (result < 90)
    return "good";
  return "excellent";
})();
```

### Object iteration

Avoid `for...in` when you can.

```javascript
const shared = { foo: "foo" };
const obj = Object.create(shared, {
  bar: {
    value: "bar",
    enumerable: true
  }
});

// bad
for (var prop in obj) {
  if (obj.hasOwnProperty(prop))
    console.log(prop);
}

// good
Object.keys(obj).forEach(prop => console.log(prop));
```

### Objects as Maps

While objects have legitimate use cases, maps are usually a better, more powerful choice. When in
doubt, use a `Map`.

```javascript
// bad
const me = {
  name: "Ben",
  age: 30
};
var meSize = Object.keys(me).length;
meSize; // => 2
me.country = "Belgium";
meSize++;
meSize; // => 3

// good
const me = new Map();
me.set("name", "Ben");
me.set("age", 30);
me.size; // => 2
me.set("country", "Belgium");
me.size; // => 3
```

### Curry

Currying is a powerful but foreign paradigm for many developers. Don't abuse it as its appropriate
use cases are fairly unusual.

```javascript
// bad
const sum = a => b => a + b;
sum(5)(3); // => 8

// good
const sum = (a, b) => a + b;
sum(5, 3); // => 8
```

### Dependencies

Minimize dependencies. Third-party is code you don't know. Don't load an entire library for just a couple of methods easily replicable:

```javascript
// bad
var _ = require("underscore");
_.compact(["foo", 0]));
_.unique(["foo", "foo"]);
_.union(["foo"], ["bar"], ["foo"]);

// good
const compact = arr => arr.filter(el => el);
const unique = arr => [...Set(arr)];
const union = (...arr) => unique([].concat(...arr));

compact(["foo", 0]);
unique(["foo", "foo"]);
union(["foo"], ["bar"], ["foo"]);
```
