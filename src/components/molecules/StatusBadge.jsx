import Badge from "@/components/atoms/Badge";

const StatusBadge = ({ status, type = "contact" }) => {
  const getStatusConfig = () => {
    if (type === "contact") {
      const statusConfigs = {
        "New": { variant: "info", text: "New" },
        "Contacted": { variant: "primary", text: "Contacted" },
        "Qualified": { variant: "success", text: "Qualified" },
        "Unqualified": { variant: "error", text: "Unqualified" },
        "Working": { variant: "warning", text: "Working" }
      };
      return statusConfigs[status] || { variant: "default", text: status };
    }
    
    if (type === "deal") {
      const stageConfigs = {
        "Connected": { variant: "info", text: "Connected" },
        "Locked": { variant: "primary", text: "Locked" },
        "Meeting Booked": { variant: "warning", text: "Meeting Booked" },
        "Meeting Done": { variant: "success", text: "Meeting Done" },
        "Negotiation": { variant: "warning", text: "Negotiation" },
        "Closed": { variant: "success", text: "Closed" },
        "Lost": { variant: "error", text: "Lost" }
      };
      return stageConfigs[status] || { variant: "default", text: status };
    }
    
    return { variant: "default", text: status };
  };

  const config = getStatusConfig();

  return (
    <Badge variant={config.variant}>
      {config.text}
    </Badge>
  );
};

export default StatusBadge;