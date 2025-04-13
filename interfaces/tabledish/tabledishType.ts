export interface IDish {
    id: number; // ID của món ăn
    dish_Name: string; // Tên món ăn
    selling_Price: number; // Giá bán
    image: string; // URL hình ảnh món ăn
    quantity: number; // Số lượng món ăn
    notes: string; // Ghi chú
    type: string;
}

export interface ITableDishData {
    dish: IDish[]; // Danh sách món ăn
    id: number; // ID của bàn
    areaName: string; // Tên khu vực
    nameTable: string; // Tên bàn
    isActive: boolean; // Trạng thái hoạt động
    isBooking: boolean; // Trạng thái đặt trước
    hasHourlyRate: boolean; // Có tính phí theo giờ hay không
    timeStart: string | null; // Thời gian bắt đầu (ISO string hoặc null)
    timeEnd: string | null; // Thời gian kết thúc (ISO string hoặc null)
    priceOfMunite: number; // Giá mỗi phút
}