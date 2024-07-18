import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Breakpoints } from '@spglobal/tokens';

import { LogoTextType } from './headerLogo';

export const HeaderLogoWrapper = styled.div<{ isCustom?: boolean }>`
  display: flex;
  justify-content: flex-start;
  margin-right: var(--size-space-xl);

  ${({ isCustom }) =>
    isCustom &&
    css`
      flex: none;
    `}

  a:hover {
    text-decoration: none;
  }

  @media (min-width: ${Breakpoints.SM}) and (max-width: ${Breakpoints.LG}) {
    flex: 1;
    justify-content: initial;
  }
`;

export const HeaderLogoTextContainer = styled.div<{
  image?: boolean;
  isYuki?: boolean;
  isCustom?: boolean;
  isUnauthenticated?: boolean;
}>`
  border-top: var(--size-space-xs) solid var(--color-base-black);

  [data-header-logo-image] {
    width: var(--size-space-9xl);
    height: var(--size-space-9xl);
    margin-right: var(--size-space-0);
    transition: width var(--duration-slow);
  }

  ${({ image }) =>
    !image &&
    css`
      width: fit-content;
      margin-right: var(--size-space-xl);
    `}

  ${({ isCustom }) =>
    isCustom &&
    css`
      @media (max-width: ${Breakpoints.MD}) {
        margin-left: var(--size-space-md);
      }
    `}

  ${({ isYuki }) =>
    isYuki &&
    css`
      padding-top: var(--size-space-2xs);
      margin-right: var(--size-space-0);
      border-top: none;

      [data-link]:focus,
      [data-link]:focus-visible {
        outline: none;
        outline-offset: none;
        text-decoration: none;
      }

      @media (max-width: ${Breakpoints.LG}) {
        border-top: none;
      }
    `}

  ${({ isUnauthenticated }) =>
    isUnauthenticated &&
    css`
      @media (max-width: ${Breakpoints.LG}) {
        border-top: var(--size-space-xs) solid var(--color-base-black);
      }
    `}

  @media (max-width: ${Breakpoints.LG}) {
    border-top: var(--size-space-2xs) solid var(--color-base-black);
  }
`;

export const HeaderLogoContainer = styled.div<{ isLoading?: boolean }>`
  display: flex;
  align-items: center;
  margin-left: var(--size-space-xl);
  transition: all var(--duration-slow);

  @media (max-width: ${Breakpoints.LG}) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: var(--size-space-md);
  }

  ${({ isLoading }) =>
    isLoading &&
    css`
      position: relative;
      display: inline-flex;

      @media (max-width: ${Breakpoints.LG}) {
        flex-direction: row;
        align-items: center;
      }
    `}
`;

export const HeaderLogoText = styled.span`
  display: flex;
  padding-top: var(--size-space-2xs);
  font-size: 27px;
  font-weight: var(--font-weight-bold);
  color: var(--color-lib-red-7);

  @media (max-width: ${Breakpoints.LG}) {
    display: inline-block;
    font-size: 15px;
  }
`;

export const HeaderLogoTextSup = styled.sup<{
  textLogoType?: string;
  isYuki: boolean;
}>`
  ${({ textLogoType }) =>
    textLogoType !== LogoTextType.DEFAULT &&
    css`
      font-size: 27px;
      font-weight: var(--font-weight-bold);
      color: var(--color-lib-red-7);
    `}

  ${({ isYuki }) =>
    isYuki &&
    css`
      &[data-header-logo-sup-text] {
        position: relative;
        top: calc(-1 * var(--size-space-xs));
        left: var(--size-space-2xs);
        padding: var(--size-space-2xs) var(--size-space-xs) var(--size-space-2xs);
        font-size: var(--size-font-1);
        font-weight: 500;
        color: var(--color-base-white);
        background-color: var(--color-lib-red-7);
        text-transform: uppercase;
        cursor: pointer;
      }
    `}

  @media (max-width: ${Breakpoints.LG}) {
    font-size: var(--size-font-5);
  }
`;
