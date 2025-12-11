import { motion } from 'framer-motion';
import { 
  Calendar, 
  Sparkles, 
  BarChart3, 
  LayoutGrid, 
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { View } from '@/types';
import { cn } from '@/lib/utils';

const menuItems: { id: View; label: string; icon: typeof Calendar }[] = [
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'ai', label: 'AI Suggestions', icon: Sparkles },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'backlog', label: 'Content Backlog', icon: LayoutGrid },
];

export function Sidebar() {
  const { currentView, setCurrentView, isSidebarCollapsed, toggleSidebar } = useAppStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isSidebarCollapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen bg-card border-r border-border flex flex-col z-40"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        <motion.div
          initial={false}
          animate={{ opacity: isSidebarCollapsed ? 0 : 1 }}
          className="flex items-center gap-2 overflow-hidden"
        >
          <div className="w-8 h-8 rounded-lg bg-neon-gradient flex items-center justify-center neon-glow">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl gradient-text whitespace-nowrap">
            PlanifyAI
          </span>
        </motion.div>
        
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <li key={item.id}>
                <motion.button
                  onClick={() => setCurrentView(item.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  )}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className={cn(
                    'w-5 h-5 flex-shrink-0',
                    isActive && 'text-primary'
                  )} />
                  <motion.span
                    initial={false}
                    animate={{ 
                      opacity: isSidebarCollapsed ? 0 : 1,
                      width: isSidebarCollapsed ? 0 : 'auto'
                    }}
                    className="font-medium whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="absolute right-2 w-1 h-6 rounded-full bg-primary"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-border">
        <motion.div
          initial={false}
          animate={{ 
            opacity: isSidebarCollapsed ? 0 : 1,
            height: isSidebarCollapsed ? 0 : 'auto'
          }}
          className="overflow-hidden"
        >
          <div className="gradient-border rounded-xl p-4 bg-card">
            <p className="text-xs text-muted-foreground mb-2">
              Pro Tip
            </p>
            <p className="text-sm text-foreground">
              Use AI suggestions to generate content ideas for the entire week!
            </p>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  );
}
