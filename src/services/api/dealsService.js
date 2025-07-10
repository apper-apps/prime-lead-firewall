import dealsData from "@/services/mockData/deals.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const dealsService = {
  async getAll() {
    await delay(300);
    return [...dealsData];
  },

  async getById(id) {
    await delay(200);
    const deal = dealsData.find(d => d.Id === id);
    if (!deal) {
      throw new Error(`Deal with ID ${id} not found`);
    }
    return { ...deal };
  },

  async create(dealData) {
    await delay(400);
    const newDeal = {
      ...dealData,
      Id: Math.max(...dealsData.map(d => d.Id)) + 1,
      stageEnteredAt: new Date().toISOString()
    };
    dealsData.push(newDeal);
    return { ...newDeal };
  },

  async update(id, updateData) {
    await delay(350);
    const index = dealsData.findIndex(d => d.Id === id);
    if (index === -1) {
      throw new Error(`Deal with ID ${id} not found`);
    }
    dealsData[index] = { ...dealsData[index], ...updateData };
    return { ...dealsData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = dealsData.findIndex(d => d.Id === id);
    if (index === -1) {
      throw new Error(`Deal with ID ${id} not found`);
    }
    dealsData.splice(index, 1);
    return true;
  }
};