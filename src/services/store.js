import { configureStore } from "@reduxjs/toolkit";
import { articleApi } from "./article";

// Configuration du store Redux
export const store = configureStore({
    reducer: {
        [articleApi.reducerPath]: articleApi.reducer // Utilise le reducer de l'API article
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware) // Ajoute le middleware de l'API article
})
