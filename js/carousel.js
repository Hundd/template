var carouselImage = [];
carouselImage[1] = document.querySelector("#carousel-image1");
carouselImage[2] = document.querySelector("#carousel-image2");
carouselImage[3] = document.querySelector("#carousel-image3");
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


});
carouselAnchor.addEventListener("touchend", function(e) {
    carousel.xFinish = 0;
});
carouselAnchor.addEventListener("click", function(e) {
    var path = window.location.href.match(/(.+)\/[^\/]+$/)[1];
    console.log(path);

    if (carousel.currentImage % 2) {
        window.location.href = path + "/catalog.html";
    } else {
        window.location.href = path + "/item.html";
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
        // carouselImage1.setAttribute("src", "img/carousel/" + carousel.size + carousel.currentImage + ".png");
        carouselImage.forEach(function(e) {
            e.classList.add("is-hidden");
        });
        carouselImage[carousel.currentImage].classList.remove("is-hidden");

        setTimeout(function() {
            carouselAnchor.classList.remove("carousel-transparent");
        }, 100)
    }, 200);

}

carousel.checkSize = function() {
    if (window.innerWidth >= 1024) carousel.size = "L";
    else if (window.innerWidth >= 768) carousel.size = "M";
    else carousel.size = "S";
    carouselImage[1].setAttribute("src", "img/carousel/" + carousel.size + "1.png");
    carouselImage[2].setAttribute("src", "img/carousel/" + carousel.size + "2.png");
    carouselImage[3].setAttribute("src", "img/carousel/" + carousel.size + "3.png");
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