import { useEffect, useState } from 'react';
import Text from '../../components/Text';
import SizedBox from '../../components/SizedBox';
import { AppColors } from '../../core/colors';
import { getRolesManageApi, createRoleApi, updateRoleApi, deleteRoleApi } from '../../core/api';

interface Role { id: number; name: string; }

const CHIP_BG   = ['#EFF6FF','#F0FDF4','#FFF7ED','#FDF4FF','#FFF1F2','#F0FDFA'];
const CHIP_TEXT = ['#1D4ED8','#15803D','#C2410C','#7E22CE','#BE123C','#0F766E'];

export default function RolesMapping() {
  const [roles,      setRoles]      = useState<Role[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [modalOpen,  setModalOpen]  = useState(false);
  const [editRole,   setEditRole]   = useState<Role | null>(null);
  const [roleName,   setRoleName]   = useState('');
  const [roleErr,    setRoleErr]    = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [delTarget,  setDelTarget]  = useState<Role | null>(null);
  const [toast,      setToast]      = useState('');

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(''), 3000); };

  async function load() {
    setLoading(true);
    try {
      const r = await getRolesManageApi();
      if (r.success) setRoles(r.data);
    } catch (e) {
      console.error('Failed to load roles', e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function openAdd() {
    setEditRole(null); setRoleName(''); setRoleErr(''); setModalOpen(true);
  }

  function openEdit(r: Role) {
    setEditRole(r); setRoleName(r.name.replace('ROLE_', '')); setRoleErr(''); setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!roleName.trim()) { setRoleErr('Role name is required'); return; }
    setSubmitting(true);
    try {
      if (editRole) { await updateRoleApi(editRole.id, { name: roleName }); showToast('Role updated'); }
      else          { await createRoleApi({ name: roleName });              showToast('Role created'); }
      setModalOpen(false);
      load();
    } catch (err: any) {
      setRoleErr(err.message || 'Failed');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!delTarget) return;
    try {
      await deleteRoleApi(delTarget.id);
      setDelTarget(null);
      showToast('Role deleted');
      load();
    } catch { /* ignore */ }
  }

  const inp: React.CSSProperties = {
    width: '100%', padding: '10px 12px', borderRadius: '8px',
    border: '1.5px solid #E2E8F0', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
        <div>
          <Text size={22} weight="700" color="#0F172A">Roles &amp; Mapping</Text>
          <SizedBox height={4} />
          <Text size={13} color="#6B7280">Manage system roles</Text>
        </div>
        <button onClick={openAdd} style={{ padding: '10px 20px', backgroundColor: AppColors.primary, color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New Role
        </button>
      </div>

      {/* Table card */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center' }}>
            <Text size={14} color="#9CA3AF">Loading roles…</Text>
          </div>
        ) : roles.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center' }}>
            <Text size={14} color="#9CA3AF">No roles yet.</Text>
            <SizedBox height={12} />
            <button onClick={openAdd} style={{ fontSize: '13px', color: AppColors.primary, background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
              + Create first role
            </button>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: '#F8FAFC' }}>
                <th style={{ padding: '12px 20px', textAlign: 'left' }}><Text size={11} weight="700" color="#94A3B8" letterSpacing="0.06em">#</Text></th>
                <th style={{ padding: '12px 20px', textAlign: 'left' }}><Text size={11} weight="700" color="#94A3B8" letterSpacing="0.06em">ROLE NAME</Text></th>
                <th style={{ padding: '12px 20px', textAlign: 'left' }}><Text size={11} weight="700" color="#94A3B8" letterSpacing="0.06em">IDENTIFIER</Text></th>
                <th style={{ padding: '12px 20px', textAlign: 'right' }}><Text size={11} weight="700" color="#94A3B8" letterSpacing="0.06em">ACTIONS</Text></th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role, i) => (
                <tr key={role.id} style={{ borderBottom: '1px solid #F8FAFC' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <Text size={13} color="#94A3B8">{i + 1}</Text>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ padding: '4px 12px', borderRadius: '8px', backgroundColor: CHIP_BG[i % CHIP_BG.length], fontSize: '13px', fontWeight: '700', color: CHIP_TEXT[i % CHIP_TEXT.length] }}>
                      {role.name.replace('ROLE_', '')}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <Text size={12} color="#94A3B8" style={{ fontFamily: 'monospace' }}>{role.name}</Text>
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button onClick={() => openEdit(role)} style={{ padding: '6px 14px', backgroundColor: 'white', border: '1.5px solid #E2E8F0', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#374151' }}>Edit</button>
                      <button onClick={() => setDelTarget(role)} style={{ padding: '6px 14px', backgroundColor: '#FEF2F2', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#EF4444' }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create / Edit modal */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', width: '100%', maxWidth: '420px', padding: '28px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <Text size={18} weight="700" color="#0F172A">{editRole ? 'Edit Role' : 'New Role'}</Text>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <Text size={13} weight="600" color="#374151">Role Name *</Text>
              <SizedBox height={6} />
              <input style={{ ...inp, borderColor: roleErr ? '#EF4444' : '#E2E8F0' }}
                value={roleName} onChange={e => { setRoleName(e.target.value); setRoleErr(''); }}
                placeholder="e.g. MANAGER" autoFocus />
              <SizedBox height={4} />
              <Text size={11} color="#94A3B8">Will be stored as ROLE_NAME</Text>
              {roleErr && <><SizedBox height={6} /><Text size={12} color="#EF4444">{roleErr}</Text></>}
              <SizedBox height={24} />
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: '10px 20px', backgroundColor: 'white', border: '1.5px solid #E2E8F0', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Cancel</button>
                <button type="submit" disabled={submitting} style={{ padding: '10px 24px', backgroundColor: AppColors.primary, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', opacity: submitting ? 0.7 : 1 }}>
                  {submitting ? 'Saving…' : editRole ? 'Save' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {delTarget && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '28px', maxWidth: '380px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </div>
            <Text size={17} weight="700" color="#0F172A">Delete Role</Text>
            <SizedBox height={8} />
            <Text size={14} color="#6B7280">Delete <strong>{delTarget.name.replace('ROLE_', '')}</strong>? This cannot be undone.</Text>
            <SizedBox height={24} />
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setDelTarget(null)} style={{ flex: 1, padding: '10px', backgroundColor: 'white', border: '1.5px solid #E2E8F0', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>Cancel</button>
              <button onClick={handleDelete} style={{ flex: 1, padding: '10px', backgroundColor: '#EF4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', backgroundColor: '#1E293B', color: 'white', padding: '12px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: '500', zIndex: 9999, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
          {toast}
        </div>
      )}
    </div>
  );
}
