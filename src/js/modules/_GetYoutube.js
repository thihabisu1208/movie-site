import "intersection-observer"; // polyfill
import Util from "../common/_Util";
import MediaSlider from "./_MediaSlider";
import Modal from "./_Modal";

export default class GetYoutube  {
  constructor() {
    this.util = new Util();
    this.MAIN_LENGTH = 2;
    this.selector = {
      main: ".homeYoutube_main",
      list: ".homeYoutube_list",
      item: ".homeYoutube_item",
      inner: ".homeMediaItem_inner",
    };
    this.isAnim = false;
    this.modal = new Modal("#homeYoutubeModal");
    this.onReady = false;
    this.videoId = null;
    this.imgPath = "/assets/img";
  }

  init() {
    const path = "/api/v1/front/data/youtube";

    $.getJSON(path, (data) => {
      this.appendYoutube(data);
    });
  }

  appendYoutube(data) {
    data.forEach((item, index) => {
      const utime = {
        publishedAt: new Date(item.snippet.publishedAt).getTime(),
        now: new Date().getTime(),
        old: 60 * 60 * 24 * 365 * 1000, // 365 days (ms)
      };

      // 投稿日時が古いものは表示させない.
      if (utime.now - utime.publishedAt > utime.old) return;

      const html = `
        <li class="homeMedia_item homeMediaItem homeYoutube_item homeYoutubeItem swiper-slide">
          <div class="homeMediaItem_inner homeYoutubeItem_img" data-video-id="${item.snippet.resourceId.videoId}">
            <img src="${item.snippet.thumbnails.maxres.url}">
            <div class="c-ico_playVideo"><img src="${this.imgPath}/ico_playVideo.svg" alt="動画再生"></div>
          </div>
          <p class="homeYoutubeItem_ttl">${item.snippet.title}</p>
          <a href="https://www.youtube.com/channel/${item.snippet.channelId}" target="_blank" class="homeYoutubeItem_account">
            <img src="${item.snippet.accountThumbnail.default.url}">
            <p>${item.snippet.channelTitle}</p>
          </a>
        </li>
        `;

      index < this.MAIN_LENGTH
        ? $(this.selector.main).append(html)
        : $(this.selector.list).append(html);
    });

    new MediaSlider(".homeYoutube_slider").init();
    $(document).trigger("onInitYoutubeSlider");

    this.util.loadYouTubeIframeAPI();
    this.setAnimObserver();
    this.modal.init();
    this.addEvents();
  }

  /** ----------------------------------------
   * Scroll Animation
   ---------------------------------------- */

  setAnimObserver() {
    const option = this.util.setIntersectionOption(null, "-20% 0px");
    const observer = new IntersectionObserver(
      this.intersectAnim.bind(this),
      option
    );
    observer.observe(document.querySelector(this.selector.main));
    // observer.observe(document.querySelector(this.selector.list));
  }

  intersectAnim(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.anim($(entry.target));
      }
    });
  }

  anim($target) {
    if (this.isAnim) return;
    this.isAnim = true;
    const $item = $target.find(this.selector.item);
    $item.each((index, elem) => {
      const $elem = $(elem);
      setTimeout(() => {
        $elem.addClass(this.className.anim);
      }, index * 100);
    });
  }

  /** ----------------------------------------
   * Events
  ---------------------------------------- */

  addEvents() {
    $(this.selector.inner).on("click", this.onClickItem.bind(this));
  }

  onClickItem(e) {
    const $target = $(e.currentTarget);
    const videoId = $target.data("video-id");
    this.videoId = videoId;

    this.modal.open();

    if (this.player) this.player.destroy();

    this.player = new YT.Player("homeYoutubeModalPlayer", {
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        disablekb: 1,
        enablejsapi: 1,
        modestbranding: 1,
      },
      events: {
        onReady: this.onPlayerReady.bind(this),
        onStateChange: this.onPlayerStateChange.bind(this),
      },
    });
  }

  onPlayerReady(event) {
    this.onReady = true;
    event.target.playVideo();

    $(document).on("onModalClose", () => {
      if (this.player) this.player.pauseVideo();
    });
  }

  onPlayerStateChange(event) {}
}
