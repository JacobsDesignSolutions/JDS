import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import Logo from "./Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { name: t("nav_home"), path: "/" },
    { name: t("nav_products"), path: "/products" },
    { name: t("nav_contact"), path: "/contact" },
  ];

  const languages = [
    { code: "NL", label: "Nederlands (BE)" },
    { code: "EN", label: "English" },
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-brand-green/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium text-sm transition-colors hover:text-brand-green ${
                  location.pathname === link.path ? "text-brand-green" : "text-brand-dark/70"
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-green"
                  />
                )}
              </Link>
            ))}
            
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-brand-green/5 transition-colors text-brand-dark/70 hover:text-brand-green"
              >
                <Globe size={16} />
                <span className="text-xs font-bold font-mono tracking-tighter">{currentLang.code}</span>
                <ChevronDown size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white border border-brand-green/10 rounded-xl shadow-xl p-2 z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as "NL" | "EN");
                          setLangOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                          language === lang.code 
                            ? "bg-brand-green/10 text-brand-green font-bold" 
                            : "text-brand-dark/70 hover:bg-brand-green/5"
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-brand-dark"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-brand-green/10 px-4 py-6 flex flex-col gap-1"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-lg font-medium px-2 py-3 border-b border-transparent ${
                location.pathname === link.path ? "text-brand-green border-brand-green/10" : "text-brand-dark/70"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-brand-green/10 my-4 mx-2"></div>
          <div className="flex flex-wrap gap-3 px-2 pb-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as "NL" | "EN");
                  setIsOpen(false);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                  language === lang.code 
                    ? "bg-brand-green text-white border-brand-green shadow-md shadow-brand-green/20" 
                    : "border-brand-green/20 text-brand-dark/60"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
