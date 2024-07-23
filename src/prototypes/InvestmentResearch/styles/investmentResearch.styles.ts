import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { DARK } from '@spglobal/koi-helpers';
import { Capsule, Card, CardBody, Link } from '@spglobal/react-components';
import { Breakpoints } from '@spglobal/tokens';

export const SearchBarContainer = styled.div`
  margin-top: var(--size-space-sm);
  display: flex;

  > div {
    display: flex;
    align-items: center;
    height: 46px;
    width: 100%;
    position: relative;

    > [data-icon] {
      position: absolute;
      left: 12px;
      z-index: 1;
    }

    > [role='search'],
    > [data-header-search] {
      height: 100%;
      width: 100%;

      [data-input='input-group'] {
        height: 46px;
        width: 100%;
        padding-left: 36px;
        padding-right: var(--size-space-md);

        input {
          font-size: var(--size-font-5);
        }

        > span {
          margin-right: 5px;
        }
      }
    }
  }
`;

export const SearchContainer = styled.div`
  &:first-child [data-koi-icon='true'] {
    margin: var(----size-space-2xs);
  }

  [data-input='input-group'] {
    [data-capsule='capsule'] {
      button {
        > span > [data-icon] svg {
          background: transparent;
        }
      }
    }
  }
`;

export const SearchRightElement = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 17px;

  > label > label {
    font-size: 14px;
    line-height: 18.9px;
    margin-right: 8px;

    .${DARK} & {
      color: var('--color-base-gray-30');
    }
  }
`;

export const SearchHistoryContainer = styled.div`
  display: flex;
  margin-top: 14px;
  flex: 1;

  > div {
    border: var(--card-border);
  }

  .${DARK} & {
    > div {
      background-color: #2e2e2e !important;
    }
  }
`;

export const TrendingThemes = styled(Card)`
  margin-right: 5px;
  width: 25%;
  padding: 15px;

  > div {
    align-items: center;

    h4 {
      padding: var(--size-space-0);
    }
    > div {
      position: unset;
    }
  }
`;

export const TrendingThemesBody = styled(CardBody)`
  margin-top: 14px;

  > div:nth-of-type(even) {
    background: var(--color-core-gray);
  }

  .${DARK} & {
    > div:nth-of-type(even) {
      background: var(--color-dark-gray-85);
    }
  }

  > div:last-child {
    margin-bottom: var(--size-space-0);
  }
`;

export const TrendingThemeListContainer = styled.div`
  padding: var(--size-space-sm) var(--size-space-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--color-dark-gray-75);
  margin-bottom: 5px;

  div:first-child {
    a {
      font-size: 13px;
      font-weight: var(--font-weight-bold);
      line-height: 19.5px;
    }
    p {
      font-size: var(--size-font-3);
      margin: var(--size-space-0);
      line-height: 18px;
    }
  }
  div:last-child {
    height: 45px;
    width: 100px;
    min-height: 45px;
    min-width: 100px;
    overflow: hidden;

    p {
      text-align: right;
      font-size: var(--size-font-1);
      margin: var(--size-space-0);
      margin-bottom: 3px;
    }

    .${DARK} & {
      p {
        color: var(--color-base-gray-30);
      }
    }

    div {
      &[data-highcharts-chart] {
        margin-left: 10px;
      }
    }
  }
`;

export const SearchHistory = styled(Card)`
  width: 50%;
  padding: 15px;

  > div {
    align-items: center;

    h4 {
      padding: var(--size-space-0);
    }
  }
`;

export const SearchHistoryBody = styled(CardBody)`
  margin-top: var(--size-space-md);
  display: flex;
  flex-wrap: wrap;
  column-gap: 5px;

  > div:nth-of-type(3),
  > div:nth-of-type(4) {
    background: var(--color-core-gray);
  }

  .${DARK} & {
    > div:nth-of-type(3),
    > div:nth-of-type(4) {
      background: var(--color-dark-gray-85);
    }
  }
