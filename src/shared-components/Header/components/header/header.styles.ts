import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { DARK, DISPLAYNAME_PREFIX } from '@spglobal/koi-helpers';
import { Breakpoints } from '@spglobal/tokens';

interface IHeaderProps {
  isYuki?: boolean;
  isUnauthenticated?: boolean;
  isAdditionalContent?: boolean;
  isCustom?: boolean;
  isHeaderFixed?: boolean;
}

const stylesConfig = css`
  --header-bg: var(--color-base-white);
  --header-user-section-icon-hover: var(--color-base-black);
  --header-mobile-border-bottom: 1px solid var(--color-base-gray-20);
  --header-yuki-bg: var(--color-base-white);
  --header-platform-selector-dropdown-item-color: var(--color-base-black);

  .${DARK} & {
    --header-yuki-bg: var(--color-base-gray-80);
    --header-mobile-border-bottom: 0px solid var(--color-base-gray-20);
    --header-user-section-icon-hover: var(--color-base-white);
    --header-platform-selector-dropdown-item-color: var(--color-base-gray-11);
  }
`;

export const headerPlatformSelectorStyles = css`
  display: flex;
  margin-right: var(--size-space-0);
  font-size: var(--size-font-5);
`;

export const headerPlatformSelectorTrigger = css`
  display: flex;
  align-items: center;
  padding: var(--size-space-0);

  [data-icon] {
    margin-left: 7px;
    color: var(--color-base-black);
  }

  [data-button-text] {
    display: flex;
    align-items: center;
    font-size: var(--size-font-5);
    text-transform: none;
  }
`;

export const headerFixed = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-height: var(--size-space-2xl);
`;

export const HeaderUnauthenticatedContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  max-width: 1440px;
  border-bottom: var(--size-space-xs) solid var(--color-base-black);
`;

HeaderUnauthenticatedContainer.displayName = `${DISPLAYNAME_PREFIX}.HeaderUnauthenticatedContainer`;

export const HeaderContainer = styled.header<IHeaderProps>`
  ${stylesConfig};
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background-color: var(--header-bg);
  transition: height var(--duration-slow);
  z-index: var(--scale-z-index-header);

  input {
    &::placeholder {
      font-size: var(--size-font-5);
    }
  }

  @media (max-width: ${Breakpoints.LG}) {
    min-height: 57px;
    border-bottom: var(--header-mobile-border-bottom);
  }

  ${({ isUnauthenticated }) =>
    !isUnauthenticated
      ? css`
          min-height: 70px;
        `
      : css`
          @media (max-width: ${Breakpoints.LG}) {
            padding-bottom: 3px;
            align-items: flex-end;
          }
        `}

  ${({ isCustom }) =>
    isCustom &&
    css`
      & [data-header-user-section] {
        flex: 1;
      }

      @media (max-width: ${Breakpoints.MD}) {
        min-height: 57px;
      }
    `}

  ${({ isAdditionalContent, isHeaderFixed }) =>
    isAdditionalContent &&
    css`
      padding-top: ${isHeaderFixed ? '5px' : '17px'};
      padding-bottom: var(--size-space-xs);

      @media (max-width: ${Breakpoints.LG}) {
        padding-top: 17px;

        & [data-header-logo] {
          padding-left: var(--size-space-md);
        }
      }

      @media (max-width: ${Breakpoints.XS}) and (min-width: ${Breakpoints.LG}) {
        padding-top: 15px;
      }
    `}

  ${({ isYuki, isHeaderFixed }) =>
    isYuki &&
    css`
      background-color: var(--header-yuki-bg);

      & [data-header-logo-text] {
        display: inline-flex;
        font-size: ${isHeaderFixed ? 'var(--size-font-7)' : '21px'};
        color: var(--header-user-section-icon-hover);

        @media (max-width: ${Breakpoints.LG}) {
          font-size: var(--size-font-7);
        }
      }

      & [data-header-logo-sup-text]:after {
        content: 'PRO';
        font-size: ${isHeaderFixed ? '8px' : 'var(--size-font-1)'};

        @media (max-width: ${Breakpoints.LG}) {
          font-size: 8px;
        }
      }

      @media (max-width: ${Breakpoints.MD}) {
        padding: var(--size-space-0);
        padding-left: var(--size-space-md);
      }
    `}

  ${({ isHeaderFixed }) =>
    isHeaderFixed &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      min-height: 32px;

      & [data-header-search-desktop] > [data-input='input-group'] {
        height: var(--size-height-sm);
        background: transparent;
      }

      @media (min-width: ${Breakpoints.LG}) {
        & [data-header-platform-selector-container] {
          font-size: var(--size-font-4);

          [data-button-text] {
            font-size: var(--size-font-4);
          }
        }
      }
    `}

  ${({ isHeaderFixed, isYuki, isUnauthenticated }) =>
    isHeaderFixed &&
    !isYuki &&
    !isUnauthenticated &&
    css`
      & [data-header-logo-text] {
        font-size: 15px;
      }

      & [data-header-logo-text-container] {
        padding-top: var(--size-space-0);
        border-top: var(--size-space-2xs) solid var(--color-base-black);
      }

      & [data-header-platform-selector-conrainer] {
        font-size: var(--size-font-4);

        @media (max-width: ${Breakpoints.LG}) {
          font-size: var(--size-font-6);
        }
      }

      & [data-header-product-name-inner] {
        font-size: var(--size-font-6);
      }
    `}
