class NavbarComponent extends HTMLElement {
  static get observedAttributes() {
    return ["logged", "filters"];
  }
  get logged() {
    return this.getAttribute("logged");
  }
  get filters() {
    return this.getAttribute("filters");
  }
  constructor() {
    super();
    this.render();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
    if ((name = "filters")) {
      if (this.filters != null) {
        document.querySelector(".ads").href.replace(oldValue, "");
        document.querySelector(".ads").href += this.filters;
      }
    }
  }
  render = () => {
    let listItems;
    switch (this.logged) {
      case "true": {
        listItems = `
                    <li class="primNavItems"><a  href="#" class="my-account" onclick="attachMyAccountDropdown(event)">My Account</a></li>
                    <li class="primNavItems"><a href="#" onclick="attachWishlist(event)" class="wishlist">Wishlist</a></li>
                    <li class="primNavItems"><a href="#" onclick="attachNotifications(event)" class="notification">Notifications</a></li>
                    <li class="primNavItems"><a href="#" onclick="attachChatDropdown(event)" class="chat">Chats</a></li>
                    <li class="primNavItems"><a href="#" onclick="attachChatRequest(event)" class="chatRequest">Chat Requests</a></li>
                    <notification-component class="fresh" style="display:none;"></notification-component>
                    <chatDropdown-component class="fresh" style="display:none;"></chatDropdown-component>
                    <chatRequest-component class="fresh" style="display:none;"></chatRequest-component>
                `;
        break;
        //const btnSignOut = document.querySelector('#btn-signOut')
        //btnSignOut.addEventListener('click', signOut)
      }
      default: {
        listItems = `
                    <li class="primNavItems"><a href="#" onclick="signIn()" >Log In</a></li>
                    <li class="primNavItems"><a class="attention" href="https://localhost:44305/Auth/Register">Sign up</a></li>
                `;
        break;
        // const btnSignIn = document.querySelector('#btn-signIn')
        // btnSignIn.addEventListener('click', signIn)
      }
    }

    this.innerHTML = `
        <style>@import "/styles/components/navbar/navbar.css";</style>
       
        <nav>
        <div class="primary-nav">
            <div class="brandLogo">
            <a href="/home/index.html"></a>
            </div>
            <div class="navListContainer">
                <ul class="loggedIn navHeader hidden">
                    ${listItems}
                </ul>
            </div>
        </div>
        
        <div class="secondary-nav">
            <div class="secondNavListContainer">
                <ul>
                    <div class="vl"> </div>
                    <li><a class="ads" href="/home/search/index.html">Ads</a></li>
                    <div class="vl"> </div>
                    <li><a href="/home/categories/index.html">Categories</a></li>
                    <div class="vl"> </div>
                    <li><a href="/home/sellers/index.html">Sellers</a></li>
                    <div class="vl"> </div>
                    <li><a href="/home/about/index.html">About</a></li>
                    <div class="vl"> </div>
                </ul>
            </div>
        </div>
    </nav>
    <div class="my-account-dropdown fresh">
        <ul>
            <li><a href="/home/profile/index.html?id=me">My profile</a></li>
            <li><a href="/home/profile/myAds/index.html">My ads</a></li>
            <li><a href="/home/profile/addAd/index.html">Create an ad</a></li>
            <li><a href="/home/profile/boughtAds/index.html">Bought ads</a></li>
            <li><a href="/home/profile/soldAds/index.html">Sold ads</a></li>
            <li><a href="/home/profile/loginLogs/index.html">Login logs</a></li>
            <li><a href="#" onclick="signOut()">Logout</a></li>
        </ul>
    </div>
      
        <div class="chatsContainer">

        </div>
        `;
  };
}
const attachWishlist = (event) => {
  console.log("haha");

  if (!document.querySelector("wishlist-component")) {
    let wishlist = document.createElement("wishlist-component");
    document.querySelector("navbar-component").appendChild(wishlist);

    document.body.addEventListener("click", (event) => {
      if (
        !(
          (event.pageY > wishlistComponent.offsetTop &&
            event.pageY <
              wishlistComponent.offsetTop + wishlistComponent.offsetHeight &&
            event.pageX <
              wishlistComponent.offsetLeft + wishlistComponent.offsetWidth &&
            event.pageX > wishlistComponent.offsetLeft) ||
          event.target.classList.contains("wishlist")
        )
      ) {
        wishlist.style.display = "none";
      }
    });
  } else {
    document.querySelector("wishlist-component").style.display = "block";
  }
  let x = document.querySelector(".wishlist").getBoundingClientRect().left;
  let y = document.querySelector(".wishlist").getBoundingClientRect().bottom;
  const wishlistComponent = document.querySelector("wishlist-component");
  wishlistComponent.style.display = "block";
  wishlistComponent.style.left = x + "px";
  wishlistComponent.style.top = y + "px";
};
const attachMyAccountDropdown = (event) => {
  if (
    document.querySelector(".my-account-dropdown").classList.contains("fresh")
  ) {
    document.querySelector(".my-account-dropdown").classList.remove("fresh");
    document.querySelector(".my-account-dropdown");
    document.body.addEventListener("click", (event) => {
      if (
        !(
          (event.pageY > myAccountDropdown.offsetTop &&
            event.pageY <
              myAccountDropdown.offsetTop + myAccountDropdown.offsetHeight &&
            event.pageX <
              myAccountDropdown.offsetLeft + myAccountDropdown.offsetWidth &&
            event.pageX > myAccountDropdown.offsetLeft) ||
          event.target.classList.contains("my-account")
        )
      ) {
        document.querySelector(".my-account-dropdown").style.display = "none";
      }
    });
  } else {
    document.querySelector(".my-account-dropdown").style.display = "block";
  }
  let x = document.querySelector(".my-account").getBoundingClientRect().left;
  let y = document.querySelector(".my-account").getBoundingClientRect().bottom;
  const myAccountDropdown = document.querySelector(".my-account-dropdown");
  myAccountDropdown.style.display = "block";
  myAccountDropdown.style.left = x + "px";
  myAccountDropdown.style.top = y + "px";
};
const attachNotifications = (event) => {
  if (
    document.querySelector("notification-component").classList.contains("fresh")
  ) {
    
    document.querySelector(".notification").style.backgroundColor =
      "transparent";
    document.querySelector(".notification").style.border = "none";
    document.querySelector("notification-component").classList.remove("fresh");
    let notification = document.querySelector("notification-component");
    document.body.addEventListener("click", (event) => {
      if (
        !(
          (event.pageY > notificationComponent.offsetTop &&
            event.pageY <
              notificationComponent.offsetTop +
                notificationComponent.offsetHeight &&
            event.pageX <
              notificationComponent.offsetLeft +
                notificationComponent.offsetWidth &&
            event.pageX > notificationComponent.offsetLeft) ||
          event.target.classList.contains("notification")
        )
      ) {
        notification.style.display = "none";
      }
    });
  } else {
   
    document.querySelector("notification-component").style.display = "block";
    
    document.querySelector(".notification").style.backgroundColor =
      "transparent";
    document.querySelector(".notification").style.border = "none";
  }
  let x = document.querySelector(".notification").getBoundingClientRect().left;
  let y = document
    .querySelector(".notification")
    .getBoundingClientRect().bottom;
  const notificationComponent = document.querySelector(
    "notification-component"
  );
  
  notificationComponent.style.display = "block";
  document.querySelector(".notificationItems").scrollTo(0,document.querySelector(".notificationItems").scrollHeight)
  console.log(document.querySelector(".notificationItems").scrollHeight);
  notificationComponent.style.left = x + "px";
  notificationComponent.style.top = y + "px";
};
const attachChatDropdown = (event) => {
  if (
    document.querySelector("chatdropdown-component").classList.contains("fresh")
  ) {
    document.querySelector("chatdropdown-component").classList.remove("fresh");
    console.log("lmao");
    let chatDropdown = document.querySelector("chatdropdown-component");
    document.body.addEventListener("click", (event) => {
      if (
        !(
          (event.pageY > chatDropdownComponent.offsetTop &&
            event.pageY <
              chatDropdownComponent.offsetTop +
                chatDropdownComponent.offsetHeight &&
            event.pageX <
              chatDropdownComponent.offsetLeft +
                chatDropdownComponent.offsetWidth &&
            event.pageX > chatDropdownComponent.offsetLeft) ||
          event.target.classList.contains("chat")
        )
      ) {
        chatDropdownComponent.style.display = "none";
      }
    });
  } else {
    document.querySelector("chatDropdown-component").style.display = "block";
    document.querySelector(".chat").style.backgroundColor =
      "transparent";
    document.querySelector(".chat").style.border = "none";
  }
  let x = document.querySelector(".chat").getBoundingClientRect().left;
  let y = document.querySelector(".chat").getBoundingClientRect().bottom;
  const chatDropdownComponent = document.querySelector(
    "chatdropdown-component"
  );
  chatDropdownComponent.style.display = "block";
  chatDropdownComponent.style.left = x + "px";
  chatDropdownComponent.style.top = y + "px";
};

