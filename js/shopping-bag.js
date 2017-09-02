var once = true;
var uniqBag;

function bagRender(newOrder) {
    var bagImages = [
        'img/item/dark_suit-bag.jpg',
        "img/catalog/01.jpg "
    ];
    var bagContent = document.getElementById("bag-content");
    var bagMessages = document.querySelectorAll(".bag-message");
    if (!("bag" in localStorage) || !localStorage.bag) {
        //starting from scratch
        bagContent.innerHTML = "";
        bagMessages[0].classList.remove("is-hidden");
        return;
    }
    var bag = JSON.parse(localStorage.bag);
    if (bag.length === 0 && !newOrder) {
        //if pressed CLEAR button
        bagContent.innerHTML = "";
        bagMessages[0].classList.remove("is-hidden");
        setTotalCost();
        return;
    } else if (bag.length === 0 && newOrder) {
        //if pressed BUY button
        bagContent.innerHTML = "";
        bagMessages[1].classList.remove("is-hidden");
        setTotalCost();
        return;
    }

    //Hide info messages
    bagMessages[0].classList.add("is-hidden");
    bagMessages[1].classList.add("is-hidden");

    //Generate bag content
    uniqBag = uniq(bag);
    bagContent.innerHTML = uniqBag.map(createArticle).join('\n');

    function createArticle(item, index) {
        return (
            '<article class="bag-item clearfix">' +
            '<a href="' + item.url + '">' +
            '    <div class="bag-view-container">' +
            '        <img src="' + bagImages[item.id] + '" alt="' + item.name + '">' +
            '        <div class="bag-view">View item</div>' +
            '    </div>' +
            '    <h4 class="bag-title">' + item.name + '</h4>' +
            '</a>' +
            '' +
            '<div class="bag-item-description">' +
            '    <div class="bag-price">' + item.price + '</div>' +
            '    <p class="bag-item-characteristics">' +
            '        Color: ' + item.color + '<br> Size: ' + item.size + ' <br> Quantity: ' + item.quantity +
            '    </p>' +
            '    <button type="button" class="link" data-index="' + index + '">Remove item</button>' +
            '</div>' +
            '</article>'
        );

    }
    if (once) {
        once = false;
        bagContent.addEventListener("click", deleteItem);
    }

    function deleteItem(event) {
        if (event.target.hasAttribute("data-index")) {
            var indexDel = event.target.getAttribute("data-index");
            indexDel = uniqBag[indexDel].last;
            bag = bag.filter(function(item, index) {
                return indexDel != index;
            });
            localStorage.bag = JSON.stringify(bag);
            headerRefreshBag();
            bagRender();
        }
    }

    function uniq(collection) {
        var newAr = [];
        collection.forEach(function(item, itemIndex) {
            if (newAr.length === 0) {
                newAr.push(item);
                newAr[0].quantity = 1;
                newAr[0].last = itemIndex;
                return;
            }
            newAr.every(function(saved, i) {
                if ((item.color === saved.color) && (item.size === saved.size) && (item.name === saved.name)) {
                    saved.quantity += 1;
                    saved.last = itemIndex;
                    return false;
                } else if (i === newAr.length - 1) {
                    newAr.push(item);
                    newAr[newAr.length - 1].quantity = 1;
                    newAr[newAr.length - 1].last = itemIndex;
                    return false;
                }
                return true;
            });
        });
        return newAr;
    }

    function setTotalCost() {
        var totalEl = document.getElementById("bag-total-cost");
        var totalPrice = 0;
        bag.forEach(function(item) {
            totalPrice += parseFloat(item.price.slice(1));
        });
        totalEl.innerHTML = '&pound;' + totalPrice.toLocaleString();
    }
    setTotalCost();
}
bagRender();


//Clear bag
document.getElementById("bag-btn-clear").addEventListener("click", function(e) {
    localStorage.bag = "[]";
    headerRefreshBag();
    bagRender();
});

//Buy goods 
document.getElementById("bag-btn-buy").addEventListener("click", function(e) {
    localStorage.bag = "[]";
    headerRefreshBag();
    bagRender(true);
});