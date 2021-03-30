class AdContainerComponent extends HTMLElement {
    get title() {
        return this.getAttribute("title");
    }
    get photo() {
        return this.getAttribute("photo");
    }
    get price() {
        return this.getAttribute("price");
    }
    get condition() {
        return this.getAttribute("condition");
    }
    get itemImage() {
        return this.getAttribute("item-image");
    }
    get id(){
        return this.getAttribute("id")
    }
    get customerId(){
        return this.getAttribute("customerId")
    }
    constructor() {
        super();
        this.render();
    }
    render = () => {
        console.log(this.itemImage);
        this.innerHTML = `
            <div class="adContainer">
                <div class="itemData">
                    <a href="http://127.0.0.1:5501/home/ad/index.html?id=${this.id}">
                        <span class="image" style='background-image:url(${this.itemImage})'></span>
                        <div class="itemInfo">
                            <span class="title">${this.title}</span>
                            <span class="condition">${this.condition}</span>
                            <span class="price">${this.price}$</span>
                        </div>

                    </a>
                </div>
                <hr>
                <div class="sellerData">
                    <a href="http://127.0.0.1:5501/home/customer/index.html?id=${this.customerId}">
                        <span class="sellerAvatar" name="avatar" ></span>
                        <label for="avatar">Takhs${this.username}</label>
                        <span class="filler"  ></span>
                        <span class="sellerReview" style='background-image:url(https://image.freepik.com/free-vector/five-stars-quality-icon-isolated-transparent-background-stars-rating-review_97458-424.jpg)'></span>   
                    </a>
                </div>
            </div>
        `
    }
}
;

customElements.define("ad-component", AdContainerComponent)
//<span class="sellerAvatar favourite" style='background-image:url(https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/girl_female_woman_avatar-512.png)'></span>