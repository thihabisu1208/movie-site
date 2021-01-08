export default class Navigation {
  constructor() {
    this.urlParams = window.location.pathname;
    this.$headerNav = $(".l-header_nav");
    this.$headerNavItems = this.$headerNav.find(".l-header_nav-item");
    this.$footerNav = $(".l-footer_nav");
    this.$footerNavItems = this.$footerNav.find(".l-footer_nav-item");
  }

  init() {
    if (this.urlParams !== "/") {
      this.addEvents();
    }
  }

  addEvents() {
    this.onClickNavHeader();
    this.onClickNavFooter();
  }

  onClickNavHeader() {
    this.$headerNavItems
      .find(`a[href$="${this.urlParams}"]`)
      .closest("li")
      .addClass("is-active")
      .siblings("li")
      .addClass("is-inactive");
  }

  onClickNavFooter() {
    this.$footerNavItems
      .find(`a[href$="${this.urlParams}"]`)
      .closest("li")
      .addClass("is-active")
      .siblings("li")
      .addClass("is-inactive");
  }
}
