export default function AlertBanner({ type, message }) {
  if (!message) return null;

  const isError = type === 'error';
  const styles = {
    padding: '12px 16px',
    marginBottom: '16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    backgroundColor: isError ? '#fee2e2' : '#dcfce7',
    color: isError ? '#991b1b' : '#166534',
    border: `1px solid ${isError ? '#f87171' : '#86efac'}`
  };

  return <div style={styles}>{message}</div>;
}