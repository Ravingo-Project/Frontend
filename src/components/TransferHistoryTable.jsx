export default function TransferHistoryTable({ transfers, loading }) {
  return (
    <div style={{ flex: 1, border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px' }}>
      <h3 style={{ margin: '0 0 12px 0' }}>Recent Transfer History</h3>
      <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '8px' }}>From</th>
              <th style={{ padding: '8px' }}>To</th>
              <th style={{ padding: '8px' }}>Product</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>Qty</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" style={{ padding: '12px', textAlign: 'center' }}>Loading...</td></tr>
            ) : transfers.length === 0 ? (
              <tr><td colSpan="4" style={{ padding: '12px', textAlign: 'center' }}>No transfer history found</td></tr>
            ) : (
              transfers.map((t) => (
                <tr key={t.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '8px' }}>{t.fromBranchName}</td>
                  <td style={{ padding: '8px' }}>{t.toBranchName}</td>
                  <td style={{ padding: '8px' }}>{t.productName}</td>
                  <td style={{ padding: '8px', textAlign: 'right', color: '#2563eb', fontWeight: 'bold' }}>
                    {t.quantity}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}