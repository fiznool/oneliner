Shrinks a piece of text to fit on one line.

## Example

``` html
<div class="outer">
  <div class="inner fit-text">This text needs to fit on one line.</div>
</div>
```

Make sure the outer container has a set width:

``` css
.outer {
  width: 100%;
}

.inner {
  font-size: 16px;
}

.fit-text {
  white-space: nowrap;
  visibility: hidden;
}
```

Once the HTML is in the DOM:

``` js
$('.fit-text').oneliner({
  fit: function($el) {
    $el.removeClass('fit-text');
  }
});
```

## Usage

``` js
$('.fit-text').oneLiner({
  // Minimum limits for letter spacing and font size
  font-size: 12,
  letter-spacing: 1,

  fit: function($el) {
    // Text was fitted onto one line. $el is text object.
  },
  noFit: function($el) {
    // Text could not be fitted as the limits were reached,
    // but the text has limits applied.
    // $el is text object.
  }
})
```

- `.fit-text` is the text that you need to fit on one line.
- `font-size` is the minimum font-size to shrink to.
- `letter-spacing` is the minimum letter-spacing to shrink to.
- `fit`/`noFit` are called after the text was fitted / not fitted.

## How?

The script reduces the letter spacing by 1px at a time, until the text fits on one line or the letter-spacing limit is reached.

If the letter spacing limit is reached without a fit, the font size is reduced by 1px, and the letter spacing is reset to the original value. Letter spacing is then reduced as above.

If the font-size and the letter-spacing limits are both reached without a fit, the script ends and the `noFit` callback is run. Otherwise, the `fit` callback is run.