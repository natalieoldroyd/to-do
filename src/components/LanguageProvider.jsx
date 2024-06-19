import * as React from "react";
import {useState, useContext} from "react"

const translations = {
  en: {
    hello: "Hello!",
    welcome: "Welcome to our app!"
  },
  es: {
    hello: "¡Hola!",
    welcome: "¡Bienvenido a nuestra aplicación!"
  },
  fr: {
    hello: "Bonjour !",
    welcome: "Bienvenue dans notre application !"
  },
  de: {
    hello: "Hallo!",
    welcome: "Willkommen in unserer App!"
  }
};

//create context
const languageContext = React.createContext({
  language: "en",
  changeLanguage: () => {},
  translation: (key) => key
});

//create a component that represents the contexte's provider
//choose what must be passsed
function LanguageProvider({ children }) {
    //if children not provided we know we need to pass this here because we can see that LanguageProvider wraps children in the app component.
  const [language, setLanguage] = useState("en")

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage)
  };
  //the component this is used in sets a new language represented by a key on the translations object

  const translation = (key) => {
    return translations[language]?.[key] || [key]
  };
  //we know this function takes key as it's argument looking at the createContext


  return <languageContext.Provider value={{language, changeLanguage, translation}}>{children}</languageContext.Provider>;
  //the context object we created above comes with a Provider property so we reference it as language.Provider and pass to the value
  //prop what we want to transport to chidren comonents
  //we are passing the deconstructed properties of the Context object
  //we know that since our provider wraps children this will take in children and we know that we're going to want to pass value prop to those children. 
  //if reutrn null instead renders nothing
}

function LanguageSwitcher() {
  const {language, changeLanguage} = useContext(languageContext)
  // const language = null;
  // const changeLanguage = () => {};

  //on change of selection choice update languge to target

  //we know we need language and changeLanguage but we have this defined already in the Provider.

  return (
    <div>
      <select value={language} onChange={(e) => changeLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
      </select>
    </div>
  );
}

function Greeting() {
  // const translation = () => {};
  const {translation} = useContext(languageContext)
  //since we know via the Provider that we have access to all functions and all variables. We can destruct off the Provider using the useContext hook

  return (
    <div>
      <h1>{translation("hello")}</h1>
      <p>{translation("welcome")}</p>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <LanguageSwitcher />
      <Greeting />
    </LanguageProvider>
  );
}
