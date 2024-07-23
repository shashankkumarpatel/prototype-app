import React, { FC } from 'react';
import {
  Button,
  H1,
  Tile,
  TileFrontGradientFade,
  TileHover,
  TileVariant,
} from '@spglobal/react-components';
import { Purpose, Size } from '@spglobal/koi-helpers';
import { PrototypesArray } from './utils/data';
import { useNavigate } from 'react-router-dom';
import {
  CardWrapper,
  CustomTileActionButtonWrapper,
  CustomTileDescriptionHoverWrapper,
  CustomTileDescriptionWrapper,
  CustomTileNameHoverWrapper,
  CustomTileNameWrapper,
  CustomTileWrapper,
  HeaderWrapper,
  LandingPageWrapper,
} from './styles/landing.styles';
import { GeneralLayout } from '../../layouts';

const LandingPage: FC = () => {
  const navigate = useNavigate();

  return (
    <GeneralLayout>
      <div style={{ minHeight: 'calc(100vh - 133px)' }}>
        <div className="spg-layout__body">
          <div className="spg-layout__main">
            <main className="spg-layout__content">
              <LandingPageWrapper>
                <HeaderWrapper>
                  <H1>Prototypes</H1>
                </HeaderWrapper>
                <CardWrapper>
                  {PrototypesArray.map((prototype, index) => {
                    return (
                      <CustomTileWrapper key={index}>
                        <Tile
                          style={{
                            background: `linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.8) 80%), url(${prototype.imageUrl}) black 50% / cover no-repeat`,
                          }}
                          variant={TileVariant.HOVER}
                        >
                          <TileFrontGradientFade>
                            <CustomTileNameWrapper>
                              <span>{prototype.title}</span>
                            </CustomTileNameWrapper>
                            <CustomTileDescriptionWrapper>
                              <span>{prototype.description}</span>
                            </CustomTileDescriptionWrapper>
                          </TileFrontGradientFade>
                          <TileHover>
                            <CustomTileNameHoverWrapper>
                              <span>{prototype.title}</span>
                            </CustomTileNameHoverWrapper>
                            <CustomTileDescriptionHoverWrapper>
                              <span>{prototype.description}</span>
                            </CustomTileDescriptionHoverWrapper>
                            <CustomTileActionButtonWrapper>
                              <Button
                                size={Size.LARGE}
                                purpose={Purpose.SECONDARY}
                                onClick={() => navigate(prototype.redirectionLink)}
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
              </LandingPageWrapper>
            </main>
          </div>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default LandingPage;
