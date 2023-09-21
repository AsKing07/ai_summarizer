import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Récupère la clé API depuis les variables d'environnement
const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

// Crée une instance de l'API article
export const articleApi = createApi({
    reducerPath: 'articleApi', // Le nom du slice Redux
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/', // URL de base de l'API

        prepareHeaders: (headers) =>
        {
            headers.set('content-type', 'application/json')
            headers.set('X-RapidAPI-Key', rapidApiKey); // Ajoute la clé API aux en-têtes
            headers.set('X-RapidAPI-HOST', 'article-extractor-and-summarizer.p.rapidapi.com'); // Définit l'hôte de l'API

            return headers;
        },
    }),
    
    endpoints: (builder) =>({
        getSummary: builder.query({
            query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3&lang=fr` // Définit l'endpoint pour obtenir un résumé d'un article
        }),

        getSummaryText: builder.query({
            query: (params) => ({
                url: '/summarize-text',
                method: 'POST',
                body: { "text": params.text , "lang": params.lang },
            }),
        }),
        
    })
})

export const { useLazyGetSummaryQuery, useLazyGetSummaryTextQuery } = articleApi