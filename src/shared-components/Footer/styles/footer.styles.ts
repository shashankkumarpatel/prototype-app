import styled from '@emotion/styled';
import { Link } from '@spglobal/react-components';

export const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding-left: var(--size-space-2xl);
`;

export const FooterTitle = styled.div`
  span {
    width: fit-content;
    padding-top: var(--size-space-2xs);
    border-top: var(--footer-logo-border-top);
    font-size: var(--size-font-4);
    font-weight: var(--font-weight-bold);
    color: var(--color-core-red);
    line-height: initial;
  }

  div {
    margin-bottom: var(--size-space-xs);
    font-size: var(--size-font-5);
    font-weight: var(--font-weight-light);
    color: var(--footer-product-name-color);
  }
`;

export const FooterBottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > span > a {
    color: var(--footer-color);
    text-decoration: underline;
  }
`;

export const FooterLinkWrapper = styled(Link)`
  color: var(--footer-color);
  text-decoration: underline;

  &:hover {
    color: var(--footer-color);
  }
`;
