import { useScrolled } from '../hooks';
import { profile } from '../data';
import { SunIcon, MoonIcon, MenuIcon } from '../icons';

const NAV_LINKS = ['About', 'Skills', 'Competitions', 'Experience', 'Projects', 'Education', 'Contact'];

export default function Navbar({ dark, toggleTheme, onMenuOpen }) {
  const scrolled = useScrolled(50);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-[background-color,backdrop-filter,padding,box-shadow,border-color] duration-300 ${
        scrolled
          ? 'bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 py-3 shadow-sm'
          : 'bg-transparent border-b border-transparent py-4'
      }`}
    >
        <div className="max-w-5xl mx-auto px-6">
          <nav className="flex items-center justify-between">
            <a href="#hero" className="font-serif text-[17px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight hover:opacity-75 transition-opacity">
              {profile.name}
            </a>

            <ul className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`}
                    className="px-3 py-1.5 rounded-full text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <button onClick={toggleTheme} aria-label="Toggle theme"
                className="w-9 h-9 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 flex items-center justify-center hover:border-zinc-500 dark:hover:border-zinc-500 transition-all duration-200 hover:rotate-12 shadow-sm">
                {dark ? <SunIcon size={15} /> : <MoonIcon size={15} />}
              </button>
              <a href="#contact"
                className="hidden md:flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-all duration-200 shadow-sm">
                Contact Me
              </a>
              <button onClick={onMenuOpen} aria-label="Open menu"
                className="md:hidden w-9 h-9 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
                <MenuIcon size={20} />
              </button>
            </div>
          </nav>
        </div>
      </header>
  );
}
