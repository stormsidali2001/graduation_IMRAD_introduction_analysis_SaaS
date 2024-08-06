export const getNextPage = ({
  page,
  total_pages,
}: {
  page: number;
  total_pages?: number;
}) => {
  return page < total_pages ? page + 1 : total_pages;
};
export const getPrevPage = ({ page }: { page: number }) => {
  return page - 1 > 1 ? page - 1 : 1;
};
