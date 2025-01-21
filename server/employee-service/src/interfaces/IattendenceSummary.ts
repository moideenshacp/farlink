export interface IattendanceSummary{
    date: string | Date | null
    checkIn: string;
    checkOut: string;
    status: 'present' | 'absent' | 'late' | 'halfDay' | 'onLeave';
}