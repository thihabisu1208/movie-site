import App from "../common/_App";

export default class Drone extends App {
    constructor() {
        super();
        this.$link = $(".droneTop_link");
        this.$footer = $("footer");
    }

    init() {
        if ($("main.drone").length) {
            this.addEvents();
        }
    }

    addEvents() {
        this.$window.on("scroll", this.onScroll.bind(this));
    }

    onScroll() {
        if(this.$link.offset().top > this.$footer.offset().top - 200) {
            this.$link.addClass("is-hide");
        } else {
            this.$link.removeClass("is-hide");
        }
    }
}
