export default function BranchStockTable({ branches, selectedBranch, onSelectBranch, stocks, loading }) {
  return (
    <div style={{ flex: 1, border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 style={{ margin: 0 }}>Branch Stock Levels</h3>
        <select 
          value={selectedBranch} 
          onChange={(e) => onSelectBranch(Number(e.target.value))}
          style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          {branches.map((b) => (
            <option key={b.id} value={b.id}>{b.name} Branch</option>
          ))}
        </select>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '8px' }}>Product</th>
            <th style={{ padding: '8px' }}>SKU</th>
            <th style={{ padding: '8px', textAlign: 'right' }}>Stock Qty</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="3" style={{ padding: '12px', textAlign: 'center' }}>Loading...</td></tr>
          ) : stocks.length === 0 ? (
            <tr><td colSpan="3" style={{ padding: '12px', textAlign: 'center' }}>No stock available</td></tr>
          ) : (
            stocks.map((item) => (
              <tr key={item.productId} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '8px' }}>{item.productName}</td>
                <td style={{ padding: '8px', color: '#6b7280' }}>{item.sku}</td>
                <td style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold' }}>{item.quantity}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}