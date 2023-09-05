import { lazy } from 'react';

const Destinations = lazy(() => import('./destinations'));
const Destination = lazy(() => import('./destination'));
const States = lazy(() => import('./states'));
const Countries = lazy(() => import('./countries'));

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
    {
      path: 'countries',
      element: <Countries />,
    },
  ],
};

export default appsConfigs;
