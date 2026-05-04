import { useState } from 'react';
import Text from '../../components/Text';
import SizedBox from '../../components/SizedBox';
import { AppColors } from '../../core/colors';

interface Employee {
  id: number; firstName: string; lastName: string; email: string; phone?: string;
  departmentId?: number; roleId?: number; managerId?: number; isActive: boolean;
}
interface Department { id: number; name: string; }
interface Role { id: number; name: string; }

interface Props {
  employee: Employee | null;
  departments: Department[];
  roles: Role[];
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 12px', borderRadius: '8px',
  border: '1.5px solid #E2E8F0', fontSize: '14px', outline: 'none',
  boxSizing: 'border-box', backgroundColor: 'white'
};

const UserFormModal = ({ employee, departments, roles, onClose, onSubmit }: Props) => {
  const isEdit = !!employee;
  const [form, setForm] = useState({
    firstName: employee?.firstName ?? '',
    lastName: employee?.lastName ?? '',
    email: employee?.email ?? '',
    phone: employee?.phone ?? '',
    password: '',
    departmentId: employee?.departmentId ? String(employee.departmentId) : '',
    roleId: employee?.roleId ? String(employee.roleId) : '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const set = (field: string, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = 'Required';
    if (!form.lastName.trim()) errs.lastName = 'Required';
    if (!form.email.trim()) errs.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!isEdit && !form.password.trim()) errs.password = 'Required';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setIsSubmitting(true);
    try {
      const payload: any = {
        firstName: form.firstName, lastName: form.lastName,
        email: form.email, phone: form.phone || undefined,
        departmentId: form.departmentId ? Number(form.departmentId) : undefined,
        roleId: form.roleId ? Number(form.roleId) : undefined,
      };
      if (!isEdit) payload.password = form.password;
      await onSubmit(payload);
    } catch (e: any) {
      setErrors({ submit: e.message || 'Something went wrong' });
    } finally { setIsSubmitting(false); }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '16px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <div style={{ padding: '24px 24px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <Text size={18} weight="700" color="#0F172A">{isEdit ? 'Edit User' : 'Add New User'}</Text>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '4px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '0 24px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <Text size={13} weight="600" color="#374151">First Name *</Text>
              <SizedBox height={6} />
              <input style={{ ...inputStyle, borderColor: errors.firstName ? '#EF4444' : '#E2E8F0' }} value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="John" />
              {errors.firstName && <Text size={11} color="#EF4444">{errors.firstName}</Text>}
            </div>
            <div>
              <Text size={13} weight="600" color="#374151">Last Name *</Text>
              <SizedBox height={6} />
              <input style={{ ...inputStyle, borderColor: errors.lastName ? '#EF4444' : '#E2E8F0' }} value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="Doe" />
              {errors.lastName && <Text size={11} color="#EF4444">{errors.lastName}</Text>}
            </div>
          </div>
          <SizedBox height={16} />
          <div>
            <Text size={13} weight="600" color="#374151">Email *</Text>
            <SizedBox height={6} />
            <input style={{ ...inputStyle, borderColor: errors.email ? '#EF4444' : '#E2E8F0' }} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="john.doe@company.com" />
            {errors.email && <Text size={11} color="#EF4444">{errors.email}</Text>}
          </div>
          <SizedBox height={16} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <Text size={13} weight="600" color="#374151">Phone</Text>
              <SizedBox height={6} />
              <input style={inputStyle} value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+1 234 567 8900" />
            </div>
            {!isEdit && (
              <div>
                <Text size={13} weight="600" color="#374151">Password *</Text>
                <SizedBox height={6} />
                <input style={{ ...inputStyle, borderColor: errors.password ? '#EF4444' : '#E2E8F0' }} type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="••••••••" />
                {errors.password && <Text size={11} color="#EF4444">{errors.password}</Text>}
              </div>
            )}
          </div>
          <SizedBox height={16} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <Text size={13} weight="600" color="#374151">Department</Text>
              <SizedBox height={6} />
              <select style={inputStyle} value={form.departmentId} onChange={e => set('departmentId', e.target.value)}>
                <option value="">Select department</option>
                {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <Text size={13} weight="600" color="#374151">Role</Text>
              <SizedBox height={6} />
              <select style={inputStyle} value={form.roleId} onChange={e => set('roleId', e.target.value)}>
                <option value="">Select role</option>
                {roles.map(r => <option key={r.id} value={r.id}>{r.name.replace('ROLE_', '')}</option>)}
              </select>
            </div>
          </div>

          {errors.submit && (
            <>
              <SizedBox height={12} />
              <div style={{ padding: '10px 14px', backgroundColor: '#FEF2F2', borderRadius: '8px', border: '1px solid #FECACA' }}>
                <Text size={13} color="#DC2626">{errors.submit}</Text>
              </div>
            </>
          )}

          <SizedBox height={24} />
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} style={{ padding: '10px 20px', backgroundColor: 'white', border: '1.5px solid #E2E8F0', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} style={{ padding: '10px 24px', backgroundColor: AppColors.primary, color: 'white', border: 'none', borderRadius: '8px', cursor: isSubmitting ? 'not-allowed' : 'pointer', fontSize: '14px', fontWeight: '600', opacity: isSubmitting ? 0.7 : 1 }}>
              {isSubmitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
