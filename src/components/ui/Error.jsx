import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center justify-center h-64 ${className}`}
    >
      <Card className="max-w-md mx-auto text-center bg-gradient-to-br from-surface to-secondary/30 border-error/30">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-error/20 rounded-full">
              <ApperIcon name="AlertCircle" size={32} className="text-error" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-slate-400 text-sm">
              {message}
            </p>
          </div>
          {onRetry && (
            <Button 
              onClick={onRetry} 
              variant="primary"
              className="w-full"
            >
              <ApperIcon name="RefreshCw" size={16} className="mr-2" />
              Try Again
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default Error;