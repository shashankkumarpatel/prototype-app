import styled from '@emotion/styled';
import { Checkbox, IconButton } from '@spglobal/react-components';
import { Breakpoints } from '@spglobal/tokens';

export const PaginationContainer = styled.div`
  margin-top: var(--size-space-sm);
`;

export const GridCheckbox = styled(Checkbox)`
  @media (max-width: ${Breakpoints.MD}) {
    [data-option-label]::before {
      height: var(--size-height-xxs);
      width: 12px;
      min-width: 12px;
      border-width: 1px;
      border-style: solid;
    }

    [data-option-label]::after {
      left: var(--size-space-xs);
      height: 8px;
      width: 4px;
      border-width: 0 2px 2px 0;
      transform: translateY(calc(-50% - 1px)) rotate(45deg);
    }

    [data-option-input]:hover + label,
    [data-option-input]:focus:hover + label {
      &::before {
        border-width: 1px;
        border-style: solid;
        box-shadow: none;
      }
    }

    [data-option-input][type='checkbox']:checked + label::after {
      content: '';
      position: absolute;
      top: 50%;
      left: var(--size-space-xs);
      height: 8px;
      width: 4px;
      border-style: solid;
      border-width: 0 2px 2px 0;
      border-color: var(--control-option-border-color);
      transform: translateY(calc(-50% - 1px)) rotate(45deg);
      pointer-events: none;
      z-index: 2;
    }
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
