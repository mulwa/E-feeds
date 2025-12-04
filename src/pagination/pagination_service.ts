import { Repository, FindOptionsWhere, Like, ObjectLiteral, FindOptionsOrder } from 'typeorm';
import { paginateResponse } from './pagination-response';

export class PaginationService {
  static async paginate<T extends ObjectLiteral>(
    repo: Repository<T>,
    page = 1,
    limit = 10,
    options?: {
      where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
      search?: string;
      searchFields?: (keyof T)[];
      sort?: string; // format: field:asc or field:desc
      relations?: string[];
    },
  ): Promise<any> {
    let where = options?.where || {};

    // Handle search across multiple fields
    if (options?.searchFields && options.search) {
      const search = options.search;
      where = options.searchFields.map(field => ({ [field]: Like(`%${search}%`) }));
    }

    // Handle sorting
    let order: FindOptionsOrder<T> = {};
    if (options?.sort) {
      const [field, dir] = options.sort.split(':');
      // Type assertion ensures TS accepts it
      order = { [field]: (dir?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC') } as FindOptionsOrder<T>;
    }

    const [data, totalRecords] = await repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where,
      order,
      relations: options?.relations,
    });

    return paginateResponse(data, totalRecords, page, limit);
  }
}