`;

export const SearchHistoryListContainer = styled.div`
  padding: var(--size-space-sm) var(--size-space-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--color-dark-gray-75);
  margin-bottom: 5px;
  flex-grow: 1;
  width: calc(50% - 3px);

  div:first-child {
    a {
      font-size: var(--size-space-md);
      font-weight: var(--font-weight-bold);
    }
    p {
      font-size: var(--size-font-2);
      margin: var(--size-space-0);
      margin-top: 2px;
      line-height: 13.5px;
    }

    .${DARK} & {
      p {
        color: var(--color-dark-gray-11);
      }
    }
  }
  div:last-child {
    padding-left: 10px;
    border-left: 3px solid;
    min-width: 60px;

    p {
      font-size: var(--size-font-2);
      margin: var(--size-space-0);
      margin-bottom: var(--size-space-xs);
    }
    span {
      font-size: var(--size-font-6);
      font-weight: var(--font-weight-bold);
    }

    .${DARK} & {
      border-left: 3px solid #4a4a4a;

      p {
        color: var(--color-dark-gray-11);
      }
      span {
        color: var(--color-dark-gray-11);
      }
    }
  }
`;

export const FromMyList = styled(Card)`
  margin-left: 5px;
  width: 25%;
  padding: 20px;

  > div {
    align-items: center;

    h4 {
      padding: var(--size-space-0);
    }
  }
`;

export const FromMyListBody = styled(CardBody)`
  margin-top: 15px;

  > div:nth-of-type(even) {
    background: var(--color-core-gray);
  }

  .${DARK} & {
    > div:nth-of-type(even) {
      background: var(--color-dark-gray-85);
    }
  }

  > div:last-child {
    margin-bottom: var(--size-space-0);
  }
`;

export const FromMyListContainer = styled.div`
  padding: 9px var(--size-space-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--color-dark-gray-75);
  margin-bottom: 5px;

  div:first-child {
    a {
      font-size: 13px;
      font-weight: var(--font-weight-bold);
      line-height: 19.5px;
    }
    p {
      font-size: var(--size-font-3);
      line-height: 18px;
      margin: var(--size-space-0);
    }

    .${DARK} & {
      p {
        color: var(--color-dark-gray-11);
      }
    }
  }
  div:last-child {
    padding: var(--size-space-0) 15px;
    border-left: 3px solid;
    min-width: 85px;
    margin-left: 10px;

    p {
      font-size: var(--size-font-2);
      margin: var(--size-space-0);
      margin-bottom: var(--size-space-xs);
      line-height: 13.3px;
    }
    span {
      font-size: var(--size-font-6);
      font-weight: var(--font-weight-bold);
      line-height: 21.28px;
    }

    .${DARK} & {
      border-left: 3px solid #4a4a4a;

      p {
        color: var(--color-dark-gray-11);
      }
      span {
        color: var(--color-dark-gray-11);
      }
    }
  }
`;

export const FilterListContainer = styled.div`
  margin-top: 29px;
  display: flex;
  height: auto;
`;

export const FilterContainer = styled.div`
  margin-right: 10px !important;
  margin-bottom: 0px !important;
  flex-grow: 1;
  max-width: 280px;
`;

export const MoreFilterContainer = styled.div`
  width: 80%;
  position: relative;

  > div > div > div {
    div:last-child {
      margin-right: 0px !important;

      > div > button {
        &[data-button-purpose='minimal'] {
          display: flex;
          flex-direction: row-reverse;

          > [data-icon] {
            margin: var(--size-space-0);
            margin-left: var(--size-space-lg);
            width: var(--size-space-sm);
            height: var(--size-space-sm);

            svg {
              width: var(--size-space-sm);
              height: var(--size-space-sm);
            }
          }
        }
      }
    }
  }

  > div {
    > div:nth-of-type(2) {
      position: absolute;
      z-index: var(--scale-z-index-overlay);
      overflow: visible;
      width: 100%;

      > div {
        display: flex;
      }
    }
  }
`;

export const SaveSearchContainer = styled.div`
  margin-right: 10px;

  button {
    height: var(--size-height-base);
    display: flex;

    > [data-icon] {
      width: var(--size-icon-md);
      height: var(--size-icon-md);

      > svg {
        width: var(--size-icon-md);
        height: var(--size-icon-md);
      }
    }
  }
