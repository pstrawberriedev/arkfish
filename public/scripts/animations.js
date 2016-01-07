// Height:auto Accordion example - adapted
// http://codepen.io/MAW/pen/NPqVMb
$(".shaneAccordion").each(function() {
  var shaneAccordionClick = $(this).find('h3');
  shaneAccordionClick.click(function(){
    var $this = $(this).parent(),
        $content = $this.find(".content"),
        $arrow = $(this).find(".arrow");
    if(!$this.hasClass("closed")){
      TweenLite.to($content, 0.18, {height:0, margin:0, overflow:"hidden",ease:Power1.easeInOut})
      $this.addClass("closed");
    } else {
      TweenLite.set($content, {height:"auto", margin:"0 0 15 0", overflow:"auto",ease:Power1.easeInOut})
      TweenLite.from($content, 0.18, {height:0, margin:0, overflow:"hidden",ease:Power1.easeInOut})
      $this.removeClass("closed");
    }
  });
});

// Radio Buttons with Hidden Fields (PCAT Shipping/BOPS)
//
// Format Example:
//<fieldset class="shaneRadios">
//  <div class="radioWrap hasHidden">
//    <input />
//    <div class="hiddenContent"></div>
//  </div>
//</fieldset>
//
$('.shaneRadios .radioWrap').each(function() {
  
  //Discourage hard-coding heights in the JS
  var radioHeight = $(this).height();
  
  $(this).click(function() {
    //Apply Radio check functionality to entire container instead of small box
    $(this).find('input').prop("checked", true);
    
    //Apply hidden "slide-up" functionality
    if($(this).hasClass('hasHidden') && !$(this).hasClass('active') || !$(this).hasClass('hasHidden')) {
      $('.shaneRadios .radioWrap').removeClass('active');
      var $span = $('.shaneRadios .radioWrap span'),
          $input = $('.shaneRadios .radioWrap input'),
          $content = $('.shaneRadios .radioWrap .hiddenContent');
      TweenLite.to($content, 0.18, {y:radioHeight,ease:Power1.easeInOut})
      TweenLite.to($span, 0.18, {autoAlpha:1,ease:Power1.easeInOut})
      TweenLite.to($input, 0.18, {autoAlpha:1,ease:Power1.easeInOut})
    }
    if($(this).hasClass('hasHidden')) {
      var $span = $(this).find('span'),
          $input = $(this).find('input'),
          $content = $(this).find('.hiddenContent');
      $(this).addClass('active');
      TweenLite.to($content, 0.18, {y:0,ease:Power1.easeInOut})
      TweenLite.to($span, 0.18, {autoAlpha:0,ease:Power1.easeInOut})
      TweenLite.to($input, 0.18, {autoAlpha:0,ease:Power1.easeInOut})
    }
      
  });
  
});

// Login Functionality (Google-esque)
$('.shaneProgress').each(function() {
  // Setup
  var $this = $(this),
      $wrap = $this.find('.wrap'),
      $step = $this.find('.step'),
      // Height & Width Settings
      $width = 500,
      $height = 200,
      $widthInv = $width - $width*2,
      $heightInv = $height - $height*2,
      $totalSteps = $step.length,
      $wrapWidth = $totalSteps * $width;
      
      $step.width($width);
      $step.height($height);
      $this.width($width);
      $this.height($height);
      $wrap.width($wrapWidth);
  
  console.log($totalSteps);
  
  // Login Email Check
  // vars
  var $emailStep = $this.find('.step.email'),
      $emailField = $this.find('input#email'),
      $emailNext = $this.find('.step.email .progressButton.email'),
      $emailSuccess = $this.find('.step.emailSuccess');
  
  //Function to check email
  function checkEmail() {
    //do back-end checking stuff here...
    return true;
  }
  
  $emailField.on("input", function() {
    var emailInput = this.value;
    console.log(emailInput);
    if(emailInput != "") {
      TweenLite.to($emailNext, .5, {autoAlpha:1,ease:Power1.easeInOut})
    } else {
      TweenLite.to($emailNext, .5, {autoAlpha:0,ease:Power1.easeInOut})
    }
  });
  
  //
  $emailNext.click(function() {
    if(checkEmail()) {
      console.log('Email Success');
      TweenLite.to($wrap, 0.18, {x:$widthInv,ease:Power1.easeInOut})
    } else {
      $emailNext.addClass('warning');
      $emailNext.text('Invalid Email - Please Try Again');
    }
  });
  
});

// Slick Slider
// http://kenwheeler.github.io/slick/
$('.dragSlide').slick({
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 5,
  slidesToScroll: 2,
  respondTo: 'window',
  responsive: [
    {
      breakpoint: 1050,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 750,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});