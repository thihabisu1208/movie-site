/*
  * YoutubeModal テンプレート *
  <div id="youtubeModal" class="p-youtubeModal  js-modal">
    <div class="p-youtubeModal_bg p-modal_bg js-modal_bg">
      <div class="p-youtubeModal_close p-modal_close js-modal_close">閉じるボタン</div>
      <div class="p-youtubeModal_inner p-modal_inner">
        <div class="p-youtubeModal_content p-modal_content">
          <div class="p-youtubeModal_playerContainer">
            <div id="youtubeModalPlayer" class="p-youtubeModal_player">ここは動画</div>
          </div>
        </div>
      </div>
    </div>
  </div>
*/

import App from "../common/_App";
import Modal from "./_Modal";

export default class YoutubeModal extends App {
  constructor(selector = "#youtubeModal") {
    super();
    this.DOM = {};
    this.DOM.trigger = document.querySelectorAll("*[data-video-id]");

    this.player = false;
    this.modal = new Modal(selector);
  }

  init() {
    if (!document.body.classList.contains("on-load-youtubeIframeApi")) {
      this.util.loadYouTubeIframeAPI();
    }
    this.modal.init();
    this.addEvents();
  }

  addEvents() {
    $(this.DOM.trigger).on("click", this.open.bind(this));
  }

  open(e) {
    const target = e.currentTarget;
    const videoId = target.getAttribute("data-video-id");

    if (this.player) this.player.destroy();

    this.player = new YT.Player("youtubeModalPlayer", {
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

    this.modal.open();
  }

  onPlayerReady(event) {
    event.target.playVideo();

    $(document).on("onModalClose", () => {
      if (this.player) this.player.pauseVideo();
    });
  }

  onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
      event.target.seekTo(0, true); // 動画の初めにシーク.
      event.target.playVideo(); // 動画を再生.
    }
  }
}
