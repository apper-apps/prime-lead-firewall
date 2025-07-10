import { useState } from "react";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ onMenuToggle, title = "Dashboard" }) => {
  const [notifications] = useState(3);

  return (
    <header className="bg-surface border-b border-secondary">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="lg:hidden"
          >
            <ApperIcon name="Menu" size={20} />
          </Button>
          <h1 className="text-xl font-bold text-white">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:block w-64">
            <SearchBar 
              placeholder="Search contacts, deals..."
              onSearch={(term) => console.log("Search:", term)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="relative">
              <ApperIcon name="Bell" size={20} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>
            
            <Button variant="ghost" size="sm">
              <ApperIcon name="Settings" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;