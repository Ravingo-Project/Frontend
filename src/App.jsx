import { useState, useEffect, useCallback } from 'react';
import { apiService } from './api/apiService';
import BranchStockTable from './components/BranchStockTable';
import TransferHistoryTable from './components/TransferHistoryTable';
import TransferForm from './components/TransferForm';
import AlertBanner from './components/AlertBanner';

const BRANCHES = [
  { id: 1, name: 'Colombo' },
  { id: 2, name: 'Kandy' },
  { id: 3, name: 'Galle' }
];

export default function App() {
  const [selectedBranch, setSelectedBranch] = useState(1);
  const [stocks, setStocks] = useState([]);
  const [transfers, setTransfers] = useState([]);
  
  const [loadingStocks, setLoadingStocks] = useState(false);
  const [loadingTransfers, setLoadingTransfers] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [notification, setNotification] = useState({ type: '', message: '' });

  // 1. Fetch Stocks
  const loadStocks = useCallback(async (branchId) => {
    setLoadingStocks(true);
    try {
      const data = await apiService.getBranchStock(branchId);
      setStocks(data);
    } catch (err) {
      setNotification({ type: 'error', message: err.message });
    } finally {
      setLoadingStocks(false);
    }
  }, []);

  // 2. Fetch History
  const loadTransfers = useCallback(async () => {
    setLoadingTransfers(true);
    try {
      const data = await apiService.getTransferHistory();
      setTransfers(data);
    } catch (err) {
      setNotification({ type: 'error', message: err.message });
    } finally {
      setLoadingTransfers(false);
    }
  }, []);

  useEffect(() => {
    loadStocks(selectedBranch);
  }, [selectedBranch, loadStocks]);

  useEffect(() => {
    loadTransfers();
  }, [loadTransfers]);

  // 3. Handle Transfer Submission
  const handleTransfer = async (transferPayload) => {
  
  if (isSubmitting) return;

  setIsSubmitting(true);
  setNotification({ type: '', message: '' });

  try {
    const response = await apiService.createTransfer(transferPayload);
    setNotification({
      type: 'success',
      message: `Stock transfer successful! Moved ${response.quantity} unit(s).`
    });

    await Promise.all([loadStocks(selectedBranch), loadTransfers()]);
  } catch (err) {
    setNotification({ type: 'error', message: err.message });
  } finally {
   
    setIsSubmitting(false);
  }
};

  return (
    <div style={{ maxWidth: '1100px', margin: '24px auto', padding: '0 16px', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: '0 0 6px 0', color: '#111827' }}>Mihira Stores</h1>
        <p style={{ margin: 0, color: '#4b5563' }}>Inter-branch Stock Transfer Management Dashboard</p>
      </header>

      {/* Alert Notifications */}
      <AlertBanner type={notification.type} message={notification.message} />

      {/* Action Form */}
      <TransferForm 
        branches={BRANCHES} 
        onTransferSubmit={handleTransfer} 
        isSubmitting={isSubmitting} 
      />

      {/* Tables Side by Side Layout */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <BranchStockTable 
          branches={BRANCHES}
          selectedBranch={selectedBranch}
          onSelectBranch={setSelectedBranch}
          stocks={stocks}
          loading={loadingStocks}
        />

        <TransferHistoryTable 
          transfers={transfers}
          loading={loadingTransfers}
        />
      </div>
    </div>
  );
}