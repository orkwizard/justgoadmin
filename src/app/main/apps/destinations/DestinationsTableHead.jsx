import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { lighten } from '@mui/material/styles';
import { Box } from '@mui/system';
import useDestinations from 'app/hooks/useDestinations';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const rows = [
  {
    id: 'code',
    align: 'left',
    disablePadding: false,
    label: 'CODE',
    sort: true,
  },
  {
    id: 'state.name',
    align: 'left',
    disablePadding: false,
    label: 'STATE',
    sort: true,
  },
  {
    id: 'state.country.name',
    align: 'left',
    disablePadding: false,
    label: 'COUNTRY',
    sort: true,
  },
  {
    id: 'modelParseDestination.name',
    align: 'left',
    disablePadding: false,
    label: 'MODEL_PARSER',
    sort: true,
  },
];

const DestinationsTableHead = props => {
  const { t } = useTranslation('destinationsApp');
  const { removeDestinations } = useDestinations();

  const { selectedDestinyIds } = props;
  const numSelected = selectedDestinyIds.length;

  const [selectedDestinationsMenu, setSelectedDestinationsMenu] = useState(null);

  const openSelectedDestinationsMenu = event => {
    setSelectedDestinationsMenu(event.currentTarget);
  };

  const closeSelectedDestinationsMenu = () => {
    setSelectedDestinationsMenu(null);
  };

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
                      removeDestinations(selectedDestinyIds);
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
            >
              {t(row.label)}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
};

export default DestinationsTableHead;
