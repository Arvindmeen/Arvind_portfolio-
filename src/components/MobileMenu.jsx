import { XIcon } from '../icons';

const NAV_LINKS = ['About', 'Skills', 'Competitions', 'Experience', 'Projects', 'Education', 'Contact'];

export default function MobileMenu({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[2000] bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center gap-2">
      <button onClick={onClose}
        className="absolute top-6 right-6 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
        aria-label="Close menu">
        <XIcon size={24} />
      </button>
      {NAV_LINKS.map(link => (
        <a key={link} href={`#${link.toLowerCase()}`} onClick={onClose}
          className="font-serif text-3xl font-semibold text-zinc-800 dark:text-zinc-100 hover:text-zinc-500 dark:hover:text-zinc-400 py-2 transition-colors duration-200">
          {link}
        </a>
      ))}
    </div>
  );
}
