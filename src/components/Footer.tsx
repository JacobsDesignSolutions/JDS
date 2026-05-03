import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import Logo from "./Logo";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="mb-6 block">
              <span className="font-display font-bold text-lg text-white">
                Jacobs Design Solutions
              </span>
            </Link>
            <p className="text-white/60 max-w-sm mb-6 leading-relaxed">
              {t("footer_desc")}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-green transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-green transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-green transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6">{t("footer_links")}</h4>
            <ul className="flex flex-col gap-4 text-white/60 text-sm">
              <li><Link to="/" className="hover:text-brand-green transition-colors">{t("nav_home")}</Link></li>
              <li><Link to="/products" className="hover:text-brand-green transition-colors">{t("nav_products")}</Link></li>
              <li><Link to="/contact" className="hover:text-brand-green transition-colors">{t("nav_contact")}</Link></li>
              <li><a href="#" className="hover:text-brand-green transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-6">{t("footer_connect")}</h4>
            <ul className="flex flex-col gap-4 text-white/60 text-sm">
              <li className="flex items-center gap-3 text-white/60 hover:text-brand-green transition-colors">
                <Mail size={16} className="text-brand-green" />
                <a href="mailto:info@jacobsdesignsolutions.com">info@jacobsdesignsolutions.com</a>
              </li>
              <li className="flex items-center gap-3 text-white/60 hover:text-brand-green transition-colors">
                <Phone size={16} className="text-brand-green" />
                <a href="tel:+32498322975">+32 498 322 975</a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-brand-green" />
                <span>Limburg, Belgium</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30 font-mono tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Jacobs Design Solutions Ltd.
          </p>
          <div className="flex items-center gap-2 text-[10px] text-white/20 font-mono">
            <span className="w-2 h-2 rounded-full bg-brand-green"></span>
            SYSTEMS ONLINE
          </div>
        </div>
      </div>
    </footer>
  );
}
