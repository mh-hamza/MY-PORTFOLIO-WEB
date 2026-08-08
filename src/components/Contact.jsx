import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, CheckCircle, AlertCircle } from 'lucide-react';

// ─── Validation ───────────────────────────────────────────────────────────────
function validate(fields) {
  const errors = {};
  if (!fields.name.trim() || fields.name.trim().length < 2)
    errors.name = 'Please enter your name (at least 2 characters).';
  if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()))
    errors.email = 'Please enter a valid email address.';
  if (!fields.message.trim() || fields.message.trim().length < 10)
    errors.message = 'Message must be at least 10 characters.';
  return errors;
}

// ─── Form field ───────────────────────────────────────────────────────────────
function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const INPUT_CLS = `w-full px-4 py-2.5 border rounded-lg text-sm
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
  transition-colors duration-200
  bg-white dark:bg-gray-800
  text-gray-900 dark:text-white
  placeholder:text-gray-400 dark:placeholder:text-gray-500`;

const INPUT_NORMAL = 'border-gray-300 dark:border-gray-700';
const INPUT_ERROR  = 'border-red-400 dark:border-red-600 focus:ring-red-500';

// ─── Success state ────────────────────────────────────────────────────────────
function SuccessMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className="flex flex-col items-center justify-center text-center py-12 gap-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 16, delay: 0.1 }}
      >
        <CheckCircle className="w-16 h-16 text-green-500" />
      </motion.div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Message Sent!</h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm max-w-xs">
        Thanks for reaching out. I'll get back to you within 24 hours 🚀
      </p>
    </motion.div>
  );
}

// ─── Contact section ──────────────────────────────────────────────────────────
function Contact() {
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate(fields);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus('sending');
    setServerError('');

    const formData = new FormData();
    formData.append('access_key', '8a74c978-b8a1-4936-b7fc-126aeef05ed1');
    formData.append('name', fields.name);
    formData.append('email', fields.email);
    formData.append('message', fields.message);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setFields({ name: '', email: '', message: '' });
      } else {
        setServerError(data.message || 'Submission failed. Please try again.');
        setStatus('error');
      }
    } catch {
      setServerError('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-gray-900 dark:text-white">
            Contact Me
          </h2>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-12">
            Let's build something together — or just say hi.
          </p>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Left info panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Let's Connect!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Looking for a developer, have a freelance project, or just want to chat about tech?
                  I'm always open to new opportunities and conversations.
                </p>
              </div>

              {/* Contact info */}
              <div className="space-y-4">
                <ContactRow icon={<Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                  text="mhdkh444@gmail.com"
                  href="mailto:mhdkh444@gmail.com"
                />
                <ContactRow icon={<Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                  text="+91 6393588539"
                  href="tel:+916393588539"
                />
                <ContactRow icon={<MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                  text="Jaunpur, Uttar Pradesh, India"
                />
              </div>

              {/* Social icons */}
              <div className="pt-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
                  Find me on
                </p>
                <div className="flex gap-4">
                  {[
                    { href: 'https://github.com/mh-hamza',              Icon: Github,   label: 'GitHub'   },
                    { href: 'https://www.linkedin.com/in/mh-hamza444/', Icon: Linkedin, label: 'LinkedIn' },
                    { href: 'mailto:mhdkh444@gmail.com',                Icon: Mail,     label: 'Email'    },
                  ].map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="p-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                        text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400
                        hover:border-blue-300 dark:hover:border-blue-600
                        hover:shadow-sm transition-all duration-200"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right — form or success */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <SuccessMessage key="success" />
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                    onSubmit={onSubmit}
                    noValidate
                  >
                    <Field label="Name" error={errors.name}>
                      <input
                        type="text"
                        name="name"
                        value={fields.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={`${INPUT_CLS} ${errors.name ? INPUT_ERROR : INPUT_NORMAL}`}
                      />
                    </Field>

                    <Field label="Email" error={errors.email}>
                      <input
                        type="email"
                        name="email"
                        value={fields.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={`${INPUT_CLS} ${errors.email ? INPUT_ERROR : INPUT_NORMAL}`}
                      />
                    </Field>

                    <Field label="Message" error={errors.message}>
                      <textarea
                        name="message"
                        value={fields.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell me about your project or just say hi..."
                        className={`${INPUT_CLS} resize-none ${errors.message ? INPUT_ERROR : INPUT_NORMAL}`}
                      />
                    </Field>

                    {/* Server error */}
                    {status === 'error' && serverError && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {serverError}
                      </motion.p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      whileHover={status !== 'sending' ? { scale: 1.02 } : {}}
                      whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
                      className="w-full py-3 px-8 rounded-lg font-medium text-sm text-white
                        bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
                        disabled:opacity-60 disabled:cursor-not-allowed
                        transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-blue-500/20"
                    >
                      {status === 'sending' ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending…
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const ContactRow = ({ icon, text, href }) => (
  <div className="flex items-center gap-3">
    <div className="flex-shrink-0">{icon}</div>
    {href ? (
      <a
        href={href}
        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
      >
        {text}
      </a>
    ) : (
      <span className="text-gray-600 dark:text-gray-300 text-sm">{text}</span>
    )}
  </div>
);

export default Contact;
