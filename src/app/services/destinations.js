import instance from './instance';

export const getDestinations = async ({ searchText, page, rowsPerPage } = {}) => {
  const params = { keyword: `${searchText ?? ''}`.trim(), page, size: rowsPerPage };
  if (!params?.keyword?.length) {
    delete params.keyword;
  }

  // console.log('🚀 ~ destinations.js', { params });
  const request = instance.get('destination', { params });

  const response = await request
    .then(res => {
      // console.log('🚀 ~ destinations.js', { res });

      return res.data;
    })
    .catch(err => {
      // console.log('🚀 ~ destinations.js', { err });

      throw err?.response?.data?.developerMessage ?? err.message ?? err;
    });

  return response;
};

export const getDestination = () => {};
