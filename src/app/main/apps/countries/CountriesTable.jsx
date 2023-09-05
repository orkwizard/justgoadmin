import FuseLoading from '@fuse/core/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import withRouter from '@fuse/core/withRouter';
import { Checkbox, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import useCountries from 'app/hooks/useCountries';
import TablePagination from 'app/shared-components/TablePagination';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CountriesTableHead from './CountriesTableHead';

const CountriesTable = () => {
  const { t } = useTranslation('countriesApp');
  const {
    loading,
    countries,
    getCountries,
    searchText,
    total,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
  } = useCountries();

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    getCountries();
  }, [getCountries, searchText, rowsPerPage, page]);

  useEffect(() => {
    setData(countries ?? []);
  }, [countries]);

  const handleSelectAllClick = evt => {
    if (evt.target.checked) {
      setSelected(data.map(({ id }) => id));
      return;
    }

    setSelected([]);
  };

  const handleDeselectAllClick = () => {
    setSelected([]);
  };

  const handleClick = () => {};

  const handleCheck = (evt, id) => {
    const newSelected = [...selected];
    const selectedIndex = selected.indexOf(id);

    if (selectedIndex === -1) newSelected.push(id);
    else newSelected.splice(selectedIndex, 1);

    setSelected(newSelected);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );

  if (data.length === 0)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          {t('NO_COUNTRIES')}
        </Typography>
      </motion.div>
    );

  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <CountriesTableHead
            selectedCountryIds={selected}
            rowCount={data.length}
            onSelectAllClick={handleSelectAllClick}
            onMenuItemClick={handleDeselectAllClick}
          />

          <TableBody>
            {data.map(country => {
              const isSelected = selected.indexOf(country.id) !== -1;

              return (
                <TableRow
                  key={country.id}
                  className="h-72 cursor-pointer"
                  hover
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex={-1}
                  selected={isSelected}
                  onClick={() => handleClick(country)}
                >
                  <TableCell className="w-40 md:w-64 text-center" padding="none">
                    <Checkbox
                      checked={isSelected}
                      onClick={evt => evt.stopPropagation()}
                      onChange={evt => handleCheck(evt, country.id)}
                      disabled
                    />
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {country.code}
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {country.name}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className="shrink-0 border-t-1"
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': t('PREVIOUS_PAGE'),
        }}
        nextIconButtonProps={{
          'aria-label': t('NEXT_PAGE'),
        }}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
      />
    </div>
  );
};

export default withRouter(CountriesTable);
