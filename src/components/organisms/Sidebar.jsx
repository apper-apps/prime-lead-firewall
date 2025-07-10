import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    {
      path: "/",
      name: "Dashboard",
      icon: "BarChart3"
    },
    {
      path: "/contacts",
      name: "Contacts",
      icon: "Users"
    },
    {
      path: "/pipeline",
      name: "Deal Pipeline",
      icon: "Workflow"
    }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-secondary">
        <div className="flex flex-col h-full">
          <div className="flex items-center h-16 px-6 border-b border-secondary">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg">
                <ApperIcon name="Target" size={24} className="text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-white">Prime Lead</h1>
                <p className="text-xs text-slate-400">Lead Management</p>
              </div>
            </div>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white shadow-lg border-l-4 border-accent"
                      : "text-slate-300 hover:bg-secondary hover:text-white"
                  }`
                }
              >
                <ApperIcon name={item.icon} size={20} />
                <span className="ml-3 font-medium">{item.name}</span>
              </NavLink>
            ))}
          </nav>
          
          <div className="p-4 border-t border-secondary">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-br from-success to-info rounded-lg">
                <ApperIcon name="User" size={20} className="text-white" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Sales Team</p>
                <p className="text-xs text-slate-400">Prime Club</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="relative flex-1 flex flex-col max-w-xs w-full bg-surface border-r border-secondary"
          >
            <div className="flex items-center justify-between h-16 px-6 border-b border-secondary">
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg">
                  <ApperIcon name="Target" size={24} className="text-white" />
                </div>
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-white">Prime Lead</h1>
                  <p className="text-xs text-slate-400">Lead Management</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <ApperIcon name="X" size={20} className="text-slate-400" />
              </button>
            </div>
            
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-white shadow-lg border-l-4 border-accent"
                        : "text-slate-300 hover:bg-secondary hover:text-white"
                    }`
                  }
                >
                  <ApperIcon name={item.icon} size={20} />
                  <span className="ml-3 font-medium">{item.name}</span>
                </NavLink>
              ))}
            </nav>
            
            <div className="p-4 border-t border-secondary">
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-br from-success to-info rounded-lg">
                  <ApperIcon name="User" size={20} className="text-white" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">Sales Team</p>
                  <p className="text-xs text-slate-400">Prime Club</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Sidebar;