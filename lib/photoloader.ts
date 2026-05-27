import { PhotoResponse } from "./types";

const URL = "https://webetu.iutnc.univ-lorraine.fr/www/canals5/phox/api";
const Duri = "https://webetu.iutnc.univ-lorraine.fr";


// Permet de charger les données d'une photo précise
export function loadPicture(idPicture: number): Promise<PhotoResponse> {
    return fetch(`${URL}/photos/${idPicture}`)
        .then((rep : Response): Promise<PhotoResponse> => {
            if (!rep.ok) {
                return Promise.reject(new Error(rep.statusText));
            }
            
            return rep.json();
        })
        .catch((error: unknown) => {
            if (error instanceof Error) {
                console.error(error.message);
            }
            throw error;
        });
}

// Permet de charger une ressource donnée 
export function loadResource<T>(uri :string): Promise<T> {
    return fetch(`${Duri}${uri}`)
        .then((rep: Response): Promise<T> => {
            if (!rep.ok) {
                return Promise.reject(new Error(rep.statusText));
            }

            return rep.json();
        })
        .catch((error: Error) => {
            if (error instanceof Error) {
                console.error(error.message);
            }
        throw error;
        })
}
