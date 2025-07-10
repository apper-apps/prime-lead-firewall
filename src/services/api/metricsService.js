import metricsData from "@/services/mockData/metrics.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const metricsService = {
  async getMetrics() {
    await delay(250);
    return { ...metricsData };
  }
};