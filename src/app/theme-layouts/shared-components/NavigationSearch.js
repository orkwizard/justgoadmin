import { useSelector } from 'react-redux';
import FuseSearch from '@fuse/core/FuseSearch';
import { selectFlatNavigation } from 'app/store/fuse/navigationSlice';

const NavigationSearch = props => {
  const { variant, className } = props;
  const navigation = useSelector(selectFlatNavigation);

  return <FuseSearch className={className} variant={variant} navigation={navigation} />;
};

export default NavigationSearch;
