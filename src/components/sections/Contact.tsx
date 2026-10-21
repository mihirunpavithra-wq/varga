import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageCircle, MapPin, ArrowUpRight, CheckCircle, AlertCircle } from 'lucide-react';
import { Instagram, Youtube, Facebook } from '@/components/ui/Icons';
import { contactInfo } from '@/data/content';
import { Reveal } from '@/components/ui/Reveal';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  deadline: string;
  message: string;
}

const PROJECT_TYPES = [
  'Cinematography / Video Production',
  'Photography',
  'Video Editing / Post-Production',
  'Brand Identity / Graphic Design',
  'Social Media Content',
  'AI & Experimental Visuals',
  'Multiple Services',
  'Other / Not Sure',
];

const BUDGETS = [
  'Under LKR 50,000',
  'LKR 50,000 – 150,000',
  'LKR 150,000 – 500,000',
  'LKR 500,000+',
  'Let\'s discuss',
];

function FormField({
  label,
  id,
  error,
  children,
  required,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="text-varga-red ml-1" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-varga-red text-xs font-body" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function Contact() {
  const formId = useId();
  const [formState, setFormState] = useState<FormState>('idle');
  const [data, setData] = useState<FormData>({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    deadline: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!data.name.trim()) e.name = 'Name is required.';
    if (!data.email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Please enter a valid email.';
    if (!data.projectType) e.projectType = 'Please select a project type.';
    if (!data.message.trim()) e.message = 'Please describe your project.';
    else if (data.message.trim().length < 20) e.message = 'Please write at least 20 characters.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormState('submitting');

    // ⚠️ No backend is configured. This is a demonstration only.
    // To connect a real backend, replace this timeout with a fetch/axios call
    // to your API endpoint, email service (Resend, EmailJS, Formspree, etc.)
    await new Promise((res) => setTimeout(res, 1800));

    // For demonstration purposes we show a "no backend" notice:
    setFormState('error');
  };

  const update = (key: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setData((p) => ({ ...p, [key]: e.target.value }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const isSubmitting = formState === 'submitting';

  return (
    <section id="contact" className="section-padding bg-[#0a0a0a]" aria-labelledby="contact-heading">
      <div className="container-varga">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Reveal>
            <p className="font-heading text-varga-red text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              Get In Touch
            </p>
            <h2
              id="contact-heading"
              className="font-display text-varga-white red-accent"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: '0.95' }}
            >
              START YOUR<br />PROJECT
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex items-end">
            <p className="font-body text-varga-muted leading-relaxed max-w-sm">
              Tell us about your project. We will get back to you within 24 hours to
              discuss ideas, timeline, and what we can create together.
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-20">
          {/* ── Form ──────────────────────────────────────────────── */}
          <Reveal>
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div
                  key="success"
                  className="flex flex-col items-center justify-center text-center py-20 border border-varga-red/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle size={48} className="text-varga-red mb-6" />
                  <h3 className="font-display text-varga-white text-3xl mb-4">Message Sent!</h3>
                  <p className="font-body text-varga-muted max-w-sm">
                    Thank you for reaching out. We will be in touch within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Project enquiry form"
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {/* Backend notice banner */}
                  <div className="bg-[#1a1a0a] border border-yellow-900/40 px-4 py-3 flex gap-3">
                    <AlertCircle size={16} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="font-body text-yellow-600/80 text-xs leading-relaxed">
                      <strong>Demo mode:</strong> No backend is connected. Form submissions will not be sent.
                      Connect an email service (e.g. Resend, EmailJS, or Formspree) in{' '}
                      <code className="text-yellow-500/80">Contact.tsx</code> before going live.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField label="Your Name" id={`${formId}-name`} error={errors.name} required>
                      <input
                        id={`${formId}-name`}
                        type="text"
                        autoComplete="name"
                        placeholder="Jane Smith"
                        value={data.name}
                        onChange={update('name')}
                        disabled={isSubmitting}
                        className="form-field"
                        aria-required="true"
                        aria-invalid={!!errors.name}
                      />
                    </FormField>

                    <FormField label="Email Address" id={`${formId}-email`} error={errors.email} required>
                      <input
                        id={`${formId}-email`}
                        type="email"
                        autoComplete="email"
                        placeholder="jane@company.com"
                        value={data.email}
                        onChange={update('email')}
                        disabled={isSubmitting}
                        className="form-field"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                      />
                    </FormField>
                  </div>

                  <FormField label="Project Type" id={`${formId}-type`} error={errors.projectType} required>
                    <select
                      id={`${formId}-type`}
                      value={data.projectType}
                      onChange={update('projectType')}
                      disabled={isSubmitting}
                      className="form-field appearance-none"
                      aria-required="true"
                      aria-invalid={!!errors.projectType}
                    >
                      <option value="" disabled>Select a service…</option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </FormField>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField label="Estimated Budget" id={`${formId}-budget`}>
                      <select
                        id={`${formId}-budget`}
                        value={data.budget}
                        onChange={update('budget')}
                        disabled={isSubmitting}
                        className="form-field appearance-none"
                      >
                        <option value="" disabled>Select a range…</option>
                        {BUDGETS.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </FormField>

                    <FormField label="Project Deadline" id={`${formId}-deadline`}>
                      <input
                        id={`${formId}-deadline`}
                        type="text"
                        placeholder="e.g. December 2025 or ASAP"
                        value={data.deadline}
                        onChange={update('deadline')}
                        disabled={isSubmitting}
                        className="form-field"
                      />
                    </FormField>
                  </div>

                  <FormField label="Tell us about your project" id={`${formId}-message`} error={errors.message} required>
                    <textarea
                      id={`${formId}-message`}
                      rows={5}
                      placeholder="Describe your project, goals, references, or anything that helps us understand what you need…"
                      value={data.message}
                      onChange={update('message')}
                      disabled={isSubmitting}
                      className="form-field"
                      aria-required="true"
                      aria-invalid={!!errors.message}
                    />
                  </FormField>

                  {/* Form error state */}
                  {formState === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[#1a0a0a] border border-varga-red/30 px-4 py-3 flex gap-3"
                    >
                      <AlertCircle size={16} className="text-varga-red flex-shrink-0 mt-0.5" />
                      <p className="font-body text-varga-red/80 text-sm">
                        No backend is configured yet. Please contact us directly via WhatsApp or email below.
                      </p>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center py-4 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Enquiry
                        <ArrowUpRight size={16} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>

          {/* ── Contact Details ────────────────────────────────────── */}
          <Reveal delay={0.15} className="space-y-8">
            {/* Direct contact */}
            <div>
              <p className="form-label mb-4">Direct Contact</p>
              <div className="space-y-4">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-4 group"
                  aria-label={`Email us at ${contactInfo.email}`}
                >
                  <div className="w-10 h-10 border border-white/[0.08] flex items-center justify-center group-hover:border-varga-red transition-colors">
                    <Mail size={16} className="text-varga-muted group-hover:text-varga-red transition-colors" />
                  </div>
                  <div>
                    <p className="form-label mb-0.5">Email</p>
                    {/* ⚠️  Replace with your real email */}
                    <p className="font-body text-varga-white text-sm group-hover:text-varga-red transition-colors">
                      {contactInfo.email}
                    </p>
                  </div>
                </a>

                <a
                  href={contactInfo.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                  aria-label="Contact us on WhatsApp"
                >
                  <div className="w-10 h-10 border border-white/[0.08] flex items-center justify-center group-hover:border-varga-red transition-colors">
                    <MessageCircle size={16} className="text-varga-muted group-hover:text-varga-red transition-colors" />
                  </div>
                  <div>
                    <p className="form-label mb-0.5">WhatsApp</p>
                    {/* ⚠️  Replace with your real number */}
                    <p className="font-body text-varga-white text-sm group-hover:text-varga-red transition-colors">
                      {contactInfo.whatsapp}
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border border-white/[0.08] flex items-center justify-center">
                    <MapPin size={16} className="text-varga-muted" />
                  </div>
                  <div>
                    <p className="form-label mb-0.5">Location</p>
                    <p className="font-body text-varga-white text-sm">{contactInfo.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={contactInfo.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full justify-center gap-2 py-4"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>

            {/* Social */}
            <div>
              <p className="form-label mb-4">Follow Our Work</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={contactInfo.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-white/[0.08] px-4 py-2.5 text-varga-muted hover:border-varga-red hover:text-varga-red transition-all duration-200"
                  aria-label="VARGA on YouTube"
                >
                  <Youtube size={15} />
                  <span className="font-heading text-xs tracking-widest uppercase">YouTube</span>
                </a>
                <a
                  href={contactInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-white/[0.08] px-4 py-2.5 text-varga-muted hover:border-varga-red hover:text-varga-red transition-all duration-200"
                  aria-label="VARGA on Facebook"
                >
                  <Facebook size={15} />
                  <span className="font-heading text-xs tracking-widest uppercase">Facebook</span>
                </a>
                <a
                  href={contactInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-white/[0.08] px-4 py-2.5 text-varga-muted hover:border-varga-red hover:text-varga-red transition-all duration-200"
                  aria-label="VARGA on Instagram"
                >
                  <Instagram size={15} />
                  <span className="font-heading text-xs tracking-widest uppercase">Instagram</span>
                </a>
              </div>
            </div>

            {/* Response time */}
            <div className="border border-white/[0.05] p-5">
              <p className="font-heading text-varga-white text-sm font-semibold mb-2">
                Response Time
              </p>
              <p className="font-body text-varga-muted text-sm leading-relaxed">
                We aim to respond to all enquiries within 24 hours. For urgent projects,
                please reach out via WhatsApp.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
