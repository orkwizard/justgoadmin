import FuseLoading from '@fuse/core/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import withRouter from '@fuse/core/withRouter';
import _ from '@lodash';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  getDestinations,
  selectDestinations,
  selectLoading,
  selectPage,
  selectRowsPerPage,
  selectSearchText,
  selectTotal,
  setPage,
  setRowsPerPage,
} from '../store/destinationsSlice';
import DestinationsTableHead from './DestinationsTableHead';

const DestinationsTable = props => {
  const dispatch = useDispatch();
  const destinations = useSelector(selectDestinations);
  const loading = useSelector(selectLoading);
  const searchText = useSelector(selectSearchText);
  const total = useSelector(selectTotal);
  const rowsPerPage = useSelector(selectRowsPerPage);
  const page = useSelector(selectPage);

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(destinations);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });

  useEffect(() => {
    dispatch(getDestinations());
  }, [dispatch, rowsPerPage]);

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(
        _.filter(destinations, item => item.name.toLowerCase().includes(searchText.toLowerCase()))
      );
      dispatch(setPage(0));
    } else {
      setData(destinations);
    }
  }, [destinations, searchText, dispatch]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';

    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }

    setOrder({
      direction,
      id,
    });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map(n => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    props.navigate(`/destinations/${item.id}/${item.handle}`);
  }

  function handleCheck(event, id) {
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
  }

  const handlePageChange = (event, value) => {
    dispatch(setPage(value));
  };

  const handleRowsPerPageChange = ev => dispatch(setRowsPerPage(ev));

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
          There are no destinations!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <DestinationsTableHead
            selectedDestinyIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {_.orderBy(data, [destination => _.get(destination, order.id, '')], [order.direction])
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(n => {
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
                      />
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.name}
                    </TableCell>

                    <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                      {n.state.name}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.state.country.name}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.modelParseDestination?.name ?? ''}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePaginationStyled
        className="shrink-0 border-t-1"
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
};

const TablePaginationStyled = styled(TablePagination)`
  &&& {
    &
      > div
      > div.MuiInputBase-root.MuiInputBase-colorSecondary.muiltr-khdx6p-MuiInputBase-root-MuiTablePagination-select
      > * {
      display: flex;
      align-items: center;
    }
  }
`;

export default withRouter(DestinationsTable);
