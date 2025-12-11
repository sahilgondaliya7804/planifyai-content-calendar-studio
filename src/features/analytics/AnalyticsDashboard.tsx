import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { TrendingUp, Calendar, Award, Activity } from 'lucide-react';
import {
  generateAnalyticsData,
  generatePlatformStats,
  generateContentTypeStats,
  generateKPIData,
  platformColors,
  contentTypeColors,
} from '@/data/analytics';
import { AnalyticsData, PlatformStats, ContentTypeStats, KPIData } from '@/types';
import { PlatformIcon } from '@/components/common/PlatformIcon';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [platformStats, setPlatformStats] = useState<PlatformStats[]>([]);
  const [contentTypeStats, setContentTypeStats] = useState<ContentTypeStats[]>([]);
  const [kpiData, setKpiData] = useState<KPIData | null>(null);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setAnalyticsData(generateAnalyticsData());
      setPlatformStats(generatePlatformStats());
      setContentTypeStats(generateContentTypeStats());
      setKpiData(generateKPIData());
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const kpis = kpiData
    ? [
        {
          label: 'Scheduled This Week',
          value: kpiData.scheduledThisWeek,
          icon: Calendar,
          change: '+3 from last week',
          positive: true,
        },
        {
          label: 'Published This Month',
          value: kpiData.publishedThisMonth,
          icon: Activity,
          change: '+12% vs last month',
          positive: true,
        },
        {
          label: 'Best Platform',
          value: kpiData.bestPlatform.charAt(0).toUpperCase() + kpiData.bestPlatform.slice(1),
          icon: Award,
          change: '67K engagement',
          positive: true,
        },
        {
          label: 'Growth Rate',
          value: `${kpiData.growthPercentage}%`,
          icon: TrendingUp,
          change: 'Month over month',
          positive: true,
        },
      ]
    : [];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-display font-bold text-foreground">
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Track your content performance and engagement metrics
        </p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="glass-card rounded-2xl p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.label}</p>
                  <p className="text-2xl font-display font-bold mt-1">{kpi.value}</p>
                  <p
                    className={cn(
                      'text-xs mt-1',
                      kpi.positive ? 'text-emerald-500' : 'text-red-500'
                    )}
                  >
                    {kpi.change}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Over Time */}
        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-display font-semibold mb-4">
            Engagement Over Time
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="engagement"
                  stroke="hsl(var(--neon-purple))"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: 'hsl(var(--neon-purple))' }}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="hsl(var(--neon-cyan))"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: 'hsl(var(--neon-cyan))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Posts by Platform */}
        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
          <h3 className="text-lg font-display font-semibold mb-4">
            Posts by Platform
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformStats} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="platform"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  width={80}
                  tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                  }}
                />
                <Bar dataKey="posts" radius={[0, 4, 4, 0]}>
                  {platformStats.map((entry) => (
                    <Cell key={entry.platform} fill={platformColors[entry.platform]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Content Type Distribution */}
      <motion.div variants={itemVariants} className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-display font-semibold mb-4">
          Content Type Distribution
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={contentTypeStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="count"
                >
                  {contentTypeStats.map((entry) => (
                    <Cell key={entry.type} fill={contentTypeColors[entry.type]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col justify-center space-y-3">
            {contentTypeStats.map((stat) => (
              <div key={stat.type} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: contentTypeColors[stat.type] }}
                  />
                  <span className="capitalize text-sm">{stat.type}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{stat.count}</span>
                  <span className="text-sm font-medium">{stat.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
