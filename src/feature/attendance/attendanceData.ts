export type AttendanceStatus = 'ON TIME' | 'LATE IN' | 'WFH' | 'LEAVE' | 'HOLIDAY' | 'ABSENT';

export interface AttendanceRecord {
  date: string;
  checkIn: string;
  checkOut: string;
  duration: string;
  status: AttendanceStatus;
}

export interface Holiday {
  month: string;
  day: number;
  name: string;
  type: string;
}

export interface ActiveRequest {
  category: string;
  type: string;
  dateRange: string;
  approvalStatus: string;
  color: string;
}

export interface MonthLog {
  month: string;
  year: number;
  records: AttendanceRecord[];
}

export const attendanceLogs: MonthLog[] = [
  {
    month: 'January',
    year: 2024,
    records: [
      { date: 'Jan 18, 2024', checkIn: '08:45 AM', checkOut: '05:32 PM', duration: '8h 47m', status: 'ON TIME' },
      { date: 'Jan 17, 2024', checkIn: '09:12 AM', checkOut: '06:05 PM', duration: '8h 53m', status: 'LATE IN' },
      { date: 'Jan 16, 2024', checkIn: '08:58 AM', checkOut: '05:15 PM', duration: '8h 17m', status: 'ON TIME' },
      { date: 'Jan 15, 2024', checkIn: '--',       checkOut: '--',        duration: '--',     status: 'WFH' },
      { date: 'Jan 14, 2024', checkIn: '08:52 AM', checkOut: '05:40 PM', duration: '8h 48m', status: 'ON TIME' },
      { date: 'Jan 13, 2024', checkIn: '--',       checkOut: '--',        duration: '--',     status: 'HOLIDAY' },
      { date: 'Jan 12, 2024', checkIn: '09:05 AM', checkOut: '05:50 PM', duration: '8h 45m', status: 'ON TIME' },
      { date: 'Jan 11, 2024', checkIn: '08:40 AM', checkOut: '05:20 PM', duration: '8h 40m', status: 'ON TIME' },
      { date: 'Jan 10, 2024', checkIn: '--',       checkOut: '--',        duration: '--',     status: 'LEAVE' },
      { date: 'Jan 09, 2024', checkIn: '09:20 AM', checkOut: '06:10 PM', duration: '8h 50m', status: 'LATE IN' },
      { date: 'Jan 08, 2024', checkIn: '08:55 AM', checkOut: '05:45 PM', duration: '8h 50m', status: 'ON TIME' },
      { date: 'Jan 07, 2024', checkIn: '--',       checkOut: '--',        duration: '--',     status: 'WFH' },
      { date: 'Jan 06, 2024', checkIn: '--',       checkOut: '--',        duration: '--',     status: 'HOLIDAY' },
      { date: 'Jan 05, 2024', checkIn: '08:48 AM', checkOut: '05:30 PM', duration: '8h 42m', status: 'ON TIME' },
      { date: 'Jan 04, 2024', checkIn: '08:50 AM', checkOut: '05:35 PM', duration: '8h 45m', status: 'ON TIME' },
      { date: 'Jan 03, 2024', checkIn: '09:15 AM', checkOut: '06:00 PM', duration: '8h 45m', status: 'LATE IN' },
      { date: 'Jan 02, 2024', checkIn: '08:44 AM', checkOut: '05:28 PM', duration: '8h 44m', status: 'ON TIME' },
      { date: 'Jan 01, 2024', checkIn: '--',       checkOut: '--',        duration: '--',     status: 'HOLIDAY' },
    ],
  },
  {
    month: 'December',
    year: 2023,
    records: [
      { date: 'Dec 29, 2023', checkIn: '08:50 AM', checkOut: '05:40 PM', duration: '8h 50m', status: 'ON TIME' },
      { date: 'Dec 28, 2023', checkIn: '09:10 AM', checkOut: '06:00 PM', duration: '8h 50m', status: 'LATE IN' },
      { date: 'Dec 27, 2023', checkIn: '08:45 AM', checkOut: '05:30 PM', duration: '8h 45m', status: 'ON TIME' },
      { date: 'Dec 26, 2023', checkIn: '--',       checkOut: '--',        duration: '--',     status: 'LEAVE' },
      { date: 'Dec 25, 2023', checkIn: '--',       checkOut: '--',        duration: '--',     status: 'HOLIDAY' },
      { date: 'Dec 24, 2023', checkIn: '--',       checkOut: '--',        duration: '--',     status: 'LEAVE' },
      { date: 'Dec 23, 2023', checkIn: '--',       checkOut: '--',        duration: '--',     status: 'HOLIDAY' },
      { date: 'Dec 22, 2023', checkIn: '08:55 AM', checkOut: '05:45 PM', duration: '8h 50m', status: 'ON TIME' },
      { date: 'Dec 21, 2023', checkIn: '--',       checkOut: '--',        duration: '--',     status: 'WFH' },
      { date: 'Dec 20, 2023', checkIn: '08:42 AM', checkOut: '05:25 PM', duration: '8h 43m', status: 'ON TIME' },
    ],
  },
  {
    month: 'November',
    year: 2023,
    records: [
      { date: 'Nov 30, 2023', checkIn: '08:50 AM', checkOut: '05:40 PM', duration: '8h 50m', status: 'ON TIME' },
      { date: 'Nov 29, 2023', checkIn: '09:05 AM', checkOut: '05:55 PM', duration: '8h 50m', status: 'LATE IN' },
      { date: 'Nov 28, 2023', checkIn: '08:48 AM', checkOut: '05:35 PM', duration: '8h 47m', status: 'ON TIME' },
      { date: 'Nov 27, 2023', checkIn: '--',       checkOut: '--',        duration: '--',     status: 'WFH' },
      { date: 'Nov 26, 2023', checkIn: '--',       checkOut: '--',        duration: '--',     status: 'HOLIDAY' },
      { date: 'Nov 25, 2023', checkIn: '--',       checkOut: '--',        duration: '--',     status: 'HOLIDAY' },
      { date: 'Nov 24, 2023', checkIn: '08:52 AM', checkOut: '05:42 PM', duration: '8h 50m', status: 'ON TIME' },
      { date: 'Nov 23, 2023', checkIn: '09:18 AM', checkOut: '06:08 PM', duration: '8h 50m', status: 'LATE IN' },
      { date: 'Nov 22, 2023', checkIn: '08:46 AM', checkOut: '05:36 PM', duration: '8h 50m', status: 'ON TIME' },
      { date: 'Nov 12, 2023', checkIn: '--',       checkOut: '--',        duration: '--',     status: 'LEAVE' },
    ],
  },
];

