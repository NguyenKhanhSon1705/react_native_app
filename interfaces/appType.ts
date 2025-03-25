export interface IAppResposeBase<T> {
    status: number;
    message?: string;
    data?: T;
    error?: {
      message: string;
      details: string;
    };
    success?: boolean;
  }