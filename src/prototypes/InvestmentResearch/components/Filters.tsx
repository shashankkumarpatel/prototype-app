import React, { useContext, useState } from 'react';

import { Select } from '@spglobal/koi-select';
import { FormGroup, InputField, Label, Link, NumberRange } from '@spglobal/react-components';

import {
  contributorGroupsOptions,
  languageOptions,
  numberOfPagesOptions,
  productTypeOptions,
  reportTypeOptions,
} from '../utils/helpers';
import { SkeletonContext } from '../index';
import GeographySearchFilter from './GeographySearchFilter';
import IndustrySearchFilter from './IndustrySearchFilter';
import TimeRangeSearchFilter from './TimeRangeSearchFilter';

import {
  ContributorGroupsFooter,
  FilterContainer,
  NumberOfPagesWrapper,
} from '../styles/investmentResearch.styles';

export const InstantFilters = () => {
  const { setInitGridDataLoading, dataLoadingTime } = useContext(SkeletonContext);

  const handleGridDataLoading = () => {
    setInitGridDataLoading(true);
    setTimeout(() => setInitGridDataLoading(false), dataLoadingTime);
  };

  const [contributorGroupsOption, setContributorGroupsOption] = useState([
    contributorGroupsOptions[0],
  ]);

  const handleContributorGroupsChange = (value: any) => {
    setContributorGroupsOption(value);
    handleGridDataLoading();
  };

  return (
    <>
      <FilterContainer>
        <FormGroup>
          <Select
            inFieldLabel={'Contributor Groups:'}
            defaultValue={[contributorGroupsOptions[0]]}
            options={contributorGroupsOptions}
            placeholder={'Select Contributor Groups'}
            values={contributorGroupsOption}
            onChange={handleContributorGroupsChange}
            isControlButtons={false}
            isSearchable={false}
            selectMenuFooter={
              <ContributorGroupsFooter>
                <p>
                  When selecting “All Contributors”, search results will include all contributors
                  irrespective of Research Settings preferences.
                </p>
                <div>
                  <Link>Update Preferences in Research Settings</Link>
                </div>
              </ContributorGroupsFooter>
            }
          />
        </FormGroup>
      </FilterContainer>
      <FilterContainer>
        <FormGroup>
          <TimeRangeSearchFilter />
        </FormGroup>
      </FilterContainer>
      <FilterContainer>
        <FormGroup>
          <IndustrySearchFilter />
        </FormGroup>
      </FilterContainer>
      <FilterContainer>
        <FormGroup>
          <GeographySearchFilter />
        </FormGroup>
      </FilterContainer>
    </>
  );
};

export const MoreFilters = () => {
  const [reportTypeOption, setReportTypeOption] = React.useState([reportTypeOptions[0]]);
  const [languageOption, setLanguageOption] = React.useState([languageOptions[0]]);
  const [productTypeOption, setProductTypeOption] = React.useState([productTypeOptions[0]]);
  const [numberOfPagesOption, setNumberOfPagesOption] = React.useState([numberOfPagesOptions[0]]);

  const handleReportTypeChange = (value: any) => {
    setReportTypeOption(value);
  };

  const handleLanguageChange = (value: any) => {
    setLanguageOption(value);
  };

  const handleProductTypeChange = (value: any) => {
    setProductTypeOption(value);
  };

  const handleNumberOfPagesChange = (value: any) => {
    setNumberOfPagesOption(value);
  };

  return (
    <>
      <FilterContainer>
        <FormGroup>
          <Select
            inFieldLabel={'Report Type:'}
            defaultValue={[reportTypeOptions[0]]}
            options={reportTypeOptions}
            placeholder={'Select Report Type'}
            values={reportTypeOption}
            onChange={handleReportTypeChange}
            isMulti={true}
            isSearchable={true}
            closeOnSelection={false}
            isHighlightSearchMatches={true}
            searchPlaceholder={'Search'}
            isMobileMenu={true}
            autoResize
            showCheckboxes={true}
          />
        </FormGroup>
      </FilterContainer>
      <FilterContainer>
        <FormGroup>
          <Select
            inFieldLabel={'Language:'}
            defaultValue={[languageOptions[0]]}
            options={languageOptions}
            placeholder={'Select Language'}
            values={languageOption}
            onChange={handleLanguageChange}
          />
        </FormGroup>
      </FilterContainer>
      <FilterContainer>
        <FormGroup>
          <Select
            inFieldLabel={'Product Type:'}
            defaultValue={[productTypeOptions[0]]}
            options={productTypeOptions}
            placeholder={'Select Product Type'}
            values={productTypeOption}
            onChange={handleProductTypeChange}
            isMulti={true}
            isSearchable={true}
            closeOnSelection={false}
            isHighlightSearchMatches={true}
            searchPlaceholder={'Search'}
            isMobileMenu={true}
            autoResize
            showCheckboxes={true}
          />
        </FormGroup>
      </FilterContainer>
      <NumberOfPagesWrapper>
        <Label>{'Number of Pages'}</Label>
        <Select
          defaultValue={[numberOfPagesOptions[0]]}
          options={numberOfPagesOptions}
          values={numberOfPagesOption}
          onChange={handleNumberOfPagesChange}
          isMulti={false}
          isSearchable={false}
          closeOnSelection={true}
        />
        {numberOfPagesOption[0].value !== 'Between' ? (
          <InputField placeholder={'Enter Value'}></InputField>
        ) : (
          <NumberRange leftInputPlaceholder={'Min'} rightInputPlaceholder={'To'} />
        )}
      </NumberOfPagesWrapper>
    </>
  );
};
