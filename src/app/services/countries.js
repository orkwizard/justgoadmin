import instance from './instance';

export const getCountries = async ({ searchText, page, rowsPerPage }) => {
  const params = { keyword: `${searchText ?? ''}`.trim(), page, size: rowsPerPage };
  if (!params?.keyword?.length) {
    delete params.keyword;
  }

  const request = instance.get('country', { params });

  const response = await request
    .then(res => {
      // console.log('🚀 ~ countries.js', { res });

      return res.data;
    })
    .catch(err => {
      // console.log('🚀 ~ countries.js', { err });

      throw err?.response?.data?.developerMessage ?? err.message ?? err;
    });

  return response;
};

export default () => {};
