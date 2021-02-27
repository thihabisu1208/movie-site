import Swiper, { Navigation, Pagination, Autoplay, EffectFade } from "swiper";
import App from "../common/_App";

Swiper.use([Navigation, Pagination, Autoplay, EffectFade]);

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

    this.$slideContainer = $(".o-mainSlider");
    this.$slideList = $(".o-mainSlider_list");
  }

  init() {
    this.getSlides();
  }

  getSlides() {
    $.getJSON(this.TOP_SLIDES_URL, (res) => {
      for(let i = 0; i < res.length; i++) {
        let item = res[i];
        if(item.fullSize === true) {
          let template = `
            <li class="o-mainSlider_item swiper-slide full">
              <div class="o-mainSlider_inner">
                <div class="o-mainSlider_img">
                  <img src="${item.img}" />
                </div>
              </div>
            </li>
          `;

          this.$slideList.append(template);
        } else {
          let template = `
            <li class="o-mainSlider_item swiper-slide">
              <div class="o-mainSlider_inner">
                <div class="o-mainSlider_img">
                  <img src="${item.img}" />
                </div>
                <div class="o-mainSlider_details">
                  <div class="o-mainSliderDetails_head">
                    <h2 class="o-mainSliderDetails_ttl u-font-azoSans">${item.ttl}</h2>
                    <h3 class="o-mainSliderDetails_subTtl u-font-azoSans">${item.subTtl}</h3>
                  </div>
                  <div class="o-mainSliderDetails_body">
                    <p class="o-mainSliderDetails_schedule"><span class="date u-font-azoSans">${item.date}</span><span class="day">${item.day}</span><span class="where">${item.place}</span></p>
                  </div>
                  <div class="o-mainSliderDetails_footer">
                    <ul class="o-mainSliderDetails_role">
                    <li>${item.roles.label1}/li>
                    <li>${item.roles.label2}</li>
                    <li>${item.roles.label3}</li>
                    <li>${item.roles.label4}</li>
                    </ul>
                    <p class="o-mainSliderDetails_year">${item.year}</p>
                  </div>
                </div>
              </div>
            </li>
          `;

          this.$slideList.append(template);
        }
      }
    }).then(() => {
      this.initiateSlide();
    })
  }

  initiateSlide() {
    const option = {
      effect: "fade",
      fadeEffect: {
        crossFade: true
      },
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      }
    };

    this.slider = new Swiper(this.selector.main, option);
  }
}
