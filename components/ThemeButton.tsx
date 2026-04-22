'use client';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';

export function ThemeButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isRotating , setIsRotating] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="h-6  w-6 opacity-0"
        aria-hidden="true"
      >
      </Button>
    );
  }

  return (
    <motion.div
      animate={{ rotate: isRotating ? 360 : 0 }}
      transition={{ duration: 1 }}
      
    >
      <Button
        variant="default"
        size="icon"
        onClick={() => {
          setIsRotating(!isRotating);
          setTheme(theme === 'dark' ? 'light' : 'dark')
        }}
        className="h-10 w-10 rounded-full transition-all duration-300 hover:scale-120 bg-blue-800 dark:bg-amber-400 cursor-pointer"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? (
          <Sun className="h-6 w-6 transition-all text-black" />
        ) : (
          <Moon className="h-6 w-6  transition-all" />
        )}
      </Button>
    </motion.div>

  );
}