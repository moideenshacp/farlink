export interface IattendanceSummary{
    date: string;
    checkIn: string;
    checkOut: string;
    status: 'present' | 'absent' | 'late' | 'halfDay' | 'onLeave';
}