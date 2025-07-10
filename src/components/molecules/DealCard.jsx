import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import Card from "@/components/atoms/Card";
import StatusBadge from "@/components/molecules/StatusBadge";
import ApperIcon from "@/components/ApperIcon";

const DealCard = ({ deal, contact, onStageChange, isDragging = false }) => {
  const daysInStage = Math.floor(
    (new Date() - new Date(deal.stageEnteredAt)) / (1000 * 60 * 60 * 24)
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      className={`cursor-pointer ${isDragging ? "opacity-50 rotate-2" : ""}`}
    >
      <Card className="bg-gradient-to-br from-surface to-secondary/30 hover:from-surface/80 hover:to-secondary/50 transition-all duration-300 border-l-4 border-primary">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-white text-sm leading-tight">
                {contact?.name || "Unknown Contact"}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                {contact?.company || "No Company"}
              </p>
            </div>
            <StatusBadge status={deal.stage} type="deal" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ApperIcon name="DollarSign" size={14} className="text-success" />
              <span className="text-sm font-medium text-white">
                {formatCurrency(deal.value)}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <ApperIcon name="Clock" size={12} className="text-slate-400" />
              <span className="text-xs text-slate-400">
                {daysInStage}d
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ApperIcon name="User" size={12} className="text-slate-400" />
              <span className="text-xs text-slate-400">
                {deal.assignedRep}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <ApperIcon name="Target" size={12} className="text-slate-400" />
              <span className="text-xs text-slate-400">
                {deal.probability}%
              </span>
            </div>
          </div>
          
          {deal.notes && (
            <div className="pt-2 border-t border-secondary/50">
              <p className="text-xs text-slate-400 line-clamp-2">
                {deal.notes}
              </p>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default DealCard;