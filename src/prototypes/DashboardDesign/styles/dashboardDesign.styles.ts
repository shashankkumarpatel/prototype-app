import styled from '@emotion/styled';

import { DARK } from '@spglobal/koi-helpers';
import { IconButton, Modal } from '@spglobal/react-components';
import { Breakpoints } from '@spglobal/tokens';

export const ModalStyled = styled(Modal)`
  display: flex;
  flex-direction: column;
  height: calc(100% - 80px);
`;

export const ManageDashboardModalWrapper = styled.div`
  padding: var(--size-space-0) var(--size-space-2xl);
  height: 100%;

  > [data-header='true'] {
    padding: 26px var(--size-space-0) var(--size-space-lg);
  }
`;

export const ManageDashboardModalInput = styled.div`
  > [data-input='input-group'] {
    height: var(--size-height-lg);

    input {
      font-size: var(--size-font-5);
    }

    > [data-icon] {
      width: var(--size-icon-md);
      height: var(--size-icon-md);

      > svg {
        width: var(--size-icon-md);
        height: var(--size-icon-md);
      }
    }

    > button {
      min-width: var(--size-space-0);
      padding: var(--size-space-0);
    }
  }
`;

export const ChoiceListSectionWrapper = styled.div`
  margin-top: 11px;
  margin-bottom: 14px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  > div:first-child {
    margin: var(--size-space-0);

    [data-capsule='choice-capsule-label'] {
      margin-bottom: var(--size-space-0);
    }
  }
`;

export const SwitchWrapper = styled.div`
  display: flex;

  > span {
    margin-right: var(--size-space-sm);
    cursor: pointer;
  }

  > div {
    cursor: pointer;
    height: var(--size-space-lg);
    width: var(--size-space-lg);
    padding-top: 1.5px;

    > svg {
      height: var(--size-space-lg);
      width: var(--size-space-lg);
    }
  }
`;

export const ListViewWrapper = styled.div`
  height: calc(100% - 180px);

  bm {
    color: var(--color-warning);
  }
`;

export const ListWrapper = styled.div`
  overflow-y: auto;

  .ag-cell-wrapper {
    width: 100%;
  }
`;

export const ListViewFooterWrapper = styled.div`
  display: flex;
  margin-top: 15px;
  margin-bottom: 20px;
  justify-content: right;

  button:first-child {
    margin-right: 18px;
  }
`;

export const ListViewSaveAsWrapper = styled.div`
  margin: 20px var(--size-space-0);
`;

export const ListViewSaveAsActionWrapper = styled.div`
  display: flex;
  margin-top: var(--size-space-lg);
  justify-content: right;

  button:first-child {
    margin-right: 18px;
  }
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: var(--size-space-md);
  row-gap: 10px;
  overflow-y: auto;
  max-height: calc(100% - 180px);
`;

export const CustomTileWrapper = styled.div`
  > div {
    border: 1px solid black;

    &:hover {
      border: none;

      > div {
        border-left-color: var(--color-dark-blue-55);
        border-right-color: var(--color-dark-blue-55);
        border-bottom-color: var(--color-dark-blue-55);
      }
    }
  }

  bm {
    color: var(--color-warning);
  }

  [data-tile-hover] {
    justify-content: unset;
  }

  .${DARK} & {
    > div {
      border-color: var(--color-base-black);
      background: var(--color-dark-gray-80);
    }
  }
`;

export const CustomTileTypeWrapper = styled.div`
  overflow: hidden;
  color: var(--color-lib-gray-4);
  text-align: right;
  text-overflow: ellipsis;
  font-size: var(--size-font-4);
  font-weight: var(--font-weight-bold);
  line-height: 16px;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding-bottom: var(--size-space-lg);
  margin-bottom: 5px;
`;

export const CustomTileNameWrapper = styled.div`
  color: var(--color-base-white);
  font-size: var(--size-font-9);
  font-weight: var(--font-weight-bold);
  padding: var(--size-space-sm) var(--size-space-0);
  line-height: 27.6px;
`;

export const CustomTileDescriptionWrapper = styled.div`
  position: absolute;
  bottom: var(--size-space-0);
  color: var(--color-base-white);
  font-size: var(--size-font-5);
  line-height: 18.9px;
`;

export const CustomTileNameHoverWrapper = styled.div`
  font-size: var(--size-font-9);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--size-space-lg);
  line-height: 27.6px;

  .${DARK} & {
    color: var(--color-base-white);
  }
`;

export const CustomTileDescriptionHoverWrapper = styled.div`
  font-size: var(--size-font-5);
  line-height: 18.9px;
  margin-bottom: var(--size-space-lg);

  .${DARK} & {
    color: var(--color-base-white);
  }
`;

export const CustomTileDeleteButtonWrapper = styled.div`
  margin-bottom: var(--size-space-lg);

  > button {
    padding: var(--size-space-0);
    color: var(--color-lib-red-5);
    font-size: var(--size-font-5);

    &:focus:not([disabled]) {
      border: none;
    }

    [data-icon] {
      color: var(--color-lib-red-5);
    }
  }
`;

export const CustomTileActionButtonWrapper = styled.div`
  position: absolute;
  bottom: var(--size-space-0);
  margin: var(--size-space-lg) var(--size-space-0);
  width: calc(100% - 32px);

  > button {
    width: 100%;
  }

  .${DARK} & {
    > button {
      color: var(--color-base-white);
      background: var(--color-dark-blue-55);
    }
  }
`;

export const DataSkeletonWapper = styled.div`
  height: calc(100% - 180px);

  [data-skeleton='true'] {
    height: 100%;
    top: var(--size-space-0) !important;
    width: 100% !important;
    position: relative;
    margin-bottom: 5px;
  }
`;

export const CardDataSkeletonWapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: var(--size-space-md);
  row-gap: 10px;
  overflow-y: auto;
  max-height: calc(100% - 180px);

  [data-skeleton='true'] {
    height: 295px !important;
    top: var(--size-space-0) !important;
    width: 295px !important;
    position: relative;
    margin-bottom: 5px;
  }
`;

export const AgGridActionButton = styled(IconButton)`
  :not(.action-button-in-details) {
    @media (max-width: ${Breakpoints.MD}) {
      height: var(--size-height-xs);
      padding: var(--size-space-0);
      line-height: var(--scale-line-height-100);

      [data-icon] svg {
        width: var(--size-icon-sm);
        height: var(--size-icon-sm);
      }
    }
  }

  :focus:not([disabled]) {
    border: 0;
  }

  @media (max-width: ${Breakpoints.MD}) {
    padding: var(--size-space-0);
  }
`;

export const ListNameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > span {
    margin: var(--size-space-0) 10px;
    display: flex;
  }
`;

export const DraggableList = styled.div`
  display: flex !important;
  flex-direction: column !important;
  flex-wrap: wrap;
  margin-bottom: var(--size-space-lg);

  button {
    vertical-align: middle;
    border: 1px solid transparent;
    border-radius: var(--size-radius-3);
    font-size: var(--size-font-3);
    background-color: var(--color-core-gray);
    margin-right: var(--size-space-0);
    cursor: pointer;
    user-select: none;
    min-height: var(--size-height-base);
    padding: var(--size-space-0) var(--size-space-md);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-right: var(--size-space-md);
    margin-bottom: var(--size-space-sm);
    width: fit-content;
  }

  .${DARK} & {
    button {
      background: var(--color-base-gray-80);
    }
  }
`;
