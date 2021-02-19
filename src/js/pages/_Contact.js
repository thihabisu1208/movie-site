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

        this.searchParams = new URLSearchParams(window.location.search);
        this.companyName = this.searchParams.get("company_name");
        this.companyRole = this.searchParams.get("company_role");
        this.name = this.searchParams.get("name_full");
        this.nameFurigana = this.searchParams.get("name_furigana");
        this.mail = this.searchParams.get("mail");
        this.tel = this.searchParams.get("tel");
        this.content = this.searchParams.get("content");

        this.$companyName = $(".contactForm_companyName p");
        this.$companyRole = $(".contactForm_companyRole p");
        this.$name = $(".contactForm_name p");
        this.$nameFurigana = $(".contactForm_nameFurigana p");
        this.$mail = $(".contactForm_mail p");
        this.$tel = $(".contactForm_tel p");
        this.$content = $(".contactForm_content p");

        this.error = false;
    }

  init() {
        if ($("main.contact").length) {
            this.addEvents();
        }
    }

    addEvents() {
        this.validateData();
        if(window.location.pathname.indexOf("confirm") > -1) {
            this.addData();
        }
        $(".contactForm_return").on("click", () => {
            location.href("/movie-site/contact/")
        });
    }

    validateData() {
        // 会社名
        this.$companyNameValue.on("keyup", (e) => {
            if(this.$companyNameValue[0].value !== "") {
                this.$companyNameError.css("display", "none");
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

        // const error = this.$companyNameValue[0].checkValidity() == false || this.$nameValue[0].checkValidity() == false || this.$nameFuriganaValue[0].checkValidity() == false  || this.$mailValue[0].checkValidity() == false  || this.$telValue[0].checkValidity() == false  || this.$contentValue[0].checkValidity() == false  ? true : false;

        $(".contactForm_submit").on("click", () => {
            if(error == true) {
                console.log("error")
            } else {
                console.log("no error")
            }
        });
    }

    addData() {
        this.$companyName.text(this.companyName);
        this.$companyRole.text(this.companyRole);
        this.$name.text(this.name);
        this.$nameFurigana.text(this.nameFurigana);
        this.$mail.text(this.mail);
        this.$tel.text(this.tel);
        this.$content.text(this.content);
    }
}
