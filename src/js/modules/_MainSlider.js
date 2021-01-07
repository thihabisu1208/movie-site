import Swiper, { Navigation, Pagination, Autoplay } from "swiper";
import App from "../common/_App";

Swiper.use([Navigation, Pagination, Autoplay]);

export default class MainSlider extends App {
  constructor(selector) {
    super();
    this.selector = {
      main: selector || ".js-mainSlider",
    };
    this.selector.list = `${this.selector.main} > ul`;
    this.selector.prev = `${this.selector.main} .swiper-button-prev`;
    this.selector.next = `${this.selector.main} .swiper-button-next`;
    this.selector.pagination = `${this.selector.main} .swiper-pagination`;
  }

  init() {
    const option = {
      spaceBetween: 30,
      effect: "fade",
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        prevEl: this.selector.prev,
        nextEl: this.selector.next,
      },
    };

    this.slider = new Swiper(this.selector.main, option);
  }
}
