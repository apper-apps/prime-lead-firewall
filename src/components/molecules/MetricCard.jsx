import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const MetricCard = ({ title, value, icon, trend, color = "primary" }) => {
  const colorClasses = {
    primary: "text-primary",
    success: "text-success",
    warning: "text-warning",
    error: "text-error",
    info: "text-info"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="bg-gradient-to-br from-surface to-secondary/50 hover:from-surface/80 hover:to-secondary/70 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
            <p className="text-3xl font-bold text-white mb-2">{value}</p>
            {trend && (
              <div className="flex items-center">
                <ApperIcon 
                  name={trend > 0 ? "TrendingUp" : "TrendingDown"} 
                  size={16} 
                  className={trend > 0 ? "text-success" : "text-error"} 
                />
                <span className={`ml-1 text-sm ${trend > 0 ? "text-success" : "text-error"}`}>
                  {Math.abs(trend)}%
                </span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full bg-gradient-to-br from-${color}/20 to-${color}/30 ${colorClasses[color]}`}>
            <ApperIcon name={icon} size={24} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default MetricCard;