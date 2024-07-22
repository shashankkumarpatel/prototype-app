import { ICellRendererParams } from '@ag-grid-community/core';
import React, { useEffect } from 'react';

import { DISPLAYNAME_PREFIX, Purpose, Size } from '@spglobal/koi-helpers';
import { ACTION } from '@spglobal/koi-icons';
import { Button, DropDown, DropDownGroup, DropDownItem } from '@spglobal/react-components';

import { AgGridActionButton } from '../styles/gridTable.styles';

interface IMultiActionButtonProps extends ICellRendererParams {
  disabled: boolean;
  eGridHeader?: HTMLElement;
  onEditClick: () => void;
}

export const MultiActionButtonRenderer = ({
  disabled,
  eGridHeader,
  onEditClick,
}: IMultiActionButtonProps) => {
  useEffect(() => {
    if (!eGridHeader) return;

    eGridHeader.onkeydown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.stopPropagation();

        const button = (e.target as HTMLElement).querySelector('button');
        button?.click();
      }
    };
  }, [eGridHeader]);

  const triggerElement = (
    <AgGridActionButton
      icon={ACTION}
      size={Size.XSMALL}
      purpose={Purpose.NONE}
      disabled={disabled}
    />
  );

  return (
    <DropDown triggerElement={triggerElement}>
      <DropDownGroup>
        <DropDownItem>
          <Button onClick={onEditClick}>Edit</Button>
        </DropDownItem>
        <DropDownItem>
          <Button>Delete</Button>
        </DropDownItem>
        <DropDownItem>
          <Button>Add to favorite</Button>
        </DropDownItem>
      </DropDownGroup>
    </DropDown>
  );
};

MultiActionButtonRenderer.displayName = `${DISPLAYNAME_PREFIX}.MultiActionButtonRenderer`;
