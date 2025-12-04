export function paginateResponse<T>(
  data: T[],
  totalRecords: number,
  page: number,
  limit: number,
) {
  const totalPages = Math.ceil(totalRecords / limit);
  return {
    status: 'success',
    totalRecords,
    totalPages,
    currentPage: page,
    results: data.length,
    data,
  };
}
