import { useState } from 'react';
import { profile } from '../data';
import Reveal from './Reveal';
import { MailIcon, LinkedinIcon, GithubIcon, PhoneIcon, SendIcon } from '../icons';

const contactLinks = [
  {
    icon: <MailIcon size={18} />,
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    iconBg: 'bg-rose-500/10 text-rose-500 border-rose-500/20 group-hover:bg-rose-500 group-hover:text-white group-hover:shadow-[0_0_16px_rgba(244,63,94,0.45)] group-hover:scale-110 group-hover:-rotate-6',
    cardBorder: 'hover:border-rose-500/40 dark:hover:border-rose-500/40',
    arrowColor: 'group-hover:text-rose-500',
  },
  {
    icon: <LinkedinIcon size={18} />,
    label: 'LinkedIn',
    value: 'Arvind Meena',
    href: profile.linkedin,
    iconBg: 'bg-[#0A66C2]/10 text-[#0A66C2] border-[#0A66C2]/20 group-hover:bg-[#0A66C2] group-hover:text-white group-hover:shadow-[0_0_16px_rgba(10,102,194,0.45)] group-hover:scale-110 group-hover:rotate-6',
    cardBorder: 'hover:border-[#0A66C2]/40 dark:hover:border-[#0A66C2]/40',
    arrowColor: 'group-hover:text-[#0A66C2]',
  },
  {
    icon: <GithubIcon size={18} />,
    label: 'GitHub',
    value: 'github.com/Arvindmeen',
    href: profile.github,
    iconBg: 'bg-zinc-800/10 dark:bg-white/10 text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-900 group-hover:shadow-[0_0_16px_rgba(255,255,255,0.25)] group-hover:scale-110 group-hover:-rotate-6',
    cardBorder: 'hover:border-zinc-400 dark:hover:border-zinc-500',
    arrowColor: 'group-hover:text-zinc-900 dark:group-hover:text-zinc-100',
  },
  {
    icon: <PhoneIcon size={18} />,
    label: 'Mobile / WhatsApp',
    value: profile.phone,
    href: `tel:${profile.phone?.replace(/\s+/g, '')}`,
    iconBg: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-[0_0_16px_rgba(16,185,129,0.45)] group-hover:scale-110 group-hover:rotate-6',
    cardBorder: 'hover:border-emerald-500/40 dark:hover:border-emerald-500/40',
    arrowColor: 'group-hover:text-emerald-500',
  },
];

export default function Contact() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.target;
    const name = form.name.value.trim();
    const senderEmail = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    const formattedBody = `Hi Arvind,\n\n${message}\n\n---\nSender: ${name}\nReply to: ${senderEmail}`;

    // Detect if user is on mobile (Android, iOS, etc.)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    if (isMobile) {
      // On mobile: trigger mailto to open native mail app / Gmail app
      const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formattedBody)}`;
      window.location.href = mailtoUrl;
    } else {
      // On desktop (Windows/PC): open browser Gmail Compose in a new tab with pre-filled fields
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        profile.email
      )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(formattedBody)}`;
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    }

    setStatus('sent');
    setTimeout(() => {
      setStatus('idle');
      form.reset();
    }, 3000);
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <p className="font-mono text-xs font-semibold tracking-[0.15em] uppercase text-zinc-400 dark:text-zinc-500 mb-3 flex items-center justify-center gap-2">
              <span className="inline-block w-6 h-px bg-zinc-300 dark:bg-zinc-600" />
              Let&apos;s Connect
              <span className="inline-block w-6 h-px bg-zinc-300 dark:bg-zinc-600" />
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-zinc-900 dark:text-zinc-100 mb-5 leading-[1.15]">
              Get In Touch
            </h2>
            <p className="font-serif-text text-zinc-500 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
              Whether you have a project in mind, a job opportunity, or just want to say hello — my inbox is always open.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12">
          <Reveal>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-lg mb-2">Contact Details</h3>
            <p className="font-serif-text text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-8">
              I&apos;m most responsive via email, LinkedIn, and phone. Feel free to reach out anytime!
            </p>
            <div className="flex flex-col gap-3.5">
              {contactLinks.map(link => (
                <a key={link.label} href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 ${link.cardBorder} hover:translate-x-1.5 hover:shadow-md transition-all duration-300`}>
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 shrink-0 ${link.iconBg}`}>
                    {link.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-mono font-semibold text-zinc-400 dark:text-zinc-500 tracking-widest uppercase mb-0.5">{link.label}</div>
                    <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">{link.value}</div>
                  </div>
                  <span className={`text-zinc-300 dark:text-zinc-600 ${link.arrowColor} transition-all duration-300 text-lg group-hover:translate-x-1`}>→</span>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <form onSubmit={handleSubmit}
              className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm shadow-sm">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-mono text-[11px] font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-2" htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" required placeholder="Your name"
                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all" />
                </div>
                <div>
                  <label className="block font-mono text-[11px] font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-2" htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required placeholder="your@email.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block font-mono text-[11px] font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-2" htmlFor="subject">Subject</label>
                <input id="subject" name="subject" type="text" required placeholder="What's this about?"
                  className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all" />
              </div>
              <div className="mb-6">
                <label className="block font-mono text-[11px] font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-2" htmlFor="message">Message</label>
                <textarea id="message" name="message" required rows={4} placeholder="Tell me about your project..."
                  className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all resize-none" />
              </div>
              <button type="submit" disabled={status !== 'idle'}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  status === 'sent'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 hover:-translate-y-0.5'
                } disabled:opacity-70 disabled:cursor-not-allowed`}>
                {status === 'idle'    && <><SendIcon size={14} /> Send Message</>}
                {status === 'sending' && <span className="animate-pulse">Opening email…</span>}
                {status === 'sent'    && '✓ Opening email client...'}
              </button>
              <p className="text-[11px] font-mono text-center text-zinc-400 dark:text-zinc-500 mt-3">
                Opens Gmail in browser (Desktop) or your native Mail app (Mobile)
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
