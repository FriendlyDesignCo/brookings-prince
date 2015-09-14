// JavaScript Document

// Brookings JavaScript
jQuery(document).ready(function($) {
   brookings.utility.init();

   $(window).resize(function(){ brookings.utility.resize(); });
   $(window).scroll(function(){ brookings.utility.onScroll(); });
});









/*
=============================================================================
  FUNCTION DECLARATIONS
=============================================================================
*/

var brookings = (function($) {

  /*
    Utility
    
    Various utility functions that load/unload/route data,
    call other functions, etc.
  */

  var utility = (function() {

    var debug = false;

    var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

    var init = function() { // Called on page load, calls all other functions that should occur on page load
      
      // PLUGINS CALLS / DEVICE FIXES
      // examplePlugin();
      
      // Disable scaling until user begins a gesture (prevents automatic zooming when user rotates to landscape mode)
      if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
        var viewportmeta = document.querySelector('meta[name="viewport"]');
        if (viewportmeta) {
          viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
          document.body.addEventListener('gesturestart', function () {
            viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
          }, false);
        }
      }

      // FUNCTIONS
      // uiMod.example();

      
      // REPEATING FUNCTIONS
      // var example = setInterval(function(){
      //  // do stuff
      // }, 200);


      /*
        USER INTERACTION
      */
      $('.accordion .toggle').click(function(){
        userInput.accordionToggle($(this).closest('.accordion'));
      });
    };

    var onScroll = function() { // Called when the browser window is scrolled
      // Functions
    };

    var resize = function() { // Called when the browser window is resized
      // Functions
    };

    return  {
      init: init,
      onScroll: onScroll,
      resize: resize
    }
  })();
  /* 
    UI Modifications 

    Various functions which operate on elements to achieve visual
    effects that are impossible to create with CSS alone.
  */

  var uiMod = (function() {

    var example = function() {

    };

    // public
    return {
      example: example,
    };
  })(); // var uiMod = (function() {



  /* 
    User interaction 

    Various functions which are called when the user intearcts
    with a piece of the site (eg. clicking, scrolling, etc)
  */
  var userInput = (function() {

    var accordionToggle = function(el) {
      el.find('.hiddenContent').slideToggle();
    };

    // public
    return {
      accordionToggle: accordionToggle,
    };
  })(); // var uiMod = (function() {

  

  // public
  return {
    utility: utility,
    uiMod: uiMod,
    userInput: userInput
  };
})(jQuery); // var brookings = (function() {