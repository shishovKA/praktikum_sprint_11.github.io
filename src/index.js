

//РАЗДЕЛ: import

import "./style.css";
import Api from './scripts/Api';
import Card from './scripts/Card';
import CardList from './scripts/CardList';
import FormValidator from './scripts/FormValidator';

import PopupAvatar from './scripts/PopupAvatar';
import PopupEdit from './scripts/PopupEdit';
import PopupImage from './scripts/PopupImage';
import PopupNewPlace from './scripts/PopupNewPlace';
import UserInfo from './scripts/UserInfo';

//api
const token = '6b280644-a256-46c9-84b9-48eada5c8ab9';
const groupId ='cohort11';

const api = new Api({
    baseUrl: `https://praktikum.tk/${groupId}`,
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
  });

//кнопки
const newPlaceBtn = document.querySelector('.user-info__button'); //кнопка вызова формы "Новое место"
const editBtn = document.querySelector('.user-info__button-edit'); //кнопка вызова формы "Редактировать профиль"
const avatarBtn = document.querySelector('.user-info__photo');

//попапы
const popupNewPlace = new PopupNewPlace(document.querySelector('.root'));
const popupEdit = new PopupEdit(document.querySelector('.root'));
const popupImage = new PopupImage(document.querySelector('.root'));
const popupAvatar = new PopupAvatar(document.querySelector('.root'));

let startCards;
let placesList;

let user;
let validator;

//РАЗДЕЛ: Функции
function keyHandler(event) {
    let currentPopup = null;
    let validatorExist = true;

    if (popupNewPlace.isOpen) currentPopup = popupNewPlace;
    if (popupEdit.isOpen) currentPopup = popupEdit;
    if (popupAvatar.isOpen) currentPopup = popupAvatar;
    if (popupImage.isOpen) {
        currentPopup = popupImage;
        validatorExist = false;
        }

    if ((event.keyCode === 27) && (currentPopup !== null)) {
       if (validatorExist) {
        validator.formElement.removeEventListener('submit', submitFormNewPlace);
        validator.delEventListeners();
        }
        currentPopup.close();
    };
}



function loadNewPlacePopup() {
    popupNewPlace.open();
    validator = new FormValidator(popupNewPlace.popupForm);
    validator.formElement.addEventListener('submit', submitFormNewPlace);
    validator.formValid();
}

function submitFormNewPlace(event) {
    event.preventDefault();
    validator.showLoading(true);
    const cardValues = {name: this.elements.name.value, link: this.elements.link.value}
    api.postCard(cardValues)
            .then(res => {  const card = new Card(res, popupImage.open, api.delCard, api.like, api.dislike);
                            placesList.addCard(card);
                            validator.formElement.removeEventListener('submit', submitFormNewPlace);
                            validator.delEventListeners();
                            popupNewPlace.close();
                            })
            .catch((err) => {
                            console.log(err); // выведем ошибку в консоль
                            })
            .finally(()=> {
                validator.showLoading(false)
            })
}

function loadEditPopup() {
    popupEdit.open();
    validator = new FormValidator(popupEdit.popupForm);
    validator.formElement.addEventListener('submit', submitFormEdit);
    validator.formValues = {name: user.name, about: user.about};
    validator.formValid();
}

function submitFormEdit(event) {
    event.preventDefault();
    validator.showLoading(true);
    
    api.editProfile(validator.formValues)
        .then(res => {user.setUserInfo(res);
                      user.updateUserInfo();
                      validator.formElement.removeEventListener('submit', submitFormEdit);
                      validator.delEventListeners();
                      popupEdit.close();
                    })
        .catch((err) => {
                      console.log(err); // выведем ошибку в консоль
                    })
        .finally(()=>{validator.showLoading(false)})
}


function loadAvatarPopup() {
    popupAvatar.open();
    validator = new FormValidator(popupAvatar.popupForm);
    validator.formElement.addEventListener('submit', submitFormAvatar);
    validator.formValid();
}


function submitFormAvatar(event) {
    event.preventDefault();
    validator.showLoading(true);
    api.editAvatar(this.elements.link.value)
        .then(res => api.getUserInfo(loadUser))
        .finally(()=>{
            validator.showLoading(false);
            validator.formElement.removeEventListener('submit', submitFormAvatar);
            validator.delEventListeners();
            popupAvatar.close();
        })
}

//функция загрузка карточек с сервера
function loadCards(cards) {
    startCards = cards.map( (item) => new Card(item, popupImage.open, api.delCard, api.like, api.dislike) );
    placesList = new CardList(document.querySelector('.places-list'), startCards);
    placesList.render();
}

function loadUser(values) {
    user = new UserInfo(document.querySelector('.user-info'),values);
    user.updateUserInfo();
}


//РАЗДЕЛ: Слушатели событий
document.body.addEventListener('keydown', keyHandler);
newPlaceBtn.addEventListener('click', loadNewPlacePopup); //кнопка - открыть форму "Новое место"
editBtn.addEventListener('click', loadEditPopup); //кнопка - открыть форму "Редактировать профиль"
avatarBtn.addEventListener('click', loadAvatarPopup);

//РАЗДЕЛ: Вызов функций и методов

api.getInitialCards(loadCards);
api.getUserInfo(loadUser);

