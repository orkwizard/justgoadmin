import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import {
  Checkbox,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  TableCell,
  TableHead,
  TableRow,
  lighten,
} from '@mui/material';
import { Box } from '@mui/system';
import useCountries from 'app/hooks/useCountries';
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
];

const CountriesTableHead = ({
  selectedCountryIds,
  rowCount,
  onSelectAllClick,
  onMenuItemClick,
}) => {
  const { t } = useTranslation('countriesApp');
  const { removeCountries } = useCountries();

  const [selectedCountriesMenu, setSelectedCountriesMenu] = useState(null);
  const numSelected = selectedCountryIds.length;

  const openSelectedCountriesMenu = evt => {
    setSelectedCountriesMenu(evt.currentTarget);
  };

  const closeSelectedCountriesMenu = () => {
    setSelectedCountriesMenu(null);
  };

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        <TableCell
          sx={{
            backgroundColor: theme =>
              lighten(
                theme.palette.background.default,
                theme.palette.mode === 'light' ? 0.4 : 0.02
              ),
          }}
          padding="none"
          className="w-40 md:w-64 text-center z-99"
        >
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount !== 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            disabled
          />

          {numSelected > 0 && (
            <Box
              className="flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 border-b-1"
              sx={{ background: theme => theme.palette.background.default }}
            >
              <IconButton
                aria-owns={selectedCountriesMenu ? 'selectedCountriesMenu' : null}
                aria-haspopup="true"
                onClick={openSelectedCountriesMenu}
                size="large"
              >
                <FuseSvgIcon>heroicons-outline:dots-horizontal</FuseSvgIcon>
              </IconButton>

              <Menu
                id="selectedCountriesMenu"
                anchorEl={selectedCountriesMenu}
                open={Boolean(selectedCountriesMenu)}
                onClose={closeSelectedCountriesMenu}
              >
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      removeCountries(selectedCountryIds);
                      onMenuItemClick();
                      closeSelectedCountriesMenu();
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

        {rows.map(
          row => (
            <TableCell
              key={row.id}
              sx={{
                backgroundColor: theme =>
                  lighten(
                    theme.palette.background.default,
                    theme.palette.mode === 'light' ? 0.4 : 0.02
                  ),
              }}
              className="p-4 md:p-16"
              align={row.align}
              padding={row.disablePadding ? 'none' : 'normal'}
            >
              {t(row.label)}
            </TableCell>
          ),
          this
        )}
      </TableRow>
    </TableHead>
  );
};

export default CountriesTableHead;
