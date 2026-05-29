import { PhotoResponse } from "./types";
import { API_URL, BASE_URL } from "./config";

// Permet de charger les données d'une photo précise
export function loadPicture(idPicture: number): Promise<PhotoResponse> {
    return fetch(`${API_URL}/photos/${idPicture}`, { credentials: "include" })
        .then((rep: Response): Promise<PhotoResponse> => {
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
export function loadResource<T>(uri: string): Promise<T> {
    return fetch(`${BASE_URL}${uri}`, { credentials: "include" })
        .then((rep: Response): Promise<T> => {
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