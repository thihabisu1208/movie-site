export default class GuardImg {
  constructor() {
    this.DOM = {
      img: document.querySelectorAll("img"),
    };
  }

  init() {
    this.guard();
  }

  guard() {
    $(this.DOM.img).each((_, elem) => {
      // 右クリック禁止.
      elem.oncontextmenu = () => {
        return false;
      };
      // ドラッグ禁止.
      elem.onselectstart = () => {
        return false;
      };
      elem.onmousedown = () => {
        return false;
      };
    });
  }
}
