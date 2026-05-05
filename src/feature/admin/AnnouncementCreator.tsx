import { useEffect, useState } from 'react';
import Text from '../../components/Text';
import SizedBox from '../../components/SizedBox';
import { AppColors } from '../../core/colors';
import { getAnnouncementsApi, createAnnouncementApi, updateAnnouncementApi, deleteAnnouncementApi } from '../../core/api';

interface Announcement {
  id: number; title: string; description: string;
  imageUrl?: string; category?: string; createdBy: string; createdAt: string;
}

const CATEGORIES = ['General', 'Internal', 'Policy', 'Holiday', 'HR', 'IT'];

const CAT_STYLE: Record<string, { bg: string; text: string }> = {
  General:  { bg: '#E2F5EA', text: '#1A5C35' },
  Internal: { bg: '#FFDBCA', text: '#723610' },
  Policy:   { bg: '#D0E1FB', text: '#1D4ED8' },
  Holiday:  { bg: '#D5E3FF', text: '#001B3C' },
  HR:       { bg: '#F3E8FF', text: '#6B21A8' },
  IT:       { bg: '#FEF9C3', text: '#713F12' },
};

const inp: React.CSSProperties = {
  width: '100%', padding: '10px 12px', borderRadius: '8px',
  border: '1.5px solid #E2E8F0', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
};

