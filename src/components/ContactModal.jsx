import { useState } from 'react';
import emailjs from '@emailjs/browser';
import * as Dialog from '@radix-ui/react-dialog';
import { EnvelopeIcon, PaperAirplaneIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function ContactModal({ t }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const SERVICE_ID = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY)
      .then(() => {
        setSent(true);
        setLoading(false);
        e.target.reset();
      })
      .catch((error) => {
        console.error('Error enviant el missatge:', error);
        setErrorMsg(t['contact.error']);
        setLoading(false);
      });
  };

  return (
    <Dialog.Root>
      {/* BOTÓ TRIGGER */}
      <Dialog.Trigger asChild>
        <button
          aria-label="Obrir formulari de contacte"
          title={t['contact.button']}
          className="group mt-6 inline-flex items-center justify-center mx-auto bg-slate-800 text-white dark:bg-white dark:text-slate-900 font-semibold py-2 px-6 rounded-full hover:bg-slate-900 dark:hover:bg-slate-100 transition-colors duration-200 shadow-sm"
        >
          <EnvelopeIcon className="w-5 h-5 mr-2 transition-transform group-hover:-rotate-12" />
          <span>{t['contact.button']}</span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        {/* OVERLAY */}
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity" />

        {/* MODAL CONTENT */}
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl w-full max-w-md border border-slate-200 dark:border-slate-700 animate-in fade-in-90 zoom-in-95">
          
          {/* Accessible description */}
          <Dialog.Description className="sr-only">
            {t['contact.description'] || 'Formulari de contacte'}
          </Dialog.Description>

          {/* Title + Subtitle */}
          <Dialog.Title className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            {t['contact.title']}
          </Dialog.Title>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            {t['contact.subtitle'] || "Omple el formulari i et respondré el més aviat possible."}
          </p>

          {/* FEEDBACK */}
          <div aria-live="polite" aria-atomic="true">
            {sent && (
              <div className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 text-sm px-3 py-2 rounded-md mb-4 flex items-center gap-2">
                <span aria-hidden="true">✅</span>
                {t['contact.success']}
              </div>
            )}
            {errorMsg && (
              <div className="bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 text-sm px-3 py-2 rounded-md mb-4 flex items-center gap-2">
                <span aria-hidden="true">❌</span>
                {errorMsg}
              </div>
            )}
          </div>

          {/* FORM OR SUCCESS */}
          {!sent && (
            <form onSubmit={handleSubmit} className="space-y-4" aria-busy={loading}>
              <div>
                <label htmlFor="contact-name" className="sr-only">{t['contact.name']}</label>
                <input
                  id="contact-name"
                  type="text"
                  name="user_name"
                  placeholder={t['contact.name']}
                  required
                  autoComplete="name"
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">{t['contact.email']}</label>
                <input
                  id="contact-email"
                  type="email"
                  name="user_email"
                  placeholder={t['contact.email']}
                  required
                  autoComplete="email"
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="sr-only">{t['contact.message']}</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="4"
                  placeholder={t['contact.message']}
                  required
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                aria-disabled={loading}
                className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-semibold text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                  loading
                    ? 'bg-indigo-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500'
                }`}
              >
                {loading ? (
                  <>
                    <span className="sr-only">{t['contact.sending']}</span>
                    <span aria-hidden="true" className="animate-pulse">{t['contact.sending']}</span>
                  </>
                ) : (
                  <>
                    <PaperAirplaneIcon className="w-4 h-4 -rotate-45" aria-hidden="true" />
                    {t['contact.send']}
                  </>
                )}
              </button>
            </form>
          )}

          {/* Close Button */}
          <Dialog.Close
            className="absolute top-3 right-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded"
            aria-label={t['contact.close']}
          >
            <XMarkIcon className="w-6 h-6 transition-transform hover:-rotate-90" />
          </Dialog.Close>

          {/* If sent, add a close button */}
          {sent && (
            <div className="mt-4 flex justify-end">
              <Dialog.Close className="text-sm px-4 py-2 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                {t['contact.close']}
              </Dialog.Close>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
