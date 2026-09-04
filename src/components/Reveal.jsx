import { useInView, useIsMobile } from '../hooks';

export default function Reveal({
  children,
  className = '',
  delay = 0,
  duration = 700,
  threshold = 0.15,
  rootMargin = '0px 0px -48px 0px',
  mobileDelay,
  mobileDuration,
  mobileThreshold,
  mobileRootMargin,
}) {
  const isMobile = useIsMobile();

  const activeDuration = isMobile && mobileDuration !== undefined ? mobileDuration : duration;
  const activeDelay = isMobile && mobileDelay !== undefined ? mobileDelay : delay;
  const activeThreshold = isMobile && mobileThreshold !== undefined ? mobileThreshold : threshold;
  const activeRootMargin = isMobile && mobileRootMargin !== undefined ? mobileRootMargin : rootMargin;

  const [ref, inView] = useInView(activeThreshold, activeRootMargin);

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{
        transitionDuration: `${activeDuration}ms`,
        transitionDelay: `${activeDelay}ms`
      }}
    >
      {children}
    </div>
  );
}

