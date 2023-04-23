import { lazy } from 'react';

const Destinations = lazy(() => import('./destinations'));
const Destination = lazy(() => import('./destination'));

const appsConfigs = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'destinations',
      element: <Destinations />,
    },
    {
      path: 'destinations/:destinationId/*',
      element: <Destination />,
    },
  ],
};

export default appsConfigs;
