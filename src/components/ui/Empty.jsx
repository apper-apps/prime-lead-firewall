import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No data found", 
  description = "Get started by adding your first item",
  icon = "Inbox",
  actionLabel,
  onAction,
  className = ""
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center justify-center h-64 ${className}`}
    >
      <Card className="max-w-md mx-auto text-center bg-gradient-to-br from-surface to-secondary/30">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/20 rounded-full">
              <ApperIcon name={icon} size={32} className="text-primary" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {title}
            </h3>
            <p className="text-slate-400 text-sm">
              {description}
            </p>
          </div>
          {actionLabel && onAction && (
            <Button 
              onClick={onAction} 
              variant="primary"
              className="w-full"
            >
              <ApperIcon name="Plus" size={16} className="mr-2" />
              {actionLabel}
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default Empty;