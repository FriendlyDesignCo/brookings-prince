function tweetShare() {
	var s=s_gi(s_account);
	s.linkTrackVars='events';
	s.linkTrackEvents='event13';
	s.events='event13';
	s.tl(true,'o','Tweet Share Set');
}

function facebookShare() {
	var s=s_gi(s_account);
	s.linkTrackVars='events';
	s.linkTrackEvents='event14';
	s.events='event14';
	s.tl(true,'o','Facebook Share Set');
}

function emailShare() {
	var s=s_gi(s_account);
	s.linkTrackVars='events';
	s.linkTrackEvents='event15';
	s.events='event15';
	s.tl(true,'o','Email Share Set');
}

function newsletter() {
	var s=s_gi(s_account);
	s.linkTrackVars='events';
	s.linkTrackEvents='event5';
	s.events='event5';
	s.tl(true,'o','NewsLetter');
}

function othersocialShare() {
      var s=s_gi(s_account);
      s.linkTrackVars='events';
      s.linkTrackEvents='event19';
      s.events='event19';
      s.tl(true,'o','Other Social Share Set');
}


function lazyLoadImages(selector) {
  var marked = $(selector + "[data-original != null]");
  $(marked).each(function() {
    $(this).lazyload({
      effect : "fadeIn"
      , threshold : 200
    });
  });
}


function setSlideInMessage(objId, objWrapperId, endpointId, altClass, valign, valignpx) {
  $(objId).stop();

  $(window).scroll(function() {
      if ($(window).scrollTop() > ($(objWrapperId).offset().top - valignpx))
        $(objId).addClass(altClass);
      else
        $(objId).removeClass(altClass);
  });

  $(objId).waypoint(function(direction) {
    if (direction == 'down') {
      $(objId).fadeIn("slow");
    }
    else {
      $(objId).fadeOut();
    }
  }, { offset: '90%' });

  $(endpointId).waypoint(function(direction) {
    if (direction == 'up') {
      $(objId).fadeIn("slow");
    }
    else {
      $(objId).fadeOut();
    }
  });
}


function setSlideInMessageOld(objId, objWrapperId, endpointId, altClass) {
  $(objId).stop();

  $(window).scroll(function() {
      if ($(window).scrollTop() > ($(objWrapperId).offset().top - 85))
        $(objId).addClass(altClass);
      else
        $(objId).removeClass(altClass);
  });

  $(objId).waypoint(function(direction) {
    if (direction == 'down') {
      $(objId).effect('slide', { direction: 'right', mode: 'show' }, 500);
    }
    else {
      $(objId).effect('slide', { direction: 'down', mode: 'hide' }, 200);
    }
  }, { offset: '90%' });

  $(endpointId).waypoint(function(direction) {
    if (direction == 'up') {
      $(objId).effect('slide', { direction: 'down', mode: 'show' }, 500);
    }
    else {
      $(objId).effect('slide', { direction: 'up', mode: 'hide' }, 200);
    }
  });
}


function formFieldPlaceholder() {
  $('[placeholder]').focus(function() {
    var input = $(this);
    if (input.val() == input.attr('placeholder')) {
      input.val('');
      input.removeClass('placeholder');
    }
  }).blur(function() {
    var input = $(this);
    if (input.val() == '' || input.val() == input.attr('placeholder')) {
      input.addClass('placeholder');
      input.val(input.attr('placeholder'));
    }
  }).blur().parents('form').submit(function() {
    $(this).find('[placeholder]').each(function() {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
        input.val('');
      }
    })
  });
}


function validate() {
	//alert('Validate Start');
	//alert('Form2, email (jquery): ' + $('#Form2 input[name=email]').val());
	//alert('testform, email (document.forms): ' + document.forms["testform"]["email"].value);
	//var x=document.forms["testform"]["email"].value;

	var x = $('#Form2 input[name=email]').val();
	var atpos=x.indexOf("@");
	var dotpos=x.lastIndexOf(".");

	//alert('atpos, dotpos: ' + x.indexOf("@") + ',' + x.lastIndexOf("."));

	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
		alert("Not a valid e-mail address");
		return false;
	}
	else {
		//document.getElementById("testform").submit();
		document.getElementById("Form2").submit();
		alert("thank you for signing up");
		newsletter();
	}
}

function runScript(e) {
	if (e.keyCode == 13) {
		validate();		
	}
}



// BEGIN FRIENDLY CHANGES

var animateContent = function() {
  $('.animation-container').each(function() {
    var windowHeight = $(window).height();
    var containerTop = $(this).offset().top;
    var scrollTop = $(window).scrollTop();
    if ((containerTop - scrollTop) <= windowHeight * 0.65 && !$(this).hasClass('visible')) {
      $(this).addClass('visible');
    }
  });
};

var widowFixCount = 0;
$(document).ready(function(){ 
  setInterval(function() {
    animateContent();
  }, 200);

  // DRF is firing twice, so avoid this for widowFix by incrementing widowFixCount variable.
  if (widowFixCount == 0) {
    $('.content p, .content h3, .content h2, .content blockquote').widowFix();
    widowFixCount++;
  }
});