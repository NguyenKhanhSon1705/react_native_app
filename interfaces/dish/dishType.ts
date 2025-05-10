export interface IDish {
    id: number; // ID của món ăn
    dish_Name: string; // Tên món ăn
    unit_Name: string; // Đơn vị tính
    selling_Price: number; // Giá bán
    selling_price_id: number; // ID giá bán
    image: string | null; // URL hình ảnh món ăn (có thể null)
    inventory: number | null; // Số lượng tồn kho (có thể null)
}

export interface IDishData {
    totalCount: number; // Tổng số món ăn
    pageIndex: number; // Chỉ số trang hiện tại
    pageSize: number; // Số lượng món ăn trên mỗi trang
    totalPages: number; // Tổng số trang
    items: IDish[]; // Danh sách món ăn
}

export interface IDishDTO{
    search?: string,
    pageIndex: number ,
    pageSize: number,
    menuGroupId?: number | null,
    shopId?: number
}

export interface IMenuGroupInfo{
    id: number ,
    name: string,
    image?:string
}