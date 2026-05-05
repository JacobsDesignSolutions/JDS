import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Printer, Cpu, Layers, Zap } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import TechnicalBracket from "../components/TechnicalBracket";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 z-0">
          <img 
            src="3d_printer_nozzle_action.png" 
            alt="3D Printing in Progress"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/60 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {t("hero_title_1")} <br />
              <span className="text-brand-green">{t("hero_title_2")}</span>
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-lg">
              {t("hero_desc")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/products"
                className="px-8 py-4 bg-brand-green text-white rounded-full font-medium flex items-center gap-2 hover:bg-white hover:text-brand-green transition-all"
              >
                {t("hero_cta_gallery")} <ArrowRight size={20} />
              </Link>
              <Link 
                to="/contact"
                className="px-8 py-4 border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-all"
              >
                {t("hero_cta_quote")}
              </Link>
            </div>
          </motion.div>

          {/* Technical Drawing Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 0.8, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="hidden md:block relative w-[350px] lg:w-[600px] aspect-square"
          >
            <TechnicalBracket className="w-full h-full" />
          </motion.div>
        </div>
        
        {/* Decorative elements */}
      </section>

      {/* Expertise Section */}
      <section className="py-24 bg-ui-light technical-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">{t("expertise_title")}</h2>
            <p className="text-brand-dark/60 max-w-2xl mx-auto">
              {t("expertise_desc")}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <Printer />, title: t("serv_1_title"), desc: t("serv_1_desc") },
              { icon: <Layers />, title: t("serv_2_title"), desc: t("serv_2_desc") },
              { icon: <Cpu />, title: t("serv_3_title"), desc: t("serv_3_desc") },
              { icon: <Zap />, title: t("serv_4_title"), desc: t("serv_4_desc") },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-brand-green/5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center text-brand-green mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-sm text-brand-dark/60 leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
