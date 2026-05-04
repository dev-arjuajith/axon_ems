import { useEffect, useState, useCallback, useRef } from 'react';
import Text from '../../components/Text';
import SizedBox from '../../components/SizedBox';
import { AppColors } from '../../core/colors';
import {
  getUsersApi, createUserApi, updateUserApi, deleteUserApi,
  toggleUserStatusApi, getDepartmentsApi, getRolesApi
} from '../../core/api';
import UserFormModal from './UserFormModal';
import DeleteConfirmModal from './DeleteConfirmModal';

interface Employee {
  id: number; employeeCode: string; firstName: string; lastName: string;
  email: string; phone?: string; department?: string; departmentId?: number;
  role?: string; roleId?: number; managerId?: number; managerName?: string;
  isActive: boolean; dateOfJoining?: string;
}
interface PageData { content: Employee[]; pageNumber: number; pageSize: number; totalElements: number; totalPages: number; last: boolean; }
interface Department { id: number; name: string; }
interface Role { id: number; name: string; }

const EmployeeManagement = () => {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [filterDept, setFilterDept] = useState<number | null>(null);
  const [filterRole, setFilterRole] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<boolean | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);
  const [toastMsg, setToastMsg] = useState('');
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pageSize = 10;

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const fetchEmployees = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const data = await getUsersApi({ page, size: pageSize, sortBy: 'firstName', sortDir: 'asc', search, departmentId: filterDept, roleId: filterRole, isActive: filterStatus });
      if (data.success) setPageData(data.data);
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  }, [search, filterDept, filterRole, filterStatus]);

  useEffect(() => { fetchEmployees(currentPage); }, [currentPage, fetchEmployees]);
  useEffect(() => { setCurrentPage(0); }, [search, filterDept, filterRole, filterStatus]);

  useEffect(() => {
    getDepartmentsApi().then(r => { if (r.success) setDepartments(r.data); }).catch(() => {});
    getRolesApi().then(r => { if (r.success) setRoles(r.data); }).catch(() => {});
  }, []);

  const handleSearchChange = (val: string) => {
    setSearchInput(val);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => setSearch(val), 400);
  };

  const handleToggleStatus = async (emp: Employee) => {
    try {
      const res = await toggleUserStatusApi(emp.id);
      if (res.success) { fetchEmployees(currentPage); showToast(`${emp.firstName} ${emp.isActive ? 'deactivated' : 'activated'} successfully`); }
    } catch (e: any) { showToast(e.message || 'Failed to update status'); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteUserApi(deleteTarget.id);
      setDeleteTarget(null);
      fetchEmployees(currentPage);
      showToast('User deleted successfully');
    } catch (e: any) { showToast(e.message || 'Failed to delete user'); }
  };

  const handleFormSubmit = async (formData: any) => {
    try {
      if (editEmployee) {
        await updateUserApi(editEmployee.id, formData);
        showToast('User updated successfully');
      } else {
        await createUserApi(formData);
        showToast('User created successfully');
      }
      setModalOpen(false);
      setEditEmployee(null);
      fetchEmployees(currentPage);
    } catch (e: any) { throw e; }
  };

  const openEdit = (emp: Employee) => { setEditEmployee(emp); setModalOpen(true); };
  const openAdd = () => { setEditEmployee(null); setModalOpen(true); };

  const activeFiltersCount = [filterDept, filterRole, filterStatus].filter(v => v !== null).length;

  return (
    <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
        <div>
          <Text size={22} weight="700" color="#0F172A">User Management</Text>
          <SizedBox height={4} />
          <Text size={13} color="#6B7280">Manage team members and their account permissions</Text>
        </div>
        <button onClick={openAdd} style={{ padding: '10px 20px', backgroundColor: AppColors.primary, color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add User
        </button>
      </div>

      {/* Search + Filter bar */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <input type="text" placeholder="Search by name, email or employee ID..." value={searchInput} onChange={e => handleSearchChange(e.target.value)}
            style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div style={{ position: 'relative' }}>
          <button onClick={() => setShowFilters(p => !p)} style={{ padding: '10px 16px', backgroundColor: showFilters ? '#EFF6FF' : 'white', border: `1.5px solid ${showFilters ? '#3B82F6' : '#E2E8F0'}`, borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={showFilters ? '#3B82F6' : '#4B5563'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            <Text size={13} weight="600" color={showFilters ? '#3B82F6' : '#4B5563'}>Filters{activeFiltersCount > 0 ? ` (${activeFiltersCount})` : ''}</Text>
          </button>
        </div>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '10px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <Text size={12} weight="600" color="#374151" style={{ marginBottom: '6px' }}>Department</Text>
            <select value={filterDept ?? ''} onChange={e => setFilterDept(e.target.value ? Number(e.target.value) : null)}
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #E2E8F0', fontSize: '13px', outline: 'none', backgroundColor: 'white', minWidth: '160px' }}>
              <option value="">All Departments</option>
              {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div>
            <Text size={12} weight="600" color="#374151" style={{ marginBottom: '6px' }}>Role</Text>
            <select value={filterRole ?? ''} onChange={e => setFilterRole(e.target.value ? Number(e.target.value) : null)}
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #E2E8F0', fontSize: '13px', outline: 'none', backgroundColor: 'white', minWidth: '140px' }}>
              <option value="">All Roles</option>
              {roles.map(r => <option key={r.id} value={r.id}>{r.name.replace('ROLE_', '')}</option>)}
            </select>
          </div>
          <div>
            <Text size={12} weight="600" color="#374151" style={{ marginBottom: '6px' }}>Status</Text>
            <select value={filterStatus === null ? '' : String(filterStatus)} onChange={e => setFilterStatus(e.target.value === '' ? null : e.target.value === 'true')}
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #E2E8F0', fontSize: '13px', outline: 'none', backgroundColor: 'white', minWidth: '120px' }}>
              <option value="">All Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          {activeFiltersCount > 0 && (
            <button onClick={() => { setFilterDept(null); setFilterRole(null); setFilterStatus(null); }}
              style={{ padding: '8px 14px', backgroundColor: 'white', border: '1.5px solid #E2E8F0', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', color: '#EF4444', fontWeight: '600' }}>
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* Stats row */}
      {pageData && (
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          {[
            { label: 'Total Users', value: pageData.totalElements, color: '#3B82F6', bg: '#EFF6FF' },
            { label: 'Active', value: pageData.content.filter(e => e.isActive).length, color: '#16A34A', bg: '#F0FDF4' },
            { label: 'Inactive', value: pageData.content.filter(e => !e.isActive).length, color: '#DC2626', bg: '#FEF2F2' },
          ].map(stat => (
            <div key={stat.label} style={{ padding: '12px 20px', backgroundColor: stat.bg, borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <Text size={20} weight="700" color={stat.color}>{stat.value}</Text>
              <Text size={12} color={stat.color}>{stat.label}</Text>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      {isLoading && !pageData ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Text size={14} color="#6B7280">Loading users...</Text>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 6px' }}>
            <thead>
              <tr>
                {['EMPLOYEE', 'DEPARTMENT', 'ROLE', 'STATUS', 'JOINED', 'ACTIONS'].map(h => (
                  <th key={h} style={{ padding: '8px 14px', textAlign: 'left' }}>
                    <Text size={11} weight="700" color="#94A3B8" letterSpacing="0.06em">{h}</Text>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(pageData?.content ?? []).length === 0 ? (
                <tr><td colSpan={6} style={{ padding: '48px', textAlign: 'center' }}>
                  <Text size={14} color="#9CA3AF">No users found</Text>
                </td></tr>
              ) : (pageData?.content ?? []).map(emp => (
                <tr key={emp.id} style={{ backgroundColor: '#F8FAFC' }}>
                  <td style={{ padding: '14px', borderRadius: '10px 0 0 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: AppColors.shades.primary[6], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Text size={14} weight="700" color={AppColors.primary}>{(emp.firstName?.[0] ?? '?')}{(emp.lastName?.[0] ?? '')}</Text>
                      </div>
                      <div>
                        <Text size={14} weight="600" color="#0F172A">{emp.firstName} {emp.lastName}</Text>
                        <Text size={12} color="#94A3B8">{emp.employeeCode} · {emp.email}</Text>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px' }}>
                    <Text size={13} color="#334155">{emp.department || '—'}</Text>
                  </td>
                  <td style={{ padding: '14px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: '6px', backgroundColor: '#F1F5F9', fontSize: '12px', fontWeight: '600', color: '#475569' }}>
                      {emp.role?.replace('ROLE_', '') || 'EMPLOYEE'}
                    </span>
                  </td>
                  <td style={{ padding: '14px' }}>
                    <button onClick={() => handleToggleStatus(emp)} title="Toggle status"
                      style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '6px', backgroundColor: emp.isActive ? '#F0FDF4' : '#FEF2F2', border: 'none', cursor: 'pointer' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: emp.isActive ? '#22C55E' : '#EF4444' }} />
                      <Text size={12} weight="600" color={emp.isActive ? '#166534' : '#991B1B'}>{emp.isActive ? 'Active' : 'Inactive'}</Text>
                    </button>
                  </td>
                  <td style={{ padding: '14px' }}>
                    <Text size={12} color="#64748B">{emp.dateOfJoining ?? '—'}</Text>
                  </td>
                  <td style={{ padding: '14px', borderRadius: '0 10px 10px 0' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button title="Edit" onClick={() => openEdit(emp)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', padding: '4px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4L18.5 2.5z"/></svg>
                      </button>
                      <button title="Delete" onClick={() => setDeleteTarget(emp)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', padding: '4px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {pageData && pageData.totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '20px', borderTop: `1px solid ${AppColors.divider}` }}>
          <Text size={13} color="#64748B">
            Showing {pageData.pageNumber * pageData.pageSize + 1}–{Math.min((pageData.pageNumber + 1) * pageData.pageSize, pageData.totalElements)} of {pageData.totalElements} users
          </Text>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button onClick={() => setCurrentPage(p => Math.max(0, p - 1))} disabled={currentPage === 0}
              style={{ padding: '7px 14px', backgroundColor: 'white', border: '1.5px solid #E2E8F0', borderRadius: '8px', cursor: currentPage === 0 ? 'not-allowed' : 'pointer', opacity: currentPage === 0 ? 0.5 : 1, fontSize: '13px', fontWeight: '600' }}>
              ← Prev
            </button>
            {[...Array(Math.min(pageData.totalPages, 7))].map((_, i) => (
              <button key={i} onClick={() => setCurrentPage(i)}
                style={{ width: '36px', height: '36px', backgroundColor: currentPage === i ? AppColors.primary : 'white', border: currentPage === i ? 'none' : '1.5px solid #E2E8F0', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: currentPage === i ? 'white' : '#4B5563' }}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage(p => Math.min(pageData.totalPages - 1, p + 1))} disabled={pageData.last}
              style={{ padding: '7px 14px', backgroundColor: 'white', border: '1.5px solid #E2E8F0', borderRadius: '8px', cursor: pageData.last ? 'not-allowed' : 'pointer', opacity: pageData.last ? 0.5 : 1, fontSize: '13px', fontWeight: '600' }}>
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {modalOpen && (
        <UserFormModal
          employee={editEmployee}
          departments={departments}
          roles={roles}
          onClose={() => { setModalOpen(false); setEditEmployee(null); }}
          onSubmit={handleFormSubmit}
        />
      )}
      {deleteTarget && (
        <DeleteConfirmModal
          name={`${deleteTarget.firstName} ${deleteTarget.lastName}`}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}

      {/* Toast */}
      {toastMsg && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', backgroundColor: '#1E293B', color: 'white', padding: '12px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: '500', zIndex: 9999, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
          {toastMsg}
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;
