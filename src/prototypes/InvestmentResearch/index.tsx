import * as React from 'react';
import { useState } from 'react';

import { PageHeader, PageTitle } from '@spglobal/react-components';

import FilterListComponent from './components/FilterListComponent';
import GridTable from './components/GridTable';
import SearchBarComponent from './components/SearchBarComponent';
import SearchHistoryComponent from './components/SearchHistoryComponent';
import NextGenInvestmentResearchToolbar from './components/Toolbar';

import { GridTableContainer } from './styles/investmentResearch.styles';
import { GeneralLayout } from '../../layouts';

export const SkeletonContext = React.createContext<{
  initGridDataLoading: boolean;
  setInitGridDataLoading: any;
  dataLoadingTime: number;
}>({
  initGridDataLoading: false,
  setInitGridDataLoading: () => {
    return;
  },
  dataLoadingTime: 0,
});

const InvestmentResearch: React.FC = () => {
  const [initGridDataLoading, setInitGridDataLoading] = useState<boolean>(true);
  const value = {
    initGridDataLoading,
    setInitGridDataLoading,
    dataLoadingTime: 1000,
  };

  return (
    <SkeletonContext.Provider value={value}>
      <GeneralLayout>
        <div className="spg-layout__main">
          <main className="spg-layout__content spg-mx-8xl spg-my-xl">
            <PageHeader toolbar={NextGenInvestmentResearchToolbar}>
              <PageTitle title="Investment & Market Research" />
            </PageHeader>
            <SearchBarComponent />
            <SearchHistoryComponent />
            <FilterListComponent />
            <GridTableContainer>
              <GridTable />
            </GridTableContainer>
          </main>
        </div>
      </GeneralLayout>
    </SkeletonContext.Provider>
  );
};

export default InvestmentResearch;