const attachChatRequest = (event) => {
  if (
    document.querySelector("chatrequest-component").classList.contains("fresh")
  ) {
    document.querySelector("chatrequest-component").classList.remove("fresh");
    console.log("lmao");
    let chatRequest = document.querySelector("chatrequest-component");
    document.body.addEventListener("click", (event) => {
      if (
        !(
          (event.pageY > chatRequestComponent.offsetTop &&
            event.pageY <
              chatRequestComponent.offsetTop +
                chatRequestComponent.offsetHeight &&
            event.pageX <
              chatRequestComponent.offsetLeft +
                chatRequestComponent.offsetWidth &&
            event.pageX > chatRequestComponent.offsetLeft) ||
          event.target.classList.contains("chatRequest")
        )
      ) {
        chatRequestComponent.style.display = "none";
      }
    });
  } else {
    document.querySelector("chatRequest-component").style.display = "block";
    document.querySelector(".chatRequest").style.backgroundColor =
    "transparent";
  document.querySelector(".chatRequest").style.border = "none";
  }
  let x = document.querySelector(".chatRequest").getBoundingClientRect().left;
  let y = document.querySelector(".chatRequest").getBoundingClientRect().bottom;
  const chatRequestComponent = document.querySelector("chatRequest-component");
  chatRequestComponent.style.display = "block";
  chatRequestComponent.style.left = x + "px";
  chatRequestComponent.style.top = y + "px";
};
starMethod = (value, reviewMode) => {
  let starList
  if (reviewMode) {
     starList = "";
    for (let i = 1; i <= 5; i++) {
      starList += `<li style="background-image:url();" onclick="fillStars(${i*2})" value="${i*2}"></li>`;
    }
  }else{
    const stars = value / 2;
     starList = "";
    for (let i = 1; i <= stars; i++) {
      starList += "<li></li>";
    }
    if (value % 2 == 0) {
    } else if (value != 1) {
      starList += "<li style='width:10%;'></li>";
    }
  }
  
  return `
      <div class="outterLayer">
      <div class="innerLayer">
        <ul>
          ${starList}     
        </ul>
      </div>
    </div>
      `;
};
fillStars=(num)=>{
  const sometext=document.querySelector("textarea").value
  console.log("eimai edw twra ",)
  document.querySelector(".reviewBody").removeChild(document.querySelector(".reviewBody").querySelector(".outterLayer"));
  document.querySelector(".reviewBody").innerHTML+=starMethod(num)
  document.querySelector("textarea").value=sometext
}
const myAccountDropdown = ``;
customElements.define("navbar-component", NavbarComponent);
