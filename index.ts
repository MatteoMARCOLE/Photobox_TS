import { loadPicture, loadResource } from "./lib/photoloader";
import { displayPicture, InsertCategory, InsertComments } from "./lib/ui";
import { display_galerie } from "./lib/gallery_ui";
import { load, pagePrecedente, pageSuivante, pageFirst, pageLast } from "./lib/gallery";
import { PhotoResponse, CategorieResponse, CommentsResponse, Gallery } from "./lib/types";

// Appel loadPicture et affiche dans l'HTML via DisplayPicture par exemple
function getPicture(id: number): void {
    loadPicture(id)
    .then((photos: PhotoResponse) => {
    console.log("log de de Photos 105", photos);
    const photo = photos.photo;

    displayPicture(photo);

    getResource(photos)
        .then((categorie: CategorieResponse) => {
        console.log(categorie);
        InsertCategory(categorie);
        });

    getCommentaires(photos)
        .then((comments: CommentsResponse) => {
        console.log(comments);
        InsertComments(comments);
        });
    })
    .catch((error: Error) => console.error(error.message));
    
}

getPicture(window.location.hash ? Number(window.location.hash.substring(1)) : 105);

function getResource(photo : PhotoResponse) : Promise<CategorieResponse> {
    return loadResource(photo.links.categorie.href);
}

function getCommentaires(photo : PhotoResponse) : Promise<CommentsResponse> {
    return loadResource(photo.links.comments.href);
}

const bGalerie = document.querySelector('#load_gallery');

if (bGalerie !== null)
    bGalerie.addEventListener("click", () => {
        load()
            .then((liste: Gallery) => {
                display_galerie(liste);
            })
            .catch((error: Error) => {
                console.error(error.message);
            });
    })


// Association des fonction aux boutons
const suivante = document.querySelector('#next');
const precedente = document.querySelector('#prev');

precedente?.addEventListener("click", () => {
    pagePrecedente()
        .then((liste: Gallery) => {
            display_galerie(liste);
        })   
        .catch((error: Error) => {
            console.log(error.message);
        })

})

suivante?.addEventListener("click", () => {
    pageSuivante()
        .then((liste: Gallery) => {
            display_galerie(liste);
        })
        .catch((error: Error) => {
            console.error(error.message);
        })
})

const premiere = document.querySelector('#first');
const derniere = document.querySelector('#last');

premiere?.addEventListener("click", () => {
    pageFirst()
        .then((liste: Gallery) => {
            display_galerie(liste);
        })
        .catch((error: Error) => {
            console.error(error.message);
        })
})

derniere?.addEventListener("click", () => {
    pageLast()
        .then((liste: Gallery) => {
            display_galerie(liste);
        })
        .catch((error: Error) => {
            console.error(error.message);
        })
})

