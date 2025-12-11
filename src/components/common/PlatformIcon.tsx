import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlatformIconProps {
  platform: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

import { Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';

const platformIcons: Record<string, LucideIcon> = {
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  linkedin: Linkedin,
};

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
);

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const platformClasses: Record<string, string> = {
  instagram: 'platform-instagram',
  twitter: 'platform-twitter',
  youtube: 'platform-youtube',
  linkedin: 'platform-linkedin',
  tiktok: 'platform-tiktok',
};

export function PlatformIcon({ platform, size = 'md', className }: PlatformIconProps) {
  const Icon = platformIcons[platform];

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className={cn(
        'rounded-md flex items-center justify-center p-1',
        platformClasses[platform],
        className
      )}
    >
      {platform === 'tiktok' ? (
        <div className={cn('text-white', sizeClasses[size])}>
          <TikTokIcon />
        </div>
      ) : Icon ? (
        <Icon className={cn('text-white', sizeClasses[size])} />
      ) : null}
    </motion.div>
  );
}