export const upcomingHolidays: Holiday[] = [
  { month: 'FEB', day: 10, name: 'Lunar New Year',  type: 'National Holiday' },
  { month: 'MAR', day: 14, name: 'Corporate Day',   type: 'Internal Holiday' },
  { month: 'MAR', day: 29, name: 'Good Friday',     type: 'National Holiday' },
  { month: 'APR', day: 14, name: 'Dr. Ambedkar Jayanti', type: 'National Holiday' },
  { month: 'MAY', day: 1,  name: 'Labour Day',      type: 'National Holiday' },
  { month: 'AUG', day: 15, name: 'Independence Day',type: 'National Holiday' },
  { month: 'OCT', day: 2,  name: 'Gandhi Jayanti',  type: 'National Holiday' },
  { month: 'NOV', day: 1,  name: 'Diwali',          type: 'National Holiday' },
  { month: 'DEC', day: 25, name: 'Christmas',       type: 'National Holiday' },
];

export const activeRequests: ActiveRequest[] = [
  {
    category: 'LEAVE',
    type: 'SICK LEAVE',
    dateRange: 'Jan 22 - Jan 23',
    approvalStatus: 'Pending Approval',
    color: '#F59E0B',
  },
  {
    category: 'WFH',
    type: 'REMOTE DAY',
    dateRange: 'Jan 26',
    approvalStatus: 'Approved by HR',
    color: '#16A34A',
  },
];

export const attendanceStats = {
  attendanceRate: '98.2%',
  attendanceImprovement: '+2.1% improvement',
  leavesRemaining: 14,
  leavesTotal: 20,
  avgCheckIn: '08:54 AM',
  targetCheckIn: '09:00 AM',
  upcomingHoliday: {
    name: 'Lunar New Year',
    dateRange: 'Feb 10th - Feb 12th',
  },
};
