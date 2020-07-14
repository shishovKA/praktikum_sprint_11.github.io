import Popup from './Popup';
export default class PopupNewPlace extends Popup {
    constructor (container) {
        super(container);
        this._create();
    }

    _create() {
        super._create();
        const inputName = this.createInput({className: 'popup__input', type: 'text', name: 'name', placeHolder: 'Название'});
        const inputLink = this.createInput({className: 'popup__input', type: 'url', name: 'link', placeHolder: 'Ссылка на картинку'});

        const __title = document.createElement('h3');
        __title.classList.add('popup__title');
        const __form = document.createElement('form');
        __form.classList.add('popup__form');
        const __error = document.createElement('p');
        __error.classList.add('popup__error');
        __error.textContent = 'Текст ошибки';
        const __error_clone = __error.cloneNode(true);
        const __button = document.createElement('button');
        __button.classList.add('button');
        __button.classList.add('popup__button');

        __title.textContent = 'Новое место';
        __button.textContent = '+';
        __button.classList.add('popup__button');

        this.content.classList.add('popup__content');
        __form.append(inputName);
        __form.append(__error);
        __form.append(inputLink);
        __form.append(__error_clone);
        __form.append(__button);

        this.content.append(__title);
        this.content.append(__form);


    }


}
