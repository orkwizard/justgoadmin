import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import useDestinations from 'app/hooks/useDestinations';
import withReducer from 'app/store/withReducer';
import { useEffect } from 'react';
import reducer from '../store';
import DestinationsHeader from './DestinationsHeader';
import DestinationsTable from './DestinationsTable';

const Destinations = () => {
  const isMobile = useThemeMediaQuery(theme => theme.breakpoints.down('lg'));
  const { resetDestinations } = useDestinations();

  useEffect(() => {
    return () => {
      resetDestinations();
    };
  }, [resetDestinations]);

  return (
    <FusePageCarded
      header={<DestinationsHeader />}
      content={<DestinationsTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
};

export default withReducer('justGo', reducer)(Destinations);
