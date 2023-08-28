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
import useStates from 'app/hooks/useStates';
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
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'NAME',
    sort: true,
  },
  {
    id: 'country.name',
    align: 'left',
    disablePadding: false,
    label: 'COUNTRY',
    sort: true,
  },
];

const StatesTableHead = props => {
  const { t } = useTranslation('statesApp');
  const { removeStates } = useStates();

  const { selectedStateIds } = props;
  const numSelected = selectedStateIds.length;

  const [selectedStatesMenu, setSelectedStatesMenu] = useState(null);

  const openSelectedStatesMenu = event => {
    setSelectedStatesMenu(event.currentTarget);
  };

  const closeSelectedStatesMenu = () => {
    setSelectedStatesMenu(null);
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
            disabled
          />
          {numSelected > 0 && (
            <Box
              className="flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 border-b-1"
              sx={{
                background: theme => theme.palette.background.default,
              }}
            >
              <IconButton
                aria-owns={selectedStatesMenu ? 'selectedStatesMenu' : null}
                aria-haspopup="true"
                onClick={openSelectedStatesMenu}
                size="large"
              >
                <FuseSvgIcon>heroicons-outline:dots-horizontal</FuseSvgIcon>
              </IconButton>
              <Menu
                id="selectedStatesMenu"
                anchorEl={selectedStatesMenu}
                open={Boolean(selectedStatesMenu)}
                onClose={closeSelectedStatesMenu}
              >
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      removeStates(selectedStateIds);
                      props.onMenuItemClick();
                      closeSelectedStatesMenu();
                    }}
                  >
                    <ListItemIcon className="min-w-40">
                      <FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
                    </ListItemIcon>
                    <ListItemText primary={t('REMOVE')} />
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

export default StatesTableHead;