`;

HeaderContainer.displayName = `${DISPLAYNAME_PREFIX}.HeaderContainer`;

export const HeaderUnauthenticated = styled.div<{ isUnauthenticated?: boolean }>`
  ${({ isUnauthenticated }) =>
    isUnauthenticated &&
    css`
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      max-width: 1440px;
      width: 100%;
      margin: auto;
      padding-top: var(--size-space-0);
      border-bottom: var(--size-space-xs) solid var(--color-base-black);

      @media (max-width: ${Breakpoints.MD}) {
        min-height: 57px;
        margin: var(--size-space-0) var(--size-space-lg);
      }

      @media (max-width: ${Breakpoints.XL}) and (min-width: ${Breakpoints.MD}) {
        max-width: 940px;
      }

      [data-header-logo] {
        display: flex;
        justify-content: flex-start;
        margin-right: var(--size-space-xl);
      }

      [data-header-link-text] {
        font-weight: var(--font-weight-bold);
        text-align: right;
      }

      [data-header-logo-text] {
        font-size: 23px;
        font-weight: var(--font-weight-bold);
        color: var(--color-lib-red-7);
      }

      [data-header-logo-container] {
        margin-left: var(--size-space-0);
      }
    `}
`;
HeaderUnauthenticated.displayName = `${DISPLAYNAME_PREFIX}.HeaderUnauthenticated`;

export const AdditionalSectionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-top: var(--size-space-xs);
  font-size: var(--size-font-2);
  color: var(--color-base-gray-65);
`;

AdditionalSectionContainer.displayName = `${DISPLAYNAME_PREFIX}.AdditionalSectionContainer`;

export const HeaderAdditionalSectionContent = styled.div`
  margin-right: var(--size-space-xl);
  text-align: right;

  @media (max-width: ${Breakpoints.MD}) {
    max-width: 210px;
    margin-right: var(--size-space-md);
  }
`;

HeaderAdditionalSectionContent.displayName = `${DISPLAYNAME_PREFIX}.HeaderAdditionalSectionContent`;

export const HeaderUserSectionWrapper = styled.div`
  display: flex;
  flex: 0.8;
  justify-content: flex-end;
  margin-left: var(--size-space-xl);
`;

HeaderUserSectionWrapper.displayName = `${DISPLAYNAME_PREFIX}.HeaderUserSectionWrapper`;
