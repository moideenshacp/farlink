export interface IattendenceSummary{
        id?:string
        date: string;
        checkIn: string;
        checkOut: string;
        status: 'present' | 'absent' | 'late' | 'halfDay' | 'onLeave';
}