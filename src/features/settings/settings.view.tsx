import "./settings.css";
import spanish from "../../assets/icons/spain.svg";
import french from "../../assets/icons/france.svg";
import english from "../../assets/icons/english.svg";
import { useState } from "react";
import { useTranslation } from "react-i18next";
type Language = "en" | "fr" | "es";

const languageOptions = [
  { code: "en", name: "languages.english", icon: english },
  { code: "fr", name: "languages.french", icon: french },
  { code: "es", name: "languages.spanish", icon: spanish },
] as const;

export function SettingsView() {
  const { t, i18n } = useTranslation();
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");

  const currentLanguage = languageOptions.find(
    (lang) => lang.code === selectedLanguage
  );

  function selectLanguage(code: Language) {
    setSelectedLanguage(code);
    setSelectorOpen(false);
    i18n.changeLanguage(code);
    // Optional: Save to localStorage or context
    localStorage.setItem("selectedLanguage", code);
  }
  return (
    <section className="settings-view">
      <h1>Settings</h1>
      <button
        className="settings-view__language-btn"
        onClick={() => setSelectorOpen(!selectorOpen)}
      >
        <img
          src={currentLanguage?.icon}
          alt={currentLanguage?.name}
          width={24}
          height={24}
        />
        {t(currentLanguage?.name ?? "languages.english")}
      </button>
      {selectorOpen && (
        <ul
          className="settings-view__language-list"
          onBlur={() => setSelectorOpen(!selectorOpen)}
        >
          {languageOptions.map((lang) => (
            <li key={lang.code}>
              <button
                className={`settings-view__language-list__item ${
                  lang.code === selectedLanguage ? "active-language" : ""
                }`}
                onClick={() => selectLanguage(lang.code as Language)}
              >
                <img src={lang.icon} alt={lang.name} width={24} height={24} />
                {t(lang.name)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
