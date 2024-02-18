import { galleryItems } from "./gallery-items.js";

const gallery = document.querySelector(".gallery");

document.body.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeLightbox();
    }
});

function closeLightbox() {
    if (currentLightbox) {
        currentLightbox.close();
        currentLightbox = null;
    }
}

let currentLightbox = null;

gallery.innerHTML = galleryItems
    .map(
        (item) => `
      <li class="gallery__item">
        <a class="gallery__link" href="${item.original}">
          <img class="gallery__image" src="${item.preview}" alt="${item.description}">
        </a>
      </li>
    `
    )
    .join("");

gallery.addEventListener("click", (event) => {
    event.preventDefault();

    if (event.target.nodeName === "IMG") {
        const imageUrl = event.target.parentElement.href;

        const lightbox = basicLightbox.create(
            `
      <div class="modal">
        <img src="${imageUrl}" width="800" height="600">
        <a class="close-btn">Close</a>
      </div>
    `,
            {
                onShow: (instance) => {
                    instance.element().querySelector(".close-btn").onclick =
                        () => {
                            closeLightbox();
                        };
                },
            }
        );

        closeLightbox();

        lightbox.show();

        currentLightbox = lightbox;
    }
});
