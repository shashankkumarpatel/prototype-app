import * as React from 'react';

import { Footer, FooterDisclaimerSection } from '@spglobal/react-components';

import {
  FooterBottomWrapper,
  FooterLinkWrapper,
  FooterTitle,
  FooterWrapper,
} from './styles/footer.styles';

const disclaimerContent = (
  <>
    Usage of this product is governed by the&nbsp;
    <FooterLinkWrapper>SNL Master Subscription Agreement</FooterLinkWrapper>
    &nbsp; or S&P Global Market Intelligence Agreement, as applicable.
    <br />
    <FooterLinkWrapper>Privacy</FooterLinkWrapper>
    &nbsp; and&nbsp;
    <FooterLinkWrapper>Cookie Notice</FooterLinkWrapper>
    &nbsp;
    <FooterLinkWrapper>Terms of Use</FooterLinkWrapper>
    &nbsp;
    <FooterLinkWrapper>Legal Disclaimer</FooterLinkWrapper>
    &nbsp;
    <FooterLinkWrapper>Third Party Disclaimer</FooterLinkWrapper>
    &nbsp;
    <FooterLinkWrapper>Exchange Disclaimer & Notice</FooterLinkWrapper>
    <br />
    Site content and design Copyright © 2020, S&P Global Market Intelligence
  </>
);

const PrototypeFooter: any = () => {
  return (
    <Footer>
      <FooterDisclaimerSection>{disclaimerContent}</FooterDisclaimerSection>
      <FooterWrapper>
        <FooterTitle>
          <span>S&P Global</span>
          <div>Market Intelligence</div>
        </FooterTitle>
        <FooterBottomWrapper>
          S&P Global Market Intelligence, 55 Water Street, New York, NY 10041
          <span>
            <a href="/web/client?auth=inherit#site/allLinks">Site Map</a>
          </span>
        </FooterBottomWrapper>
      </FooterWrapper>
    </Footer>
  );
};

export default PrototypeFooter;
