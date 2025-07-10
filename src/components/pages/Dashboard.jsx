import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MetricCard from "@/components/molecules/MetricCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { metricsService } from "@/services/api/metricsService";

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMetrics = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await metricsService.getMetrics();
      setMetrics(data);
    } catch (err) {
      setError(err.message || "Failed to load metrics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMetrics();
  }, []);

  if (loading) {
    return <Loading type="cards" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadMetrics} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400">Track your sales performance and key metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricCard
          title="Total Leads Contacted"
          value={metrics.totalLeads.toLocaleString()}
          icon="Users"
          trend={12}
          color="info"
        />
        <MetricCard
          title="Meetings Booked"
          value={metrics.meetingsBooked.toLocaleString()}
          icon="Calendar"
          trend={8}
          color="primary"
        />
        <MetricCard
          title="Meetings This Week"
          value={metrics.weeklyMeetings.toLocaleString()}
          icon="Clock"
          trend={-3}
          color="warning"
        />
        <MetricCard
          title="Deals Closed"
          value={metrics.dealsClosedCount.toLocaleString()}
          icon="Target"
          trend={15}
          color="success"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="bg-surface border border-secondary rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Revenue Overview</h3>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-white">
                  ${metrics.dealsClosedValue.toLocaleString()}
                </span>
                <span className="text-sm text-slate-400">this month</span>
              </div>
            </div>
            <div className="h-64 flex items-center justify-center text-slate-400">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">
                    {metrics.conversionRate}%
                  </span>
                </div>
                <p className="text-sm">Conversion Rate</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="bg-surface border border-secondary rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-primary hover:bg-blue-700 text-white rounded-lg transition-colors text-left">
                <div className="flex items-center">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <span className="text-sm">📞</span>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Schedule Call</p>
                    <p className="text-xs opacity-80">Book a new meeting</p>
                  </div>
                </div>
              </button>
              <button className="w-full p-3 bg-secondary hover:bg-slate-700 text-white rounded-lg transition-colors text-left">
                <div className="flex items-center">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <span className="text-sm">➕</span>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Add Contact</p>
                    <p className="text-xs opacity-80">Create new lead</p>
                  </div>
                </div>
              </button>
              <button className="w-full p-3 bg-secondary hover:bg-slate-700 text-white rounded-lg transition-colors text-left">
                <div className="flex items-center">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <span className="text-sm">📊</span>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">View Reports</p>
                    <p className="text-xs opacity-80">Sales analytics</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-surface border border-secondary rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <p className="text-sm text-slate-300">Deal closed with TechCorp</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <p className="text-sm text-slate-300">Meeting booked with StartupXYZ</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <p className="text-sm text-slate-300">Follow-up needed for Enterprise Inc</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;