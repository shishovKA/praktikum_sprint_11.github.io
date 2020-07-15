export default class UserInfo {

    constructor(container, values) {
      this.container = container;
      this.domPhoto = this.container.querySelector(".user-info__photo");
      this.domName = this.container.querySelector(".user-info__name");
      this.domJob = this.container.querySelector(".user-info__job");

      this.name = values.name;
      this.about = values.about;
      this.avatar = values.avatar;
      this.id = values._id;
    }

    setUserInfo(values) {
      const {name, about, avatar} = values;
      this.name = name;
      this.about = about;
      this.avatar = avatar;
    }

    updateUserInfo() {
        this.domName.textContent = this.name;
        this.domJob.textContent = this.about;
        this.domPhoto.style.backgroundImage = `url(${this.avatar})`;
      }

}

