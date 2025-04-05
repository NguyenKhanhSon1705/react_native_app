export interface ITableData {
    id: number;
    areaId: number;
    areaName: string;
    nameTable: string;
    isActive: boolean;
    hasHourlyRate: boolean;
    priceOfMinute: number;
}

export interface ITableRequest {
    id: number;
    areaId: number;
    nameTable: string;
    hasHourlyRate?: boolean;
    priceOfMinute?: number;
}