export default function AnnouncementCreator() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [modalOpen,     setModalOpen]     = useState(false);
  const [editTarget,    setEditTarget]    = useState<Announcement | null>(null);
  const [delTarget,     setDelTarget]     = useState<Announcement | null>(null);
  const [submitting,    setSubmitting]    = useState(false);
  const [toast,         setToast]         = useState('');
  const [form,          setForm]          = useState({ title: '', description: '', category: 'General', imageUrl: '' });
  const [formErr,       setFormErr]       = useState('');

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(''), 3000); };

  async function load() {
    setLoading(true);
    try {
      const r = await getAnnouncementsApi(0, 50);
      if (r.success) setAnnouncements(r.data.content);
    } catch { /* ignore */ } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function openAdd() {
    setEditTarget(null);
    setForm({ title: '', description: '', category: 'General', imageUrl: '' });
    setFormErr('');
    setModalOpen(true);
  }

  function openEdit(a: Announcement) {
    setEditTarget(a);
    setForm({ title: a.title, description: a.description, category: a.category || 'General', imageUrl: a.imageUrl || '' });
    setFormErr('');
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) { setFormErr('Title and description are required'); return; }
    setSubmitting(true);
    try {
      const payload = { title: form.title, description: form.description, category: form.category, imageUrl: form.imageUrl || undefined };
      if (editTarget) { await updateAnnouncementApi(editTarget.id, payload); showToast('Announcement updated'); }
      else            { await createAnnouncementApi(payload);                showToast('Announcement published'); }
      setModalOpen(false);
      load();
    } catch (err: any) { setFormErr(err.message || 'Failed'); }
    finally { setSubmitting(false); }
  }

  async function handleDelete() {
    if (!delTarget) return;
    try {
      await deleteAnnouncementApi(delTarget.id);
      setDelTarget(null);
      showToast('Announcement deleted');
      load();
    } catch { /* ignore */ }
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'28px' }}>
        <div>
          <Text size={22} weight="700" color="#0F172A">Announcements</Text>
          <SizedBox height={4} />
          <Text size={13} color="#6B7280">Create and manage company-wide announcements</Text>
        </div>
        <button onClick={openAdd} style={{ padding:'10px 20px', backgroundColor:AppColors.primary, color:'white', border:'none', borderRadius:'10px', cursor:'pointer', fontWeight:'600', fontSize:'14px', display:'flex', alignItems:'center', gap:'8px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New Announcement
        </button>
      </div>

      {/* List */}
      <div style={{ backgroundColor:'white', borderRadius:'12px', padding:'24px', boxShadow:'0 1px 3px rgba(0,0,0,0.06)' }}>
        {loading ? (
          <Text size={14} color="#9CA3AF">Loading…</Text>
        ) : announcements.length === 0 ? (
          <div style={{ textAlign:'center', padding:'48px 0' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin:'0 auto 12px' }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <Text size={14} color="#9CA3AF">No announcements yet.</Text>
            <SizedBox height={12} />
            <button onClick={openAdd} style={{ fontSize:'13px', color:AppColors.primary, background:'none', border:'none', cursor:'pointer', fontWeight:'600' }}>+ Create first announcement</button>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
            {announcements.map(ann => {
              const cs = CAT_STYLE[ann.category || 'General'] || CAT_STYLE['General'];
              return (
                <div key={ann.id} style={{ display:'flex', gap:'16px', alignItems:'flex-start', padding:'16px', borderRadius:'10px', border:'1.5px solid #F1F5F9', backgroundColor:'#FAFAFA' }}>
                  {/* Icon / image */}
                  {ann.imageUrl ? (
                    <img src={ann.imageUrl} alt="" style={{ width:'56px', height:'56px', borderRadius:'10px', objectFit:'cover', flexShrink:0 }} />
                  ) : (
                    <div style={{ width:'56px', height:'56px', borderRadius:'10px', backgroundColor:'#EFF6FF', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                  )}
                  {/* Content */}
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'4px', flexWrap:'wrap' }}>
                      <Text size={15} weight="700" color="#0F172A">{ann.title}</Text>
                      {ann.category && (
                        <span style={{ padding:'2px 8px', borderRadius:'6px', backgroundColor:cs.bg, fontSize:'11px', fontWeight:'700', color:cs.text, flexShrink:0 }}>
                          {ann.category.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <Text size={13} color="#64748B" style={{ lineHeight:'1.5', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' } as React.CSSProperties}>
                      {ann.description}
                    </Text>
                    <div style={{ display:'flex', gap:'12px', marginTop:'8px' }}>
                      <Text size={11} color="#94A3B8">By {ann.createdBy}</Text>
                      <Text size={11} color="#94A3B8">{ann.createdAt}</Text>
                    </div>
                  </div>
                  {/* Actions */}
                  <div style={{ display:'flex', gap:'6px', flexShrink:0 }}>
                    <button onClick={() => openEdit(ann)} title="Edit" style={{ background:'none', border:'none', cursor:'pointer', color:'#64748B', padding:'6px' }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4L18.5 2.5z"/></svg>
                    </button>
                    <button onClick={() => setDelTarget(ann)} title="Delete" style={{ background:'none', border:'none', cursor:'pointer', color:'#EF4444', padding:'6px' }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create / Edit modal */}
      {modalOpen && (
        <div style={{ position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.4)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:'16px' }}>
          <div style={{ backgroundColor:'white', borderRadius:'16px', width:'100%', maxWidth:'520px', maxHeight:'90vh', overflowY:'auto', boxShadow:'0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ padding:'28px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px' }}>
                <Text size={18} weight="700" color="#0F172A">{editTarget ? 'Edit Announcement' : 'New Announcement'}</Text>
                <button onClick={() => setModalOpen(false)} style={{ background:'none', border:'none', cursor:'pointer', color:'#94A3B8' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
                <div>
                  <Text size={13} weight="600" color="#374151">Title *</Text>
                  <SizedBox height={6} />
                  <input style={{ ...inp, borderColor: formErr ? '#EF4444' : '#E2E8F0' }}
                    value={form.title} onChange={e => { setForm(f => ({ ...f, title: e.target.value })); setFormErr(''); }}
                    placeholder="Announcement title" />
                </div>
                <div>
                  <Text size={13} weight="600" color="#374151">Description *</Text>
                  <SizedBox height={6} />
                  <textarea style={{ ...inp, minHeight:'120px', resize:'vertical', borderColor: formErr ? '#EF4444' : '#E2E8F0' } as React.CSSProperties}
                    value={form.description} onChange={e => { setForm(f => ({ ...f, description: e.target.value })); setFormErr(''); }}
                    placeholder="Write the announcement details…" />
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
                  <div>
                    <Text size={13} weight="600" color="#374151">Category</Text>
                    <SizedBox height={6} />
                    <select style={inp} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <Text size={13} weight="600" color="#374151">Image URL (optional)</Text>
                    <SizedBox height={6} />
                    <input style={inp} value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} placeholder="https://…" />
                  </div>
                </div>
                {formErr && (
                  <div style={{ padding:'10px 14px', backgroundColor:'#FEF2F2', borderRadius:'8px', border:'1px solid #FECACA' }}>
                    <Text size={13} color="#DC2626">{formErr}</Text>
                  </div>
                )}
                <div style={{ display:'flex', gap:'12px', justifyContent:'flex-end', paddingTop:'8px' }}>
                  <button type="button" onClick={() => setModalOpen(false)} style={{ padding:'10px 20px', backgroundColor:'white', border:'1.5px solid #E2E8F0', borderRadius:'8px', cursor:'pointer', fontSize:'14px', fontWeight:'600', color:'#374151' }}>Cancel</button>
                  <button type="submit" disabled={submitting} style={{ padding:'10px 24px', backgroundColor:AppColors.primary, color:'white', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'14px', fontWeight:'600', opacity: submitting ? 0.7 : 1 }}>
                    {submitting ? 'Saving…' : editTarget ? 'Save Changes' : 'Publish'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {delTarget && (
        <div style={{ position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.4)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 }}>
          <div style={{ backgroundColor:'white', borderRadius:'16px', padding:'28px', maxWidth:'380px', width:'100%', boxShadow:'0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ width:'48px', height:'48px', borderRadius:'12px', backgroundColor:'#FEF2F2', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'16px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </div>
            <Text size={17} weight="700" color="#0F172A">Delete Announcement</Text>
            <SizedBox height={8} />
            <Text size={14} color="#6B7280">Delete <strong>"{delTarget.title}"</strong>? This cannot be undone.</Text>
            <SizedBox height={24} />
            <div style={{ display:'flex', gap:'12px' }}>
              <button onClick={() => setDelTarget(null)} style={{ flex:1, padding:'10px', backgroundColor:'white', border:'1.5px solid #E2E8F0', borderRadius:'8px', cursor:'pointer', fontSize:'14px', fontWeight:'600' }}>Cancel</button>
              <button onClick={handleDelete} style={{ flex:1, padding:'10px', backgroundColor:'#EF4444', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'14px', fontWeight:'600' }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div style={{ position:'fixed', bottom:'24px', right:'24px', backgroundColor:'#1E293B', color:'white', padding:'12px 20px', borderRadius:'10px', fontSize:'14px', fontWeight:'500', zIndex:9999, boxShadow:'0 4px 12px rgba(0,0,0,0.2)' }}>
          {toast}
        </div>
      )}
    </div>
  );
}
