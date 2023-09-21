import { useState } from "react";
import { copy, loader, tick } from '../assets';
import { useLazyGetSummaryTextQuery } from "../services/article";

const DemoText = () => {
  // Déclaration des états pour gérer les données du formulaire et du résumé
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [copied, setCopied] = useState("");
  const [lang, setLang] = useState("fr"); // Langue par défaut

  // Utilisation de l'API pour obtenir le résumé du texte
  const [getSummaryText, { error, isFetching }] = useLazyGetSummaryTextQuery();

  // Fonction pour copier le résumé dans le presse-papiers
  const handleCopy = (copyText) => {
    setCopied(copyText);
    navigator.clipboard.writeText(copyText);
    setTimeout(() => setCopied(false), 3000);
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification si le texte est une chaîne valide
    if (typeof text !== 'string') {
      // Gérez l'erreur ou affichez un message d'erreur à l'utilisateur
      console.log('Le texte n\'est pas valide');
      return;
    }

    // Appel de l'API pour obtenir le résumé du texte
    const { data } = await getSummaryText({ text: text, lang: lang });

    if (data?.summary) {
      setSummary(data.summary);
    }
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        {/* Formulaire pour entrer le texte à résumer */}
        <form
          className="relative flex flex-col items-center w-full"
          onSubmit={handleSubmit}
        >
          <div className="mb-2">
            <label className="mr-2">Langue de destination:</label>
            {/* Sélecteur de langue */}
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="lang_select peer appearance-none w-full bg-white border border-gray-300 rounded py-2 px-4 focus:outline-none focus:border-blue-500"
            >
              <option value="en">Anglais</option>
              <option value="fr">Français</option>
              {/* Ajoutez d'autres langues au besoin */}
            </select>
          </div>

          <div className="mb-2 w-full">
            {/* Zone de texte pour entrer le contenu à résumer */}
            <textarea
              placeholder="Entrez un texte à résumer"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              className="text_input peer h-40 w-full" // Augmentez la hauteur ici
            />
          </div>

          <div className="flex items-center justify-center">
            {/* Bouton de soumission du formulaire */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Soumettre
            </button>
          </div>
        </form>
      </div>

      <div className="my-10 max-w-full flex justify-center items-center">
        {/* Affichage du résumé ou des messages d'erreur */}
        {isFetching ? (
          <img
            src={loader}
            alt="Chargement"
            className="w-20 h-20 object-contain"
          />
        ) : error ? (
          <p className="font-bold text-black text-center">
            Désolé, une erreur s&apos;est produite.
            <br />
            <span className="font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-bold text-gray-600 text-xl">
                <span className="text-blue-500">Résumé</span> du Texte
              </h2>

              <div className="summary_box">
                {/* Bouton pour copier le résumé dans le presse-papiers */}
                <div className="copy_btn" onClick={() => handleCopy(summary)}>
                  <img
                    src={copied === summary ? tick : copy}
                    alt="copy_icon"
                    className="w-8 h-8 object-contain"
                  />
                </div>

                {/* Affichage du résumé */}
                <p className="font-medium text-sm text-gray-700">{summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default DemoText;
