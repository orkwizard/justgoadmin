import TablePaginationMUI from '@mui/material/TablePagination';
import styled from 'styled-components';

const TablePagination = styled(TablePaginationMUI)`
  &&& {
    & > div > div.MuiInputBase-root.MuiInputBase-colorSecondary > * {
      display: flex;
      align-items: center;
    }
  }
`;

export default TablePagination;
