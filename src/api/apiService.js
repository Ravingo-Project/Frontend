const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7102';

export const apiService = {
  // 1. GET /branches/{id}/stock
  async getBranchStock(branchId) {
    const response = await fetch(`${API_BASE_URL}/branches/${branchId}/stock`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch branch stock');
    }
    return response.json();
  },

  // 2. POST /transfers
  async createTransfer(transferData) {
    const response = await fetch(`${API_BASE_URL}/transfers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transferData)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Stock transfer failed');
    }
    return data;
  },

  // 3. GET /transfers
  async getTransferHistory() {
    const response = await fetch(`${API_BASE_URL}/transfers`);
    if (!response.ok) {
      throw new Error('Failed to fetch transfer history');
    }
    return response.json();
  }
};