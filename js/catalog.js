document.querySelectorAll(".header-category")[0]
    .classList.add("is-current");
setTimeout(function() {
    document.querySelector("#catalog-foreground").style.height =
        document.body.offsetHeight - 110 + "px";

}, 1000);