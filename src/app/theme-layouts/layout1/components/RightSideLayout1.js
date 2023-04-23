import { memo } from 'react';
import QuickPanel from '../../shared-components/quickPanel/QuickPanel';
import NotificationPanel from '../../shared-components/notificationPanel/NotificationPanel';

const RightSideLayout1 = props => {
  return (
    <>
      <QuickPanel />

      <NotificationPanel />
    </>
  );
};

export default memo(RightSideLayout1);
