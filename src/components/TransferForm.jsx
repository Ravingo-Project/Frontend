import { useState } from 'react';

export default function TransferForm({ branches, onTransferSubmit, isSubmitting }) {
  const [fromBranchId, setFromBranchId] = useState(1);
  const [toBranchId, setToBranchId] = useState(2);
  const [productId, setProductId] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const products = [
    { id: 1, name: 'Keeri Samba Rice 5kg' },
    { id: 2, name: 'White Sugar 1kg' },
    { id: 3, name: 'Ceylon Tea 400g' },
    { id: 4, name: 'Milk Powder 400g' },
    { id: 5, name: 'Wheat Flour 1kg' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Guard Clause: දැනටමත් request එකක් යමින් පවතී නම් double-click නවත්වයි
    if (isSubmitting) {
      return;
    }

    const fromBranchName = branches.find(b => b.id === Number(fromBranchId))?.name || 'Selected Branch';
    const toBranchName = branches.find(b => b.id === Number(toBranchId))?.name || 'Selected Branch';
    const selectedProduct = products.find(p => p.id === Number(productId))?.name || 'Product';

    const confirmMessage = 
      `Are you sure you want to transfer this stock?\n\n` +
      `• Product: ${selectedProduct}\n` +
      `• Quantity: ${quantity}\n` +
      `• From: ${fromBranchName}\n` +
      `• To: ${toBranchName}`;

    const isConfirmed = window.confirm(confirmMessage);
    if (!isConfirmed) return;

    // Transfer request එක trigger කිරීම
    onTransferSubmit({
      fromBranchId: Number(fromBranchId),
      toBranchId: Number(toBranchId),
      productId: Number(productId),
      quantity: Number(quantity)
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '8px', marginBottom: '24px', border: '1px solid #e5e7eb' }}>
      <h3 style={{ margin: '0 0 16px 0' }}>Execute Stock Transfer</h3>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>From Branch:</label>
          <select value={fromBranchId} onChange={(e) => setFromBranchId(e.target.value)} disabled={isSubmitting} style={{ padding: '8px', borderRadius: '4px' }}>
            {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>To Branch:</label>
          <select value={toBranchId} onChange={(e) => setToBranchId(e.target.value)} disabled={isSubmitting} style={{ padding: '8px', borderRadius: '4px' }}>
            {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Product:</label>
          <select value={productId} onChange={(e) => setProductId(e.target.value)} disabled={isSubmitting} style={{ padding: '8px', borderRadius: '4px' }}>
            {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Quantity:</label>
          <input 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
            disabled={isSubmitting}
            style={{ width: '90px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {/* Button එක disabled වූ විට style එක සහ cursor එක වෙනස් වේ */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ 
            padding: '9px 20px', 
            backgroundColor: isSubmitting ? '#9ca3af' : '#0284c7', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: isSubmitting ? 'not-allowed' : 'pointer', 
            fontWeight: 'bold',
            transition: 'background-color 0.2s ease'
          }}
        >
          {isSubmitting ? 'Processing...' : 'Transfer Stock'}
        </button>
      </div>
    </form>
  );
}