import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { DISPLAYNAME_PREFIX } from '@spglobal/koi-helpers';
import { Icon, IconButton, iconSizeStyles } from '@spglobal/react-components';
import { Breakpoints } from '@spglobal/tokens';

interface IHeaderSearchSectionProps {
  isLoading?: boolean;
  isFocusInput?: boolean;
  isGlobalSearchStyles?: boolean;
}

const globalHeaderSearch = css`
  flex: none;

  @media (max-width: ${Breakpoints.SM}) {
    flex: none;
    margin-right: var(--size-space-0);
  }

  &:not(&:focus):not(&:focus-within) {
    @media (min-width: ${Breakpoints.SM}) and (max-width: ${Breakpoints.LG}) {
      flex: 0 1 auto;
    }
  }

  [data-header-search-desktop] {
    @media (min-width: ${Breakpoints.SM}) and (max-width: ${Breakpoints.LG}) {
      justify-content: flex-start;
    }
  }

  [data-input='input-group'] {
    height: 30px;
    width: 230px;
    background-color: var(--color-base-gray-65);
    border-color: var(--color-base-gray-65);
    border-radius: var(--size-radius-3);
    box-shadow: none;

    @media (max-width: ${Breakpoints.XS}) {
      display: none;
    }

    @media (min-width: ${Breakpoints.LG}) and (max-width: ${Breakpoints.XL}) {
      width: 130px;
    }

    @media (min-width: ${Breakpoints.SM}) and (max-width: ${Breakpoints.LG}) {
      width: 256px;
    }

    @media (min-width: ${Breakpoints.SM}) and (max-width: ${Breakpoints.MD}) {
      height: 30px;

      [data-icon='search'] {
        margin-left: var(--size-space-sm);
        margin-right: var(--size-space-md);
      }
    }

    &:focus,
    &:focus-within {
      background-color: var(--color-base-gray-65);
      border: 1px solid var(--color-dark-blue-30);
    }

    input {
      background-color: transparent;
      color: var(--color-base-white);

      &:focus {
        background-color: transparent;
      }

      &::placeholder {
        font-style: italic;
        font-size: var(--size-font-4);
        color: var(--color-base-white);
        opacity: 1;
      }
    }

    [data-icon='search'] {
      margin-left: var(--size-space-sm);
      margin-right: var(--size-space-md);
    }
  }
`;

export const HeaderSearchIcon = styled(Icon)`
  ${iconSizeStyles.small};
  margin: var(--size-space-0) var(--size-space-md) var(--size-space-2xs) var(--size-space-sm);
  color: var(--color-base-gray-30);
`;

HeaderSearchIcon.displayName = `${DISPLAYNAME_PREFIX}.HeaderSearchIcon`;

export const HeaderSearchMobileContainer = styled.div<{ isLoading?: boolean }>`
  display: none;

  ${({ isLoading }) =>
    isLoading &&
    css`
      position: relative;
      justify-content: center;
      align-items: center;

      [data-skeleton-wrapper] {
        display: flex;
        justify-content: flex-end;
      }
    `};

  @media (max-width: ${Breakpoints.SM}) {
    display: flex;
  }
`;

HeaderSearchMobileContainer.displayName = `${DISPLAYNAME_PREFIX}.HeaderSearchMobileContainer`;

export const HeaderSearchSection = styled.div<IHeaderSearchSectionProps>`
  display: flex;
  flex: 1;
  align-items: center;
  max-width: 732px;
  overflow: hidden;

  @media (max-width: ${Breakpoints.SM}) {
    flex: initial;
    margin: var(--size-space-0);
    margin-left: auto;
  }

  ${({ isLoading }) =>
    isLoading &&
    css`
      position: relative;
    `}

  ${({ isGlobalSearchStyles }) =>
    isGlobalSearchStyles &&
    css`
      &[data-header-search] {
        ${globalHeaderSearch};
      }
    `}

  ${({ isGlobalSearchStyles, isFocusInput }) =>
    isGlobalSearchStyles &&
    isFocusInput &&
    css`
      &[data-header-search] {
        flex: auto;
        margin-right: var(--size-space-xl);
        transition: 0.5s;

        & ~ [data-top-nav] {
          position: absolute;
          width: calc(100% - 230px);
          margin: var(--size-space-0);
          overflow-x: hidden;
          opacity: 0;

          @media (min-width: ${Breakpoints.XS}) and (max-width: ${Breakpoints.SM}) {
            display: none;
          }

          & [data-top-nav-list] {
            position: absolute;
            overflow-x: hidden;
          }
        }

        [data-input='input-group'] {
          width: 100%;
        }

        @media (min-width: ${Breakpoints.XS}) and (max-width: ${Breakpoints.SM}) {
          flex: none;
        }
      }
    `};

  @media (min-width: ${Breakpoints.MD}) and (max-width: ${Breakpoints.LG}) {
    flex-grow: 2;
  }
`;

HeaderSearchSection.displayName = `${DISPLAYNAME_PREFIX}.HeaderSearchSection`;

export const HeaderSearchDesktop = styled.div`
  width: 100%;

  @media (max-width: ${Breakpoints.SM}) {
    display: none;
  }
`;

HeaderSearchDesktop.displayName = `${DISPLAYNAME_PREFIX}.HeaderSearchDesktop`;

export const HeaderSearchMobileIconButton = styled(IconButton)<{ isGlobalSearchStyles?: boolean }>`
  border: 1px solid transparent;

  [data-icon] svg {
    width: var(--size-icon-xl);
    height: var(--size-icon-xl);
    fill: var(--color-text-primary);
    color: var(--color-text-primary);
  }

  ${({ isGlobalSearchStyles }) =>
    isGlobalSearchStyles &&
    css`
      &:hover:not([disabled]) svg {
        fill: var(--color-base-white);
        color: var(--color-base-white);
      }
    `};
`;

HeaderSearchMobileIconButton.displayName = `${DISPLAYNAME_PREFIX}.HeaderSearchMobileIconButton`;
