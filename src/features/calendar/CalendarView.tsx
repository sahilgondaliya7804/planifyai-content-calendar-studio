import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
} from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { Post } from '@/types';
import { PlatformIcon } from '@/components/common/PlatformIcon';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { posts, setSelectedPost, setIsPostModalOpen, setIsNewPostModalOpen } = useAppStore();

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = [];
  let day = startDate;

  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  const getPostsForDay = (date: Date): Post[] => {
    return posts.filter((post) => {
      if (post.scheduledDate) {
        return isSameDay(new Date(post.scheduledDate), date);
      }
      if (post.publishedDate) {
        return isSameDay(new Date(post.publishedDate), date);
      }
      return false;
    });
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setIsPostModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Content Calendar
          </h1>
          <p className="text-muted-foreground mt-1">
            Plan and visualize your content schedule
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={() => setIsNewPostModalOpen(true)}
            className="bg-neon-gradient hover:opacity-90 text-white neon-glow"
          >
            <Plus className="w-4 h-4 mr-2" />
            Schedule Post
          </Button>
        </motion.div>
      </div>

      {/* Calendar */}
      <div className="glass-card rounded-2xl overflow-hidden">
        {/* Month Navigation */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </motion.button>

          <h2 className="text-xl font-display font-semibold">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </motion.button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b border-border">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName) => (
            <div
              key={dayName}
              className="p-3 text-center text-sm font-medium text-muted-foreground"
            >
              {dayName}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {days.map((dayItem, index) => {
            const dayPosts = getPostsForDay(dayItem);
            const isCurrentMonth = isSameMonth(dayItem, currentMonth);
            const isCurrentDay = isToday(dayItem);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.01 }}
                className={cn(
                  'min-h-[120px] p-2 border-b border-r border-border last:border-r-0',
                  !isCurrentMonth && 'bg-muted/30'
                )}
              >
                <div
                  className={cn(
                    'text-sm mb-2 w-7 h-7 flex items-center justify-center rounded-full',
                    isCurrentDay && 'bg-primary text-primary-foreground font-semibold',
                    !isCurrentMonth && 'text-muted-foreground'
                  )}
                >
                  {format(dayItem, 'd')}
                </div>

                <AnimatePresence>
                  <div className="space-y-1">
                    {dayPosts.slice(0, 3).map((post) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handlePostClick(post)}
                        className="flex items-center gap-1.5 p-1.5 rounded-lg bg-secondary/50 hover:bg-secondary cursor-pointer transition-colors"
                      >
                        <PlatformIcon platform={post.platform} size="sm" />
                        <span className="text-xs truncate flex-1">
                          {post.title}
                        </span>
                      </motion.div>
                    ))}
                    {dayPosts.length > 3 && (
                      <p className="text-xs text-muted-foreground pl-1">
                        +{dayPosts.length - 3} more
                      </p>
                    )}
                  </div>
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Posts */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-display font-semibold mb-4">
          Upcoming Posts
        </h3>
        <div className="space-y-3">
          {posts
            .filter((p) => p.scheduledDate && new Date(p.scheduledDate) > new Date())
            .sort((a, b) => new Date(a.scheduledDate!).getTime() - new Date(b.scheduledDate!).getTime())
            .slice(0, 5)
            .map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 4 }}
                onClick={() => handlePostClick(post)}
                className="flex items-center gap-4 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-colors"
              >
                <PlatformIcon platform={post.platform} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{post.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {post.scheduledDate && format(new Date(post.scheduledDate), 'MMM d, yyyy • h:mm a')}
                  </p>
                </div>
                <StatusBadge status={post.status} />
              </motion.div>
            ))}
        </div>
      </div>
    </motion.div>
  );
}
