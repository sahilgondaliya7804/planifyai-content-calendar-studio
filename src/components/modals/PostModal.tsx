import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { useAppStore } from '@/store/appStore';
import { Platform, PostStatus, ContentType, Post } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlatformIcon } from '@/components/common/PlatformIcon';
import { StatusBadge } from '@/components/common/StatusBadge';

const platforms: Platform[] = ['instagram', 'twitter', 'youtube', 'linkedin', 'tiktok'];
const statuses: PostStatus[] = ['idea', 'draft', 'approved', 'scheduled', 'published'];
const contentTypes: ContentType[] = ['post', 'reel', 'story', 'short', 'video', 'article'];

export function PostModal() {
  const { 
    selectedPost, 
    isPostModalOpen, 
    setIsPostModalOpen, 
    setSelectedPost,
    updatePost,
    deletePost 
  } = useAppStore();

  if (!selectedPost || !isPostModalOpen) return null;

  const handleClose = () => {
    setIsPostModalOpen(false);
    setTimeout(() => setSelectedPost(null), 300);
  };

  const handleUpdate = (updates: Partial<Post>) => {
    updatePost(selectedPost.id, updates);
  };

  const handleDelete = () => {
    deletePost(selectedPost.id);
    handleClose();
  };

  return (
    <AnimatePresence>
      {isPostModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-screen w-full max-w-lg bg-card border-l border-border shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-card/95 backdrop-blur-xl border-b border-border p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <PlatformIcon platform={selectedPost.platform} size="md" />
                <StatusBadge status={selectedPost.status} />
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Title</Label>
                <Input
                  value={selectedPost.title}
                  onChange={(e) => handleUpdate({ title: e.target.value })}
                  className="bg-secondary/50"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Description</Label>
                <Textarea
                  value={selectedPost.description}
                  onChange={(e) => handleUpdate({ description: e.target.value })}
                  rows={4}
                  className="bg-secondary/50 resize-none"
                />
              </div>

              {/* Platform & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Platform</Label>
                  <Select
                    value={selectedPost.platform}
                    onValueChange={(v) => handleUpdate({ platform: v as Platform })}
                  >
                    <SelectTrigger className="bg-secondary/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {platforms.map((p) => (
                        <SelectItem key={p} value={p}>
                          <div className="flex items-center gap-2">
                            <PlatformIcon platform={p} size="sm" />
                            <span className="capitalize">{p}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Status</Label>
                  <Select
                    value={selectedPost.status}
                    onValueChange={(v) => handleUpdate({ status: v as PostStatus })}
                  >
                    <SelectTrigger className="bg-secondary/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((s) => (
                        <SelectItem key={s} value={s}>
                          <span className="capitalize">{s}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Content Type */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Content Type</Label>
                <Select
                  value={selectedPost.contentType}
                  onValueChange={(v) => handleUpdate({ contentType: v as ContentType })}
                >
                  <SelectTrigger className="bg-secondary/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {contentTypes.map((t) => (
                      <SelectItem key={t} value={t}>
                        <span className="capitalize">{t}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Scheduled Date */}
              {selectedPost.scheduledDate && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Scheduled</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(selectedPost.scheduledDate), 'MMMM d, yyyy • h:mm a')}
                    </p>
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </Label>
                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Engagement Stats (if published) */}
              {selectedPost.engagement && selectedPost.status === 'published' && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Engagement</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(selectedPost.engagement).map(([key, value]) => (
                      <div
                        key={key}
                        className="p-3 rounded-xl bg-secondary/30 text-center"
                      >
                        <p className="text-lg font-semibold">{value.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground capitalize">{key}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-card/95 backdrop-blur-xl border-t border-border p-6 flex gap-3">
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="flex-1"
              >
                Delete
              </Button>
              <Button
                onClick={handleClose}
                className="flex-1 bg-neon-gradient hover:opacity-90 text-white"
              >
                Save Changes
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
