import React from 'react';

import { DISPLAYNAME_PREFIX, Purpose, Size, generateId } from '@spglobal/koi-helpers';
import { CLEAR, SEARCH } from '@spglobal/koi-icons';
import { ISkeletonConfig, IconButton, InputField, Skeleton } from '@spglobal/react-components';

import {
  HeaderSearchDesktop,
  HeaderSearchIcon,
  HeaderSearchMobileContainer,
  HeaderSearchMobileIconButton,
  HeaderSearchSection,
} from './headerSearch.styles';

export interface IHeaderSearchProps extends React.HTMLAttributes<HTMLInputElement> {
  /** Displays fully styled GlobalHeaderSearch with rounded corners */
  isGlobalSearchStyles?: boolean;
  /** Indicates whether the input is in focus state. Used within GlobalHeader Component */
  isFocusInput?: boolean;
  /** Set Skeleton configuration */
  skeletonConfig?: ISkeletonConfig;
}

export const HeaderSearch = ({
  isGlobalSearchStyles,
  isFocusInput,
  skeletonConfig = { loading: false, animation: true },
  ...htmlProps
}: IHeaderSearchProps): React.ReactElement => {
  const { loading, animation } = skeletonConfig;
  const [searchValue, setSearchValue] = React.useState<string>('');
  const searchRef = React.useRef<HTMLInputElement>(null);
  const clearBtnId = generateId();

  const clearSearch = (isClearField = true): void => {
    if (isClearField) searchRef.current.value = '';

    setSearchValue('');
    searchRef.current.focus();
  };

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value?.length) {
      setSearchValue(e.target.value);
    } else {
      clearSearch(false);
    }
  };

  const handleClearSearch = (): void => {
    clearSearch();
  };

  const leftElement = (
    <div className="spg-dark">
      {searchValue ? (
        <IconButton
          icon={CLEAR}
          size={Size.SMALL}
          purpose={Purpose.NONE}
          id={clearBtnId}
          onClick={handleClearSearch}
        />
      ) : (
        <HeaderSearchIcon icon={SEARCH} disableAutomaticHoverState />
      )}
    </div>
  );

  const globalHeaderInputFieldProps = isGlobalSearchStyles
    ? {
        leftElement,
        onChange: searchHandler,
      }
    : {};

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const relatedTarget = event.relatedTarget as HTMLElement;

    if (!(relatedTarget && relatedTarget.getAttribute('id') === clearBtnId)) {
      htmlProps.onBlur?.(event);
    }
  };

  return (
    <HeaderSearchSection
      isLoading={loading}
      isFocusInput={isFocusInput}
      isGlobalSearchStyles={isGlobalSearchStyles}
      data-header-search
    >
      <HeaderSearchDesktop data-header-search-desktop>
        <Skeleton loading={loading} animation={animation} height="36px">
          <InputField
            ref={searchRef}
            icon={SEARCH}
            componentSize={Size.LARGE}
            isGlobalSearchStyles={isGlobalSearchStyles}
            {...globalHeaderInputFieldProps}
            {...htmlProps}
            onBlur={handleBlur}
          />
        </Skeleton>
      </HeaderSearchDesktop>
      <HeaderSearchMobileContainer isLoading={loading}>
        <HeaderSearchMobileIconButton
          icon={SEARCH}
          size={Size.LARGE}
          skeletonConfig={skeletonConfig}
          isGlobalSearchStyles={isGlobalSearchStyles}
        />
      </HeaderSearchMobileContainer>
    </HeaderSearchSection>
  );
};

HeaderSearch.displayName = `${DISPLAYNAME_PREFIX}.HeaderSearch`;
