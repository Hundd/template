var headerMenu = document.querySelector("#header-menu");
headerMenu.state = "collapsed";
headerMenu.addEventListener("click", function(e) {
    if (headerMenu.state === "collapsed") {
        headerMenu.state = "expanded";
        Array.prototype.forEach.call(
            document.querySelectorAll(".header-menu-item"),
            function(element) {
                element.hidden = true;
            }
        );
        document.querySelector(".header-menu-close").hidden = false;
        document.querySelector(".header-menu-n-search").style.display = "block";

    } else {
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
});