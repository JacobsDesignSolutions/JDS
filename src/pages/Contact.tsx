import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle2, MessageSquare, Clock, Globe } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to send message");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Form submission error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-dark text-white relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-green/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-green/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Info Side */}
          <div>
            <div className="flex items-center gap-4 text-[10px] font-mono text-brand-green tracking-[0.2em] uppercase mb-6">
              <span className="w-12 h-px bg-brand-green"></span>
              Contact / Inquiries
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              {t("cont_title_1")} <br /> <span className="text-brand-green">{t("cont_title_2")}</span>
            </h1>
            <p className="text-lg text-white/50 mb-12 max-w-md">
              {t("cont_desc")}
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-green shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1 uppercase tracking-wider">{t("cont_fast")}</h4>
                  <p className="text-xs text-white/40">{t("cont_fast_sub")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-green shrink-0">
                  <Globe size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1 uppercase tracking-wider">{t("cont_global")}</h4>
                  <p className="text-xs text-white/40">{t("cont_global_sub")}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-16 pt-16 border-t border-white/10 hidden lg:block">
              <div className="flex items-center gap-3 text-white/30 font-mono text-xs italic">
                <MessageSquare size={16} />
                <span>{t("cont_response")}</span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white rounded-3xl p-8 md:p-12 text-brand-dark shadow-2xl relative">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{t("form_success_title")}</h3>
                <p className="text-brand-dark/60 max-w-xs mx-auto">
                  {t("form_success_desc")}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 italic">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40">{t("form_name")}</label>
                    <input 
                      required
                      name="name"
                      type="text" 
                      className="w-full bg-ui-light border border-brand-green/10 rounded-xl px-4 py-3 text-sm focus:border-brand-green outline-none transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40">{t("form_company")}</label>
                    <input 
                      name="company"
                      type="text" 
                      className="w-full bg-ui-light border border-brand-green/10 rounded-xl px-4 py-3 text-sm focus:border-brand-green outline-none transition-colors"
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40">{t("form_email")}</label>
                  <input 
                    required
                    name="email"
                    type="email" 
                    className="w-full bg-ui-light border border-brand-green/10 rounded-xl px-4 py-3 text-sm focus:border-brand-green outline-none transition-colors"
                    placeholder="jane@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40">{t("form_message")}</label>
                  <textarea 
                    required
                    name="message"
                    rows={4}
                    className="w-full bg-ui-light border border-brand-green/10 rounded-xl px-4 py-3 text-sm focus:border-brand-green outline-none transition-colors"
                    placeholder={t("form_placeholder")}
                  ></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40">{t("form_file")}</label>
                  <input 
                    name="attachment"
                    type="file" 
                    className="w-full bg-ui-light border border-brand-green/10 rounded-xl px-4 py-3 text-sm focus:border-brand-green outline-none transition-colors file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-brand-green/10 file:text-brand-green hover:file:bg-brand-green/20"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-green text-white rounded-xl py-4 font-bold uppercase tracking-widest text-sm hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-lg shadow-brand-green/20"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      {t("form_submit")} <Send size={18} />
                    </>
                  )}
                </button>
                <p className="text-[10px] text-center text-brand-dark/30 font-mono italic">
                  {t("form_legal")}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
