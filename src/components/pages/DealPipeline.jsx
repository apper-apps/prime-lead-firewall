import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import KanbanBoard from "@/components/organisms/KanbanBoard";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { dealsService } from "@/services/api/dealsService";
import { contactsService } from "@/services/api/contactsService";
import CalendarTimeline from "@/components/organisms/CalendarTimeline";
const DealPipeline = () => {
  const [deals, setDeals] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('kanban');
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [dealsData, contactsData] = await Promise.all([
        dealsService.getAll(),
        contactsService.getAll()
      ]);
      setDeals(dealsData);
      setContacts(contactsData);
    } catch (err) {
      setError(err.message || "Failed to load pipeline data");
    } finally {
      setLoading(false);
    }
  };

  const handleStageChange = async (dealId, newStage) => {
    try {
      const deal = deals.find(d => d.Id === dealId);
      if (!deal) return;

      const updatedDeal = {
        ...deal,
        stage: newStage,
        stageEnteredAt: new Date().toISOString()
      };

      await dealsService.update(dealId, updatedDeal);
      setDeals(prev => 
        prev.map(d => d.Id === dealId ? updatedDeal : d)
      );
      
      toast.success(`Deal moved to ${newStage}`);
    } catch (err) {
      toast.error("Failed to update deal stage");
    }
};

  const handleTimelineUpdate = async (dealId, updates) => {
    try {
      const deal = deals.find(d => d.Id === dealId);
      if (!deal) return;

      const updatedDeal = { ...deal, ...updates };
      await dealsService.update(dealId, updatedDeal);
      setDeals(prev => 
        prev.map(d => d.Id === dealId ? updatedDeal : d)
      );
      
      toast.success('Deal timeline updated');
    } catch (err) {
      toast.error('Failed to update deal timeline');
    }
  };

  const getTotalPipelineValue = () => {
    return deals.reduce((total, deal) => total + deal.value, 0);
  };

  const getActiveDealsCount = () => {
    return deals.filter(deal => deal.stage !== "Closed" && deal.stage !== "Lost").length;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <Loading type="kanban" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Deal Pipeline</h1>
          <p className="text-slate-400">Track deals through your sales process</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-surface border border-secondary rounded-lg p-1">
            <button
              onClick={() => setView('kanban')}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                view === 'kanban' 
                  ? 'bg-primary text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ApperIcon name="Columns" size={16} className="mr-2" />
              Kanban
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                view === 'calendar' 
                  ? 'bg-primary text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ApperIcon name="Calendar" size={16} className="mr-2" />
              Calendar
            </button>
          </div>
          <Button variant="primary">
            <ApperIcon name="Plus" size={16} className="mr-2" />
            Add Deal
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface border border-secondary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400 mb-1">Total Pipeline Value</p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(getTotalPipelineValue())}
              </p>
            </div>
            <div className="p-3 bg-primary/20 rounded-full">
              <ApperIcon name="DollarSign" size={24} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-surface border border-secondary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400 mb-1">Active Deals</p>
              <p className="text-2xl font-bold text-white">
                {getActiveDealsCount()}
              </p>
            </div>
            <div className="p-3 bg-warning/20 rounded-full">
              <ApperIcon name="TrendingUp" size={24} className="text-warning" />
            </div>
          </div>
        </div>

        <div className="bg-surface border border-secondary rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400 mb-1">Avg Deal Size</p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(deals.length > 0 ? getTotalPipelineValue() / deals.length : 0)}
              </p>
            </div>
            <div className="p-3 bg-success/20 rounded-full">
              <ApperIcon name="Target" size={24} className="text-success" />
            </div>
          </div>
        </div>
      </div>

<div className="bg-surface border border-secondary rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">
            {view === 'kanban' ? 'Pipeline Overview' : 'Deal Timeline'}
          </h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <ApperIcon name="Filter" size={16} className="mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <ApperIcon name="Download" size={16} className="mr-2" />
              Export
            </Button>
          </div>
        </div>

{deals.length === 0 ? (
          <Empty
            title="No deals in pipeline"
            description="Start by adding your first deal to track it through the sales process"
            icon="Workflow"
            actionLabel="Add First Deal"
            onAction={() => toast.info("Add deal feature coming soon!")}
          />
        ) : view === 'kanban' ? (
          <KanbanBoard
            deals={deals}
            contacts={contacts}
            onStageChange={handleStageChange}
          />
        ) : (
          <CalendarTimeline
            deals={deals}
            contacts={contacts}
            onTimelineUpdate={handleTimelineUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default DealPipeline;