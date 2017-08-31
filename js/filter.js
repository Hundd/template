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