import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import withReducer from 'app/store/withReducer';
import reducer from '../store';
import StatesHeader from './StatesHeader';
import StatesTable from './StatesTable';

const States = () => {
  const isMobile = useThemeMediaQuery(theme => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<StatesHeader />}
      content={<StatesTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
};

export default withReducer('justGo', reducer)(States);
