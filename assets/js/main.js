jQuery(window).scroll(function(){
  if (jQuery(this).scrollTop() > 100) {
     jQuery('.header-area').addClass('header-position');
  } else {
     jQuery('.header-area').removeClass('header-position');
  }
});

new WOW().init();

jQuery(function(){
  jQuery('#menu-nav').slicknav({
    label: '',
    allowParentLinks:false,
    openedSymbol:"",
    closedSymbol:"",
    prependTo:'#menu_holder'
  });
});
(jQuery); 

jQuery(".nav-toggler").click(function() {
  jQuery(this).toggleClass("active");
  jQuery("#menu_holder").toggleClass("mobile-menu-open");
  jQuery(".header-area").toggleClass("header-bg");
  jQuery("body").toggleClass("overflow-hidden");
});
jQuery(".menu-backdrop").click(function() {
  jQuery(".nav-toggler").removeClass("active");
  jQuery("#menu_holder").removeClass("mobile-menu-open");
  jQuery(".header-area").removeClass("header-bg");
  jQuery("body").removeClass("overflow-hidden");
});



  jQuery(document).ready(function () {
    let isOpen = false;
    jQuery('.tear').on('click', function () {
      isOpen = !isOpen;
      jQuery('.tear').toggleClass('active', isOpen);
      jQuery('.message').toggleClass('active', isOpen);
      if (isOpen) {
        jQuery('.message').focus();
        jQuery(this).html("<span><i class='fa fa-close'></i></span>");
      } else {
        jQuery('.message').val('');
        jQuery(this).html("<span><i class='fa-solid fa-magnifying-glass'></i></span>");
      }
    });
  });

// banner-slider js
  const bannerSlider = new Swiper('.banner-slider', {
      effect: 'fade',
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      fadeEffect: {
        crossFade: true,
      },
    });


// photo-gallary-sldier
  const photoGallarySlider = new Swiper('.photo-gallary-sldier', {
      effect: 'fade',
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      fadeEffect: {
        crossFade: true,
      },
    });


  

// div scroll animation
gsap.registerPlugin(ScrollTrigger);
const animateFromDirection = (selector, xVal = 0, yVal = 0, zoom = false) => {
  gsap.utils.toArray(selector).forEach(el => {
    const delay = parseFloat(el.dataset.delay) || 0;
    const animationProps = {
      x: xVal,
      y: yVal,
      opacity: 0,
      duration: 1,
      delay: delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 100%",
        toggleActions: "play none none reverse"
      }
    };

    // If zoom is true, scale from 0.8
    if (zoom) {
      animationProps.scale = 0.8;
    }
    gsap.from(el, animationProps);
  });
};
// Direction-based animations
animateFromDirection(".fade-in-up", 0, 50);
animateFromDirection(".fade-in-left", -50, 0);
animateFromDirection(".fade-in-right", 50, 0);
animateFromDirection(".fade-in", 0, 0);
animateFromDirection(".zoom-in", 0, 0, true);


var dynamicPeatures = new Swiper(".dynamicPeatures", {
  slidesPerView: 5,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination-fraction",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    init: function () {
      updateProgress(this);
    },
    slideChange: function () {
      updateProgress(this);
    },
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1080: {
      slidesPerView: 4,
      spaceBetween: 20,
    },

    1300: {
      slidesPerView: 4,
      spaceBetween: 20,
    },

    1620: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1880: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
  },
});

function updateProgress(swiper) {
  const progressEl = document.querySelector(".progress-width");
  if (!progressEl) return;

  const totalSlides = swiper.slides.length - swiper.loopedSlides * 2; // only real slides
  const currentIndex = swiper.realIndex; // 0-based index

  let progress = ((currentIndex + 1) / totalSlides) * 100;
  progress = Math.min(progress, 100);

  progressEl.style.width = progress + "%";
}


// ==========orbit-logo logo js==============
const icons = document.querySelectorAll('.orbit-logo');
const wrapper = document.querySelector('.circle-wrapper');
const orbit = document.getElementById('orbit');
let iconTweens = [];
function updateOrbitPosition() {
  const rect = wrapper.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const radius = window.innerWidth < 768 ? 120 : 180;

  icons.forEach((icon, index) => {
    const angle = (index / icons.length) * Math.PI * 2;
    const x = centerX + radius * Math.cos(angle) - icon.offsetWidth / 2;
    const y = centerY + radius * Math.sin(angle) - icon.offsetHeight / 2;
    icon.style.left = `${x}px`;
    icon.style.top = `${y}px`;
  });
}

// Animate orbit container
const orbitTween = gsap.to(orbit, {
  rotation: 360,
  duration: 30,
  ease: "linear",
  repeat: -1,
  transformOrigin: "50% 50%"
});

