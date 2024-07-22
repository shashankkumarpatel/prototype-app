import React, { useState } from 'react';

import { Size } from '@spglobal/koi-helpers';
import { CIRCLE_INFO_O, SEARCH } from '@spglobal/koi-icons';
import { Icon, Switch } from '@spglobal/react-components';

import SearchWithModal from './SearchWithModal';

import {
  SearchBarContainer,
  SearchContainer,
  SearchRightElement,
} from '../styles/investmentResearch.styles';

const SearchBarComponent: any = () => {
  const [booleanSearchChecked, setBooleanSearchChecked] = useState(true);

  const handleToggle = () => {
    setBooleanSearchChecked(!booleanSearchChecked);
  };

  return (
    <SearchBarContainer>
      <SearchContainer>
        <Icon size={Size.XLARGE} icon={SEARCH} />
        <SearchWithModal
          placeholder={'Filter by Companies, Contributors, Lists and Indices'}
          tagLimit={10}
          tagOverflowCount={6}
          length={20}
        />
        <SearchRightElement>
          <Switch checked={booleanSearchChecked} onChange={handleToggle} label={`Boolean Search`} />
          <Icon size={Size.XSMALL} icon={CIRCLE_INFO_O} />
        </SearchRightElement>
      </SearchContainer>
    </SearchBarContainer>
  );
};

export default SearchBarComponent;
