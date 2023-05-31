import { MetaData, PaginatedResponse } from '../app/models/pagination'
describe('PaginatedResponse', () => {
    it('should create an instance', () => {
      const metaData: MetaData = {
        currentPage: 1,
        totalPages: 2,
        pageSize: 10,
        totalCount: 20
      };
      const items: any[] = [1, 2, 3];
      const paginatedResponse = new PaginatedResponse(items, metaData);
      expect(paginatedResponse).toBeTruthy();
    });
  
    it('should have the correct properties set', () => {
      const metaData: MetaData = {
        currentPage: 1,
        totalPages: 2,
        pageSize: 10,
        totalCount: 20
      };
      const items: any[] = [1, 2, 3];
      const paginatedResponse = new PaginatedResponse(items, metaData);
      expect(paginatedResponse.items).toEqual(items);
      expect(paginatedResponse.metaData).toEqual(metaData);
    });
  });
  