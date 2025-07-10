import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, startOfMonth, endOfMonth, differenceInDays, addDays, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import { cn } from '@/utils/cn';

const CalendarTimeline = ({ deals, contacts, onTimelineUpdate }) => {
  const [draggedDeal, setDraggedDeal] = useState(null);
  const [resizingDeal, setResizingDeal] = useState(null);

  const months = useMemo(() => {
    const year = new Date().getFullYear();
    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date(year, i, 1);
      return {
        name: format(date, 'MMM'),
        fullName: format(date, 'MMMM yyyy'),
        start: startOfMonth(date),
        end: endOfMonth(date),
        index: i
      };
    });
  }, []);

  const getContactById = (contactId) => {
    return contacts.find(c => c.Id === contactId);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculateDealPosition = (deal) => {
    const expectedClose = parseISO(deal.expectedCloseDate);
    const estimatedStart = addDays(expectedClose, -60); // Assume 60-day deal cycle
    
    const yearStart = new Date(expectedClose.getFullYear(), 0, 1);
    const yearEnd = new Date(expectedClose.getFullYear(), 11, 31);
    const totalDays = differenceInDays(yearEnd, yearStart);
    
    const startDays = differenceInDays(estimatedStart, yearStart);
    const endDays = differenceInDays(expectedClose, yearStart);
    
    return {
      left: Math.max(0, (startDays / totalDays) * 100),
      width: Math.min(100, ((endDays - startDays) / totalDays) * 100),
      estimatedStart,
      expectedClose
    };
  };

  const handleDragStart = (deal) => {
    setDraggedDeal(deal);
  };

  const handleDragEnd = (deal, newPosition) => {
    if (!draggedDeal) return;

    const yearStart = new Date(new Date().getFullYear(), 0, 1);
    const yearEnd = new Date(new Date().getFullYear(), 11, 31);
    const totalDays = differenceInDays(yearEnd, yearStart);
    
    const newStartDays = (newPosition.left / 100) * totalDays;
    const newEndDays = ((newPosition.left + newPosition.width) / 100) * totalDays;
    
    const newExpectedClose = addDays(yearStart, newEndDays);
    
    onTimelineUpdate(deal.Id, {
      expectedCloseDate: newExpectedClose.toISOString()
    });
    
    setDraggedDeal(null);
  };

  const handleResize = (deal, newWidth, direction) => {
    const position = calculateDealPosition(deal);
    const yearStart = new Date(new Date().getFullYear(), 0, 1);
    const yearEnd = new Date(new Date().getFullYear(), 11, 31);
    const totalDays = differenceInDays(yearEnd, yearStart);
    
    let newExpectedClose;
    if (direction === 'right') {
      const newEndDays = ((position.left + newWidth) / 100) * totalDays;
      newExpectedClose = addDays(yearStart, newEndDays);
    } else {
      // For left resize, we'd need to track start date - for now just handle right resize
      return;
    }
    
    onTimelineUpdate(deal.Id, {
      expectedCloseDate: newExpectedClose.toISOString()
    });
  };

  const getStageColor = (stage) => {
    const stageColors = {
      'Connected': 'bg-info',
      'Locked': 'bg-primary',
      'Meeting Booked': 'bg-warning',
      'Meeting Done': 'bg-accent',
      'Negotiation': 'bg-success',
      'Closed': 'bg-green-600',
      'Lost': 'bg-error'
    };
    return stageColors[stage] || 'bg-slate-500';
  };

  return (
    <div className="space-y-6">
      {/* Timeline Header */}
      <div className="grid grid-cols-12 gap-1 mb-4">
        {months.map((month) => (
          <div
            key={month.index}
            className="text-center py-2 bg-secondary/50 rounded-lg"
          >
            <div className="text-sm font-medium text-white">{month.name}</div>
            <div className="text-xs text-slate-400">{new Date().getFullYear()}</div>
          </div>
        ))}
      </div>

      {/* Timeline Grid */}
      <div className="relative">
        {/* Month dividers */}
        <div className="absolute inset-0 grid grid-cols-12 gap-1 pointer-events-none">
          {months.map((month) => (
            <div
              key={month.index}
              className="border-r border-secondary/30 last:border-r-0"
            />
          ))}
        </div>

        {/* Deal bars */}
        <div className="space-y-3 py-4">
          {deals.map((deal) => {
            const position = calculateDealPosition(deal);
            const contact = getContactById(deal.contactId);
            
            return (
              <motion.div
                key={deal.Id}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={cn(
                    "absolute h-12 rounded-lg border-2 border-white/20 cursor-move",
                    "hover:border-white/40 transition-colors",
                    getStageColor(deal.stage)
                  )}
                  style={{
                    left: `${position.left}%`,
                    width: `${position.width}%`,
                    minWidth: '80px'
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  onDragStart={() => handleDragStart(deal)}
                  onDragEnd={(_, info) => {
                    const container = info.point.x;
                    const containerWidth = window.innerWidth * 0.8; // Approximate container width
                    const newLeft = (container / containerWidth) * 100;
                    handleDragEnd(deal, { left: newLeft, width: position.width });
                  }}
                  whileDrag={{ scale: 1.05, zIndex: 10 }}
                >
                  <div className="flex items-center justify-between h-full px-3">
                    <div className="flex items-center space-x-2 min-w-0">
                      <div className="w-2 h-2 bg-white/60 rounded-full flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-white truncate">
                          {contact?.company || 'Unknown Company'}
                        </div>
                        <div className="text-xs text-white/70">
                          {formatCurrency(deal.value)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Resize handle */}
                    <div
                      className="w-3 h-full bg-white/20 hover:bg-white/30 cursor-e-resize flex items-center justify-center"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        setResizingDeal(deal);
                      }}
                    >
                      <ApperIcon name="GripVertical" size={12} className="text-white/60" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-secondary">
        <div className="text-sm text-slate-400">Deal Stages:</div>
        {[
          { stage: 'Connected', color: 'bg-info' },
          { stage: 'Locked', color: 'bg-primary' },
          { stage: 'Meeting Booked', color: 'bg-warning' },
          { stage: 'Meeting Done', color: 'bg-accent' },
          { stage: 'Negotiation', color: 'bg-success' },
          { stage: 'Closed', color: 'bg-green-600' },
          { stage: 'Lost', color: 'bg-error' }
        ].map(({ stage, color }) => (
          <div key={stage} className="flex items-center space-x-2">
            <div className={cn("w-3 h-3 rounded", color)} />
            <span className="text-sm text-slate-300">{stage}</span>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="bg-secondary/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <ApperIcon name="Info" size={16} className="text-info mt-0.5" />
          <div className="text-sm text-slate-300">
            <p className="font-medium mb-1">Timeline Instructions:</p>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>• Drag deal bars horizontally to adjust timeline positioning</li>
              <li>• Use the resize handle on the right to extend or shorten duration</li>
              <li>• Each deal spans approximately 60 days ending at the expected close date</li>
              <li>• Colors indicate current deal stage</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarTimeline;