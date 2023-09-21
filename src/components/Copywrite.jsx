import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons"; // L'icône GitHub de Font Awesome

const Copyright = () => {
  // Vos informations personnelles
  const nom = "Charbel SONON";
  const annee = new Date().getFullYear(); // Obtient l'année actuelle

  // URL de votre compte GitHub
  const githubUrl = "https://github.com/AsKing07"; // Remplacez par votre URL GitHub

  return (
    <div className="mt-4 w-full max-w-xl justify-center " >
      <p className="justify-center items-center w-full">

         &copy;{annee} {nom} Tous droits réservés.

        
        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} className="text-xl" /> 
        </a>
        
      </p>
    </div>
  );
};

export default Copyright;
