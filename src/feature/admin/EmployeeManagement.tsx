import { useEffect, useState } from 'react';
import Text from '../../components/Text';
import { AppColors } from '../../core/colors';

interface EmployeeSummary {
    id: number;
    employeeCode: string;
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    role: string;
    isActive: boolean;
}

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState<EmployeeSummary[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const token = sessionStorage.getItem('access_token');
                const response = await fetch('http://localhost:8010/api/admin/employees', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (data.success) {
                    setEmployees(data.data);
                }
            } catch (error) {
                console.error('Error fetching employees:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    if (isLoading) {
        return <Text size={16}>Loading employees...</Text>;
    }

    return (
        <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <Text size={20} weight="bold">All Employees</Text>
                <button style={{ 
                    padding: '10px 20px', 
                    backgroundColor: '#2563EB', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}>
                    + Add Employee
                </button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ borderBottom: `1px solid ${AppColors.divider}`, textAlign: 'left' }}>
                        <th style={{ padding: '12px' }}><Text size={14} weight="bold" color="#6B7280">Code</Text></th>
                        <th style={{ padding: '12px' }}><Text size={14} weight="bold" color="#6B7280">Name</Text></th>
                        <th style={{ padding: '12px' }}><Text size={14} weight="bold" color="#6B7280">Email</Text></th>
                        <th style={{ padding: '12px' }}><Text size={14} weight="bold" color="#6B7280">Department</Text></th>
                        <th style={{ padding: '12px' }}><Text size={14} weight="bold" color="#6B7280">Role</Text></th>
                        <th style={{ padding: '12px' }}><Text size={14} weight="bold" color="#6B7280">Status</Text></th>
                        <th style={{ padding: '12px' }}><Text size={14} weight="bold" color="#6B7280">Actions</Text></th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id} style={{ borderBottom: `1px solid ${AppColors.divider}` }}>
                            <td style={{ padding: '12px' }}><Text size={14}>{emp.employeeCode}</Text></td>
                            <td style={{ padding: '12px' }}><Text size={14}>{emp.firstName} {emp.lastName}</Text></td>
                            <td style={{ padding: '12px' }}><Text size={14}>{emp.email}</Text></td>
                            <td style={{ padding: '12px' }}><Text size={14}>{emp.department || 'N/A'}</Text></td>
                            <td style={{ padding: '12px' }}><Text size={14}>{emp.role || 'N/A'}</Text></td>
                            <td style={{ padding: '12px' }}>
                                <span style={{ 
                                    padding: '4px 8px', 
                                    borderRadius: '12px', 
                                    fontSize: '12px',
                                    backgroundColor: emp.isActive ? '#DCFCE7' : '#FEE2E2',
                                    color: emp.isActive ? '#166534' : '#991B1B'
                                }}>
                                    {emp.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </td>
                            <td style={{ padding: '12px' }}>
                                <Text size={14} color="#2563EB" cursor="pointer" weight="bold">Edit</Text>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeManagement;
