import { gsap } from "gsap";
import Util from "../common/_Util";

export default class OmitTxt {
  constructor() {
    this.selector = {
      target: ".js-omitTxt",
      container: ".js-omitTxt_container",
    };
    this.DOM = {
      target: document.querySelectorAll(this.selector.target),
      more: document.querySelectorAll(".js-omitTxt_more"),
    };
    this.util = new Util();
  }

  init() {
    this.prepare();
    this.omit();
    this.addEvents();
  }

  prepare() {
    const option = {
      line: {
        // 表示させる行数.
        sp: 5, // スマホサイズ.
        pc: 3, // PC サイズ.
      },
    };

    this.line =
      window.innerWidth < this.util.width.small
        ? option.line.sp
        : option.line.pc;
  }

  /**
   * テキストを省略する.
   */
  omit() {
    $(this.DOM.target).each((_, elem) => {
      const $elem = $(elem);
      if ($elem.hasClass(this.util.className.open)) return;

      const originTxtData = $elem.data("origin-txt");
      const originTxt = originTxtData ? unescape(originTxtData) : null;
      let txt = originTxt || $elem.text();

      /**
       * data属性がすでにある場合は
       * テキスト内容と要素の高さをいったんリセットする.
       */
      if (originTxtData) {
        $elem.text(originTxt);
        this.resetHeight($elem);
      }

      this.setHeight(elem);

      // オリジナルのテキストを data 属性に保存.
      $elem.attr("data-origin-txt", escape(txt));

      // 対象の要素を高さにautoを指定し非表示で複製.
      const $clone = $elem.clone();
      $clone.hide().width($elem.width()).height("auto");

      $elem.after($clone);

      // オリジナルテキストの高さになるまで1文字ずつ消去.
      while (txt.length > 0 && $clone.height() > $elem.height()) {
        txt = txt.substr(0, txt.length - 1);
        $clone.text(txt + "...");
      }

      $elem.text($clone.text());
      $clone.remove();
    });
  }

  /**
   * fontSize, lineHeight, this.prepare() で指定した表示行数から
   * 要素の高さを設定する.
   * @param {*} elem
   */
  setHeight(elem) {
    const $elem = $(elem);
    const style = document.defaultView.getComputedStyle(elem, null);
    const fontSize = Number(style.fontSize.replace(/px|rem|em|%/g, ""));
    let lineHeight = Number(style.lineHeight.replace(/px|rem|em|%/g, ""));

    // lineHeight は px に変換されるっぽい.
    if (lineHeight >= fontSize) lineHeight = lineHeight / fontSize;

    // 変更前の height を data 属性に保存.
    $elem.attr("data-origin-height", $elem.height());

    // はみ出た部分は overflow: hidden で隠して高さを設定.
    $elem.css("overflow", "hidden").height(fontSize * lineHeight * this.line);
  }

  addEvents() {
    $(this.DOM.more).on("click", this.more.bind(this));
    $(window).on("resize", this.onResize.bind(this));
  }

  /**
   * もっと見るボタンをクリックしたときの処理.
   * @param {Event} e - もっと見るボタンのクリックイベント.
   */
  more(e) {
    const $clickElem = $(e.currentTarget);
    const $container = $clickElem.parents(this.selector.container);
    const $target = $container.find(this.selector.target);
    const originTxt = $target.data("origin-txt");
    const originHeight = $target.data("origin-height");
    const tweenOption = {
      duration: 0.48,
      ease: "power2.out",
    };

    /**
     * data 属性に設定したオリジナルテキストを反映.
     * フラグ用のクラスを付与.
     */
    $target.text(unescape(originTxt)).addClass(this.util.className.open);

    // もっと見るボタンのアニメーション.
    gsap.to(
      $clickElem,
      Object.assign(
        {
          opacity: 0,
          onComplete: () => $clickElem.css("visibility", "hidden"),
        },
        tweenOption
      )
    );

    // テキストのアニメーション.
    gsap.to(
      $target,
      Object.assign(
        {
          height: originHeight,
          onComplete: () => this.resetHeight($target),
        },
        tweenOption
      )
    );
  }

  onResize() {
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.prepare();
      this.omit();
    }, 100);
  }

  resetHeight($elem) {
    $elem.css("height", "");
  }
}
