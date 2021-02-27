import Util from "./_Util";

export default class App {
  constructor() {
    this.$window = $(window);
    this.$html = $("html");
    this.$body = $("body");

    this.util = new Util();
    this.width = this.util.width;
    this.className = this.util.className;

    this.scrollTop = 0;
    this.resizeTimer = false;
    this.defaultWidth = window.innerWidth;

    this.TOP_SLIDES_URL = "/movie-site/assets/data/top_slides.json";
    this.NEWS_URL = "/movie-site/assets/data/news.json";
    this.WORKS_URL = "/movie-site/assets/data/works.json";

    this.initApp();
  }

  initApp() {
    this.addEventsApp();
  }

  addEventsApp() {
    this.$window.on("scroll.AppEvent", this.onScrollApp.bind(this));
  }

  onScrollApp() {
    this.scrollTop = this.$window.scrollTop();
  }

  /**
   * 無効化したスクロールを有効化する.
   */
  toEnableScroll() {
    this.$body.css({
      position: "",
      top: "",
    });
    this.$window.scrollTop(this.savedScrollTop);
  }

  /**
   * スクロールを無効化する.
   */
  toDisableScroll() {
    this.savedScrollTop = this.scrollTop
      ? this.scrollTop
      : this.$window.scrollTop();
    setTimeout(() => {
      this.$body.css({
        position: "fixed",
        top: -this.savedScrollTop,
      });
    }, 0);
  }

  /**
   * SP サイズ時に fixed 要素のスクロール領域から外れた場合を監視.
   * touch イベントを無効化させる.
   * @param {JQuery} $elem - スクロール要素.
   * @param {String} nameSpace - イベントの名前空間.
   */
  onOutScroll($elem, nameSpace) {
    let touchStartY = 0,
      touchMoveY = 0,
      diff = 0;

    const elem = $elem[0];

    $elem.on(`touchstart.${nameSpace}`, (e) => {
      touchStartY = e.touches[0].pageY;
    });
    $elem.on(`touchmove.${nameSpace}`, (e) => {
      touchMoveY = e.changedTouches[0].pageY;
      diff = touchStartY - touchMoveY;

      const scrollPosFlg = {
        top: elem.scrollTop == 0 && diff < 0,
        bottom:
          elem.scrollTop + elem.clientHeight == elem.scrollHeight && diff > 0,
      };

      if (scrollPosFlg.top || scrollPosFlg.bottom) {
        if (e.cancelable) e.preventDefault();
      }
    });
  }

  offOutScroll($elem, nameSpace) {
    $elem.off(nameSpace);
  }

  isBodyFixed() {
    const flg = this.$body.css("position") === "fixed";
    return flg;
  }
}
