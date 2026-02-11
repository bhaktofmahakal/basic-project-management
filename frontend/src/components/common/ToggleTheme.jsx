import { useCallback, useEffect, useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { flushSync } from 'react-dom';
import { cn } from '../../utils/cn';

export const ToggleTheme = ({
  className,
  duration = 400,
  animationType = 'wave-ripple',
  ...props
}) => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme === 'dark' || (!savedTheme && prefersDark);
  });
  const buttonRef = useRef(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    const supportsViewTransition = 'startViewTransition' in document;

    if (!supportsViewTransition) {
      const newTheme = !isDark;
      setIsDark(newTheme);
      document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      });
    }).ready;

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    );

    switch (animationType) {
      case 'wave-ripple':
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0% at 50% 50%)`,
              `circle(${maxRadius}px at 50% 50%)`,
            ],
          },
          {
            duration: duration * 1.5,
            easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
        break;

      case 'circle-spread':
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration,
            easing: 'ease-in-out',
            pseudoElement: '::view-transition-new(root)',
          }
        );
        break;

      default:
        break;
    }
  }, [isDark, duration, animationType]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleTheme}
        className={cn(
          'p-2 rounded-full transition-colors duration-300 hover:bg-slate-100 dark:hover:bg-slate-800',
          isDark ? 'text-amber-400' : 'text-slate-600',
          className
        )}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        {...props}
      >
        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      {animationType !== 'flip-x-in' && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
              ::view-transition-old(root),
              ::view-transition-new(root) {
                animation: none;
                mix-blend-mode: normal;
              }
            `,
          }}
        />
      )}
    </>
  );
};
