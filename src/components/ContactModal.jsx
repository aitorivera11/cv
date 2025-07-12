import { useState } from 'react';
import emailjs from '@emailjs/browser';
import * as Dialog from '@radix-ui/react-dialog';
import { EnvelopeIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function ContactModal({ t }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const SERVICE_ID = 'service_ys28jne';
  const TEMPLATE_ID = 'template_1ipzhew';
  const PUBLIC_KEY = '9ty_EWfM7_QY_3R9j';

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY)
      .then(() => {
        setSent(true);
        setLoading(false);
        e.target.reset();
      })
      .catch((error) => {
        console.error('Error enviant el missatge:', error);
        alert(t['contact.error']);
        setLoading(false);
      });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          aria-label="Obrir formulari de contacte"
          title={t['contact.button']}
          className="group mt-6 inline-flex items-center justify-center mx-auto text-center bg-slate-800 text-white dark:bg-white dark:text-slate-900 font-semibold py-2 px-6 rounded-full hover:bg-slate-900 dark:hover:bg-slate-100 transition-colors duration-200 shadow-sm"
        >
          <EnvelopeIcon className="w-5 h-5 mr-2 inline-block transition-transform group-hover:-rotate-12" />
          <span>{t['contact.button']}</span>
        </button>
      </Dialog.Trigger>



      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl w-full max-w-md border border-slate-200 dark:border-slate-700 animate-in fade-in-90 zoom-in-95">
            <Dialog.Description className="sr-only">
                {t['contact.description'] || 'Formulari de contacte'}
            </Dialog.Description>
          <Dialog.Title className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            {t['contact.title']}
          </Dialog.Title>

          {sent ? (
            <div className="text-green-600 dark:text-green-400 font-medium text-sm">
              ✅ {t['contact.success']}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="user_name"
                placeholder={t['contact.name']}
                required
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="email"
                name="user_email"
                placeholder={t['contact.email']}
                required
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <textarea
                name="message"
                rows="4"
                placeholder={t['contact.message']}
                required
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 rounded-lg font-semibold text-white transition shadow-md ${
                  loading
                    ? 'bg-indigo-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500'
                }`}
              >
                {loading ? t['contact.sending'] : t['contact.send']}
              </button>
            </form>
          )}

          <Dialog.Close
            className="absolute top-3 right-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
            aria-label={t['contact.close']}
          >
            <XMarkIcon className="w-6 h-6 transition-transform hover:-rotate-z-180" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
