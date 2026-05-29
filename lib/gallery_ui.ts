import { Gallery, GalleryItem } from "./types";

export function display_galerie(liste: Gallery, photoCliquer: (id: number) => void): void {
    const affichage_galerie = document.querySelector('#galerie_photo');

    if (affichage_galerie !== null) {
        affichage_galerie.innerHTML = "";

        liste.photos.forEach((element: GalleryItem) => {
            const photo = element.photo;

            affichage_galerie.innerHTML += `
                <img 
                    src="https://webetu.iutnc.univ-lorraine.fr${photo.thumbnail.href}" 
                    alt="${photo.titre}"
                    data-photoId="${photo.id}">
            `;
        });

        const images = document.querySelectorAll('#galerie_photo img');

        images.forEach((element) => {
            element.addEventListener('click', () => {
                const id = element.getAttribute('data-photoId');

                if (id !== null) {
                    photoCliquer(Number(id));
                }
            });
        });
    }
}