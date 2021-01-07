/*
  * ScrollAnim テンプレート *
  <div class="js-scrollAnim">
    何か
  </div>

  foundation/_js.scss で 
  .js-scrollAnim {
    opacity: 0;
    transition: 0.4s $ease-out;
    &.on-anim {
      opacity: 1;
    }
  }

  opacity は仮で、動きは好きなやつで良い
*/

import "intersection-observer"; // polyfill

export default class ScrollAnim {
  constructor(selector) {
    this.selector = selector || ".js-scrollAnim";
    this.$anim = $(this.selector);
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
      rootMargin: "-20% 0px",
      threshold: 0,
    };

    this.observer = new IntersectionObserver(this.intersect.bind(this), option);
    this.observe(this.$anim);
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
        this.anim($target);
      }
    });
  }

  anim($elem) {
    $elem.addClass("on-anim")
  }
}
