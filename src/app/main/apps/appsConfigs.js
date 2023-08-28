import { lazy } from 'react';

const Destinations = lazy(() => import('./destinations'));
const Destination = lazy(() => import('./destination'));
const States = lazy(() => import('./states'));

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
    {
      path: 'states',
      element: <States />,
    },
  ],
};

export default appsConfigs;
