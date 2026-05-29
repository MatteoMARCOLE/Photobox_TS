import { loadResource } from "./photoloader";
import { Gallery } from "./types";

let galerie: Gallery | null = null;

// Charge la premiere page 
export function load(): Promise<Gallery> {
    return loadResource<Gallery>("/www/canals5/phox/api/photos/")
        .then((data: Gallery) => {
            galerie = data;
            return galerie;
        });
}

// fontions qui vont être associées au bouton pour charger la page demandée (suivante, precedente, premiere, derniere)
export function pageSuivante(): Promise<Gallery> {
    if (galerie === null) {
        return Promise.reject(new Error("La galerie n'est pas encore chargée"));
    }

    return loadResource<Gallery>(galerie.links.next.href)
        .then((data: Gallery) => {
            galerie = data;
            return galerie;
        });
}

export function pagePrecedente(): Promise<Gallery> {
    if (galerie === null) {
        return Promise.reject(new Error("La galerie n'est pas encore chargée"));
    }

    return loadResource<Gallery>(galerie.links.prev.href)
        .then((data: Gallery) => {
            galerie = data;
            return galerie;
        })
}

export function pageFirst(): Promise<Gallery> {
    if (galerie === null) {
        return Promise.reject(new Error("La galerie n'est pas encore chargée"));
    }
    
    return loadResource<Gallery>(galerie.links.first.href)
        .then((data: Gallery) => {
            galerie = data;
            return galerie;
        })
}

export function pageLast(): Promise<Gallery> {
    if (galerie === null) {
        return Promise.reject(new Error("La galerie n'est pas encore chargée"));
    }

    return loadResource<Gallery>(galerie.links.last.href)
        .then((data: Gallery) => {
            galerie = data;
            return galerie;
        })
}