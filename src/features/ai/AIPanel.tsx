import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, Wand2, ArrowRight, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { generateContentIdeas } from '@/services/ai';
import { AIContentSuggestion, Platform } from '@/types';
import { PlatformIcon } from '@/components/common/PlatformIcon';
import { cn } from '@/lib/utils';

const platforms: { value: Platform; label: string }[] = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'twitter', label: 'Twitter / X' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'tiktok', label: 'TikTok' },
];

export function AIPanel() {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [platform, setPlatform] = useState<Platform>('instagram');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<AIContentSuggestion[]>([]);

  const handleGenerate = async () => {
    if (!topic || !audience) return;

    setIsLoading(true);
    try {
      const results = await generateContentIdeas({
        topic,
        targetAudience: audience,
        platform,
      });
      setSuggestions(results);
    } catch (error) {
      console.error('Error generating suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-neon-gradient flex items-center justify-center neon-glow">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            AI Content Generator
          </h1>
          <p className="text-muted-foreground">
            Generate creative content ideas powered by AI
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6 space-y-5"
          >
            <div className="space-y-2">
              <Label htmlFor="topic" className="text-sm font-medium">
                Topic / Niche
              </Label>
              <Input
                id="topic"
                placeholder="e.g., Productivity tips, Fitness motivation"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="bg-secondary/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="audience" className="text-sm font-medium">
                Target Audience
              </Label>
              <Input
                id="audience"
                placeholder="e.g., Entrepreneurs, Gen Z creators"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="bg-secondary/50"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Platform</Label>
              <Select value={platform} onValueChange={(v) => setPlatform(v as Platform)}>
                <SelectTrigger className="bg-secondary/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      <div className="flex items-center gap-2">
                        <PlatformIcon platform={p.value} size="sm" />
                        {p.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleGenerate}
                disabled={!topic || !audience || isLoading}
                className="w-full bg-neon-gradient hover:opacity-90 text-white font-medium neon-glow"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate Ideas
                  </>
                )}
              </Button>
            </motion.div>

            <p className="text-xs text-muted-foreground text-center">
              AI suggestions are simulated. Connect a real AI API for production use.
            </p>
          </motion.div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {suggestions.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card rounded-2xl p-12 text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-secondary/50 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">
                  Need content ideas?
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Fill in your topic, target audience, and preferred platform, then click
                  generate to get AI-powered content suggestions for the next week.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-display font-semibold">
                    Generated Ideas ({suggestions.length})
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSuggestions([])}
                    className="text-muted-foreground"
                  >
                    Clear all
                  </Button>
                </div>

                <div className="grid gap-4">
                  {suggestions.map((suggestion, index) => (
                    <motion.div
                      key={suggestion.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.01 }}
                      className="gradient-border rounded-2xl p-5 bg-card"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                            <PlatformIcon platform={suggestion.platform} size="md" />
                            <h4 className="font-semibold text-lg">
                              {suggestion.title}
                            </h4>
                          </div>
                          <p className="text-muted-foreground">
                            {suggestion.caption}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {suggestion.hashtags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {format(suggestion.suggestedDateRange.start, 'MMM d')} -{' '}
                                {format(suggestion.suggestedDateRange.end, 'MMM d')}
                              </span>
                            </div>
                            <span className="px-2 py-0.5 rounded-full bg-secondary text-xs capitalize">
                              {suggestion.contentType}
                            </span>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1, x: 4 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-lg hover:bg-secondary transition-colors"
                        >
                          <ArrowRight className="w-5 h-5 text-muted-foreground" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
