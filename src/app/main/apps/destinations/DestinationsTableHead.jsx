import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import TableHead from '@mui/material/TableHead';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { lighten } from '@mui/material/styles';

const removeDestinations = () => {};

const rows = [
  {
    id: 'code',
    align: 'left',
    disablePadding: false,
    label: 'Code',
    sort: true,
  },
  {
    id: 'state.name',
    align: 'left',
    disablePadding: false,
    label: 'State',
    sort: true,
  },
  {
    id: 'state.country.name',
    align: 'left',
    disablePadding: false,
    label: 'Country',
    sort: true,
  },
  {
    id: 'modelParseDestination.name',
    align: 'left',
    disablePadding: false,
    label: 'Model Parser',
    sort: true,
  },
];

const DestinationsTableHead = props => {
  const { selectedDestinyIds } = props;
  const numSelected = selectedDestinyIds.length;

  const [selectedDestinationsMenu, setSelectedDestinationsMenu] = useState(null);

  const dispatch = useDispatch();

  const createSortHandler = property => event => {
    props.onRequestSort(event, property);
  };

  function openSelectedDestinationsMenu(event) {
    setSelectedDestinationsMenu(event.currentTarget);
  }

  function closeSelectedDestinationsMenu() {
    setSelectedDestinationsMenu(null);
  }

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        <TableCell
          sx={{
            backgroundColor: theme =>
              theme.palette.mode === 'light'
                ? lighten(theme.palette.background.default, 0.4)
                : lighten(theme.palette.background.default, 0.02),
          }}
          padding="none"
          className="w-40 md:w-64 text-center z-99"
        >
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < props.rowCount}
            checked={props.rowCount !== 0 && numSelected === props.rowCount}
            onChange={props.onSelectAllClick}
          />
          {numSelected > 0 && (
            <Box
              className="flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 border-b-1"
              sx={{
                background: theme => theme.palette.background.default,
              }}
            >
              <IconButton
                aria-owns={selectedDestinationsMenu ? 'selectedDestinationsMenu' : null}
                aria-haspopup="true"
                onClick={openSelectedDestinationsMenu}
                size="large"
              >
                <FuseSvgIcon>heroicons-outline:dots-horizontal</FuseSvgIcon>
              </IconButton>
              <Menu
                id="selectedDestinationsMenu"
                anchorEl={selectedDestinationsMenu}
                open={Boolean(selectedDestinationsMenu)}
                onClose={closeSelectedDestinationsMenu}
              >
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      dispatch(removeDestinations(selectedDestinyIds));
                      props.onMenuItemClick();
                      closeSelectedDestinationsMenu();
                    }}
                  >
                    <ListItemIcon className="min-w-40">
                      <FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
                    </ListItemIcon>
                    <ListItemText primary="Remove" />
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          )}
        </TableCell>
        {rows.map(row => {
          return (
            <TableCell
              sx={{
                backgroundColor: theme =>
                  theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="p-4 md:p-16"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'normal'}
              sortDirection={props.order.id === row.id ? props.order.direction : false}
            >
              {row.sort && (
                <Tooltip
                  title="Sort"
                  placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}
                    className="font-semibold"
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
};

export default DestinationsTableHead;
