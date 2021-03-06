import Dictionary from "/scripts/modules/dictionary.js"
export default class SearchController {
    link = ""
    resourceServer = "https://localhost:44374/"
    endpoint = "ad/"
    pageNumberString = "?PageNumber="
    pageSizeString = "&PageSize="
    category;
    filters = ""
    search = ""
    link = ""
    pageSize = 5;
    currentPageNumber = 1;
    lastPageNumber;
    dictMaps;
    allFilters = null;
    urlParams;
    constructor(intent = null) {
        this.urlParams = new URLSearchParams(window.location.search);
        const search = this.urlParams.get('title');
        const category = this.urlParams.get('category');

        console.log(category);
        if (category) {
            this.category = category;

        }
        if (search) {
            this.search = "&title=" + search;
            this.setSearchQuery();
            document.querySelector("#searchBox").value = this.urlParams.get("title")
        }

    }
    initSearch = () => {
        const subcategory = this.urlParams.get('subcategory');
        console.log(this.category)
        if (!this.category) {
            window.location.href = "/home/categories/index.html"
        } else {
            if (!subcategory) {
                window.location.href = "/home/categories/index.html?category=" + this.category
            } else {
                this.subcategory = subcategory
                console.log(this.subcategory);
                document.querySelector("navbar-component").setAttribute("filters", "?category=" + this.category + "&subcategory=" + this.subcategory + this.search)

            }
        }

        let dict = new Dictionary();
        dict.init(this.category).then(maps => {
            maps.sub.forEach(this.fillCategories)
            maps.sta.forEach(this.fillState)
            maps.man.forEach(this.fillManufacturer)
            maps.typ.forEach(this.fillType)
            maps.con.forEach(this.fillCondition)
            console.log(maps);
            this.dictMaps = maps
        }).then(() => {
            document.querySelector("#cat" + this.subcategory).checked = true;
            this.setFilters();
        }).then(() => {

        })
    }

    initMain = () => {
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
        this.link = this.resourceServer + this.endpoint + pageNumberParam + pageSizeParam + this.filters + this.search
        this.callCurrentLink()
    }

    setFilters = () => {
        this.filters = "";
        var regex1 = /[0-9]{1,2}/;
        this.allFilters = {
            subcategory: {
                group: document.getElementsByName("category"),
                strings: "subcategory=",
            },
            manufacturer: {
                group: document.getElementsByName("manufacturer"),
                strings: "manufacturer=",
            },
            type: {
                group: document.getElementsByName("type"),
                strings: "type=",
            },
            condition: {
                group: document.getElementsByName("condition"),
                strings: "condition=",
            },
            state: {
                group: document.getElementsByName("state"),
                strings: "state=",
            },
        }
        //deep copy

        let originalAllFilters = JSON.parse(JSON.stringify(this.allFilters))
        for (let filter in this.allFilters) {
            for (let option of this.allFilters[filter].group) {
                if (option.checked) {
                    this.allFilters[filter].strings += `${option.id.match(regex1)}_`;
                }
            }
            if (this.allFilters[filter].strings == originalAllFilters[filter].strings) {
                this.allFilters[filter].strings = "";
            } else {
                console.log(this.filters)
                this.filters += this.allFilters[filter].strings.substring(0, this.allFilters[filter].strings.length - 1) + "&"
            }
        }
        console.log(this.filters)
        if (this.filters == "") {
            this.endpoint = "ad/"

        } else {
            this.endpoint = "ad/"
            this.filters = "&" + this.filters.substring(0, this.filters.length - 1)
        }
        this.currentPageNumber = 1;
        console.log(this.allFilters)

        this.setSearchQuery()

        this.setLink(1);

    }
    setSearchQuery = () => {
        if (document.querySelector("#searchBox").value) {
            this.search = "&title=" + (document.querySelector("#searchBox").value.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, '+').replace(/[+]+$/, ""));

        } else if (this.urlParams.get("title") != "null") {
            //this.search = "&title="+this.urlParams.get("title");
        }
        document.querySelector("navbar-component").setAttribute("filters", "?category=" + this.category + "&subcategory=" + this.subcategory + this.search)
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
    set link(something) { this.link = something; console.log(something) }
    populateContentArea = (data) => {

        this.lastPageNumber = data['totalPages']
        document.querySelector(".contentContainer").innerHTML = '';
        let allAds = ""
        for (let object of data.result) {
            console.log(object);
            axios.get(`https://localhost:44374/customer/${object.customer}`)
                .then((response) => response.data)
                .then((customer) =>
                    `<ad-component title="${object.title}"
                    customer-image="${customer.profileImg}"
                    customer-name="${customer.username}"
                    customer-rating="${customer.rating}"
                    customer-id="${object.customer}"
                    condition="${this.dictMaps.con.get(object.condition)}"
                    price="${object.price}"
                    item-image="${object.img}"
                    id="${object.id}"></ad-component>`
                )
                .then(ads => document.querySelector(".contentContainer").innerHTML += ads)
                .catch(console.log)
        }

        const pagers = document.querySelectorAll('pagination-component')



        for (let pager of pagers) {
            console.log(this.currentPageNumber);
            pager.setAttribute("current-page", this.currentPageNumber)
            pager.setAttribute("last-page", data['totalPages'])
        }




    }

    fillCategories = (object) => {
        const categories = document.querySelector(".categoryGroup")
        console.log(this.subcategory, object.id);
        if (this.subcategory == object.id) {
            categories.innerHTML += `<input type="radio" name="category" checked="true" id="cat${object.id}">
                             <label for="cat${object.id}">${object.title}</label><br>`
        } else {
            categories.innerHTML += `<input type="radio" name="category"  id="cat${object.id}">
            <label for="cat${object.id}">${object.title}</label><br>`
        }

    }
    fillType = (value, id) => {
        const types = document.querySelector(".typeGroup")
        types.innerHTML += `<input type="checkbox" name="type" id="typ${id}">
                        <label for="typ${id}">${value}</label><br>`
    }

    fillManufacturer = (value, id) => {
        const manufacturers = document.querySelector(".manufacturerGroup")
        manufacturers.innerHTML += `<input type="checkbox" name="manufacturer" id="man${id}">
                                 <label for="man${id}">${value}</label><br>`
    }
    fillCondition = (value, id) => {

        const conditions = document.querySelector(".conditionGroup")
        conditions.innerHTML += `<input type="checkbox" name="condition" id="con${id}">
                              <label for="con${id}">${value}</label><br>`
    }
    fillState = (value, id) => {
        console.log(value);
        const states = document.querySelector(".stateGroup")
        states.innerHTML += `<input type="checkbox" name="state" id="sta${id}">
                         <label for="sta${id}">${value}</label><br>`
    }
}