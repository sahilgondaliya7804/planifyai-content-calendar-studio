import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/appStore';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CalendarView } from '@/features/calendar/CalendarView';
import { AIPanel } from '@/features/ai/AIPanel';
import { AnalyticsDashboard } from '@/features/analytics/AnalyticsDashboard';
import { ContentBacklog } from '@/features/content/ContentBacklog';
import { PostModal } from '@/components/modals/PostModal';
import { NewPostModal } from '@/components/modals/NewPostModal';

const Index = () => {
  const { currentView, isDarkMode } = useAppStore();

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderView = () => {
    switch (currentView) {
      case 'calendar':
        return <CalendarView />;
      case 'ai':
        return <AIPanel />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'backlog':
        return <ContentBacklog />;
      default:
        return <CalendarView />;
    }
  };

  return (
    <DashboardLayout>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>

      {/* Modals */}
      <PostModal />
      <NewPostModal />
    </DashboardLayout>
  );
};

export default Index;
