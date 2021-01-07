import UAParser from "ua-parser-js";
import { gsap } from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default class Util {
  constructor() {
    this.width = {
      min: 320,
      xxsmall: 375,
      xsmall: 560,
      small: 760,
      medium: 960,
      large: 1200,
      xlarge: 1450,
      max: 1920,
    };
    this.className = {
      open: "is-open",
      close: "is-close",
      show: "is-show",
      hide: "is-hide",
      active: "is-active",
      inactive: "is-inactive",
      small: "is-small",
      large: "is-large",
      fixed: "is-fixed",
      load: "on-load",
    };
  }

  getParser() {
    this.parser = new UAParser();
    this.result = this.parser.getResult();
    this.os = this.result.os.name;
    this.browser = this.result.browser.name;
  }

  getIsIEorEdge() {
    if (!this.browser) return;
    const isIEorEdge = this.browser.match(/IE|Edge/) ? true : false;
    return isIEorEdge;
  }

  loadYouTubeIframeAPI() {
    const loadClassName = "on-load-youtubeIframeApi";
    if (document.body.classList.contains(loadClassName)) return;

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // API 用の JavaScript のダウンロードが完了すると API がこの関数を呼び出します.
    window.onYouTubeIframeAPIReady = () => {
      $(document).trigger("onYouTubeIframeAPIReady");
      document.body.classList.add(loadClassName);
    };
  }

  /**
   * タッチデバイスかどうか判定.
   */
  isTouchDevice() {
    window.ontouchstart = false;
    return window.ontouchstart === null ? true : false;
  }

  /**
   * スムーススクロール.
   * @param {Number} scrollPos - 目標のスクロール位置.
   */
  smoothScroll(scrollPos) {
    const tweenOption = {
      scrollTo: {
        y: scrollPos,
      },
      duration: 1.2,
      ease: "power2.inOut",
    };

    gsap.to(window, tweenOption);
  }
}
