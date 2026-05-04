import { useState } from 'react';
import Text from '../../components/Text';
import SizedBox from '../../components/SizedBox';
import { AppColors } from '../../core/colors';
import LeaveCalendar from './LeaveCalendar';
import './Leave.css';

const leaveHistoryData = [
  {
    id: '#L-9821',
    type: 'Casual Leave',
    duration: 'Dec 24 - Dec 26 (3 Days)',
    appliedOn: 'Dec 15, 2023',
    status: 'Approved',
  },
  {
    id: '#L-9742',
    type: 'Sick Leave',
    duration: 'Nov 12 (1 Day)',
    appliedOn: 'Nov 12, 2023',
    status: 'Approved',
  },
  {
    id: '#L-9611',
    type: 'WFH Request',
    duration: 'Oct 28 (1 Day)',
    appliedOn: 'Oct 25, 2023',
    status: 'Rejected',
  },
];

const Leave = () => {
  const [history, setHistory] = useState(leaveHistoryData);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleLeaveSubmit = (selectedDates: Date[], leaveType: string, _reason: string) => {
    // Format dates for display
    const formatDate = (date: Date) => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[date.getMonth()]} ${date.getDate()}`;
    };

    const duration = selectedDates.length === 1 
      ? `${formatDate(selectedDates[0])} (1 Day)`
      : `${formatDate(selectedDates[0])} - ${formatDate(selectedDates[selectedDates.length - 1])} (${selectedDates.length} Days)`;

    const newRequest = {
      id: `#L-${Math.floor(Math.random() * 10000)}`,
      type: leaveType,
      duration,
      appliedOn: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Pending',
    };

    setHistory([newRequest, ...history]);
    setIsCalendarOpen(false);
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const isApproved = status === 'Approved';
    const isPending = status === 'Pending';
    const color = isApproved ? AppColors.success : isPending ? AppColors.warning : AppColors.error;
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div 
          style={{ 
            width: '6px', 
            height: '6px', 
            borderRadius: '50%', 
            backgroundColor: color
          }} 
        />
        <Text size={14} weight="600" color={color}>
          {status}
        </Text>
      </div>
    );
  };

  return (
    <div className="leave-container">
      <LeaveCalendar 
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onSubmit={handleLeaveSubmit}
      />
      {/* Top Card */}
      <div className="leave-card top-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <Text size={28} weight="bold" color={AppColors.text.primary} width="350px">
              Request Leave or Remote Working
            </Text>
            <SizedBox height={16} />
            <Text size={14} color={AppColors.text.secondary} width="400px" height="1.5">
              Submit your request for time off or remote work. All requests are processed within 24 business hours by your department lead.
            </Text>
          </div>
          <button className="raise-request-btn" onClick={() => setIsCalendarOpen(true)}>
            + Raise Request
          </button>
        </div>

        <SizedBox height={40} />

        <div style={{ display: 'flex', gap: '80px' }}>
          <div>
            <Text size={10} weight="600" color={AppColors.text.secondary} letterSpacing={0.5}>
              YOUR LEAD
            </Text>
            <SizedBox height={8} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img 
                src="https://i.pravatar.cc/150?u=sarah" 
                alt="Sarah Jenkins" 
                style={{ width: '32px', height: '32px', borderRadius: '50%' }} 
              />
              <Text size={14} weight="bold" color={AppColors.text.primary}>
                Sarah Jenkins
              </Text>
            </div>
          </div>
          <div>
            <Text size={10} weight="600" color={AppColors.text.secondary} letterSpacing={0.5}>
              POLICY STATUS
            </Text>
            <SizedBox height={8} />
            <Text size={14} weight="bold" color={AppColors.success}>
              Eligible
            </Text>
          </div>
        </div>
      </div>

      <SizedBox height={32} />

      {/* History Table Card */}
      <div className="leave-card history-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 24px 16px 24px' }}>
          <Text size={20} weight="bold" color={AppColors.text.primary}>
            Recent History
          </Text>
          <button className="download-pdf-btn">
            Download PDF
          </button>
        </div>

        <div className="table-container">
          <table className="history-table">
            <thead>
              <tr>
                <th>REQUEST ID</th>
                <th>TYPE</th>
                <th>DURATION</th>
                <th>APPLIED ON</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {history.map((record, index) => (
                <tr key={index}>
                  <td style={{ color: AppColors.text.secondary, fontSize: '13px' }}>{record.id}</td>
                  <td>
                    <Text size={14} weight="bold" color={AppColors.text.primary}>{record.type}</Text>
                  </td>
                  <td style={{ color: '#5C6A81', fontSize: '14px' }}>{record.duration}</td>
                  <td style={{ color: '#5C6A81', fontSize: '14px' }}>{record.appliedOn}</td>
                  <td>
                    <StatusBadge status={record.status} />
                  </td>
                  <td>
                    <Text size={13} weight="bold" color={AppColors.text.primary} cursor="pointer">
                      Details
                    </Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leave;
