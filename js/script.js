"use strict";


(function () {
//РАЗДЕЛ: Константы

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
/*REVIEW. Надо исправить.
✔ После вызова api.editProfile в методе then, где Вы сейчас делаете второй запрос к серверу (что неправильно,
этот запрос нерационально делать, так как он лишний) надо будет занести информацию о профиле
в DOM-элементы страницы, которую возвращает сервер при данном запросе (вот почему нет неоходимости в каком-либо ещё запросе, читайте в
описании задания пункт "3. Редактирование профиля").

✔ Также в этом методе нужно обновить свойства класса UserInfo с информацией о пользователе,
чтобы в них была актуальная информация (до прихода успешного ответа от сервера информация в свойствах класса не должна меняться, так как запрос
может быть неуспешным и новая информация на сервере может не сохраниться). То есть в этом методе then надо сначала обновить свойства, а потом внести
информацию на страницу.

✔ В этом же методе then, а не в .finally, нужно произвести закрытие формы профиля, так как форма должна закрыться только после прихода успешного ответа и
заполнения элементов страницы информацией (не раньше).
Если же придёт неуспешный ответ (информация на сервере не сохранилась) форма вообще не должна закрываться - пользователь может выйти из формы по крестику,
когда Вы ему сообщите о неуспешности, или попробовать ещё раз.
Также не забудьте, что метод catch должен быть последним в цепочке промисов, чтобы он мог обнаружить ошибки из всех методов then, которые были до него.
Об этом можно прочитать здесь:
https://learn.javascript.ru/promise-error-handling
О методе класса Promise Promise.reject можно кратко прочитать здесь:
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise
*/
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

})();


/*REVIEW. Резюме.

Проект хороший.
Выполнены все дополнительные задания.
Нужно подкорректировать работу метода api.editProfile.

Что надо исправить.

1. Не надо делать второй запрос к серверу после вызова метода api.editProfile
(подробные комментарии перед вызовом этого метода в этом файле).

2. Сделать обработку ответа сервера, который возвращает метод api.editProfile
(подробные комментарии перед вызовом этого метода в этом файле).

3. В методе then, в котором Вы будете делать обработку успешного ответа сервера, который возвратит метод api.editProfile,
нужно произвести закрытие формы профиля (подробные комментарии перед вызовом api.editProfile в этом файле).

_______________________________________________________________________________________________________________
REVIEW2. Резюме2.

Работа метода api.editProfile откорректирована правильно.

Задание принимается.

Желаю дальнейших успехов в обучении!



*/