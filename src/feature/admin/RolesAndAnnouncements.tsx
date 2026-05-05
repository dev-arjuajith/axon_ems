import { useEffect, useState, useCallback } from 'react';
import Text from '../../components/Text';
import SizedBox from '../../components/SizedBox';
import { AppColors } from '../../core/colors';
import {
  getRolesManageApi, createRoleApi, updateRoleApi, deleteRoleApi,
  getAnnouncementsApi, createAnnouncementApi, updateAnnouncementApi, deleteAnnouncementApi
} from '../../core/api';

interface Role { id: number; name: string; }
interface Announcement { id: number; title: string; description: string; imageUrl?: string; createdBy: string; createdAt: string; }

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 12px', borderRadius: '8px',
  border: '1.5px solid #E2E8F0', fontSize: '14px', outline: 'none',
  boxSizing: 'border-box', backgroundColor: 'white'
};

const RolesAndAnnouncements = () => {
  const [activeTab, setActiveTab] = useState<'roles' | 'announcements'>('roles');

  // --- Roles state ---
  const [roles, setRoles] = useState<Role[]>([]);
  const [roleLoading, setRoleLoading] = useState(true);
  const [roleForm, setRoleForm] = useState({ name: '' });
  const [editRole, setEditRole] = useState<Role | null>(null);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [deleteRoleTarget, setDeleteRoleTarget] = useState<Role | null>(null);

  // --- Announcements state ---
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [annLoading, setAnnLoading] = useState(true);
  const [annForm, setAnnForm] = useState({ title: '', description: '', imageUrl: '' });
  const [editAnn, setEditAnn] = useState<Announcement | null>(null);
  const [annModalOpen, setAnnModalOpen] = useState(false);
  const [deleteAnnTarget, setDeleteAnnTarget] = useState<Announcement | null>(null);

  const [toast, setToast] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const fetchRoles = useCallback(async () => {
    setRoleLoading(true);
    try { const r = await getRolesManageApi(); if (r.success) setRoles(r.data); } catch { }
    finally { setRoleLoading(false); }
  }, []);

  const fetchAnnouncements = useCallback(async () => {
    setAnnLoading(true);
    try { const r = await getAnnouncementsApi(0, 50); if (r.success) setAnnouncements(r.data.content); } catch { }
    finally { setAnnLoading(false); }
  }, []);

  useEffect(() => { fetchRoles(); fetchAnnouncements(); }, [fetchRoles, fetchAnnouncements]);

  // --- Role handlers ---
  const openAddRole = () => { setEditRole(null); setRoleForm({ name: '' }); setFormError(''); setRoleModalOpen(true); };
  const openEditRole = (r: Role) => { setEditRole(r); setRoleForm({ name: r.name.replace('ROLE_', '') }); setFormError(''); setRoleModalOpen(true); };

  const handleRoleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleForm.name.trim()) { setFormError('Role name is required'); return; }
    setIsSubmitting(true);
    try {
      if (editRole) { await updateRoleApi(editRole.id, { name: roleForm.name }); showToast('Role updated'); }
      else { await createRoleApi({ name: roleForm.name }); showToast('Role created'); }
      setRoleModalOpen(false); fetchRoles();
    } catch (e: any) { setFormError(e.message || 'Failed'); }
    finally { setIsSubmitting(false); }
  };

  const handleDeleteRole = async () => {
    if (!deleteRoleTarget) return;
    try { await deleteRoleApi(deleteRoleTarget.id); setDeleteRoleTarget(null); fetchRoles(); showToast('Role deleted'); }
    catch (e: any) { showToast(e.message || 'Failed to delete'); }
  };

  // --- Announcement handlers ---
  const openAddAnn = () => { setEditAnn(null); setAnnForm({ title: '', description: '', imageUrl: '' }); setFormError(''); setAnnModalOpen(true); };
  const openEditAnn = (a: Announcement) => { setEditAnn(a); setAnnForm({ title: a.title, description: a.description, imageUrl: a.imageUrl || '' }); setFormError(''); setAnnModalOpen(true); };

  const handleAnnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!annForm.title.trim() || !annForm.description.trim()) { setFormError('Title and description are required'); return; }
    setIsSubmitting(true);
    try {
      const payload = { title: annForm.title, description: annForm.description, imageUrl: annForm.imageUrl || undefined };
      if (editAnn) { await updateAnnouncementApi(editAnn.id, payload); showToast('Announcement updated'); }
      else { await createAnnouncementApi(payload); showToast('Announcement created'); }
      setAnnModalOpen(false); fetchAnnouncements();
    } catch (e: any) { setFormError(e.message || 'Failed'); }
    finally { setIsSubmitting(false); }
  };

  const handleDeleteAnn = async () => {
    if (!deleteAnnTarget) return;
    try { await deleteAnnouncementApi(deleteAnnTarget.id); setDeleteAnnTarget(null); fetchAnnouncements(); showToast('Announcement deleted'); }
    catch (e: any) { showToast(e.message || 'Failed to delete'); }
  };

  const roleColors = ['#EFF6FF', '#F0FDF4', '#FFF7ED', '#FDF4FF', '#FFF1F2', '#F0FDFA'];
  const roleTextColors = ['#1D4ED8', '#15803D', '#C2410C', '#7E22CE', '#BE123C', '#0F766E'];

  return (
    <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <Text size={22} weight="700" color="#0F172A">Roles & Announcements</Text>
          <SizedBox height={4} />
          <Text size={13} color="#6B7280">Manage system roles and company-wide announcements</Text>
        </div>
        <button
          onClick={activeTab === 'roles' ? openAddRole : openAddAnn}
          style={{ padding: '10px 20px', backgroundColor: AppColors.primary, color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          {activeTab === 'roles' ? 'Add Role' : 'Add Announcement'}
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', backgroundColor: '#F1F5F9', borderRadius: '10px', padding: '4px', width: 'fit-content' }}>
        {(['roles', 'announcements'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '600',
              backgroundColor: activeTab === tab ? 'white' : 'transparent',
              color: activeTab === tab ? AppColors.primary : '#64748B',
              boxShadow: activeTab === tab ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}>
            {tab === 'roles' ? 'Roles' : 'Announcements'}
          </button>
        ))}
      </div>

      {/* ===== ROLES TAB ===== */}
      {activeTab === 'roles' && (
        <div>
          {roleLoading ? (
            <div style={{ textAlign: 'center', padding: '48px' }}><Text size={14} color="#9CA3AF">Loading roles...</Text></div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
              {roles.map((role, i) => (
                <div key={role.id} style={{ padding: '20px', borderRadius: '12px', border: '1.5px solid #E2E8F0', backgroundColor: 'white', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ padding: '6px 14px', borderRadius: '8px', backgroundColor: roleColors[i % roleColors.length] }}>
                      <Text size={13} weight="700" color={roleTextColors[i % roleTextColors.length]}>
                        {role.name.replace('ROLE_', '')}
                      </Text>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={() => openEditRole(role)} title="Edit" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', padding: '4px' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4L18.5 2.5z"/></svg>
                      </button>
                      <button onClick={() => setDeleteRoleTarget(role)} title="Delete" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', padding: '4px' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                      </button>
                    </div>
                  </div>
                  <Text size={12} color="#94A3B8">System role identifier</Text>
                  <div style={{ padding: '8px 12px', backgroundColor: '#F8FAFC', borderRadius: '6px' }}>
                    <Text size={11} color="#64748B" style={{ fontFamily: 'monospace' }}>{role.name}</Text>
                  </div>
                </div>
              ))}
              {roles.length === 0 && (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '48px' }}>
                  <Text size={14} color="#9CA3AF">No roles found. Add your first role.</Text>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ===== ANNOUNCEMENTS TAB ===== */}
      {activeTab === 'announcements' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {annLoading ? (
            <div style={{ textAlign: 'center', padding: '48px' }}><Text size={14} color="#9CA3AF">Loading announcements...</Text></div>
          ) : announcements.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px' }}><Text size={14} color="#9CA3AF">No announcements yet.</Text></div>
          ) : announcements.map(ann => (
            <div key={ann.id} style={{ padding: '20px', borderRadius: '12px', border: '1.5px solid #E2E8F0', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              {ann.imageUrl && (
                <img src={ann.imageUrl} alt="" style={{ width: '80px', height: '80px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
              )}
              {!ann.imageUrl && (
                <div style={{ width: '80px', height: '80px', borderRadius: '10px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
              )}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Text size={15} weight="700" color="#0F172A">{ann.title}</Text>
                  <div style={{ display: 'flex', gap: '6px', flexShrink: 0, marginLeft: '12px' }}>
                    <button onClick={() => openEditAnn(ann)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', padding: '4px' }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4L18.5 2.5z"/></svg>
                    </button>
                    <button onClick={() => setDeleteAnnTarget(ann)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', padding: '4px' }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                  </div>
                </div>
                <SizedBox height={6} />
                <Text size={13} color="#64748B" style={{ lineHeight: '1.5' }}>{ann.description}</Text>
                <SizedBox height={10} />
                <div style={{ display: 'flex', gap: '16px' }}>
                  <Text size={11} color="#94A3B8">By {ann.createdBy}</Text>
                  <Text size={11} color="#94A3B8">{ann.createdAt}</Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== ROLE MODAL ===== */}
      {roleModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', width: '100%', maxWidth: '420px', padding: '28px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <Text size={18} weight="700" color="#0F172A">{editRole ? 'Edit Role' : 'Add Role'}</Text>
              <button onClick={() => setRoleModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <form onSubmit={handleRoleSubmit}>
              <Text size={13} weight="600" color="#374151">Role Name *</Text>
              <SizedBox height={6} />
              <input style={{ ...inputStyle, borderColor: formError ? '#EF4444' : '#E2E8F0' }}
                value={roleForm.name} onChange={e => { setRoleForm({ name: e.target.value }); setFormError(''); }}
                placeholder="e.g. MANAGER" />
              <SizedBox height={6} />
              <Text size={11} color="#94A3B8">Will be stored as ROLE_NAME format</Text>
              {formError && <><SizedBox height={8} /><Text size={12} color="#EF4444">{formError}</Text></>}
              <SizedBox height={24} />
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setRoleModalOpen(false)} style={{ padding: '10px 20px', backgroundColor: 'white', border: '1.5px solid #E2E8F0', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Cancel</button>
                <button type="submit" disabled={isSubmitting} style={{ padding: '10px 24px', backgroundColor: AppColors.primary, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', opacity: isSubmitting ? 0.7 : 1 }}>
                  {isSubmitting ? 'Saving...' : editRole ? 'Save Changes' : 'Create Role'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== ANNOUNCEMENT MODAL ===== */}
      {annModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Text size={18} weight="700" color="#0F172A">{editAnn ? 'Edit Announcement' : 'New Announcement'}</Text>
                <button onClick={() => setAnnModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <form onSubmit={handleAnnSubmit}>
                <Text size={13} weight="600" color="#374151">Title *</Text>
                <SizedBox height={6} />
                <input style={inputStyle} value={annForm.title} onChange={e => { setAnnForm(f => ({ ...f, title: e.target.value })); setFormError(''); }} placeholder="Announcement title" />
                <SizedBox height={16} />
                <Text size={13} weight="600" color="#374151">Description *</Text>
                <SizedBox height={6} />
                <textarea style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} value={annForm.description}
                  onChange={e => { setAnnForm(f => ({ ...f, description: e.target.value })); setFormError(''); }}
                  placeholder="Write the announcement details..." />
                <SizedBox height={16} />
                <Text size={13} weight="600" color="#374151">Image URL (optional)</Text>
                <SizedBox height={6} />
                <input style={inputStyle} value={annForm.imageUrl} onChange={e => setAnnForm(f => ({ ...f, imageUrl: e.target.value }))} placeholder="https://..." />
                {formError && <><SizedBox height={10} /><div style={{ padding: '10px 14px', backgroundColor: '#FEF2F2', borderRadius: '8px' }}><Text size={13} color="#DC2626">{formError}</Text></div></>}
                <SizedBox height={24} />
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setAnnModalOpen(false)} style={{ padding: '10px 20px', backgroundColor: 'white', border: '1.5px solid #E2E8F0', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Cancel</button>
                  <button type="submit" disabled={isSubmitting} style={{ padding: '10px 24px', backgroundColor: AppColors.primary, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', opacity: isSubmitting ? 0.7 : 1 }}>
                    {isSubmitting ? 'Saving...' : editAnn ? 'Save Changes' : 'Publish'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ===== DELETE CONFIRM ===== */}
      {(deleteRoleTarget || deleteAnnTarget) && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', width: '100%', maxWidth: '380px', padding: '28px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </div>
            <Text size={17} weight="700" color="#0F172A">Confirm Delete</Text>
            <SizedBox height={8} />
            <Text size={14} color="#6B7280">
              Delete <strong>{deleteRoleTarget?.name.replace('ROLE_', '') || deleteAnnTarget?.title}</strong>? This cannot be undone.
            </Text>
            <SizedBox height={24} />
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => { setDeleteRoleTarget(null); setDeleteAnnTarget(null); }} style={{ flex: 1, padding: '10px', backgroundColor: 'white', border: '1.5px solid #E2E8F0', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Cancel</button>
              <button onClick={deleteRoleTarget ? handleDeleteRole : handleDeleteAnn} style={{ flex: 1, padding: '10px', backgroundColor: '#EF4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', backgroundColor: '#1E293B', color: 'white', padding: '12px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: '500', zIndex: 9999, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
          {toast}
        </div>
      )}
    </div>
  );
};

export default RolesAndAnnouncements;
