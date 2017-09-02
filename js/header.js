var headerMenu = document.querySelector("#header-menu");
headerMenu.state = "collapsed";

headerMenu.expand = function() {
    headerMenu.state = "expanded";
    Array.prototype.forEach.call(
        document.querySelectorAll(".header-menu-item"),
        function(element) {
            element.hidden = true;
        }
    );
    document.querySelector(".header-menu-close").hidden = false;
    document.querySelector(".header-menu-n-search").style.display = "block";
};

headerMenu.collapse = function() {
    headerMenu.state = "collapsed";
    Array.prototype.forEach.call(
        document.querySelectorAll(".header-menu-item"),
        function(element) {
            element.hidden = false;
        }
    );
    document.querySelector(".header-menu-close").hidden = true;
    document.querySelector(".header-menu-n-search").style.display = "none";
}

headerMenu.addEventListener("click", function(e) {

    if (headerMenu.state === "collapsed") {
        headerMenu.expand();
    } else {
        headerMenu.collapse();
    }
    return false;
});

//header search stays opened 
document.getElementById("header-search").addEventListener("change", function(e) {
    if (e.target.value) {
        document.querySelector('label[for="header-search"]').classList.add("is-full");
    } else {
        document.querySelector('label[for="header-search"]').classList.remove("is-full");
    }
});

//Refresh Header Bag Status 

function headerRefreshBag() {
    var headerBagContent = document.getElementById("header-bag-content");
    if (!("bag" in localStorage) || !localStorage.bag) {
        headerBagContent.textContent = "(0)";
        return;
    }
    var bag = JSON.parse(localStorage.bag);
    if (bag.length === 0) {
        headerBagContent.textContent = "(0)";
        return;
    }
    var totalPrice = 0,
        totalItems = 0;
    bag.forEach(function(item) {
        totalPrice += parseFloat(item.price.slice(1));
        totalItems += 1;
    });
    headerBagContent.innerHTML = "&nbsp; &pound;" + totalPrice.toLocaleString() + "&nbsp; (" + totalItems + ")";
}
headerRefreshBag();