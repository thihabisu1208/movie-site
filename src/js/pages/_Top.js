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

    this.$newsList = $(".homeNews_list");
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
    this.getNews();
  }

  getNews() {
    $.getJSON(this.NEWS_URL, (res) => {
      for(let i = 0; i < res.length; i++) {
        const newsItem = res[i];
        if(newsItem.url !== "") {
          // json 内の url に何かが入ってると リンクにする
          let template = `
            <li class="homeNews_item">
              <a href="${newsItem.url}" target="_blank">
                <div class="homeNewsItem_date">${newsItem.date}</div>
                <div class="homeNewsItem_txt">${newsItem.label}</div>
              </a>
            </li>
          `;
          this.$newsList.append(template);
        } else {
          // 入ってない場合は テキストにする
          let template = `
            <li class="homeNews_item no-link">
              <a>
                <div class="homeNewsItem_date">${newsItem.date}</div>
                <div class="homeNewsItem_txt">${newsItem.label}</div>
              </a>
            </li>
          `;
          this.$newsList.append(template);
        }
      }
    })
  }
}
