/*
  * Lazyload テンプレート *
  html内画像 の場合
  <img src="ここでは 本当の画像が読み込む前に、仮に超軽い画像を入れると良い" alt="Pick up" class="js-lazyImg" data-lazy="画像パス">

  background-image の場合
  <div class="something_bg js-lazyBg" data-lazy="画像パス"></div>

  background-image の場合には scss で width、height 設定する必要がある
  .something_bg {
    width: 150px;
    height: 150px;
  }
*/

import "intersection-observer"; // polyfill
export default class LazyLoad {
  constructor() {
    this.$lazyImg = $(".js-lazyImg");
    this.$lazyBg = $(".js-lazyBg");
  }

  init() {
    this.createIntersectionObserver();
  }

  /**
   * IntersectionObserver コンストラクタでインスタンス生成.
   */
  createIntersectionObserver() {
    const option = {
      root: null, // - null: viewport をルートにする.
      rootMargin: "50% 0px",
      threshold: 0,
    };

    this.observer = new IntersectionObserver(this.intersect.bind(this), option);
    this.observe(this.$lazyBg);
    this.observe(this.$lazyImg);
  }

  /**
   * 交差の監視を開始する.
   * @param {JQuery} $elem - 監視する要素.
   */
  observe($elem) {
    $elem.each((_, elem) => {
      this.observer.observe(elem);
    });
  }

  /**
   * 要素が交差したときに呼び出される関数.
   * @param entries
   */
  intersect(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // isIntersecting が true の要素に処理を適用.
        const $target = $(entry.target);
        this.loadImg($target);
      }
    });
  }

  /**
   * 画像を読み込む.
   * @param {JQuery} $elem - IntersectionObserver によって交差を検知された要素.
   */
  loadImg($elem) {
    const lazyImgSrc = $elem.data("lazy");

    if ($elem.hasClass("on-load") || !lazyImgSrc) return;

    const img = new Image();
    img.src = lazyImgSrc;

    img.onload = () => {
      const isBg = $elem.hasClass("js-lazyBg") ? true : false;
      isBg
        ? $elem.css({ backgroundImage: `url(${img.src})` })
        : $elem.attr("src", img.src);

      $elem.addClass("on-load");
    };
  }
}
