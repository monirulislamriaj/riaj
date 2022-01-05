// Preloader

function PageLoad() {
  $("body").removeClass("hidden");
  TweenMax.to($(".preloader-text"), 1, {
    force3D: true,
    opacity: 1,
    y: 0,
    delay: 0.2,
    ease: Power3.easeOut
  });

  var width = 100,
    perfData = window.performance.timing, 
    EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
    time = parseInt((EstimatedTime / 500) % 50) * 70;

  // Percentage Increment Animation
  var PercentageID = $("#precent"),
    start = 001,
    end = 100,
    durataion = time; 
  animateValue(PercentageID, start, end, durataion);

  function animateValue(id, start, end, duration) {
    var range = end - start,
      current = start,
      increment = end > start ? 1 : -1,
      stepTime = Math.abs(Math.floor(duration / range)),
      obj = $(id);

    var timer = setInterval(function() {
      current += increment;
      $(obj).text(current);
      if (current === end) {
        clearInterval(timer);
      }
    }, stepTime);
  }
  // Fading Out Loadbar on Finised
  setTimeout(function() {
    TweenMax.to($(".percentage, .inner"), 0.7, {
      force3D: true,
      opacity: 0,
      yPercent: -101,
      ease: Power3.easeInOut
    });
    TweenMax.to($(".preloader-wrap"), 0.7, {
      force3D: true,
      yPercent: -150,
      delay: 0.2,
      ease: Power3.easeInOut
    });
    
  }, time);
}
$(document).ready(function() {

  // preloder
  PageLoad();

  // change-navigation-color
	$(window).scroll(function () {
		if ($(document).scrollTop() > 50) {
			$(".navbar").addClass('nav__color__change');
		} else {
			$(".navbar").removeClass('nav__color__change');
		}
  });
  
  //Copyright Date
  document.getElementById("newYear").innerHTML = new Date().getFullYear();
  // Smooth scrolling

  $("a.scroll").on("click", function (event) {
    var $anchor = $(this);
    $("body, html")
      .stop()
      .animate({
          scrollTop: $($anchor.attr("href")).offset().top,
        }, 1000);
    event.preventDefault();
    if (screen.width < 992) {
      $(".navbar-toggler").click();
    }
  });
  $('.navbar-nav>li>a').on('click', function () {
		$('.navbar-collapse').collapse('hide');
	});

  // service slider
  $('.service__slider').slick({
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      }
    ]
  });

  // skill count
  
	$('.skill__progress').waypoint(function(){
    $('.progress-value span').each(function(){
      $(this).prop('Counter',0).animate({
          Counter: $(this).text()
      },{
          duration: 3000,
          easing: 'swing',
          step: function (now){
              $(this).text(Math.ceil(now));
          }
      });
    });
    $('.skill__progress_item').addClass('js-animation');
    this.destroy();
  },{ offset: '80%' });
  
  // Testimonial slider
  $('.testimonial__slider').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  });

  // Modal Popup
  $('.popup-button').magnificPopup({
    type: 'iframe',
    iframe: {
      patterns: {
        youtube: {
          index: 'youtube.com/', 
          id: 'v=',
          src: '//www.youtube.com/embed/tgbNymZ7vqY'
        },
      }
    }
  });

  // isotop
("use strict");
var $grid = $(".grid").isotope({
  itemSelector: ".grid-item",
  percentPosition: true,
  masonry: {
    // use outer width of grid-sizer for columnWidth
    columnWidth: 1
  }
});
// filter items on button click
$(".isotop-menu").on("click", "button", function() {
  var filterValue = $(this).attr("data-filter");
  $grid.isotope({
    filter: filterValue
  });
});
$(".isotop-menu button").on("click", function(event) {
  $(this)
    .siblings(".active")
    .removeClass("active");
  $(this).addClass("active");
  event.preventDefault();
});
  
});

// G-Map
/**
 * Created by Kausar on 06/10/2016.
 */
window.marker = null;

function initialize() {
    var map;
    var nottingham = new google.maps.LatLng(23.7783741, 90.3746808);
    var style = [
      {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#e9e9e9"
              },
              {
                  "lightness": 17
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#f5f5f5"
              },
              {
                  "lightness": 20
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#ffffff"
              },
              {
                  "lightness": 17
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#ffffff"
              },
              {
                  "lightness": 29
              },
              {
                  "weight": 0.2
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#ffffff"
              },
              {
                  "lightness": 18
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#ffffff"
              },
              {
                  "lightness": 16
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#f5f5f5"
              },
              {
                  "lightness": 21
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#dedede"
              },
              {
                  "lightness": 21
              }
          ]
      },
      {
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#ffffff"
              },
              {
                  "lightness": 16
              }
          ]
      },
      {
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "saturation": 36
              },
              {
                  "color": "#333333"
              },
              {
                  "lightness": 40
              }
          ]
      },
      {
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#f2f2f2"
              },
              {
                  "lightness": 19
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#fefefe"
              },
              {
                  "lightness": 20
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#fefefe"
              },
              {
                  "lightness": 17
              },
              {
                  "weight": 1.2
              }
          ]
      }
  ];
    var mapOptions = {
        // SET THE CENTER
        center: nottingham,
        // SET THE MAP STYLE & ZOOM LEVEL
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        // REMOVE ALL THE CONTROLS EXCEPT ZOOM
        zoom: 13,
        panControl: false,
        scrollwheel: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE
        }
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    // SET THE MAP TYPE
    var mapType = new google.maps.StyledMapType(style, {
        name: "Grayscale"
    });
    map.mapTypes.set('grey', mapType);
    map.setMapTypeId('grey');
    //CREATE A CUSTOM PIN ICON
    var marker_image = 'images/pin.png';
    var pinIcon = new google.maps.MarkerImage(marker_image, null, null, null, new google.maps.Size(25, 34));
    marker = new google.maps.Marker({
        position: nottingham,
        map: map,
        icon: pinIcon,
        title: 'bizcred'
    });
}
google.maps.event.addDomListener(window, 'load', initialize);