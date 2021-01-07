export default class Loading {
  constructor() {
    this.$loading = $(".loading");
    this.$body = $("body");
  }

  init() {
    setTimeout(() => {
      this.$loading.addClass("on-load");
      this.$body.addClass("on-load");
    }, 1000);

    setTimeout(() => {
      this.$loading.remove();
    }, 1600);
  }
}
