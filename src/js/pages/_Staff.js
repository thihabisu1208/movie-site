import App from "../common/_App";

export default class Staff extends App {
    constructor() {
        super();
        this.$staff = $(".staffData_list");
        this.$staffList = $(".staffDataItem_works");
        this.$staffAccordion = $(".staffData_item");
    }

    init() {
        if ($("main.staff").length) {
            this.addEvents();
        }
    }

    addEvents() {
        console.log("staff")
        this.staffAccordion();
        this.$window.on("resize", this.onResize.bind(this));
    }

    staffAccordion() {
        this.$staffAccordion.each((_, elem) => {
            let $elem = $(elem);
            let $others = $elem.siblings(".staffData_item");
            let $hidden = $elem.find(".staffDataItem_outer");
            let $hiddenList = $elem.find(".staffDataItem_works");
            let $othersHidden = $others.find(".staffDataItem_outer");
            
            $elem.on("click", (e) => {
                let $check = this.$staff.offset().left - $hidden.offset().left;

                if($elem.hasClass(this.className.active)) {
                    $elem.removeClass(this.className.active);
                    $hidden.height(0);
                    return;
                }

                console.log($check)
                
                if($check != -10) {
                    $hidden.css("transform", `translateX(${(this.$staff.offset().left - $hidden.offset().left) + 10}px)`)
                }
                $elem.addClass(this.className.active);
                $others.removeClass(this.className.active);
                $hidden.height($hiddenList.height() + 50);
                $othersHidden.height(0);
                setTimeout(() => {
                    $("html, body").animate({ scrollTop: $elem.offset().top - 75 }, "slow");
                }, 300);
            });
        })
    }

    onResize() {
        if (this.resizeTimer) clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
            // location.reload();
        }, 100);
    }
}

$(() => {
  const staff = new Staff();
  staff.init();
});