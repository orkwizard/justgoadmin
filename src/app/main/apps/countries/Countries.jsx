import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded';
import { useThemeMediaQuery } from '@fuse/hooks';
import useCountries from 'app/hooks/useCountries';
import withReducer from 'app/store/withReducer';
import { useEffect } from 'react';
import reducer from '../store';
import CountriesHeader from './CountriesHeader';
import CountriesTable from './CountriesTable';

const Countries = () => {
  const isMobile = useThemeMediaQuery(theme => theme.breakpoints.down('lg'));
  const { resetCountries } = useCountries();

  useEffect(() => {
    return () => {
      resetCountries();
    };
  }, [resetCountries]);

  return (
    <FusePageCarded
      header={<CountriesHeader />}
      content={<CountriesTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
};

export default withReducer('justGo', reducer)(Countries);
