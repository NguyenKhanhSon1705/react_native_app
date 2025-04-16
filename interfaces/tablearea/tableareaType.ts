export interface ITableAreaData {
    id: number; // ID của bàn
    areaName: string; // Tên khu vực
    nameTable: string; // Tên bàn
    isActive: boolean; // Trạng thái hoạt động
    isBooking: boolean; // Trạng thái đặt trước
    hasHourlyRate: boolean; // Có tính phí theo giờ hay không
    timeStart: string | null; // Thời gian bắt đầu (ISO string hoặc null)
    timeEnd: string | null; // Thời gian kết thúc (ISO string hoặc null)
    priceOfMinute: number; // Giá mỗi phút
}

// export interface IArea {
//     id: number; // ID của khu vực
//     name: string; // Tên khu vực
//     tables: ITableData[]; // Danh sách các bàn trong khu vực
// }