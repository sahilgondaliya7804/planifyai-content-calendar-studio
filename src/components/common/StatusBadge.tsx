import { motion } from 'framer-motion';
import { PostStatus } from '@/types';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: PostStatus;
  className?: string;
}

const statusConfig: Record<PostStatus, { label: string; className: string }> = {
  idea: { label: 'Idea', className: 'status-idea' },
  draft: { label: 'Draft', className: 'status-draft' },
  approved: { label: 'Approved', className: 'status-approved' },
  scheduled: { label: 'Scheduled', className: 'status-scheduled' },
  published: { label: 'Published', className: 'status-published' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        'px-2 py-0.5 text-xs font-medium rounded-full border',
        config.className,
        className
      )}
    >
      {config.label}
    </motion.span>
  );
}
