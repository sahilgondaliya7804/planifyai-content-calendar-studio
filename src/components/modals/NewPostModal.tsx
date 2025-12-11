import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
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

const platforms: Platform[] = ['instagram', 'twitter', 'youtube', 'linkedin', 'tiktok'];
const statuses: PostStatus[] = ['idea', 'draft', 'approved', 'scheduled'];
const contentTypes: ContentType[] = ['post', 'reel', 'story', 'short', 'video', 'article'];

export function NewPostModal() {
  const { isNewPostModalOpen, setIsNewPostModalOpen, addPost } = useAppStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    platform: 'instagram' as Platform,
    status: 'draft' as PostStatus,
    contentType: 'post' as ContentType,
    tags: '',
    scheduledDate: '',
    scheduledTime: '',
  });

  const handleClose = () => {
    setIsNewPostModalOpen(false);
    setFormData({
      title: '',
      description: '',
      platform: 'instagram',
      status: 'draft',
      contentType: 'post',
      tags: '',
      scheduledDate: '',
      scheduledTime: '',
    });
  };

  const handleSubmit = () => {
    if (!formData.title) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      platform: formData.platform,
      status: formData.status,
      contentType: formData.contentType,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      scheduledDate: formData.scheduledDate && formData.scheduledTime
        ? new Date(`${formData.scheduledDate}T${formData.scheduledTime}`)
        : undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addPost(newPost);
    handleClose();
  };

  return (
    <AnimatePresence>
      {isNewPostModalOpen && (
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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neon-gradient flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-display font-semibold">Create New Post</h2>
                  <p className="text-sm text-muted-foreground">Add a new content idea or schedule a post</p>
                </div>
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
            <div className="p-6 space-y-5">
              {/* Title */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter post title..."
                  className="bg-secondary/50"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Write your post content or caption..."
                  rows={3}
                  className="bg-secondary/50 resize-none"
                />
              </div>

              {/* Platform & Content Type */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Platform</Label>
                  <Select
                    value={formData.platform}
                    onValueChange={(v) => setFormData({ ...formData, platform: v as Platform })}
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
                  <Label className="text-sm font-medium">Content Type</Label>
                  <Select
                    value={formData.contentType}
                    onValueChange={(v) => setFormData({ ...formData, contentType: v as ContentType })}
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
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(v) => setFormData({ ...formData, status: v as PostStatus })}
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

              {/* Schedule (if status is scheduled) */}
              {formData.status === 'scheduled' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Date</Label>
                    <Input
                      type="date"
                      value={formData.scheduledDate}
                      onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                      className="bg-secondary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Time</Label>
                    <Input
                      type="time"
                      value={formData.scheduledTime}
                      onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                      className="bg-secondary/50"
                    />
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Tags</Label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Enter tags separated by commas..."
                  className="bg-secondary/50"
                />
                <p className="text-xs text-muted-foreground">
                  Separate multiple tags with commas (e.g., marketing, tips, viral)
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-card border-t border-border p-6 flex gap-3 rounded-b-2xl">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!formData.title}
                className="flex-1 bg-neon-gradient hover:opacity-90 text-white"
              >
                Create Post
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
