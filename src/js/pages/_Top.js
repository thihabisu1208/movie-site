import App from "../common/_App";
import Stick from "../modules/_Stick";
import OmitTxt from "../modules/_OmitTxt";
import MainSlider from "../modules/_MainSlider";
import AnimateText from "../modules/_AnimateText";

export default class Top extends App {
  constructor() {
    super();
    this.stick = new Stick();
    this.omitTxt = new OmitTxt();
    this.mainSlider = new MainSlider();
    this.animateText = new AnimateText();
  }

  init() {
    if ($("main.home").length) {
      this.addEvents();
    }
  }

  addEvents() {
    this.omitTxt.init();
    this.stick.init();
    this.mainSlider.init();
    this.animateText.init();
  }
}
