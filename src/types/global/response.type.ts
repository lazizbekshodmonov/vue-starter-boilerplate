export interface IBaseApiPaginationResponse<T> {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  content: T[];
}
