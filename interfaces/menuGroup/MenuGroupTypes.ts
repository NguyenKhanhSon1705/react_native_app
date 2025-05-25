export interface IMenuGroupDTO{
    search?: string,
    pageIndex: number ,
    limit: number,
    shopId?: number
}


export interface IMenuGroup {
    id: number;
    shopId?: number;       
    name: string;
    description: string | null;
    image: string;
    order: number | null;
    status: boolean;
  }
  
  export interface IMenuGroupData {
    totalCount: number;
    pageIndex: number;
    pageSize: number;
    items: IMenuGroup[];
  }
