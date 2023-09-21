import { useEffect, useState } from "react"

import { copy, linkIcon, loader, tick } from '../assets'
import { useLazyGetSummaryQuery } from "../services/article"

const Demo = () => {
  // État initial du composant
  const [article, setArticle] = useState({
    url: '',
    summary: '',
  })
  const [allArticles, setAllArticles] = useState([])
  const [copied, setCopied] = useState("")

  // Utilisation du hook `useLazyGetSummaryQuery` pour effectuer des requêtes API
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  // Effet pour charger les articles depuis le stockage local lors du montage
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage)
    }
  }, [])

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Appel à l'API pour obtenir un résumé de l'article en fonction de l'URL
    const { data } = await getSummary({ articleUrl: article.url })

    if (data?.summary) {
      // Mise à jour de l'article et ajout à la liste des articles
      const newArticle = { ...article, summary: data.summary }
      const updatedAllArticles = [newArticle, ...allArticles]

      setArticle(newArticle);
      setAllArticles(updatedAllArticles)

      // Stockage de la liste mise à jour dans le stockage local
      localStorage.setItem('articles', JSON.stringify(updatedAllArticles))
    }
  }

  // Gestionnaire de copie du lien de l'article dans le presse-papiers
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl)
    navigator.clipboard.writeText(copyUrl)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Formulaire de recherche */}
      <div className="flex flex-col w-full gap-2">
        <form className="relative flex justify-center items-center" onSubmit={handleSubmit}>
          {/* Icône de lien à gauche de la zone de texte */}
          <img src={linkIcon} alt="link_icon" className="absolute left-0 my-2 ml-3 w-5" />
          {/* Zone de texte pour entrer l'URL de l'article */}
          <input
            type="url"
            placeholder="Entrez un lien"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
          />
          {/* Bouton de soumission du formulaire */}
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            OK
          </button>
        </form>
        {/* Liste des liens URL récemment consultés */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div key={`${index}`} onClick={() => setArticle(item)} className="link_card">
              {/* Icône de copie et lien URL */}
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Affichage des résultats */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="Chargement" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Désolé, ça ne devait pas se passer comme ça...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              {/* Titre du résumé */}
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                <span className="blue_gradient">Résumé</span> Article
              </h2>
              {/* Boîte de résumé de l'article */}
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-grey-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default Demo
