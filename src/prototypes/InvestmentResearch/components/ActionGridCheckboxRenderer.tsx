import { ICellRendererParams } from '@ag-grid-community/core';
import React, { useEffect } from 'react';

import { DISPLAYNAME_PREFIX } from '@spglobal/koi-helpers';

import { GridCheckbox } from '../styles/gridTable.styles';

interface IActionGridCheckboxRendererProps {
  checked: boolean;
  eGridHeader?: HTMLElement;
  onCheckboxClick: (props: ICellRendererParams) => void;
}

export const ActionGridCheckboxRenderer = (
  props: ICellRendererParams & IActionGridCheckboxRendererProps
) => {
  const { node, checked, eGridHeader, onCheckboxClick } = props;

  useEffect(() => {
    if (!eGridHeader) return;

    eGridHeader.onkeydown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.stopPropagation();
        handleCheckboxClick();
      }
    };
  }, [eGridHeader]);

  const handleCheckboxClick = (): void => {
    onCheckboxClick?.(props);
  };

  return <GridCheckbox checked={node?.isSelected() || checked} onClick={handleCheckboxClick} />;
};

ActionGridCheckboxRenderer.displayName = `${DISPLAYNAME_PREFIX}.ActionGridCheckboxRenderer`;
