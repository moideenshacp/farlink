/* eslint-disable @typescript-eslint/no-explicit-any */
export const successResponse = (res: any, data: any, message: string = 'Success') => {
    res.status(200).json({ message, data });
  };
  
  export const errorResponse = (res: any, error: any, statusCode: number = 500) => {
    res.status(statusCode).json({ error });
  };
  