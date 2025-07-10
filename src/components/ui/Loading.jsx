import { motion } from "framer-motion";

const Loading = ({ type = "default" }) => {
  if (type === "cards") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="bg-surface border border-secondary rounded-lg p-4 animate-pulse"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-2">
                <div className="h-4 bg-secondary rounded w-24"></div>
                <div className="h-8 bg-secondary rounded w-16"></div>
              </div>
              <div className="h-12 w-12 bg-secondary rounded-full"></div>
            </div>
            <div className="h-4 bg-secondary rounded w-20"></div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === "table") {
    return (
      <div className="space-y-4">
        <div className="bg-surface border border-secondary rounded-lg p-4">
          <div className="animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 bg-secondary rounded w-32"></div>
              <div className="h-8 bg-secondary rounded w-24"></div>
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-secondary rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-secondary rounded w-3/4"></div>
                    <div className="h-3 bg-secondary rounded w-1/2"></div>
                  </div>
                  <div className="h-6 bg-secondary rounded w-20"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "kanban") {
    return (
      <div className="flex space-x-6 overflow-x-auto pb-4">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="flex-shrink-0 w-80 bg-surface border border-secondary rounded-lg p-4"
          >
            <div className="animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="h-5 bg-secondary rounded w-32"></div>
                <div className="h-5 w-5 bg-secondary rounded"></div>
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="bg-secondary/30 rounded-lg p-3">
                    <div className="h-4 bg-secondary rounded w-full mb-2"></div>
                    <div className="h-3 bg-secondary rounded w-3/4 mb-2"></div>
                    <div className="flex justify-between">
                      <div className="h-3 bg-secondary rounded w-16"></div>
                      <div className="h-3 bg-secondary rounded w-10"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center h-64"
    >
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </motion.div>
  );
};

export default Loading;