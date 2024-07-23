import styled from '@emotion/styled';
import { DARK } from '@spglobal/koi-helpers';

export const LandingPageWrapper = styled.div`
  width: 50%;
  margin: auto;
`;

export const HeaderWrapper = styled.div`
  margin: 16px 0px;
`;

export const CardWrapper = styled.div`
  display: flex;
  margin: 16px 0px;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 10px;

  > div > div {
    width: 310px;
    height: 310px;
  }
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

export const CustomTileNameWrapper = styled.div`
  color: var(--color-base-white);
  font-size: var(--size-font-9);
  font-weight: var(--font-weight-bold);
  padding: var(--size-space-sm) var(--size-space-0);
  line-height: 27.6px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const CustomTileDescriptionWrapper = styled.div`
  color: var(--color-base-white);
  font-size: var(--size-font-5);
  line-height: 18.9px;
  margin-bottom: 20px;
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
