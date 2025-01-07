export interface IattendenceSummary{
        date: string;
        checkIn: string;
        checkOut: string;
        status: 'present' | 'absent' | 'late' | 'halfDay' | 'onLeave';
}