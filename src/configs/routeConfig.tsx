import React, { ReactNode, JSX, lazy } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

const DashboardDesign = lazy(() => import('../prototypes/DashboardDesign'));
const DocIntel = lazy(() => import('../prototypes/DocIntel'));
const InvestmentResearch = lazy(() => import('../prototypes/InvestmentResearch'));
const LandingPage = lazy(() => import('../pages/LandingPage'));

interface IRoute {
  title?: string;
  path?: string;
  element: ReactNode | JSX.Element;
  containParam?: boolean;
  children?: Array<IRoute>;
}

export enum Path {
  Root = '/prototypes',
  DashboardDesign = `/prototypes/dashboard-design`,
  DocIntel = `/prototypes/doc-intel`,
  InvestmentResearch = `/prototypes/investment-research`,
}

export const RouteConfig: React.FC = (props) => {
  const routeConfig: Array<IRoute> = [
    {
      path: '*',
      element: <Navigate replace to={Path.Root} />,
    },
    {
      path: Path.Root,
      element: <LandingPage {...props} />,
    },
    {
      path: Path.DashboardDesign,
      element: <DashboardDesign {...props} />,
    },
    {
      path: Path.DocIntel,
      element: <DocIntel {...props} />,
    },
    {
      path: Path.InvestmentResearch,
      element: <InvestmentResearch {...props} />,
    },
  ];

  return (
    <React.Suspense fallback={<></>}>
      <Routes>
        <Route>
          {routeConfig.map((x, idx) => {
            return <Route key={idx} path={x.path} element={x.element}></Route>;
          })}
        </Route>
      </Routes>
    </React.Suspense>
  );
};
