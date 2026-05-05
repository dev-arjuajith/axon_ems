export const BASE_URL = 'http://localhost:8010/api';

const getAuthHeader = (): HeadersInit => {
  const token = sessionStorage.getItem('access_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const loginApi = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Login failed. Please check your credentials.');
  }

  const result = await response.json();
  // Return data directly if nested
  return result.data || result;
};

export const getProfileApi = async () => {
  const response = await fetch(`${BASE_URL}/profile`, {
    headers: {
      ...getAuthHeader()
    }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Failed to fetch profile');
  }

  return await response.json();
};

export const updateProfileApi = async (data: any) => {
  const response = await fetch(`${BASE_URL}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Failed to update profile');
  }

  return await response.json();
};

// ---- User Management APIs ----

export const getUsersApi = async (params: {
  page?: number; size?: number; sortBy?: string; sortDir?: string;
  search?: string; departmentId?: number | null; roleId?: number | null; isActive?: boolean | null;
}) => {
  const query = new URLSearchParams();
  if (params.page !== undefined) query.set('page', String(params.page));
  if (params.size !== undefined) query.set('size', String(params.size));
  if (params.sortBy) query.set('sortBy', params.sortBy);
  if (params.sortDir) query.set('sortDir', params.sortDir);
  if (params.search) query.set('search', params.search);
  if (params.departmentId != null) query.set('departmentId', String(params.departmentId));
  if (params.roleId != null) query.set('roleId', String(params.roleId));
  if (params.isActive != null) query.set('isActive', String(params.isActive));

  const response = await fetch(`${BASE_URL}/admin/employees?${query}`, {
    headers: { ...getAuthHeader() }
  });
  if (!response.ok) throw new Error('Failed to fetch users');
  return await response.json();
};

export const createUserApi = async (data: any) => {
  const response = await fetch(`${BASE_URL}/admin/employees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result?.message || 'Failed to create user');
  return result;
};

export const updateUserApi = async (id: number, data: any) => {
  const response = await fetch(`${BASE_URL}/admin/employees/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result?.message || 'Failed to update user');
  return result;
};

export const deleteUserApi = async (id: number) => {
  const response = await fetch(`${BASE_URL}/admin/employees/${id}`, {
    method: 'DELETE',
    headers: { ...getAuthHeader() }
  });
  if (!response.ok) throw new Error('Failed to delete user');
  return await response.json();
};

export const toggleUserStatusApi = async (id: number) => {
  const response = await fetch(`${BASE_URL}/admin/employees/${id}/toggle-status`, {
    method: 'PATCH',
    headers: { ...getAuthHeader() }
  });
  if (!response.ok) throw new Error('Failed to toggle user status');
  return await response.json();
};

export const getDepartmentsApi = async () => {
  const response = await fetch(`${BASE_URL}/admin/departments`, {
    headers: { ...getAuthHeader() }
  });
  if (!response.ok) throw new Error('Failed to fetch departments');
  return await response.json();
};

export const getRolesApi = async () => {
  const response = await fetch(`${BASE_URL}/admin/roles`, {
    headers: { ...getAuthHeader() }
  });
  if (!response.ok) throw new Error('Failed to fetch roles');
  return await response.json();
};


// ---- Announcements APIs ----

export const getAnnouncementsApi = async (page = 0, size = 10) => {
  const response = await fetch(`${BASE_URL}/announcements?page=${page}&size=${size}`, {
    headers: { ...getAuthHeader() }
  });
  if (!response.ok) throw new Error('Failed to fetch announcements');
  return await response.json();
};

export const createAnnouncementApi = async (data: any) => {
  const response = await fetch(`${BASE_URL}/admin/announcements`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result?.message || 'Failed to create announcement');
  return result;
};

export const updateAnnouncementApi = async (id: number, data: any) => {
  const response = await fetch(`${BASE_URL}/admin/announcements/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result?.message || 'Failed to update announcement');
  return result;
};

export const deleteAnnouncementApi = async (id: number) => {
  const response = await fetch(`${BASE_URL}/admin/announcements/${id}`, {
    method: 'DELETE',
    headers: { ...getAuthHeader() }
  });
  if (!response.ok) throw new Error('Failed to delete announcement');
  return await response.json();
};

// ---- Roles Management APIs ----

export const getRolesManageApi = async () => {
  const response = await fetch(`${BASE_URL}/admin/roles-manage`, {
    headers: { ...getAuthHeader() }
  });
  if (!response.ok) throw new Error('Failed to fetch roles');
  return await response.json();
};

export const createRoleApi = async (data: any) => {
  const response = await fetch(`${BASE_URL}/admin/roles-manage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result?.message || 'Failed to create role');
  return result;
};

export const updateRoleApi = async (id: number, data: any) => {
  const response = await fetch(`${BASE_URL}/admin/roles-manage/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result?.message || 'Failed to update role');
  return result;
};

export const deleteRoleApi = async (id: number) => {
  const response = await fetch(`${BASE_URL}/admin/roles-manage/${id}`, {
    method: 'DELETE',
    headers: { ...getAuthHeader() }
  });
  if (!response.ok) throw new Error('Failed to delete role');
  return await response.json();
};
