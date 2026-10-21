import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageCircle, MapPin, ArrowUpRight, CheckCircle, Phone } from 'lucide-react';
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
    else if (data.message.trim().length < 15) e.message = 'Please write at least 15 characters.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const lines = [
      "*New Project Enquiry — VARGA Creative Studio*",
      "",
      `*Name:* ${data.name.trim()}`,
      `*Email:* ${data.email.trim()}`,
      `*Service:* ${data.projectType}`,
      data.budget ? `*Estimated Budget:* ${data.budget}` : null,
      data.deadline ? `*Deadline:* ${data.deadline.trim()}` : null,
      "",
      "*Project Details:*",
      data.message.trim(),
    ].filter(Boolean);

    const whatsappUrl = `https://wa.me/94770498850?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setFormState("success");
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
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <Reveal>
            <p className="font-heading text-varga-red text-xs font-semibold tracking-[0.25em] uppercase mb-3 sm:mb-4">
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
            <p className="font-body text-varga-muted text-sm sm:text-base leading-relaxed max-w-sm">
              Tell us about your project. We will get back to you within 24 hours to
              discuss ideas, timeline, and what we can create together.
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-16">
          {/* ── Form ──────────────────────────────────────────────── */}
          <Reveal>
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div
                  key="success"
                  className="flex flex-col items-center justify-center text-center py-16 sm:py-20 border border-varga-red/20 bg-white/[0.02] p-6 rounded-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle size={48} className="text-varga-red mb-5" />
                  <h3 className="font-display text-varga-white text-3xl mb-3">Enquiry Ready!</h3>
                  <p className="font-body text-varga-muted max-w-sm text-sm sm:text-base mb-6 leading-relaxed">
                    Your details have been prepared for WhatsApp chat (+94 77 049 8850). We look forward to working with you!
                  </p>
                  <button
                    onClick={() => setFormState('idle')}
                    className="btn-outline text-xs tracking-wider uppercase py-3 px-6 touch-manipulation active:scale-95"
                  >
                    Submit Another Enquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Project enquiry form"
                  className="space-y-5 sm:space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {/* WhatsApp instant submit notice */}
                  <div className="bg-[#0f1f14] border border-emerald-900/60 px-4 py-3.5 rounded-sm flex items-start sm:items-center gap-3">
                    <MessageCircle size={18} className="text-emerald-400 flex-shrink-0 mt-0.5 sm:mt-0" />
                    <p className="font-body text-emerald-400/90 text-xs sm:text-sm leading-relaxed">
                      Submit කළ සැණින් ඔබගේ විස්තර සමඟ අපගේ <strong>WhatsApp (+94 77 049 8850)</strong> chat එක කෙලින්ම විවෘත වේ.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <FormField label="Your Name" id={`${formId}-name`} error={errors.name} required>
                      <input
                        id={`${formId}-name`}
                        type="text"
                        autoComplete="name"
                        placeholder="Your full name"
                        value={data.name}
                        onChange={update('name')}
                        disabled={isSubmitting}
                        className="form-field min-h-[48px]"
                        aria-required="true"
                        aria-invalid={!!errors.name}
                      />
                    </FormField>

                    <FormField label="Email Address" id={`${formId}-email`} error={errors.email} required>
                      <input
                        id={`${formId}-email`}
                        type="email"
                        autoComplete="email"
                        placeholder="yourname@gmail.com"
                        value={data.email}
                        onChange={update('email')}
                        disabled={isSubmitting}
                        className="form-field min-h-[48px]"
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
                      className="form-field min-h-[48px] bg-[#141414] text-white"
                      aria-required="true"
                      aria-invalid={!!errors.projectType}
                    >
                      <option value="" disabled>Select a service…</option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </FormField>

                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <FormField label="Estimated Budget" id={`${formId}-budget`}>
                      <select
                        id={`${formId}-budget`}
                        value={data.budget}
                        onChange={update('budget')}
                        disabled={isSubmitting}
                        className="form-field min-h-[48px] bg-[#141414] text-white"
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
                        placeholder="e.g. Next month or Urgent"
                        value={data.deadline}
                        onChange={update('deadline')}
                        disabled={isSubmitting}
                        className="form-field min-h-[48px]"
                      />
                    </FormField>
                  </div>

                  <FormField label="Tell us about your project" id={`${formId}-message`} error={errors.message} required>
                    <textarea
                      id={`${formId}-message`}
                      rows={4}
                      placeholder="Describe your vision, requirements, location, or ideas…"
                      value={data.message}
                      onChange={update('message')}
                      disabled={isSubmitting}
                      className="form-field"
                      aria-required="true"
                      aria-invalid={!!errors.message}
                    />
                  </FormField>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center py-4 text-xs sm:text-sm font-heading font-semibold tracking-wider uppercase active:scale-[0.98] touch-manipulation disabled:opacity-60 disabled:cursor-not-allowed"
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner" aria-hidden="true" />
                        Opening WhatsApp…
                      </>
                    ) : (
                      <>
                        <MessageCircle size={18} className="fill-current" />
                        Send via WhatsApp
                        <ArrowUpRight size={16} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>

          {/* ── Contact Details ────────────────────────────────────── */}
          <Reveal delay={0.15} className="space-y-6 sm:space-y-8">
            {/* Direct contact list */}
            <div className="bg-white/[0.02] p-5 sm:p-6 border border-white/[0.06] rounded-sm">
              <p className="form-label mb-4">Direct Contact</p>
              <div className="space-y-4">
                {/* Email */}
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3.5 group active:scale-98 transition-all touch-manipulation"
                  aria-label={`Email us at ${contactInfo.email}`}
                >
                  <div className="w-10 h-10 border border-white/[0.1] bg-white/[0.03] flex items-center justify-center group-hover:border-varga-red rounded-sm transition-colors flex-shrink-0">
                    <Mail size={16} className="text-varga-muted group-hover:text-varga-red transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <p className="form-label mb-0.5 text-[10px]">Email</p>
                    <p className="font-body text-varga-white text-xs sm:text-sm group-hover:text-varga-red transition-colors truncate">
                      {contactInfo.email}
                    </p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={contactInfo.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 group active:scale-98 transition-all touch-manipulation"
                  aria-label="Contact us on WhatsApp"
                >
                  <div className="w-10 h-10 border border-white/[0.1] bg-white/[0.03] flex items-center justify-center group-hover:border-[#25D366] rounded-sm transition-colors flex-shrink-0">
                    <MessageCircle size={16} className="text-varga-muted group-hover:text-[#25D366] transition-colors" />
                  </div>
                  <div>
                    <p className="form-label mb-0.5 text-[10px]">WhatsApp Chat</p>
                    <p className="font-body text-varga-white text-xs sm:text-sm group-hover:text-[#25D366] transition-colors font-semibold">
                      {contactInfo.whatsapp}
                    </p>
                  </div>
                </a>

                {/* Direct Call */}
                <a
                  href={`tel:${contactInfo.whatsapp.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3.5 group active:scale-98 transition-all touch-manipulation"
                  aria-label="Call VARGA Studio directly"
                >
                  <div className="w-10 h-10 border border-white/[0.1] bg-white/[0.03] flex items-center justify-center group-hover:border-varga-red rounded-sm transition-colors flex-shrink-0">
                    <Phone size={16} className="text-varga-muted group-hover:text-varga-red transition-colors" />
                  </div>
                  <div>
                    <p className="form-label mb-0.5 text-[10px]">Direct Call</p>
                    <p className="font-body text-varga-white text-xs sm:text-sm group-hover:text-varga-red transition-colors">
                      {contactInfo.whatsapp}
                    </p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 border border-white/[0.1] bg-white/[0.03] flex items-center justify-center rounded-sm flex-shrink-0">
                    <MapPin size={16} className="text-varga-muted" />
                  </div>
                  <div>
                    <p className="form-label mb-0.5 text-[10px]">Location</p>
                    <p className="font-body text-varga-white text-xs sm:text-sm">{contactInfo.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action CTA Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href={contactInfo.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white py-3.5 px-4 font-heading text-xs font-semibold tracking-wider uppercase transition-all touch-manipulation rounded-sm shadow-md"
              >
                <MessageCircle size={16} className="fill-current" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`tel:${contactInfo.whatsapp.replace(/\s+/g, '')}`}
                className="btn-outline justify-center gap-2 py-3.5 px-4 text-xs font-semibold tracking-wider uppercase active:scale-95 touch-manipulation rounded-sm"
              >
                <Phone size={15} />
                <span>Call Now</span>
              </a>
            </div>

            {/* Social Channels */}
            <div>
              <p className="form-label mb-3">Official Social Channels</p>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={contactInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-white/[0.1] bg-white/[0.02] px-3.5 py-2.5 text-varga-muted hover:border-varga-red hover:text-varga-red active:scale-95 transition-all duration-200 rounded-sm touch-manipulation"
                  aria-label="VARGA on Instagram"
                >
                  <Instagram size={15} />
                  <span className="font-heading text-xs tracking-wider uppercase">Instagram</span>
                </a>
                <a
                  href={contactInfo.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-white/[0.1] bg-white/[0.02] px-3.5 py-2.5 text-varga-muted hover:border-varga-red hover:text-varga-red active:scale-95 transition-all duration-200 rounded-sm touch-manipulation"
                  aria-label="VARGA on YouTube"
                >
                  <Youtube size={15} />
                  <span className="font-heading text-xs tracking-wider uppercase">YouTube</span>
                </a>
                <a
                  href={contactInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-white/[0.1] bg-white/[0.02] px-3.5 py-2.5 text-varga-muted hover:border-varga-red hover:text-varga-red active:scale-95 transition-all duration-200 rounded-sm touch-manipulation"
                  aria-label="VARGA on Facebook"
                >
                  <Facebook size={15} />
                  <span className="font-heading text-xs tracking-wider uppercase">Facebook</span>
                </a>
              </div>
            </div>

            {/* Response Time Badge */}
            <div className="border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 rounded-sm">
              <p className="font-heading text-varga-white text-xs sm:text-sm font-semibold mb-1 sm:mb-1.5">
                Response Guarantee
              </p>
              <p className="font-body text-varga-muted text-xs sm:text-sm leading-relaxed">
                We respond within 24 hours. For urgent or same-week shoots, please message or call via WhatsApp directly.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
