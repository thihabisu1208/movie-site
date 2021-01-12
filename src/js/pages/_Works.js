import App from "../common/_App";

export default class Works extends App {
  constructor() {
    super();
    this.$mainSlider = $(".worksTop_mainSlider");
    this.$mainSliderInner = $(".worksTopMainSlider_inner");
  }

  init() {
    if ($("main.works").length) {
      this.addEvents();
    }
  }

  addEvents() {
    this.$mainSliderInner.each(function(){
        var sliderWidth = $(this).width();
   
        $(this).clone(true).insertBefore(this);
        $(this).clone(true).insertAfter(this);
   
        this.$mainSlider.css('width', sliderWidth * 3);
  })
}
}
