import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DealCard from "@/components/molecules/DealCard";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const KanbanBoard = ({ deals, contacts, onStageChange }) => {
  const [draggedDeal, setDraggedDeal] = useState(null);
  const [dragOverStage, setDragOverStage] = useState(null);

  const stages = [
    { id: "Connected", name: "Connected", color: "info" },
    { id: "Locked", name: "Locked", color: "primary" },
    { id: "Meeting Booked", name: "Meeting Booked", color: "warning" },
    { id: "Meeting Done", name: "Meeting Done", color: "success" },
    { id: "Negotiation", name: "Negotiation", color: "warning" },
    { id: "Closed", name: "Closed", color: "success" },
    { id: "Lost", name: "Lost", color: "error" }
  ];

  const getDealsByStage = (stage) => {
    return deals.filter(deal => deal.stage === stage);
  };

  const getContactById = (contactId) => {
    return contacts.find(contact => contact.Id === contactId);
  };

  const handleDragStart = (e, deal) => {
    setDraggedDeal(deal);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, stage) => {
    e.preventDefault();
    setDragOverStage(stage);
  };

  const handleDragLeave = () => {
    setDragOverStage(null);
  };

  const handleDrop = (e, newStage) => {
    e.preventDefault();
    setDragOverStage(null);
    
    if (draggedDeal && draggedDeal.stage !== newStage) {
      onStageChange(draggedDeal.Id, newStage);
    }
    setDraggedDeal(null);
  };

  const getTotalValue = (stage) => {
    const stageDeals = getDealsByStage(stage);
    return stageDeals.reduce((total, deal) => total + deal.value, 0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="flex space-x-6 overflow-x-auto pb-6">
      {stages.map((stage) => {
        const stageDeals = getDealsByStage(stage.id);
        const totalValue = getTotalValue(stage.id);
        const isDropTarget = dragOverStage === stage.id;

        return (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex-shrink-0 w-80 bg-surface border rounded-lg transition-all duration-200 ${
              isDropTarget 
                ? "border-primary bg-primary/10 scale-102" 
                : "border-secondary"
            }`}
            onDragOver={(e) => handleDragOver(e, stage.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            <div className="p-4 border-b border-secondary">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-white">{stage.name}</h3>
                  <Badge variant={stage.color}>
                    {stageDeals.length}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm">
                  <ApperIcon name="Plus" size={16} />
                </Button>
              </div>
              <div className="text-sm text-slate-400">
                Total: <span className="font-medium text-white">{formatCurrency(totalValue)}</span>
              </div>
            </div>
            
            <div className="p-4 space-y-3 min-h-[400px]">
              <AnimatePresence>
                {stageDeals.map((deal) => (
                  <div
                    key={deal.Id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, deal)}
                    className="cursor-move"
                  >
                    <DealCard
                      deal={deal}
                      contact={getContactById(deal.contactId)}
                      onStageChange={onStageChange}
                      isDragging={draggedDeal?.Id === deal.Id}
                    />
                  </div>
                ))}
              </AnimatePresence>
              
              {stageDeals.length === 0 && (
                <div className="flex items-center justify-center h-32 text-slate-400 text-sm">
                  <div className="text-center">
                    <ApperIcon name="Inbox" size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No deals in this stage</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;