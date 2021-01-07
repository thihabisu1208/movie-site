/*
  * Share テンプレート *
  <a class="js-shareItem -sns名">
    シェアする SNS
  </a>
*/

import App from "../common/_App";

export default class Share extends App {
  constructor() {
    super();
    this.itemSelector = ".js-shareItem";
    this.$copy = $(`${this.itemSelector}.-copy`);
    this.$twitter = $(`${this.itemSelector}.-twitter`);
    this.$line = $(`${this.itemSelector}.-line`);
    this.$facebook = $(`${this.itemSelector}.-facebook`);
    this.isCopy = false;
  }

  init() {
    this.addEvents();
  }

  addEvents() {
    this.$copy.on("click", this.copyURL.bind(this));
    this.$twitter.on("click", this.shareTwitter.bind(this));
    this.$line.on("click", this.shareLine.bind(this));
    this.$facebook.on("click", this.shareFacebook.bind(this));
  }

  copyURL() {
    $("body").append(`<textarea id="CopyUrlArea"></textarea>`);
    const $copyUrlArea = $("#CopyUrlArea");
    const href = window.location.href;
    $copyUrlArea.text(href);
    $copyUrlArea.select();
    document.execCommand("copy");
    $copyUrlArea.remove();
    this.appendCopyAlert();
  }

  shareTwitter() {
    const hash = "";
    const encodedURI = this.getShareUrl();
    const str = ""
    const ttl = document.title;
    const shareTxt = str.length ? `${str}\n${ttl}\n` : `${ttl}\n`;
    // const url = 'https://twitter.com/share?url=' + encodedURI + '&text=' + shareTxt + "\n&hashtags=" + hash;
    const url = `https://twitter.com/share?url=${encodedURI}&text=${shareTxt}`;
    this.createWindow(encodeURI(url), "twitterWindow");
  }

  shareLine() {
    const encodedURI = this.getShareUrl();
    const str = ""
    const ttl = document.title;
    const shareTxt = str ? `${str}\n${ttl}\n` : `${ttl}\n`;
    const url = `https://line.me/R/msg/text/?${shareTxt}${encodedURI}`;
    this.createWindow(encodeURI(url), "lineWindow");
  }

  shareFacebook() {
    const encodedURI = this.getShareUrl();
    const url = "https://www.facebook.com/sharer.php?u=" + encodedURI;
    this.createWindow(url, "facebookWindow");
  }

  getShareUrl() {
    const domain = location.origin;
    const pathname = location.pathname;
    const date = new Date().getTime().toString();
    const encodedURI = encodeURI(
      `${domain}${pathname}?sdt=${date}`.replace(/\#.+$/g, "")
    );

    return encodedURI;
  }

  createWindow(url, name) {
    const option =
      "width=600,height=500,personalbar=0,toolbar=0,scrollbars=1,resizable=1";

    window.open(url, name, option);
  }

  appendCopyAlert() {
    if (this.isCopy) return;
    this.isCopy = true;

    $("body").append(`<p id="CopyAlert">URLをコピーしました。</p>`);
    $("#CopyAlert").fadeIn("normal", () => {
      setTimeout(() => {
        $("#CopyAlert").fadeOut("normal", () => {
          $("#CopyAlert").remove();
          this.isCopy = false;
        });
      }, 1000);
    });
  }
}
