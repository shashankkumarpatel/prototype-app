import React, { Suspense } from 'react';
import {
  LoadingIndicator,
  LoaderOverlay,
  LoaderPosition,
  LoaderType,
  NotificationProvider,
} from '@spglobal/react-components';
import { BrowserRouter } from 'react-router-dom';
import { RouteConfig } from '../configs/routeConfig';

const DashboardSuspense = () => {
  return (
    <Suspense
      fallback={
        <LoadingIndicator
          type={LoaderType.TOP}
          overlay={LoaderOverlay.BLURRED}
          position={LoaderPosition.FIXED}
        />
      }
    >
      <NotificationProvider>
        <BrowserRouter>
          <RouteConfig />
        </BrowserRouter>
      </NotificationProvider>
    </Suspense>
  );
};

export default DashboardSuspense;
