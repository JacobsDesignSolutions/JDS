import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Info } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const PRODUCTS = [
  {
    id: 1,
    title: { NL: "V12 Motorblok Prototype", EN: "V12 Engine Block Prototype" },
    categoryKey: "prod_cat_eng",
    material: "SLA / High-Temp Resin",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
    desc: { NL: "1:4 schaal functioneel model met complexe interne koelkanalen.", EN: "1:4 scale functional model with intricate internal cooling channels." }
  },
  {
    id: 2,
    title: { NL: "Minimalistische Moderne Plantenbak", EN: "Minimalist Modern Planter" },
    categoryKey: "prod_cat_des",
    material: "FDM / Bio-Polymer",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800",
    desc: { NL: "Aangepaste parametrische geometrie met geweven textuurfinish.", EN: "Custom parametric geometry with woven texture finish." }
  },
  {
    id: 3,
    title: { NL: "Aangepast Orthopedisch Implantaat", EN: "Custom Orthopedic Implant" },
    categoryKey: "prod_cat_med",
    material: "SLS / Medical Grade Titanium",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800",
    desc: { NL: "Biocompatibele roosterstructuur voor snellere botintegratie.", EN: "Bio-compatible lattice structure for faster bone integration." }
  },
  {
    id: 4,
    title: { NL: "Architecturaal Model: Paviljoen", EN: "Architectural Model: Pavilion" },
    categoryKey: "prod_cat_arc",
    material: "SLA / White Fine-Detail",
    image: "https://images.unsplash.com/photo-1503387762-592dee58c16d?auto=format&fit=crop&q=80&w=800",
    desc: { NL: "Organische structurele studie voor een grootschalige openbare ruimte.", EN: "Organic structural study for a large scale public space." }
  },
  {
    id: 5,
    title: { NL: "Luchtvaartbeugel", EN: "Aerospace Bracket" },
    categoryKey: "prod_cat_eng",
    material: "SLS / Carbon Fiber Nylon",
    image: "https://images.unsplash.com/photo-1565152504344-933390233633?auto=format&fit=crop&q=80&w=800",
    desc: { NL: "Gewichtsgeoptimaliseerde topologie met generatieve ontwerpprincipes.", EN: "Weight-optimized topology using generative design principles." }
  },
  {
    id: 6,
    title: { NL: "Restauratieclip voor Erfgoed", EN: "Heritage Restoration Clip" },
    categoryKey: "prod_cat_com",
    material: "FDM / Recycled PETG",
    image: "https://images.unsplash.com/photo-1631553127989-5f6c9bbffb12?auto=format&fit=crop&q=80&w=800",
    desc: { NL: "Reverse-engineered vervangingsonderdeel voor historische ramen.", EN: "Reverse-engineered replacement part for historical windows." }
  }
];

export default function Products() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("prod_cat_all");

  const categories = [
    { key: "prod_cat_all", label: t("prod_cat_all") },
    { key: "prod_cat_eng", label: t("prod_cat_eng") },
    { key: "prod_cat_des", label: t("prod_cat_des") },
    { key: "prod_cat_med", label: t("prod_cat_med") },
    { key: "prod_cat_arc", label: t("prod_cat_arc") },
    { key: "prod_cat_com", label: t("prod_cat_com") },
  ];

  const filteredProducts = activeCategory === "prod_cat_all" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.categoryKey === activeCategory);

  return (
    <div className="pt-32 pb-24 min-h-screen technical-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-brand-dark mb-4 tracking-tight">
                {t("prod_title")}
              </h1>
              <p className="text-brand-dark/60 max-w-xl">
                {t("prod_desc")}
              </p>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-mono text-brand-green/40 tracking-[0.2em] uppercase">
              <span className="w-12 h-px bg-brand-green/20"></span>
              Portfolio / Projects
            </div>
          </div>

          {/* Filtering */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.key 
                    ? "bg-brand-green text-white shadow-lg shadow-brand-green/20" 
                    : "bg-white text-brand-dark/60 border border-brand-green/10 hover:border-brand-green/40"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </header>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white rounded-3xl overflow-hidden border border-brand-green/5 shadow-sm hover:shadow-xl transition-all h-full flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.title[language]}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-brand-green uppercase tracking-widest">
                  {t(product.categoryKey)}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-brand-green"></div>
                  <span className="font-mono text-[10px] text-brand-dark/40 uppercase tracking-widest">{product.material}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-brand-green transition-colors">{product.title[language]}</h3>
                <p className="text-sm text-brand-dark/60 leading-relaxed mb-6 flex-grow italic">
                  "{product.desc[language]}"
                </p>
                <Link to="/contact" className="flex items-center gap-2 text-xs font-bold text-brand-green uppercase tracking-widest group-hover:gap-4 transition-all w-fit">
                  {t("prod_specs")} <Info size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state if needed */}
        {filteredProducts.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-brand-dark/40 font-mono italic">No projects found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
