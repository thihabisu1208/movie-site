/*
  * Stick テンプレート *
  <div class="js-stick_container">
    <div class="js-stick_inner">
      <div class="js-stick">
        追従したいやつ
      </div>
      <div>
        追従したくても良いやつ
      </div>
    </div>
  </div>

  使うページの js に下記のように入れる
  import Stick from "../../modules/_Stick"; // stick を import
  this.stick = new Stick(); // constructor 内で 設定
  this.stick.init(); // init 変数などで実行する
*/

import App from "../common/_App";

export default class Stick extends App {
  constructor() {
    super();
    this.$stick = $(".js-stick");
    this.$stickInner = $(".js-stick_inner");
    this.$container = this.$stick.parents(".js-stick_container");
    this.stickPosition = 100;
  }

  init() {
    this.reset();
    this.prepare();
    this.onScroll();
    this.addEvents();
  }

  prepare() {
    if (!this.$stick.length || !this.$container.length) return;

    const containerBottomPosition =
      this.$container.innerHeight() + this.$container.offset().top;

    this.startPosition = this.$stick.offset().top - this.stickPosition;
    this.endPosition =
      containerBottomPosition - this.$stick.innerHeight() - this.stickPosition;
  }

  addEvents() {
    this.$window.on("scroll.StickEvent", this.onScroll.bind(this));
  }

  onScroll() {
    if (window.innerWidth < this.width.small || this.isBodyFixed()) return;

    this.stickHeight = this.$stick.innerHeight();
    this.containerHeight = this.$container.innerHeight();

    this.isStick = this.scrollTop > this.startPosition && this.scrollTop < this.endPosition;

    this.isStick ? this.stick() : this.clearStick();
  }

  stick() {
    this.$stick.removeClass(`${this.className.fixed}-bottom`);
    this.$stick.removeClass(`${this.className.fixed}-top`);
    this.$stickInner.removeClass(`${this.className.fixed}-bottom`);
    this.$stickInner.removeClass(`${this.className.fixed}-top`);
    this.$stick.addClass(this.className.fixed);
  }

  clearStick() {
    this.$stick.removeClass(this.className.fixed);

    if (this.scrollTop > this.endPosition) {
      this.$stick.addClass(`${this.className.fixed}-bottom`);
      this.$stickInner.addClass(`${this.className.fixed}-bottom`);
    }
    else {
      this.$stick.addClass(`${this.className.fixed}-top`);
      this.$stickInner.addClass(`${this.className.fixed}-top`);
    }
  }

  reset() {
    this.$stick.removeClass(this.className.fixed);
    this.$stick.removeClass(`${this.className.fixed}-bottom`);
    this.$stick.removeClass(`${this.className.fixed}-top`);
  }
}
