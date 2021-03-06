import Dictionary from "/scripts/modules/dictionary.js"
export default class MyadsController {
    link = ""
    resourceServer = "https://localhost:44374/"
    endpoint = "profile/myads/"
    pageNumberString = "?PageNumber="
    pageSizeString = "&PageSize="
    pageSize = 10;
    currentPageNumber = 1;
    dictMaps;
    constructor() {
        let dict = new Dictionary();
        dict.init().then(maps => {

            this.dictMaps = maps
        }).then(() => {
            this.setLink(1);
        })
    }
    setLink = (num) => {
        this.currentPageNumber = num;
        const pageSizeParam = this.pageSizeString + this.pageSize;
        const pageNumberParam = this.pageNumberString + this.currentPageNumber
        this.link = this.resourceServer + this.endpoint + pageNumberParam + pageSizeParam
        this.callCurrentLink()
    }

    populateContentArea = (data) => {

        this.lastPageNumber = data['totalPages']
        document.querySelector(".contentContainer").innerHTML = '';
        let allAds = ""
        for (let object of data.result) {
            document.querySelector(".contentContainer").innerHTML +=
                `<ad-component title="${object.title}"
            customer-image="${object.profileimg}"
            case="myads"
            customer-id="${object.customer}"
            customer-name="${object.username}"
            customer-rating="${object.rating}"
            customer-reviews="${object.reviews}"
            condition="${this.dictionary.con.get(object.condition)}"
            price="${object.price}"
            item-image="${object.img}"
            id="${object.id}"></ad-component>`
        }
        const pagers = document.querySelectorAll('pagination-component')
        for (let pager of pagers) {
            console.log(this.currentPageNumber);
            pager.setAttribute("current-page", this.currentPageNumber)
            pager.setAttribute("last-page", data['totalPages'])
        }
    }
    callCurrentLink = () => axios.get(this.link).then((response) => response.data).then((data) => {
        console.log(this.link, data.totalPages)
        this.currentPageNumber;
        this.populateContentArea(data)
    }).catch(console.log)
    callNext() {
        if (this.lastPageNumber > this.currentPageNumber) {

            this.setLink(++this.currentPageNumber);
        }
    }
    callPrevious() {
        if (this.currentPageNumber > 1) {
            this.setLink(--this.currentPageNumber);
        }
    }
    callLast() {
        this.lastPageNumber;
        this.setLink(this.lastPageNumber);
    }
    callFirst() {
        this.setLink(1);
    }
    deleteAd = (id) => {
        if (confirm("are you sure ?")) {
            axios.delete("https://localhost:44374/ad/" + id)
                .then((response) => response.data)
                .then(() => {
                    location.reload();
                })
                .catch(error => {
                    console.log(error.response.data)
                });
        }

    }
}