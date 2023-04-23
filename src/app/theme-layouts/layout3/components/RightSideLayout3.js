import { memo } from 'react';
import NotificationPanel from '../../shared-components/notificationPanel/NotificationPanel';
import QuickPanel from '../../shared-components/quickPanel/QuickPanel';

const RightSideLayout3 = () => {
  return (
    <>
      <QuickPanel />

      <NotificationPanel />
    </>
  );
};

export default memo(RightSideLayout3);
