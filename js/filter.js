var filterBtn = document.getElementById("filter-btn-close");
var filterMain = document.querySelector(".filter-main");
var filterHeader = document.querySelector(".filter-header");
filterBtn.state = "collapsed";
filterBtn.changeState = function(e) {
    if (filterBtn.state === "collapsed") {
        filterBtn.state = "expanded";
        filterMain.style.display = "block";
        filterBtn.innerHTML = "X";
        filterBtn.style.color = "red";
    } else {
        filterBtn.state = "collapsed";
        filterMain.style.display = "none";
        filterBtn.innerHTML = "V";
        filterBtn.style.color = "#d9d9d9";
    }
    e.stopPropagation();
};
filterBtn.addEventListener("click", filterBtn.changeState);
filterHeader.addEventListener("click", filterBtn.changeState);

//
// var filterState = ["Casual style", "", "", "Antipodium", "UK 18", ""];
var filterState = [5, 0, 0, 0, 3, 0];
var categories = ["Fashion", "Product type", "Color", "Brand", "Size", "Price range"];
var categoryElements = document.querySelectorAll(".filter-category");
var nameElements = document.querySelectorAll(".filter-name");
var valueElements = document.querySelectorAll(".filter-value");
var headerElements = document.querySelectorAll(".filter-header span");

function filterReset() {
    Array.prototype.forEach.call(
        document.querySelectorAll("li[data-id]"),
        function(e) {
            e.classList.remove("is-selected");
        });

    for (var i = 0; i < categories.length; i += 1) {
        //clear state 
        categoryElements[i].classList.remove("is-selected");
        headerElements[i].classList.remove("is-selected");
        nameElements.innerHTML = "";
    }
}

function filterRender() {
    var state, value, selector, value, i;
    filterReset();
    for (var i = 0; i < categories.length; i += 1) {
        if (state = filterState[i]) {
            categoryElements[i].classList.add("is-selected");
            headerElements[i].classList.add("is-selected");
            selector = "li[data-id=\"" + (i + 1) + state + "\"]";
            element = document.querySelector(selector);
            value = element.innerHTML;
            valueElements[i].innerHTML = value;
            element.classList.add("is-selected");
            headerElements[i].innerHTML = value;

        } else {
            selector = "li[data-id='" + (i + 1) + 1 + "']";
            element = document.querySelector(selector);
            element.classList.add("is-selected");
            headerElements[i].innerHTML = categories[i];
        }
    }
}
filterRender();


// Implement filter selection
filterMain.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.hasAttribute("data-id")) {
        var attr = e.target.getAttribute("data-id");
        var element = attr[0];
        var value = parseInt(attr[1]);
        filterState[element - 1] = value === 1 ? value - 1 : value;
        filterRender();
    }
})