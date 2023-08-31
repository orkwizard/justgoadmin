import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import useStates from 'app/hooks/useStates';
import withReducer from 'app/store/withReducer';
import { useEffect } from 'react';
import reducer from '../store';
import StatesHeader from './StatesHeader';
import StatesTable from './StatesTable';

const States = () => {
  const isMobile = useThemeMediaQuery(theme => theme.breakpoints.down('lg'));
  const { resetStates } = useStates();

  useEffect(() => {
    return () => {
      resetStates();
    };
  }, [resetStates]);

  return (
    <FusePageCarded
      header={<StatesHeader />}
      content={<StatesTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
};

export default withReducer('justGo', reducer)(States);
