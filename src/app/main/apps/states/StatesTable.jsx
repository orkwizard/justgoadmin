import FuseLoading from '@fuse/core/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import withRouter from '@fuse/core/withRouter';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import useStates from 'app/hooks/useStates';
import TablePagination from 'app/shared-components/TablePagination';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import StatesTableHead from './StatesTableHead';

const StatesTable = () => {
  const { t } = useTranslation('statesApp');
  const {
    states,
    loading,
    searchText,
    total,
    rowsPerPage,
    page,
    getStates,
    setRowsPerPage,
    setPage,
  } = useStates();

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    getStates();
  }, [getStates, searchText, rowsPerPage, page]);

  useEffect(() => {
    setData(states ?? []);
  }, [states]);

  const handleSelectAllClick = evt => {
    if (evt.target.checked) {
      setSelected(data.map(({ id }) => id));
      return;
    }

    setSelected([]);
  };

  const handleDeselect = () => {
    setSelected([]);
  };

  const handleClick = () => {};

  const handleCheck = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          {t('NO_STATES')}
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <StatesTableHead
            selectedStateIds={selected}
            onSelectAllClick={handleSelectAllClick}
            rowCount={data.length}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {data.map(n => {
              const isSelected = selected.indexOf(n.id) !== -1;
              return (
                <TableRow
                  className="h-72 cursor-pointer"
                  hover
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex={-1}
                  key={n.id}
                  selected={isSelected}
                  onClick={() => handleClick(n)}
                >
                  <TableCell className="w-40 md:w-64 text-center" padding="none">
                    <Checkbox
                      checked={isSelected}
                      onClick={event => event.stopPropagation()}
                      onChange={event => handleCheck(event, n.id)}
                      disabled
                    />
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.code}
                  </TableCell>

                  <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                    {n.name}
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.country.name}
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

export default withRouter(StatesTable);
