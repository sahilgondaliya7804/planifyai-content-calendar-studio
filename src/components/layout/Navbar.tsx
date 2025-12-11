import { motion } from 'framer-motion';
import { Search, Bell, Moon, Sun, Plus } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Navbar() {
  const { 
    isDarkMode, 
    toggleDarkMode, 
    searchQuery, 
    setSearchQuery,
    setIsNewPostModalOpen,
    isSidebarCollapsed
  } = useAppStore();

  return (
    <motion.header
      initial={false}
      animate={{ marginLeft: isSidebarCollapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 right-0 left-0 h-16 bg-card/80 backdrop-blur-xl border-b border-border z-30"
    >
      <div className="h-full flex items-center justify-between px-6">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search posts, ideas, content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary/50 border-border focus:border-primary"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setIsNewPostModalOpen(true)}
              className="bg-neon-gradient hover:opacity-90 text-white font-medium neon-glow"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg hover:bg-secondary transition-colors relative"
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-neon-pink rounded-full" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-muted-foreground" />
            )}
          </motion.button>

          {/* User Avatar */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-9 h-9 rounded-full bg-neon-gradient p-0.5 cursor-pointer"
          >
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
              <span className="text-sm font-semibold gradient-text">JD</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
