export default class Navigation {
  constructor() {
    this.urlParams = window.location.pathname;
    this.$headerNav = $(".l-header_nav");
    this.$headerSPNav = $(".l-sp_nav");
    this.$hambergerSP = $(".l-sp_ham");
    this.$headerNavItems = this.$headerNav.find(".l-header_nav-item");
    this.$headerSpItems = this.$headerSPNav.find(".l-sp_nav-item");
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
    this.$hambergerSP.on('click', () => this.onClickHumberger());
  }

  onClickNavHeader() {
    this.$headerNavItems
      .find(`a[href$="${this.urlParams}"]`)
      .closest("li")
      .addClass("is-active")
      .siblings("li")
      .addClass("is-inactive");

      this.$headerSpItems
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

  onClickHumberger() {
    $("body, .l-sp_ham, .l-header_sp").toggleClass('active');
  }
}