// Counter-rotate each orbiting logo
icons.forEach(icon => {
  iconTweens.push(
    gsap.to(icon, {
      rotation: -360,
      duration: 30,
      ease: "linear",
      repeat: -1,
      transformOrigin: "50% 50%"
    })
  );
});

// Pause on hover
wrapper.addEventListener('mouseenter', () => {
  orbitTween.pause();
  iconTweens.forEach(t => t.pause());
});
wrapper.addEventListener('mouseleave', () => {
  orbitTween.play();
  iconTweens.forEach(t => t.play());
});

// Init and resize
updateOrbitPosition();
window.addEventListener('resize', updateOrbitPosition);





// ==========text wave animation===============
    gsap.registerPlugin(ScrollTrigger);
    function wrapWords(element) {
      const nodes = Array.from(element.childNodes);
      nodes.forEach(node => {
        if (node.nodeType === 3) { // text node
          const text = node.textContent;
          const fragment = document.createDocumentFragment();
          // split on spaces, keep spaces by adding a space after each word span
          text.trim().split(/\s+/).forEach((word, i, arr) => {
            const span = document.createElement('span');
            span.className = 'word';
            span.textContent = word;
            fragment.appendChild(span);
            // Add a space after every word except the last
            if (i !== arr.length -1) {
              fragment.appendChild(document.createTextNode(' '));
            }
          });
          element.replaceChild(fragment, node);
        } else if (node.nodeType === 1) { // element node
          wrapWords(node);
        }
      });
    }

    document.querySelectorAll('.animate-text').forEach(el => {
      wrapWords(el);
      gsap.to(el.querySelectorAll('.word'), {
        scrollTrigger: {
          trigger: el,
          start: 'top 100%',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        duration: 0.1,
        stagger: 0.1
      });
    });

// accordion js
jQuery(document).ready(function () {
  jQuery('.pos-accordion-header').on('click', function () {
    const $clickedItem = $(this).closest('.pos-accordion-item');
    const $accordion = $clickedItem.closest('.pos-accordion');

    // Close others in the same column
    $accordion.find('.pos-accordion-item').not($clickedItem).removeClass('active')
      .find('.pos-accordion-body').slideUp(200);

    // Toggle current item
    $clickedItem.toggleClass('active');
    $clickedItem.find('.pos-accordion-body').stop(true, true).slideToggle(200);
  });

  // back to up btn js
  var lastScrollTop = 0;
    jQuery(window).scroll(function() {
      var st = jQuery(this).scrollTop();
      if (st > lastScrollTop) {
        jQuery('.back-to-top').addClass('active');
      } else {
        jQuery('.back-to-top').removeClass('active');
      }
      lastScrollTop = st;
    });
    jQuery('.back-to-top').click(function(e) {
      e.preventDefault();
      jQuery('html, body').animate({scrollTop: 0}, 100);
    })
});


//============personalized-scroll-photo js===========
gsap.registerPlugin(ScrollTrigger);
if (window.innerWidth > 1100) {
  const photoImages = document.querySelectorAll(".personalized-scroll-photo img");
  const infoBlocks = document.querySelectorAll(".info-block");

  // Function to get dynamic start offset
  const getStartOffset = () => {
    if (window.innerWidth >= 1600) return "top-=100 center";
    if (window.innerWidth >= 1300 && window.innerWidth < 1600) return "top-=50 center";
    return "top center";
  };

  const getPinStartOffset = () => {
    if (window.innerWidth >= 1600) return "top-=100 top";
    if (window.innerWidth >= 1300 && window.innerWidth < 1600) return "top-=60 top";
    return "top top";
  };

  function setActive(index) {
    photoImages.forEach((img, i) => {
      if (i === index) {
        gsap.to(img, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" });
        img.classList.add("active");
      } else {
        gsap.to(img, { opacity: 0, scale: 0.95, duration: 0.4, ease: "power2.in" });
        img.classList.remove("active");
      }
    });

    infoBlocks.forEach((block, i) => {
      block.classList.toggle("active", i === index);
    });
  }

  // Set initial image states
  photoImages.forEach((img, i) => {
    gsap.set(img, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 0.95 });
  });
  setActive(0);

  // ScrollTrigger for each info block
  infoBlocks.forEach((block, index) => {
    ScrollTrigger.create({
      trigger: block,
      start: getStartOffset(),
      end: "bottom center",
      onEnter: () => setActive(index),
      onEnterBack: () => setActive(index),
    });
  });

  // Pin the image section with dynamic start
  ScrollTrigger.create({
    trigger: ".personalized-scroll-gallery",
    start: getPinStartOffset(),
    end: "bottom bottom",
    pin: ".personalized-right",
  });
}

