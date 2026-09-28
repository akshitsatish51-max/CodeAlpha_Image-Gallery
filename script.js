let images = [];
let currentImage = 0;

const uploadInput = document.getElementById("image-upload");
const gallery = document.getElementById("gallery");
const emptyMessage = document.getElementById("empty-message");

uploadInput.addEventListener("change", function(event) {
    const selectedFiles = event.target.files;

    for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];

        if (!file.type.startsWith("image/")) {
            continue;
        }

        const reader = new FileReader();

        reader.onload = function(e) {
            images.push({
                src: e.target.result,
                name: file.name
            });

            displayGallery();
        };

        reader.readAsDataURL(file);
    }

    event.target.value = "";
});

function displayGallery() {
    gallery.innerHTML = "";

    if (images.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    for (let i = 0; i < images.length; i++) {
        const item = document.createElement("div");
        item.className = "gallery-item";

        const image = document.createElement("img");
        image.src = images[i].src;
        image.alt = images[i].name;
        image.onclick = function() {
            openLightbox(i);
        };

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerHTML = "Delete";
        deleteButton.onclick = function(event) {
            event.stopPropagation();
            deleteImage(i);
        };

        item.appendChild(image);
        item.appendChild(deleteButton);
        gallery.appendChild(item);
    }
}

function deleteImage(index) {
    images.splice(index, 1);

    if (currentImage >= images.length) {
        currentImage = Math.max(0, images.length - 1);
    }

    closeLightbox();
    displayGallery();
}

function openLightbox(index) {
    currentImage = index;
    document.getElementById("lightbox-image").src = images[currentImage].src;
    document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

function changeImage(direction) {
    if (images.length === 0) {
        return;
    }

    currentImage = currentImage + direction;

    if (currentImage >= images.length) {
        currentImage = 0;
    }

    if (currentImage < 0) {
        currentImage = images.length - 1;
    }

    document.getElementById("lightbox-image").src = images[currentImage].src;
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        changeImage(1);
    }

    if (event.key === "ArrowLeft") {
        changeImage(-1);
    }
});

displayGallery();
