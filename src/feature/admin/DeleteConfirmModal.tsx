import Text from '../../components/Text';
import SizedBox from '../../components/SizedBox';

interface Props {
  name: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal = ({ name, onCancel, onConfirm }: Props) => (
  <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
    <div style={{ backgroundColor: 'white', borderRadius: '16px', width: '100%', maxWidth: '400px', padding: '28px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
      <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
        </svg>
      </div>
      <Text size={18} weight="700" color="#0F172A">Delete User</Text>
      <SizedBox height={8} />
      <Text size={14} color="#6B7280">Are you sure you want to delete <strong>{name}</strong>? This action cannot be undone.</Text>
      <SizedBox height={24} />
      <div style={{ display: 'flex', gap: '12px' }}>
        <button onClick={onCancel} style={{ flex: 1, padding: '10px', backgroundColor: 'white', border: '1.5px solid #E2E8F0', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
          Cancel
        </button>
        <button onClick={onConfirm} style={{ flex: 1, padding: '10px', backgroundColor: '#EF4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmModal;
