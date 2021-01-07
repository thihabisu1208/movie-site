import gsap from "gsap";

export default class AnimateText {
  constructor() {
    this.text = document.querySelectorAll(".js-animateText");

    this.config = {
      root: null,
      rootMargin: "-20% 0px",
      threshold: 0
    };
  }

  init() {
    this.animatingTxt();
  }

  animateTxt(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  animatingTxt() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elem = entry.target;
          const $elem = $(elem);
          const html = Number(elem.innerHTML);

          if (!$elem.hasClass("done")) {
            $elem.addClass("done");
            const num = elem.dataset.num;
            const duration = elem.dataset.duration;

            this.animateTxt(elem, html, num, duration);
          }
        }
      });
    }, this.config);

    this.text.forEach((txt) => {
      observer.observe(txt);
    })
  }
}
