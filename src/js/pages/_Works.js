import Swiper, { Autoplay, EffectCoverflow, Controller } from "swiper";
import App from "../common/_App";

import gsap from "gsap";

Swiper.use([Autoplay, EffectCoverflow, Controller]);

export default class Works extends App {
  constructor() {
    super();
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

    this.$year = $(".worksOther_year");
    this.$slideList = $(".worksOtherSlider_inner");
    
    this.otherOption = {
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
      slideToClickedSlide: true
    };

    this.$link = $(".worksTop_link");
    this.$slideFooter = $(".worksOther_slider");
    this.$footer = $("footer");
  }

  init() {
    if ($("main.works").length) {
      this.addEvents();
    }
    $(".worksOther_select select").on("change", (e) => {
      let optionSelected = $("option:selected").text();
      this.$year.text(optionSelected);
      this.createYearlySlides(optionSelected);
    });

    $(".worksOther_select-year-pc li").each((_, elem) => {
      let $elem = $(elem);
      $elem.on("click", () => {
        let year = $elem.data("year");
        this.$year.text(year);
        this.createYearlySlides(year);
        $elem.addClass("is-active");
        $elem.siblings().removeClass("is-active");
      })
    });
  }

  addEvents() {
    this.initiateMainSlider();
    this.$year.text(2021);
    this.createYearlySlides(2021);
    this.$window.on("scroll", this.onScroll.bind(this));
  }

  initiateMainSlider() {
    if(window.innerWidth < this.width.medium) {
      let option = {
        loop: true,
        slidesPerView: "3",
        loop: true,
        autoplay: {
          delay: 1,
          disableOnInteraction: true
        },
        freeMode: true,
        speed: 5000,
        freeModeMomentum: false,
        simulateTouch: false,
      };
      this.mainSwiper = new Swiper(this.mainSlider, option);
    } else {
      let option = {
        loop: true,
        slidesPerView: "7",
        loop: true,
        autoplay: {
          delay: 1,
          disableOnInteraction: true
        },
        freeMode: true,
        speed: 5000,
        freeModeMomentum: false,
        simulateTouch: false,
      };
      this.mainSwiper = new Swiper(this.mainSlider, option);
    }
  }

  createYearlySlides(year) {
    this.$slideFooter.addClass("is-hide");
    // EN
    if(location.pathname.indexOf("en") > -1) {
      $.getJSON(this.WORKS_URL_EN, (res) => {
        if(this.otherSwiper) {
          this.$slideList.empty();
          this.otherSwiper.destroy();
        }
        for(let i = 0; i < Object.keys(res).length; i++) {
          if(Object.keys(res)[i] == year) {
            // get designated year
            let yearList = res[Object.keys(res)[i]];

            for(let j = 0; j < yearList.length; j++) {
              if(yearList[j].url !== "") {
                let template = `
                  <li class="worksOtherSlider_item swiper-slide">
                    <img src="${yearList[j].img}" />
                    <div class="details">
                      <h3 class="ttl">${yearList[j].ttl}</h3>
                      <p class="desc">${yearList[j].desc}<p>
                      <p class="credit">${yearList[j].credit}<p>
                      <div class="link">
                        <a href="${yearList[j].url}" target="_blank">公式サイト→</a>
                      </div>
                    </div>
                  </li>
                `;
                this.$slideList.append(template);
              } else {
                let template = `
                <li class="worksOtherSlider_item swiper-slide">
                  <img src="${yearList[j].img}" />
                  <div class="details">
                    <h3 class="ttl">${yearList[j].ttl}</h3>
                    <p class="desc">${yearList[j].desc}<p>
                    <p class="credit">${yearList[j].credit}<p>
                  </div>
                </li>
              `;
              this.$slideList.append(template);
              }
            }
          }
        }
      }).then(() => {
        this.$slideFooter.removeClass("is-hide");
        this.otherSwiper = new Swiper(this.otherSlider.slider, this.otherOption);
        this.otherSwiper.slideTo(Math.floor(this.$slideList.children().length / 2), false, false)
        $(this.otherSlider.buttons).css({
          "right": `${$(this.otherSlider.slider).width() / 2 - 70}px`,
          "left": "auto"
        });
      });
    } 
    // JP
    else {
      $.getJSON(this.WORKS_URL, (res) => {
        if(this.otherSwiper) {
          this.$slideList.empty();
          this.otherSwiper.destroy();
        }
        for(let i = 0; i < Object.keys(res).length; i++) {
          if(Object.keys(res)[i] == year) {
            // get designated year
            let yearList = res[Object.keys(res)[i]];

            for(let j = 0; j < yearList.length; j++) {
              if(yearList[j].url !== "") {
                let template = `
                  <li class="worksOtherSlider_item swiper-slide">
                    <img src="${yearList[j].img}" />
                    <div class="details">
                      <h3 class="ttl">${yearList[j].ttl}</h3>
                      <p class="desc">${yearList[j].desc}<p>
                      <p class="credit">${yearList[j].credit}<p>
                      <div class="link">
                        <a href="${yearList[j].url}" target="_blank">公式サイト→</a>
                      </div>
                    </div>
                  </li>
                `;
                this.$slideList.append(template);
              } else {
                let template = `
                <li class="worksOtherSlider_item swiper-slide">
                  <img src="${yearList[j].img}" />
                  <div class="details">
                    <h3 class="ttl">${yearList[j].ttl}</h3>
                    <p class="desc">${yearList[j].desc}<p>
                    <p class="credit">${yearList[j].credit}<p>
                  </div>
                </li>
              `;
              this.$slideList.append(template);
              }
            }
          }
        }
      }).then(() => {
        this.$slideFooter.removeClass("is-hide");
        this.otherSwiper = new Swiper(this.otherSlider.slider, this.otherOption);
        this.otherSwiper.slideTo(Math.floor(this.$slideList.children().length / 2), false, false)
        // $(this.otherSlider.buttons).css({
        //   "right": `${$(this.otherSlider.slider).width() / 2 - 70}px`,
        //   "left": "auto"
        // });
      });
    }
  }

  onScroll() {
    if(window.innerWidth < this.width.small) {
      if(this.$link.offset().top > this.$slideFooter.offset().top - 200) {
          this.$link.addClass("is-hide");
      } else {
          this.$link.removeClass("is-hide");
      }
    } else {
      if(this.$link.offset().top > this.$footer.offset().top - 200) {
        this.$link.addClass("is-hide");
    } else {
        this.$link.removeClass("is-hide");
    }
    }
}
}
