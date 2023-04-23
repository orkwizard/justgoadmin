import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../store';
import DestinationsHeader from './DestinationsHeader';
import DestinationsTable from './DestinationsTable';

const Destinations = () => {
  const isMobile = useThemeMediaQuery(theme => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<DestinationsHeader />}
      content={<DestinationsTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
};

export default withReducer('justGo', reducer)(Destinations);