`;

export const ButtonRowContainer = styled.div``;

export const GridTableContainer = styled.div`
  margin-top: 18px;
  margin-bottom: 140px;
`;

export const PdfRendererWrapper = styled.div`
  button {
    background: var(--color-core-red);
    padding-bottom: 3px;
    color: var(--color-base-white);

    [data-icon] {
      svg {
        color: var(--color-base-white);
        fill: var(--color-base-white);
      }
    }
  }

  .${DARK} & {
    button {
      color: inherit;

      [data-icon] {
        svg {
          color: var(--button-icon-color);
          fill: var(--button-icon-color);
        }
      }
    }
  }
`;

export const LinkRendererWrapper = styled.div``;

export const ToolBarContainer = styled.div`
  display: flex;
  position: relative;
  width: 500px;
`;

export const SearchWithModalHeader = styled.div`
  padding: var(--size-space-xl) var(--size-space-xl) var(--size-space-0) var(--size-space-xl);

  [data-input='input-group'] {
    height: 42px;

    input {
      font-size: var(--size-font-5);
    }
  }

  .${DARK} & {
    background: #373737;
  }
`;

export const SearchWithModalBody = styled.div`
  padding: var(--size-space-md) var(--size-space-0) var(--size-space-0) var(--size-space-xl);
  height: calc(100% - 66px);

  [data-scroll='ds'] {
    height: 100%;
    overflow: hidden;
  }

  [role='tabpanel'] {
    height: calc(100% - 40px);
    overflow-y: scroll;
    position: relative;
    padding-top: var(--size-space-0);
  }

  ul {
    margin-bottom: var(--size-space-md);
    width: calc(100% - 24px);
  }

  li {
    background: transparent;
    border: none;

    [data-tabs-list-link='true']::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: -3px;
      height: var(--tab-list-secondary-border-width);
      background-color: transparent;
      transition: background-color var(--duration-normal) ease;
    }

    &[aria-selected='true'] {
      background: transparent;
      border: none;
      color: var(--color-base-black);

      .${DARK} & {
        color: var(--tab-item-primary-color);
      }

      [data-tabs-list-link='true']::after {
        background-color: var(--color-core-red);
      }
    }

    &:last-child {
      border-right: var(--size-space-0);
      margin-right: var(--size-space-0);
    }
  }

  .${DARK} & {
    background: #373737;
  }
`;

export const TabListDataWrapper = styled.div`
  display: flex;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--color-dark-gray-75);
  margin: 10px var(--size-space-0);
  cursor: pointer;

  &:last-child {
    border: none;
  }
`;

export const ListDataImageWrapper = styled.div`
  display: flex;
  padding: var(--size-space-xs);
  justify-content: center;
  align-items: center;
  border-radius: var(--size-radius-1);
  background: var(--color-base-gray-10);
  height: 40px;
  width: 40px;
  margin-right: var(--size-space-sm);
  align-self: center;

  img {
    height: 33px;
    width: 33px;
  }
`;

export const ListDataTitleWrapper = styled.div`
  width: 50%;
  margin-right: var(--size-space-sm);
  align-self: center;

  p {
    font-size: 13px;
    font-weight: var(--font-weight-bold);
    line-height: 17.55px;
    margin: var(--size-space-0);
  }
  span {
    font-size: var(--size-space-md);
    line-height: 16.2px;
  }

  .${DARK} & {
    p {
      color: var(--color-dark-gray-11);
    }
    span {
      color: var(--color-base-gray-30);
    }
  }
`;

export const ListDataCategoryWrapper = styled.div`
  width: 50%;
  text-align: right;
  margin-right: 16px;

  p {
    font-size: var(--size-font-2);
    line-height: 11.5px;
    text-transform: uppercase;
    margin: var(--size-space-0);
    margin-top: 6px;
  }

  .${DARK} & {
    color: var(--color-base-gray-30);
  }
`;

export const NoDataFoundWrapper = styled.div`
  p {
    font-size: 13px;
    font-weight: var(--font-weight-bold);
    line-height: 17.55px;
    margin: var(--size-space-0);
  }

  .${DARK} & {
    color: var(--color-dark-gray-11);
  }
