/*
  * AnchorScroll テンプレート *
  <ul class="js-anchor">
    <li><a href="#行先名">行先名</a></li>
    <li><a href="#行先名2" class="has-margin">行先名2</a></li>
  </ul>

  <div id="行先名"></div>
  <div id="行先名2"></div>

  has-margin クラスが付いてる場合は 行く先エレメントの 100px上に止まる
*/

import Util from "../common/_Util";

export default class AnchorScroll {
  constructor() {
    this.$anchorNav = $(".js-anchor a");
    this.util = new Util();
  }

  init() {
    this.addEvents();
  }

  addEvents() {
    this.$anchorNav.on("click", this.onClickAnchorNav.bind(this));
  }

  onClickAnchorNav(e) {
    e.preventDefault();
    const $target = $(e.currentTarget);
    const $href = $($target.attr("href"));
    const hasMargin = $target.hasClass("has-margin");
    const margin = hasMargin ? 100 : 0;
    const targetPos = $href.offset().top - margin;
    this.util.smoothScroll(targetPos);
  }
}
