import Popup from './Popup';
export default class PopupImage extends Popup {
    constructor (container) {
        super(container);
        this._create();
    }

    _create() {
        super._create();
        this.content.classList.add('popup__content_image');
        const __image = document.createElement('img');
        __image.classList.add('popup__image');
        __image.alt = "";
        this.content.append(__image);
    }

    open(url) {
      super.open();
      const img = this.element.querySelector(".popup__image");
      img.setAttribute("src", url);
    }

}
