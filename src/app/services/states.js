import instance from './instance';

export const getStates = async ({ searchText, page, rowsPerPage }) => {
  const params = { keyword: `${searchText ?? ''}`.trim(), page, size: rowsPerPage };
  if (!params?.keyword?.length) {
    delete params.keyword;
  }

  // console.log('🚀 ~ states.js', { params });
  const request = instance.get('state', { params });

  const response = await request
    .then(res => {
      // console.log('🚀 ~ states.js', { res });

      return res.data;
    })
    .catch(err => {
      // console.log('🚀 ~ states.js', { err });

      throw err?.response?.data?.developerMessage ?? err.message ?? err;
    });

  return response;
};

export default () => {};
