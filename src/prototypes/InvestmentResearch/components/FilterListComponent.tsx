import React, { useContext } from 'react';

import { Size } from '@spglobal/koi-helpers';
import { CARET_DOWN, SAVE } from '@spglobal/koi-icons';
import { Button, ButtonPurpose, ButtonRow, FilterBar, Icon } from '@spglobal/react-components';

import { SkeletonContext } from '../index';
import { InstantFilters, MoreFilters } from './Filters';

import {
  ButtonRowContainer,
  FilterListContainer,
  MoreFilterContainer,
  SaveSearchContainer,
} from '../styles/investmentResearch.styles';

const rightIcon = <Icon size={Size.XXSMALL} icon={CARET_DOWN} />;

const FilterListComponent: any = () => {
  const args = {
    hasRestoreDefaults: false,
    instantFilters: <InstantFilters />,
    moreFilters: <MoreFilters />,
  };

  const { setInitGridDataLoading, dataLoadingTime } = useContext(SkeletonContext);

  const handleGridDataLoading = () => {
    setInitGridDataLoading(true);
    setTimeout(() => setInitGridDataLoading(false), dataLoadingTime);
  };

  const handleApplyFilters = (): void => {
    // Code for Apply Filters
    handleGridDataLoading();
  };

  const handleSaveSearch = (): void => {
    // Code for Save Search
    handleGridDataLoading();
  };

  return (
    <FilterListContainer>
      <MoreFilterContainer>
        <FilterBar
          {...args}
          onApplyFilters={handleApplyFilters}
          overflowMenuFooterText={
            'Changes made to one or more of the filters on this page will be retained.'
          }
        ></FilterBar>
      </MoreFilterContainer>
      <SaveSearchContainer>
        <Button
          purpose={ButtonPurpose.LINK}
          size={Size.MEDIUM}
          onClick={handleSaveSearch}
          leftIcon={<Icon icon={SAVE} size={Size.MEDIUM} />}
        >
          Save Search
        </Button>
      </SaveSearchContainer>
      <ButtonRowContainer>
        <ButtonRow>
          <Button purpose={ButtonPurpose.SECONDARY} size={Size.MEDIUM}>
            Preview
          </Button>
          <Button
            purpose={ButtonPurpose.SECONDARY}
            size={Size.MEDIUM}
            rightIcon={rightIcon}
          >{`Download (0)`}</Button>
          <Button
            purpose={ButtonPurpose.SECONDARY}
            size={Size.MEDIUM}
            rightIcon={rightIcon}
          >{`Print (0)`}</Button>
        </ButtonRow>
      </ButtonRowContainer>
    </FilterListContainer>
  );
};

export default FilterListComponent;
