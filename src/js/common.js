
import Loading from "./common/_Loading";
import LazyLoad from "./common/_LazyLoad";
import GuardImg from "./common/_GuardImg";
import SetModal from "./common/_SetModal";
import Navigation from "./common/_Navigation";

import ScrollAnim from "./modules/_ScrollAnim";
import AnchorScroll from "./modules/_AnchorScroll";
import Accordion from "./modules/_Accordion";
import Share from "./modules/_Share";

import Top from "./pages/_Top";
import Works from "./pages/_Works";
import Contact from "./pages/_Contact";
import Drone from "./pages/_Drone";

$(() => {
  const loading = new Loading();
  loading.init();

  const lazyLoad = new LazyLoad();
  lazyLoad.init();

  const guardImg = new GuardImg();
  guardImg.init();

  const setModal = new SetModal();
  setModal.init();

  const navigation = new Navigation();
  navigation.init();

  const scrollAnim = new ScrollAnim();
  scrollAnim.init();

  const anchorScroll = new AnchorScroll();
  anchorScroll.init();

  const accordion = new Accordion();
  accordion.init();

  const share = new Share();
  share.init();

  const top = new Top();
  top.init();

  const works = new Works();
  works.init();

  const contact = new Contact();
  contact.init();

  const drone = new Drone();
  drone.init();

  $(".l-footer_toTop").on("click", () => {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  })

  polyfill();
  controlScrollIE();
})

function polyfill() {
  /**
    * isNaN polyfill
    * swiper で使用されている isNaN の polyfill
    */
  const polyfill = {
    isNaN: () => {
      return typeof o === "number" && isNaN(o);
    },
  };
  Number.isNaN = Number.isNaN || polyfill.isNaN;
}

/**
   * IEのスクロール制御.
   * position: fixed がたつくのに対応.
   */
function controlScrollIE() {
  if (
    navigator.userAgent.match(/(msie|MSIE) 10/i) ||
    navigator.userAgent.match(/(T|t)rident\/7\./)
  ) {
    $("body").on("mousewheel", function (event) {
      const position = $("body").css("position");
      if (position === "fixed") return;
      event.preventDefault();
      var wd = event.wheelDelta || event.originalEvent.wheelDelta;
      var csp = window.pageYOffset;
      window.scrollTo(0, csp - wd);
    });
  }
}