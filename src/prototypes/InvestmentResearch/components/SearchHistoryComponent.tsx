import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useState } from 'react';

import { ButtonGroup, CardHeader, Link, Skeleton } from '@spglobal/react-components';

import {
  FromMyListArray,
  SearchHistoryList,
  lineOptions,
  trendingThemeList,
  trendingThemeOptions,
} from '../utils/helpers';

import {
  FromMyList,
  FromMyListBody,
  FromMyListContainer,
  NoDataFoundWrapper,
  SearchHistory,
  SearchHistoryBody,
  SearchHistoryContainer,
  SearchHistoryListContainer,
  ThemeListSkeletonWapper,
  TrendingThemeListContainer,
  TrendingThemes,
  TrendingThemesBody,
} from '../styles/investmentResearch.styles';

const SearchHistoryComponent: any = () => {
  const trendingThemeButton = { value: 1, caption: '30 Days' };
  const [trendingThemeOption, setTrendingThemeOption] = useState(trendingThemeButton);
  const [trendingThemeData, setTrendingThemeData] = useState(trendingThemeList);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleButtonChanged = (data: any) => {
    setIsLoading(true);
    setTrendingThemeOption(data);
    const updatedDuration =
      data.value === 1 ? 'Last 30 days' : data.value === 2 ? 'Last 60 days' : 'Last 90 days';
    for (const object of trendingThemeList) {
      object.duration = updatedDuration;
    }
    setTimeout(() => {
      setIsLoading(false);
      setTrendingThemeData(trendingThemeList);
    }, 1000);
  };

  return (
    <SearchHistoryContainer>
      <TrendingThemes>
        <CardHeader
          title={'Trending Themes'}
          extraButtons={
            <ButtonGroup
              isRounded={true}
              options={trendingThemeOptions}
              onChange={handleToggleButtonChanged}
              activeOption={trendingThemeOption}
            />
          }
        />
        <TrendingThemesBody>
          {isLoading ? (
            <ThemeListSkeletonWapper>
              <Skeleton loading={isLoading} count={3} />
            </ThemeListSkeletonWapper>
          ) : trendingThemeData.length > 0 ? (
            trendingThemeData.map((item, index) => (
              <TrendingThemeListContainer key={index}>
                <div>
                  <Link>{item.title}</Link>
                  <p>{item.details}</p>
                </div>
                <div>
                  <p>{item.duration}</p>
                  <HighchartsReact highcharts={Highcharts} options={lineOptions} />
                </div>
              </TrendingThemeListContainer>
            ))
          ) : (
            <NoDataFoundWrapper>
              <p>No Data Found</p>
            </NoDataFoundWrapper>
          )}
        </TrendingThemesBody>
      </TrendingThemes>
      <SearchHistory>
        <CardHeader title={'Search History'} />
        <SearchHistoryBody>
          {SearchHistoryList.length > 0 &&
            SearchHistoryList.map((item, index) => (
              <SearchHistoryListContainer key={index}>
                <div>
                  <Link>{item.title}</Link>
                  <p>{item.duration}</p>
                </div>
                <div>
                  <p>Results</p>
                  <span>{item.results}</span>
                </div>
              </SearchHistoryListContainer>
            ))}
        </SearchHistoryBody>
      </SearchHistory>
      <FromMyList>
        <CardHeader title={'From My Lists'} />
        <FromMyListBody>
          {FromMyListArray.length > 0 &&
            FromMyListArray.map((item, index) => (
              <FromMyListContainer key={index}>
                <div>
                  <Link>{item.title}</Link>
                  <p>{item.duration}</p>
                </div>
                <div>
                  <p>Results</p>
                  <span>{item.results}</span>
                </div>
              </FromMyListContainer>
            ))}
        </FromMyListBody>
      </FromMyList>
    </SearchHistoryContainer>
  );
};

export default SearchHistoryComponent;
