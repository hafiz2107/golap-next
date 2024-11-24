'use client';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import React from 'react';
import { SystemMode } from './system-mode';
import { LightMode } from './light-mode';
import { DarkMode } from './dark-mode';

const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-4 flex lg:flex-row flex-col items-start gap-5">
          <div
            className={cn(
              'rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent',
              theme == 'system' && 'border-purple-800'
            )}
            onClick={() => setTheme('system')}
          >
            <SystemMode />
          </div>
          <div
            className={cn(
              'rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent',
              theme == 'light' && 'border-purple-800'
            )}
            onClick={() => setTheme('light')}
          >
            <LightMode />
          </div>
          <div
            className={cn(
              'rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent',
              theme == 'dark' && 'border-purple-800'
            )}
            onClick={() => setTheme('dark')}
          >
            <DarkMode />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
