import React from 'react';

import { Purpose, Size } from '@spglobal/koi-helpers';
import { CARET_DOWN } from '@spglobal/koi-icons';
import {
  Button,
  DropDown,
  DropDownGroup,
  DropDownItem,
  Icon,
  Link,
  ToolBar,
  ToolBarItem,
} from '@spglobal/react-components';

import { ToolBarContainer } from '../styles/investmentResearch.styles';

const rightIcon = <Icon size={Size.XXSMALL} icon={CARET_DOWN} />;

const NextGenInvestmentResearchToolbar = (
  <ToolBarContainer>
    <ToolBar>
      <ToolBarItem id="bar1">
        <Button purpose={Purpose.SECONDARY}> Consumption History </Button>
      </ToolBarItem>
      <ToolBarItem id="bar2">
        <Button purpose={Purpose.SECONDARY}> Open Saved Searches </Button>
      </ToolBarItem>
      <ToolBarItem id="bar3">
        <DropDown
          showMobileBackIcon
          triggerElement={
            <Button rightIcon={rightIcon} purpose={Purpose.SECONDARY}>
              Export
            </Button>
          }
        >
          <DropDownGroup>
            <DropDownItem>
              <Link href={'#1'}>Dropdown Item 1</Link>
            </DropDownItem>
            <DropDownItem disabled>
              <Button purpose={Purpose.LINK}>Dropdown Item 2</Button>
            </DropDownItem>
            <DropDownItem>
              <Link href={'#3'}>Dropdown Item 3</Link>
            </DropDownItem>
          </DropDownGroup>
        </DropDown>
      </ToolBarItem>
      <ToolBarItem id="bar4">
        <DropDown
          showMobileBackIcon
          triggerElement={
            <Button rightIcon={rightIcon} purpose={Purpose.SECONDARY}>
              Add to
            </Button>
          }
        >
          <DropDownGroup>
            <DropDownItem>
              <Link href={'#1'}>Dropdown Item 1</Link>
            </DropDownItem>
            <DropDownItem disabled>
              <Button purpose={Purpose.LINK}>Dropdown Item 2</Button>
            </DropDownItem>
            <DropDownItem>
              <Link href={'#3'}>Dropdown Item 3</Link>
            </DropDownItem>
          </DropDownGroup>
        </DropDown>
      </ToolBarItem>
    </ToolBar>
  </ToolBarContainer>
);

export default NextGenInvestmentResearchToolbar;
