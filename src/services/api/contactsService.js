import contactsData from "@/services/mockData/contacts.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const contactsService = {
  async getAll() {
    await delay(300);
    return [...contactsData];
  },

  async getById(id) {
    await delay(200);
    const contact = contactsData.find(c => c.Id === id);
    if (!contact) {
      throw new Error(`Contact with ID ${id} not found`);
    }
    return { ...contact };
  },

  async create(contactData) {
    await delay(400);
    const newContact = {
      ...contactData,
      Id: Math.max(...contactsData.map(c => c.Id)) + 1,
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };
    contactsData.push(newContact);
    return { ...newContact };
  },

  async update(id, updateData) {
    await delay(350);
    const index = contactsData.findIndex(c => c.Id === id);
    if (index === -1) {
      throw new Error(`Contact with ID ${id} not found`);
    }
    contactsData[index] = { ...contactsData[index], ...updateData };
    return { ...contactsData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = contactsData.findIndex(c => c.Id === id);
    if (index === -1) {
      throw new Error(`Contact with ID ${id} not found`);
    }
    contactsData.splice(index, 1);
    return true;
  }
};