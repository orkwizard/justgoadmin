/* eslint-disable no-unused-vars */
import { memo } from 'react';
import NotificationPanel from '../../shared-components/notificationPanel/NotificationPanel';
import QuickPanel from '../../shared-components/quickPanel/QuickPanel';

const RightSideLayout1 = props => {
  return (
    <>
      <QuickPanel />

      <NotificationPanel />
    </>
  );
};

export default memo(RightSideLayout1);
