import App from "./_App";

export default class Navigation extends App {
  constructor() {
    super();
    this.urlParams = window.location.pathname;
    this.$headerNav = $(".l-header_nav");
    this.$headerSP = $(".l-ham");
    this.$headerSPNav = $(".l-sp_nav");
    this.$hambergerSP = $(".l-sp_ham");
    this.$hambergerTtl = $(".l-sp_ttl");
    this.$lang = $(".l-header_lang");
    this.$langSp = $(".l-sp_lang");
    this.$langEn = $(".l-header_lang a:first-child, .l-sp_lang a:first-child")
    this.$langJp = $(".l-header_lang a:last-child, .l-sp_lang a:last-child")
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
    this.checkLang();
    this.onClickNavHeader();
    this.onClickNavFooter();
    this.$window.on("scroll", this.onScroll.bind(this));
    this.$headerSP.on('click', () => this.onClickHumberger());
  }

  checkLang() {
    if(location.pathname.indexOf("en") > -1) {
      this.$langEn.each((_, elem) => {
        $(elem).addClass(this.className.active);
      });
      this.$langJp.each((_, elem) => {
        $(elem).removeClass(this.className.active);
      });
    } else {
      this.$langJp.each((_, elem) => {
        $(elem).addClass(this.className.active);
      });
      this.$langEn.each((_, elem) => {
        $(elem).removeClass(this.className.active);
      });
    }
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
    $(".l-sp_ham, .l-header_sp, .l-sp_ttl").toggleClass('active');
  }

  onScroll() {
    if(window.innerWidth < this.width.medium) return;
    if(this.$hambergerSP.offset().top > 600) {
        this.$hambergerSP.addClass("is-show");
        this.$hambergerTtl.addClass("is-show");
    } else {
        this.$hambergerSP.removeClass("is-show");
        this.$hambergerTtl.removeClass("is-show");
        $(".l-sp_ham, .l-header_sp, .l-sp_ttl").removeClass("active");
    }
}
}
