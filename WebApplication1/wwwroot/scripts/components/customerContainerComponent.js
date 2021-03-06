class CustomerContainerComponent extends HTMLElement {
    get username() {
        return this.getAttribute("username");
    }
    get rating() {
        return this.getAttribute("rating");
    }
    get customerImage() {
        return this.getAttribute("image");
    }
    get id() {
        return this.getAttribute("id")
    }
    get firstName() {
        return this.getAttribute("fname")
    }
    get lastName() {
        return this.getAttribute("lname")
    }
    get address() {
        return this.getAttribute("address")
    }
    get review() {
        return this.getAttribute("review")
    }

    constructor() {
        super();
        this.render();
    }
    //style='background-image:url(${this.customerImage})
    render = () => {
        this.innerHTML = `
        <div class="sellerComponent">
        <a href="https://localhost:44366/home/profile/index.html?id=${this.id}">
        <div class="photo"
            style="background-image: url(${this.customerImage});">
        </div>
        <div class="details">
            <h2 class="username">${this.username}</h2>
            <p>${this.firstName}, ${this.lastName}</p>
            <p>${this.address}</p>
        </div>
        <div class="moreInfo">${starMethod(this.rating)}</div>
        (${this.review})
        </a>
    </div>
            `
    }
}
;

customElements.define("customer-component", CustomerContainerComponent)
//<span class="sellerAvatar favourite" style='background-image:url(https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/girl_female_woman_avatar-512.png)'></span>