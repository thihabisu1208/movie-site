/*
  * Modal テンプレート *
  <a data-toggle="modal" data-target="#test_modal">モーダルを開くボタン</a>

  <div id="test_modal" class="p-modal js-modal modal">
    <div class="p-modal_bg js-modal_bg">
      <div class="p-modal_close js-modal_close"></div>
      <div class="p-modal_inner js-modal_inner">
        <div class="p-modal_content js-modal_content">コンテンツ</div>
      </div>
    </div>
  </div>
*/

import App from "../common/_App";

export default class Modal extends App {
  constructor(selector) {
    super();
    this.$modal = selector ? $(selector) : $(".js-modal");

    this.$bg = this.$modal.find(".js-modal_bg");
    this.$inner = this.$modal.find(".js-modal_inner");
    this.$close = this.$modal.find(".js-modal_close");
    this.$content = this.$modal.find(".js-modal_content");
    this.$openBtn = $(".js-modal_openBtn");
    this.duration = 200;
    this.isOpen = false;
  }

  init() {
    this.addEvents();
  }

  addEvents() {
    this.$bg.on("click", this.close.bind(this));
    this.$close.on("click", this.close.bind(this));
    this.$openBtn.on("click", this.open.bind(this));
    this.$window.on("resize", this.onResize.bind(this));
  }

  open(e) {
    if (e) e.preventDefault();
    this.toDisableScroll();
    setTimeout(() => {
      this.isOpen = true;
      this.$modal.height(window.innerHeight);
      this.$modal.fadeIn(this.duration, () => {
        this.$inner.addClass(this.className.open);
      });
    }, 100);
  }

  close() {
    this.isOpen = false;
    this.$inner.removeClass(this.className.open);
    this.$modal.fadeOut(this.duration);
    this.toEnableScroll();
  }

  onResize() {
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.$modal.height(window.innerHeight);
    }, 100);
  }
}
