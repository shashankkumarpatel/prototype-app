import parse from 'html-react-parser';
import React, { MutableRefObject } from 'react';

import { Purpose, Size } from '@spglobal/koi-helpers';
import { TRASH } from '@spglobal/koi-icons';
import {
  Button,
  Icon,
  Tile,
  TileFrontGradientFade,
  TileHover,
  TileVariant,
} from '@spglobal/react-components';

import { ITemplateData } from './ManageDashboard';

import {
  CardWrapper,
  CustomTileActionButtonWrapper,
  CustomTileDeleteButtonWrapper,
  CustomTileDescriptionHoverWrapper,
  CustomTileDescriptionWrapper,
  CustomTileNameHoverWrapper,
  CustomTileNameWrapper,
  CustomTileTypeWrapper,
  CustomTileWrapper,
} from '../styles/dashboardDesign.styles';

export interface ICardView {
  viewList: ITemplateData[];
  cardElementRef: MutableRefObject<any>;
  handleRemoveTemplate: (id: number) => void;
  handleOpenButton: (templateData: ITemplateData) => void;
}

const CardViewContainer = (props: ICardView) => {
  const { viewList, cardElementRef, handleRemoveTemplate, handleOpenButton } = props;
  return (
    <CardWrapper ref={cardElementRef}>
      {viewList.map((viewData, index) => {
        return (
          <CustomTileWrapper key={index}>
            <Tile
              style={{
                height: 295,
                width: 295,
                background: `linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.8) 80%), url(${viewData.imageUrl}) black 50% / cover no-repeat`,
              }}
              variant={TileVariant.HOVER}
            >
              <TileFrontGradientFade>
                <CustomTileTypeWrapper>
                  <span>{viewData.type}</span>
                </CustomTileTypeWrapper>
                <CustomTileNameWrapper>
                  <span>{viewData.name && parse(viewData.name)}</span>
                </CustomTileNameWrapper>
                <CustomTileDescriptionWrapper>
                  <span>{viewData.description && parse(viewData.description)}</span>
                </CustomTileDescriptionWrapper>
              </TileFrontGradientFade>
              <TileHover>
                <CustomTileNameHoverWrapper>
                  <span>{viewData.name && parse(viewData.name)}</span>
                </CustomTileNameHoverWrapper>
                <CustomTileDescriptionHoverWrapper>
                  <span>{viewData.description && parse(viewData.description)}</span>
                </CustomTileDescriptionHoverWrapper>
                <CustomTileDeleteButtonWrapper>
                  <Button
                    purpose={Purpose.NONE}
                    leftIcon={<Icon icon={TRASH} />}
                    onClick={() => {
                      handleRemoveTemplate(viewData.id);
                    }}
                  >
                    Delete
                  </Button>
                </CustomTileDeleteButtonWrapper>
                <CustomTileActionButtonWrapper>
                  <Button
                    size={Size.LARGE}
                    purpose={Purpose.SECONDARY}
                    onClick={() => handleOpenButton(viewData)}
                  >
                    Open
                  </Button>
                </CustomTileActionButtonWrapper>
              </TileHover>
            </Tile>
          </CustomTileWrapper>
        );
      })}
    </CardWrapper>
  );
};

export default CardViewContainer;
