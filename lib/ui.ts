import Handlebars from "handlebars";
import { CommentsResponse, PhotoDetail, CategorieResponse, Commentaire } from "./types";

// affiche une photo dans le HTML grace au script Handlebars
export function displayPicture(photo : PhotoDetail): void {
    const source = document.querySelector('#photoTemplate');
    const zone = document.querySelector('#la_photo');

    if (source !== undefined && source !== null && zone !==null) {
        const template = Handlebars.compile(source.innerHTML);

        const html = template({
            titre: photo.titre,
            descr: photo.descr,
            type: photo.type,
            width: photo.width,
            height: photo.height,
            url: "https://webetu.iutnc.univ-lorraine.fr" + photo.url.href
        });

        zone.innerHTML = html;
    }
}

// Afficher la categorie dans le HTML
export function InsertCategory(categorie: CategorieResponse): void {
    const cate = document.querySelector('#la_categorie');

    if (cate !== null) {
        cate.innerHTML = "categorie : " + categorie.categorie.nom;
    }
}


// Afficher les commentaires dans le HTML
export function InsertComments(comments: CommentsResponse): void {
    const comm = document.querySelector('#les_commentaires');

    if (comm !== null) {
        comments.comments.forEach((element : Commentaire) => {
           comm.innerHTML += "<br><li>(" + element.pseudo + ") <strong> " + element.titre + " </strong> : " + element.content + " - " + element.date + "</li></br>"; 
        });
    } 
}
