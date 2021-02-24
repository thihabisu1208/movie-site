import App from "../common/_App";

export default class Contact extends App {
  constructor() {
        super();

        this.$companyNameValue = $(".contactForm_companyName input");
        this.$companyRoleValue = $(".contactForm_companyRole input");
        this.$nameValue = $(".contactForm_name input");
        this.$nameFuriganaValue = $(".contactForm_nameFurigana input");
        this.$mailValue = $(".contactForm_mail input");
        this.$telValue = $(".contactForm_tel input");
        this.$contentValue = $(".contactForm_content textarea");

        this.$companyNameError = $(".contactForm_companyName .contactFormItem_error");
        this.$companyRoleError = $(".contactForm_companyRole .contactFormItem_error");
        this.$nameError = $(".contactForm_name .contactFormItem_error");
        this.$nameFuriganaError = $(".contactForm_nameFurigana .contactFormItem_error");
        this.$mailError = $(".contactForm_mail .contactFormItem_error");
        this.$telError = $(".contactForm_tel .contactFormItem_error");
        this.$contentError = $(".contactForm_content .contactFormItem_error");

        // this.searchParams = new URLSearchParams(window.location.search);
        // this.companyName = this.searchParams.get("company_name");
        // this.companyRole = this.searchParams.get("company_role");
        // this.name = this.searchParams.get("name_full");
        // this.nameFurigana = this.searchParams.get("name_furigana");
        // this.mail = this.searchParams.get("mail");
        // this.tel = this.searchParams.get("tel");
        // this.content = this.searchParams.get("content");
        
        this.companyName = $(".contactForm_companyName input").val();
        this.companyRole = $(".contactForm_companyRole input").val();
        this.name = $(".contactForm_name input").val();
        this.nameFurigana = $(".contactForm_nameFurigana input").val();
        this.mail = $(".contactForm_mail input").val();
        this.tel = $(".contactForm_tel input").val();
        this.content = $(".contactForm_content textarea").val();

        this.$companyName = $(".contactForm_companyName p");
        this.$companyRole = $(".contactForm_companyRole p");
        this.$name = $(".contactForm_name p");
        this.$nameFurigana = $(".contactForm_nameFurigana p");
        this.$mail = $(".contactForm_mail p");
        this.$tel = $(".contactForm_tel p");
        this.$content = $(".contactForm_content p");

        this.error = false;

        // フォーム切り替え
        this.$startBtn = $(".contactStart_btn");
        this.$returnBtn = $(".contactConfirm_return");
        this.$confirmBtn = $(".contactConfirm_btn");
        this.$completeBtn = $(".contactComplete_btn");

        this.$startForm = $(".contact_start");
        this.$confirmForm = $(".contact_confirm");
        this.$completeForm = $(".contact_complete");
    }

  init() {
        if ($("main.contact").length) {
            this.addEvents();
        }
    }

    addEvents() {
        this.validateData();
        // if(location.search) {
        //     this.addData();
        // }

        this.$startBtn.on("click", (e) => {
            // e.preventDefault();
            this.validateData();
            this.addData();
            this.$startForm.removeClass("is-active");
            this.$confirmForm.addClass("is-active");
            $("html, body").animate({ scrollTop: 0 }, "slow");
        });

        this.$returnBtn.on("click", (e) => {
            e.preventDefault();
            this.$startForm.addClass("is-active");
            this.$confirmForm.removeClass("is-active");
            $("html, body").animate({ scrollTop: 0 }, "slow");
        });

        this.$confirmBtn.on("click", (e) => {
            e.preventDefault();
            this.$startForm.removeClass("is-active");
            this.$confirmForm.removeClass("is-active");
            this.$completeForm.addClass("is-active");
            $("html, body").animate({ scrollTop: 0 }, "slow");
        });

        this.$completeBtn.on("click", (e) => {
            e.preventDefault();
            this.$startForm.addClass("is-active");
            this.$confirmForm.removeClass("is-active");
            this.$completeForm.removeClass("is-active");
            $("html, body").animate({ scrollTop: 0 }, "slow");
        });
    }

    validateData() {
        // 会社名
        this.$companyNameValue.on("keyup", (e) => {
            if(this.$companyNameValue[0].value !== "") {
                this.$companyNameError.css("display", "none");
                // this.$companyName.text(this.$companyNameValue[0].value);
            } else {
                this.$companyNameError.css("display", "block");
            }
        });

        // 名前
        this.$nameValue.on("keyup", (e) => {
            if(this.$nameValue[0].value !== "") {
                this.$nameError.css("display", "none");
            } else {
                this.$nameError.css("display", "block");
            }
        });

        // 名前 ふりがな
        this.$nameFuriganaValue.on("keyup", (e) => {
            if(this.$nameFuriganaValue[0].value !== "") {
                this.$nameFuriganaError.css("display", "none");
            } else {
                this.$nameFuriganaError.css("display", "block");
            }
        });

        // メール
        this.$mailValue.on("keyup", (e) => {
            if(this.$mailValue[0].value !== "") {
                this.$mailError.css("display", "none");
            } else {
                this.$mailError.css("display", "block");
            }
        });

        // tel
        this.$telValue.on("keyup", (e) => {
            if(this.$telValue[0].value !== "") {
                this.$telError.css("display", "none");
            } else {
                this.$telError.css("display", "block");
            }
        });

        // content
        this.$contentValue.on("keyup", (e) => {
            if(this.$contentValue[0].value !== "") {
                this.$contentError.css("display", "none");
            } else {
                this.$contentError.css("display", "block");
            }
        });
    }

    addData() {
        this.$companyName.text(this.$companyNameValue[0].value);
        this.$companyRole.text(this.$companyRoleValue[0].value);
        this.$name.text(this.$nameValue[0].value);
        this.$nameFurigana.text(this.$nameFuriganaValue[0].value);
        this.$mail.text(this.$mailValue[0].value);
        this.$tel.text(this.$telValue[0].value);
        this.$content.text(this.$contentValue[0].value);
    }
}
