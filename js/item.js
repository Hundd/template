// document.forms[0].elements.color.value
var itemImage = document.querySelector("#item-image");
var itemTumbnails = document.querySelectorAll(".item-tumbnail");
var shoppingForm = document.querySelector("#shopping-form");

Array.prototype.forEach.call(itemTumbnails, function(el, i) {
    el.addEventListener("click", function(e) {
        //clear previous state 
        clearState();
        //Highlight the thumbnail image
        itemTumbnails[i].classList.add("is-selected");
        //set new sourse image
        var matched = itemImage.src.match(/(.*)(\d+)(\.\w+)$/);
        if (matched) {
            //src = name + index + extension
            itemImage.src = matched[1] + (i + 1) + matched[3];
        } else {
            console.log("Image name must ends with digits!!");
        }
    });

    function clearState() {
        Array.prototype.forEach.call(itemTumbnails, function(el) {
            el.classList.remove("is-selected");
        });
    }
});



//Form sumbmit handler

shoppingForm.addEventListener("submit", function(e) {
    e.preventDefault();
    var name = document.querySelector("#item-name").textContent;
    var price = document.querySelector("#item-price").textContent;
    var i, size, color;

    Array.prototype.every.call(this.elements.size, function(element) {

        if (element.checked) {
            size = element.value;
            return false;
        }
        return true;
    });

    Array.prototype.every.call(this.elements.color, function(element) {

        if (element.checked) {
            color = element.value;
            return false;
        }
        return true;
    });
    console.log(size);
    var product = {
        id: document.getElementById("item").getAttribute("data-id"),
        size: this.elements.size.value || size,
        color: this.elements.color.value || color,
        url: window.location.href,
        name: name,
        price: price
    }
    if (!('bag' in localStorage)) {
        localStorage.bag = "[]";
    }

    var bag = JSON.parse(localStorage.bag);
    bag.push(product);
    localStorage.bag = JSON.stringify(bag);
    headerRefreshBag();
});