`;

export const TabLoadingBar = styled.div`
  height: 28px;
  background-color: var(--color-core-gray);
  display: flex;
  justify-content: center;
  margin-right: var(--size-space-xl);

  .${DARK} & {
    background-color: var(--color-base-gray-65);
  }
`;

export const ThemeListSkeletonWapper = styled.div`
  [data-skeleton='true'] {
    height: 62px !important;
    top: 0px !important;
    width: 100% !important;
    position: relative;
    margin-bottom: 5px;

    &:last-child {
      margin-bottom: 0px;
    }
  }
`;

export const GridTableSkeletonWapper = styled.div`
  [data-skeleton='true'] {
    height: 850px !important;
    top: 0px !important;
    width: 100% !important;
    position: relative;
    margin-bottom: 5px;
  }
`;

export const TooltipListWrap = styled.div`
  margin: calc(var(--size-space-md) * -1);
  padding: 0;
  max-height: 400px;
  overflow: auto;
  [data-capsule='capsule'] {
    display: flex;
    justify-content: space-between;
    border-radius: 0;
    background: no-repeat;
    border: none !important;
    align-items: center;
    flex-direction: row-reverse;
    padding: var(--size-space-sm) !important;
    border-bottom: 1px solid var(--color-border-primary) !important;
  }
`;

export const FilterCapsuleStyle = styled(Capsule)<{ isBlue?: boolean; removeIcon?: boolean }>`
  ${({ isBlue }) =>
    isBlue &&
    css`
      background: var(--color-base-blue-gray-10);
      border-color: var(--color-base-blue-gray-10);

      .${DARK} & {
        background: var(--color-dark-blue-70);
        border-color: var(--color-dark-blue-70);
      }
    `};

  ${({ removeIcon }) =>
    removeIcon &&
    css`
      button[aria-label='close'] {
        display: none;
      }
    `};
`;

export const FooterLinkWrapper = styled(Link)`
  color: var(--footer-color);
  text-decoration: underline;

  &:hover {
    color: var(--footer-color);
  }
`;

export const ContributorGroupsFooter = styled.div`
  p {
    font-size: 10px;
    line-height: 11.5px;
    margin: 8px 12px 8px 11px;

    .${DARK} & {
      color: var(--color-base-gray-11);
    }
  }

  div {
    margin: 0px 12px 8px 11px;
    a {
      font-size: 10px;
      line-height: 11.5px;
    }
  }
`;

export const MoreFiltersWrapper = styled.div`
  @media (min-width: ${Breakpoints.MD}) {
    display: flex;
    flex-direction: row;
    flex-flow: row wrap;
  }

  @media (max-width: ${Breakpoints.MD}) {
    padding: var(--size-space-0) var(--size-space-xl);
  }
`;

export const NumberOfPagesWrapper = styled.div`
  display: flex;
  align-items: baseline;

  > label {
    font-size: 11px;
    font-weight: 700;
    line-height: 14.85px;
    margin-right: 10px;
    flex-grow: 1;

    .${DARK} & {
      color: var(--color-base-gray-11);
    }
  }

  > [data-select] {
    flex-grow: 1;
    width: 128px;
    margin-right: 10px;
  }

  > div:last-child {
    flex-grow: 1;
    max-width: 175px;

    &[data-input='input-group'] {
      max-width: 132px;
    }
  }
`;

export const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding-left: var(--size-space-2xl);
`;

export const FooterTitle = styled.div`
  span {
    width: fit-content;
    padding-top: var(--size-space-2xs);
    border-top: var(--footer-logo-border-top);
    font-size: var(--size-font-4);
    font-weight: var(--font-weight-bold);
    color: var(--color-core-red);
    line-height: initial;
  }

  div {
    margin-bottom: var(--size-space-xs);
    font-size: var(--size-font-5);
    font-weight: var(--font-weight-light);
    color: var(--footer-product-name-color);
  }
`;

export const FooterBottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > span > a {
    color: var(--footer-color);
    text-decoration: underline;
  }
`;
