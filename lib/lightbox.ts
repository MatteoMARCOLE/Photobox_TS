import { loadPicture } from "./photoloader";
import { Gallery, PhotoResponse } from "./types";

const lien = "https://webetu.iutnc.univ-lorraine.fr";

let galerieI: Gallery | null = null;
let indexI: number = 0;

function afficherPhotoLightbox(id: number): void {
    loadPicture(id)
        .then((data: PhotoResponse) => {
            const photo = data.photo;

            const lightbox = document.querySelector("#lightbox");
            const img = document.querySelector("#lightbox_img") as HTMLImageElement | null;
            const titre = document.querySelector("#lightbox_titre");

            if (lightbox !== null && img !== null && titre !== null) {
                img.src = lien + photo.url.href;
                img.alt = photo.titre;
                titre.innerHTML = photo.titre;
                lightbox.classList.remove("hidden");
            }
        })
        .catch((error: Error) => {
            console.error(error.message);
        });
}

export function ouvrirLightbox(galerie: Gallery, id: number): void {
    galerieI = galerie;

    const index = galerie.photos.findIndex((element) => {
        return element.photo.id === id;
    });

    if (index !== -1) {
        indexI = index;
        afficherPhotoLightbox(id);
    }
}

export function fermerLightbox(): void {
    const lightbox = document.querySelector("#lightbox");

    if (lightbox !== null) {
        lightbox.classList.add("hidden");
    }
}

export function LightboxSuivante(): void {
    if (galerieI !== null) {
        indexI++;

        if (indexI >= galerieI.photos.length) {
            indexI = 0;
        }

        const id = galerieI.photos[indexI].photo.id;
        afficherPhotoLightbox(id);
    }
}

export function LightboxPrecedente(): void {
    if (galerieI !== null) {
        indexI--;

        if (indexI < 0) {
            indexI = galerieI.photos.length - 1;
        }

        const id = galerieI.photos[indexI].photo.id;
        afficherPhotoLightbox(id);
    }
}

export function initLightboxButtons(): void {
    const close = document.querySelector("#fermer_lightbox");
    const next = document.querySelector("#lightbox_next");
    const prev = document.querySelector("#lightbox_prev");

    close?.addEventListener("click", fermerLightbox);
    next?.addEventListener("click", LightboxSuivante);
    prev?.addEventListener("click", LightboxPrecedente);
}