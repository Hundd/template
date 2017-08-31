var carouselImage = document.querySelector("#carousel-image");
var carouselAnchor = document.querySelector("#carousel-anchor");
var carouselBullets = document.querySelector("#carousel-bullets");
var carousel = {};
window.addEventListener("resize", function() {
    carousel.checkSize();
});
carousel.currentImage = 1;
carousel.xFinish = 0;
carousel.size = "L";
carouselAnchor.addEventListener("touchstart", function(e) {
    carousel.resetAnimation();
    carousel.xStart = e.touches[0].screenX;
    carousel.yStart = e.touches[0].screenY;

});
carouselAnchor.addEventListener("touchmove", function(e) {
    if (carousel.xFinish !== 0) return;
    carousel.xFinish = e.touches[0].screenX;
    carousel.yFinish = e.touches[0].screenY;

    if (window.innerHeight > window.innerWidth) {
        if (Math.abs(carousel.xStart - carousel.xFinish) < Math.abs(carousel.yStart - carousel.yFinish)) {
            return;
        }
        e.preventDefault();
        if (carousel.xStart - carousel.xFinish < -0) {
            //Right
            carousel.nextImage();
        }

        if (carousel.xStart - carousel.xFinish > 0) {
            //Left
            carousel.prevImage();
        }
    } else if (window.innerHeight < window.innerWidth) {
        if (Math.abs(carousel.xStart - carousel.xFinish) > Math.abs(carousel.yStart - carousel.yFinish)) {
            return;
        }
        e.preventDefault();
        if (carousel.yStart - carousel.yFinish < -0) {
            //Right
            carousel.nextImage();
        }

        if (carousel.yStart - carousel.yFinish > 0) {
            //Left
            carousel.prevImage();
        }
    }

});
carouselAnchor.addEventListener("touchend", function(e) {
    carousel.xFinish = 0;
});
carouselAnchor.addEventListener("click", function(e) {
    console.log(window.location.pathname);
    if (carousel.currentImage % 2) {
        window.location.pathname = "/catalog.html";
    } else {
        window.location.pathname = "/item.html";
    }
    e.preventDefault();
});
carousel.prevImage = function() {
    if (carousel.currentImage > 1) {
        carousel.currentImage -= 1;
    } else {
        carousel.currentImage = 3;
    }
    carousel.setImage();
    carousel.setBullets();
}
carousel.nextImage = function() {
    if (carousel.currentImage < 3) {
        carousel.currentImage += 1;
    } else {
        carousel.currentImage = 1;
    }
    carousel.setImage();
    carousel.setBullets();
}

carousel.setImage = function() {
    carouselAnchor.classList.add("carousel-transparent");
    setTimeout(function() {
        carouselImage.setAttribute("src", "img/carousel/" + carousel.size + carousel.currentImage + ".png");
        setTimeout(function() {
            carouselAnchor.classList.remove("carousel-transparent");
        }, 100)
    }, 200);

}

carousel.checkSize = function() {
    if (window.innerWidth >= 1024) carousel.size = "L";
    else if (window.innerWidth >= 768) carousel.size = "M";
    else carousel.size = "S";
    carouselImage.setAttribute("src", "img/carousel/" + carousel.size + carousel.currentImage + ".png");
};
carousel.checkSize();

document.querySelector("#carousel-prev-btn").addEventListener("click", function(e) {
    carousel.resetAnimation();
    e.stopPropagation();
    e.preventDefault();
    carousel.prevImage();
});
document.querySelector("#carousel-next-btn").addEventListener("click", function(e) {
    carousel.resetAnimation();
    e.stopPropagation();
    e.preventDefault();
    carousel.nextImage();
});

carousel.setBullets = function() {
    Array.prototype.forEach.call(
        document.querySelectorAll(".carousel-bullet"),
        function(el) {
            el.classList.remove("is-active");
        }
    );
    document.querySelector("#carousel-bullet" + carousel.currentImage).classList.add("is-active");
}
carouselBullets.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    var id = e.target.id.match(/carousel-bullet(\d+)/);
    if (id) {
        carousel.resetAnimation();
        carousel.currentImage = parseInt(id[1]);
        carousel.setImage();
        carousel.setBullets();
    }
});
carousel.resetAnimation = function() {
    if (carousel.timer) {
        clearInterval(carousel.timer);
    }
    carousel.timer = setInterval(carousel.nextImage, 10000);
}
carousel.resetAnimation();