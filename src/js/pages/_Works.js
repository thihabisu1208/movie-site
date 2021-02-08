import Swiper, { Autoplay, EffectCoverflow, Controller } from "swiper";
import Slick from "slick-carousel";
import App from "../common/_App";

Swiper.use([Autoplay, EffectCoverflow, Controller]);

export default class Works extends App {
  constructor() {
    super();
    // this.$mainSlider = $(".worksTop_mainSlider");
    // this.$mainSliderInner = $(".worksTopMainSlider_inner");
    this.mainSlider = ".worksTop_mainSlider";
    this.otherSlider = {
      slider: ".worksOther_slider",
      buttons: ".worksOther_slider .buttons",
      prev: ".worksOther_slider .swiper-button-prev",
      next: ".worksOther_slider .swiper-button-next",
      pagination: ".worksOther_slider .swiper-pagination"
    };
    this.mainSwiper;
    this.otherSwiper;
  }

  init() {
    if ($("main.works").length) {
      this.addEvents();
    }
  }

  addEvents() {
    this.initiateMainSlider();
    this.initiateMainSlider();
    this.initiateOtherSliders();
  }

  // initiateMainSlider() {
  //   $(".worksTopMainSlider_inner").not(".slick-initialized").slick({
  //     // arrows: false,
  //     autoplay: true,
  //     /* ポイントここから～ */
  //     autoplaySpeed: 0,
  //     cssEase: 'linear',
  //     speed: 5000,
  //     /* ～ここまで */
  //     slidesToShow: 7,
  //     slidesToScroll: 1,
  //   });
  // }

  initiateMainSlider() {
    const option = {
      slidesPerView: 'auto',
      loopPreventsSlide: false,
      freeMode: true,
      speed: 5000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false
      },
      loop: true,
      loopedSlides: (this.mainSlider).length
    };
  
    this.mainSwiper = new Swiper(this.mainSlider, option);
  }

  initiateOtherSliders() {
    const otherOption = {
      // loop: true,
      slidesPerView: "auto",
      speed: 1000,
      coverflowEffect: {
        depth: 500,
        modifier: 1,
        rotate: 1,
        stretch: 10
      },
      effect: 'coverflow',
      centeredSlides: true,
      pagination: {
        el: this.otherSlider.pagination,
        clickable: true,
      },
      navigation: {
        prevEl: this.otherSlider.prev,
        nextEl: this.otherSlider.next,
      },
    };
  
    this.otherSwiper = new Swiper(this.otherSlider.slider, otherOption);
    this.otherSwiper.slideTo(Math.floor(this.otherSlider.slider.length / 2 / 2) - 1, false, false)
    $(this.otherSlider.buttons).css({
      "right": `${$(this.otherSlider.slider).width() / 2 - 70}px`,
      "left": "auto"
    });
  }
}
