import React, { FC } from 'react';
import { Button, Card, CardBody, CardHeader, H1 } from '@spglobal/react-components';
import { Purpose } from '@spglobal/koi-helpers';
import { PrototypesArray } from './utils/data';
import { useNavigate } from 'react-router-dom';
import { CardWrapper, HeaderWrapper } from './styles/landing.styles';
import { GeneralLayout } from '../../layouts';

const LandingPage: FC = () => {
  const navigate = useNavigate();

  return (
    <GeneralLayout>
      <div style={{ minHeight: 'calc(100vh - 133px)' }}>
        <div className="spg-layout__body">
          <div className="spg-layout__main">
            <main className="spg-layout__content">
              <HeaderWrapper>
                <H1>Prototypes</H1>
              </HeaderWrapper>
              <CardWrapper>
                {PrototypesArray.map((prototype, index) => {
                  return (
                    <Card key={index} hasBorder={true}>
                      <CardHeader title={prototype.title} />
                      <CardBody>
                        <p>{prototype.description}</p>
                        <Button
                          purpose={Purpose.PRIMARY}
                          aria-label="Load more"
                          onClick={() => navigate(prototype.redirectionLink)}
                        >
                          More Details
                        </Button>
                      </CardBody>
                    </Card>
                  );
                })}
              </CardWrapper>
            </main>
          </div>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default LandingPage;
