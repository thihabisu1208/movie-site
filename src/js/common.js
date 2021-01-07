import LazyLoad from "./common/_LazyLoad";
import GuardImg from "./common/_GuardImg";
import SetModal from "./common/_SetModal";

import ScrollAnim from "./modules/_ScrollAnim";
import AnchorScroll from "./modules/_AnchorScroll";
import Accordion from "./modules/_Accordion";
import Share from "./modules/_Share";

import Top from "./pages/_Top";

$(() => {
  const lazyLoad = new LazyLoad();
  lazyLoad.init();

  const guardImg = new GuardImg();
  guardImg.init();

  const setModal = new SetModal();
  setModal.init();

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
