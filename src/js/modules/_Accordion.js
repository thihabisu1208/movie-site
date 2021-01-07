/*
  * Accordion テンプレート *
  <div class="js-accordion">
    <div class="js-accordion_btn">
      開くボタン・文章など
    </div>
    <div class="js-accordion_target">
      表示するやつ
    </div>
  </div>
*/

import Util from "../common/_Util";

export default class Accordion {
  constructor() {
    this.util = new Util();
  }

  init() {
    this.setAccordion();
    this.openAccordionByHash();
  }

  setAccordion() {
    const $accordionBtn = $(".js-accordion_btn");

    $accordionBtn.on("click", (e) => {
      const $clicked = $(e.currentTarget);
      const $accordion = $clicked.parents(".js-accordion");
      const $accordionTarget = $accordion.find(".js-accordion_target");
      const duration = 400;

      $accordionTarget.slideToggle(duration, () => {
        // $accordionTarget.css("height", "auto");
      });

      $accordion.toggleClass("is-open");
    });
  }

  openAccordionByHash() {
    const hash = location.hash;
    if (!hash) return;
    const $target = $(`.js-accordion${hash}`);
    const $btn = $target.length ? $target.find(".js-accordion_btn") : false;
    if ($btn.length) {
      $btn.trigger("click");
    }
  }
}
