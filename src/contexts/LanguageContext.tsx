import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'NL' | 'EN';

interface Translations {
  [key: string]: {
    [K in Language]: string;
  };
}

const translations: Translations = {
  // Navbar
  nav_home: { NL: 'Home', EN: 'Home' },
  nav_products: { NL: 'Producten', EN: 'Products' },
  nav_contact: { NL: 'Contact', EN: 'Contact' },
  
  // Home
  hero_title_1: { NL: 'Ontwerpen', EN: 'Design' },
  hero_title_2: { NL: 'en 3D‑printen', EN: 'and 3D‑printing' },
  hero_desc: { NL: 'Jacobs Design Solutions focust op het ontwikkelen en 3D‑printen van functionele onderdelen voor zowel industrie en particulieren.', EN: 'Jacobs Design Solutions focuses on developing and 3D‑printing functional parts for both industry and individuals.' },
  hero_cta_gallery: { NL: 'Bekijk Galerij', EN: 'View Gallery' },
  hero_cta_quote: { NL: 'Offerte Aanvragen', EN: 'Get a Quote' },
  
  expertise_title: { NL: 'Expertise', EN: 'Expertise' },
  expertise_desc: { NL: 'Van snelle prototyping tot productie in kleine series, wij bieden de tools en het talent om uw visie te schalen.', EN: 'From rapid prototyping to small-batch production, we provide the tools and talent to scale your vision.' },
  
  serv_1_title: { NL: 'Snelle Prototyping', EN: 'Rapid Prototyping' },
  serv_1_desc: { NL: 'Valideer ontwerpen in uren met mogelijkheden voor meerdere materialen.', EN: 'Validate designs in hours with multi-material capability.' },
  serv_2_title: { NL: 'Serieproductie', EN: 'Batch Production' },
  serv_2_desc: { NL: 'Schaal van 1 tot 1.000 eenheden met consistente industriële kwaliteit.', EN: 'Scale from 1 to 1,000 units with consistent industrial quality.' },
  serv_3_title: { NL: 'Technisch Ontwerp', EN: 'Custom Engineering' },
  serv_3_desc: { NL: 'Optimalisatie voor additieve productie en mechanisch ontwerp.', EN: 'Optimization for additive manufacturing and mechanical design.' },
  serv_4_title: { NL: 'Snelheid naar de Markt', EN: 'Speed to Market' },
  serv_4_desc: { NL: 'Iteer sneller en lanceer eerder met onze agile workflow.', EN: 'Iterate faster and launch sooner with our agile workflow.' },
  
  cta_title: { NL: 'Klaar om de toekomst te printen?', EN: 'Ready to print the future?' },
  cta_desc: { NL: 'Stuur ons vandaag nog uw CAD-bestanden en ontvang binnen 24 uur een deskundige beoordeling en offerte.', EN: 'Send us your CAD files today and get an expert review and quote within 24 hours.' },
  cta_button: { NL: 'Werk met JDS', EN: 'Work with JDS' },

  // Products
  prod_title: { NL: 'Ons Werk', EN: 'Our Work' },
  prod_desc: { NL: 'Ontdek ons portfolio van hoogwaardige onderdelen en creatieve samenwerkingen.', EN: 'Explore our portfolio of high-precision parts and creative collaborations.' },
  prod_cat_all: { NL: 'Alle', EN: 'All' },
  prod_cat_eng: { NL: 'Techniek', EN: 'Engineering' },
  prod_cat_des: { NL: 'Ontwerp', EN: 'Design' },
  prod_cat_med: { NL: 'Medisch', EN: 'Medical' },
  prod_cat_arc: { NL: 'Architectuur', EN: 'Architecture' },
  prod_cat_com: { NL: 'Commercieel', EN: 'Commercial' },
  prod_specs: { NL: 'Specificaties Aanvragen', EN: 'Request Specs' },

  // Contact
  cont_title_1: { NL: 'Laten we iets', EN: "Let's build" },
  cont_title_2: { NL: 'echts bouwen.', EN: 'something real.' },
  cont_desc: { NL: 'Of u nu direct printbare CAD-bestanden heeft of alleen een ruw concept op een servet, ons engineeringteam staat klaar om te helpen.', EN: 'Whether you have ready-to-print CAD files or just a rough concept on a napkin, our engineering team is ready to help.' },
  cont_fast: { NL: 'Snelle Levering', EN: 'Fast Turnaround' },
  cont_fast_sub: { NL: 'Offertes binnen 12-24u', EN: 'Quotes within 12-24h' },
  cont_global: { NL: 'Wereldwijde Verzending', EN: 'Global Shipping' },
  cont_global_sub: { NL: 'Betrouwbare logistiek', EN: 'Reliable logistics worldwide' },
  cont_response: { NL: 'Typische reactietijd: < 4 uur', EN: 'Typical response time: < 4 hours' },
  
  form_success_title: { NL: 'Bericht Ontvangen', EN: 'Message Received' },
  form_success_desc: { NL: 'Bedankt voor uw bericht. Een engineer van Jacobs Design Solutions neemt zo snel mogelijk contact met u op.', EN: 'Thank you for reaching out. An engineer from Jacobs Design Solutions will contact you shortly.' },
  form_name: { NL: 'Volledige Naam', EN: 'Full Name' },
  form_company: { NL: 'Bedrijf', EN: 'Company' },
  form_email: { NL: 'E-mailadres', EN: 'Email Address' },
  form_message: { NL: 'Bericht / Projectgegevens', EN: 'Message / Project Details' },
  form_file: { NL: 'Bestand toevoegen (Optioneel, Max 10MB)', EN: 'Add file (Optional, Max 10MB)' },
  form_placeholder: { NL: 'Vertel ons over uw project...', EN: 'Tell us about your project...' },
  form_submit: { NL: 'Verstuur Aanvraag', EN: 'Send Inquiry' },
  form_legal: { NL: 'Door dit te verzenden gaat u akkoord met onze geheimhoudingsvoorwaarden.', EN: 'By sending this you agree to our non-disclosure terms.' },
  
  // Footer
  footer_desc: { NL: 'Industriële 3D‑printing en engineering voor professionals, ontwerpers en innovators wereldwijd.', EN: 'Industrial grade 3D‑printing and engineering services for professionals, designers, and innovators worldwide' },
  footer_links: { NL: 'Snelle Links', EN: 'Quick Links' },
  footer_connect: { NL: 'Contact', EN: 'Connect' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('NL');

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
