
import { useState } from 'react';
import Hero from './components/Hero'
import DemoArticle from './components/Demo'
import DemoText from "./components/DemoText"; // Importez le composant DemoText
import Copyright from './components/Copywrite'


import './App.css'

const App = () => {
  const [choice, setChoice] = useState("article"); // Par défaut, résumer un article
  return (
    <main>

      <div className='main'>
        <div className='gradient' />
      </div>

      <div className='app'>
        <Hero />

        <section className="mt-16 w-full max-w-xl">

          {/* Ajoutez le sélecteur (dropdown) */}
          <div className="flex flex-col justify-center items-center mb-4">
            <label className="mr-2">Choisissez :</label>
            <select value={choice} onChange={(e) => setChoice(e.target.value)}>
              <option value="article">Résumer un article par lien</option>
              <option value="text">Résumer un texte</option>
            </select>
          </div>

          {choice === "article" ? (
            <DemoArticle /> // Composant pour résumer un article
          ) : (
            <DemoText /> // Composant pour résumer un texte
          )}

      </section>


        <Copyright/>

      </div>


    </main>

  )
}

export default App