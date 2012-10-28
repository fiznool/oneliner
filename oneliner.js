/*!
 * oneliner.js v0.1.0
 * Shrinks text to fit on a single line.
 * Based on jQuery lightweight boilerplate plugin patter
 * https://github.com/addyosmani/jquery-plugin-patterns
 * Licensed under the MIT license
 */

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function($, window, document, undefined) {

  // undefined is used here as the undefined global
  // variable in ECMAScript 3 and is mutable (i.e. it can
  // be changed by someone else). undefined isn't really
  // being passed in so we can ensure that its value is
  // truly undefined. In ES5, undefined can no longer be
  // modified.
  // window and document are passed through as local
  // variables rather than as globals, because this (slightly)
  // quickens the resolution process and can be more
  // efficiently minified (especially when both are
  // regularly referenced in your plugin).
  // Create the defaults once
  var pluginName = 'oneliner',
    defaults = {
      'font-size': 10,
      'letter-spacing': 1,
      fit: function() {},
      noFit: function() {}
    };

  // The actual plugin constructor


  function Plugin(element, options) {
    this.element = element;

    // jQuery has an extend method that merges the
    // contents of two or more objects, storing the
    // result in the first object. The first object
    // is generally empty because we don't want to alter
    // the default options for future instances of the plugin
    this.options = $.extend({}, defaults, options);

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  Plugin.prototype = {

    init: function() {
      // Place initialization logic here
      // You already have access to the DOM element and
      // the options via the instance, e.g. this.element
      // and this.options
      // you can add more functions like the one below and
      // call them like so: this.yourOtherFunction(this.element, this.options).
      this.$element = $(this.element);

      var letterSpacing = this.getStyle('letter-spacing');
      // Guard against letter-spacing === 'normal'
      if (isNaN(letterSpacing)) {
        letterSpacing = 0; // TODO figure out letter spacing instead
      }
      
      var fontSize = this.getStyle('font-size');
      
      this.original = {
        'letter-spacing': letterSpacing,
        'font-size': fontSize
      };

      this.current = {
        'letter-spacing': letterSpacing,
        'font-size': fontSize
      };

      var fit = this.shrink();
      var callback = fit ? 'fit' : 'noFit';
      this.options[callback].call(this, this.$element);

    },

    shrink: function() {
      // Try to shrink the text to fit on one line.
      // Do this by reducing the letter spacing and font size.
      limitReached = false;

      while(!this.doesFit() && !limitReached) {
        if (this.current['letter-spacing'] > -this.options['letter-spacing']) {
          // Try reducing the letter spacing
          this.current['letter-spacing'] -= 1;
          this.setStyle('letter-spacing');

        } else {
          // We've come to the limit of reducing letter spacing.
          // Reduce the font-size by 1 and try again from the original letter spacing.
          this.current['letter-spacing'] = this.original['letter-spacing'];
          this.resetStyle('letter-spacing');

          if (this.current['font-size'] > this.options['font-size']) {
            this.current['font-size'] -= 1;
            this.setStyle('font-size');

          } else {
            limitReached = true;
          }
          
        }
        
      }

      return !limitReached;
    },

    doesFit: function() {
      // Element fits if it cannot be scrolled.
      return this.element.scrollWidth <= this.element.clientWidth;
    },

    getStyle: function(style) {
      return parseInt(this.$element.css(style), 10);
    },

    setStyle: function(style) {
      this.$element.css(style, this.current[style] + 'px');
    },

    resetStyle: function(style) {
      this.$element.css(style, "");
    }
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if(!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  };

})(window.jQuery || window.Zepto, window, document);