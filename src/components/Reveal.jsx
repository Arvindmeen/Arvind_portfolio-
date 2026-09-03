import { useInView } from '../hooks';

export default function Reveal({ children, className = '', delay = 0, duration = 700 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
}
