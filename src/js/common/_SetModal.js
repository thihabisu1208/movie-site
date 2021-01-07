import Modal from "../modules/_Modal";

export default class SetModal {
  constructor() {
    this.DOM = {
      modal: document.querySelectorAll(".js-modal"),
      trigger: document.querySelectorAll(`a[data-toggle="modal"]`),
    };
    this.modal = {};
  }

  init() {
    this.initModal();
    this.addEvents();
  }

  addEvents() {
    $(this.DOM.trigger).on("click", this.openModal.bind(this));
  }

  initModal() {

    $(this.DOM.modal).each((_, elem) => {
      const $modal = $(elem);
      const modalId = $modal.attr("id");
      const modal = new Modal(`#${modalId}`);
      this.modal[modalId] = modal;
      modal.init();
    });
  }

  openModal(e) {
    e.preventDefault();
    const $trigger = $(e.currentTarget);
    const modalId = $trigger.data("target").replace(/\#/g, "");
    if (this.modal[modalId]) this.modal[modalId].open();
  }
}
