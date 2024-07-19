import React, { JSX } from 'react';

import { DISPLAYNAME_PREFIX } from '@spglobal/koi-helpers';
import { ISkeletonConfig, Link, Skeleton } from '@spglobal/react-components';

export enum LogoTextType {
  DEFAULT = 'S&P Global',
  CAPITALIQ = 'S&P Capital IQ',
  RATINGS = 'Ratings360',
  PLATTS = 'S&P Platts Dimensions',
}

import {
  HeaderLogoContainer,
  HeaderLogoText,
  HeaderLogoTextContainer,
  HeaderLogoTextSup,
  HeaderLogoWrapper,
} from './headerLogo.styles';

export interface IHeaderLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Specify the logo image source */
  image?: string;
  /** Specify the alt text of logo image */
  alt?: string;
  /** Specify the homepage link while clicking on logo */
  homepageLink?: string;
  customTemplate?: JSX.Element;
  textLogoType?: LogoTextType;
  skeletonConfig?: ISkeletonConfig;
  isYuki?: boolean;
  isCustom?: boolean;
  isUnauthenticated?: boolean;
}

export const HeaderLogo: React.FC<IHeaderLogoProps> = ({
  image,
  alt,
  homepageLink,
  customTemplate,
  textLogoType = LogoTextType.DEFAULT,
  skeletonConfig = { loading: false, animation: true },
  isYuki,
  isCustom,
  isUnauthenticated,
  children,
  ...htmlProps
}) => {
  const { loading, animation } = skeletonConfig;

  return (
    <HeaderLogoWrapper {...htmlProps} isCustom={isCustom} data-header-logo>
      {customTemplate ? (
        customTemplate
      ) : (
        <HeaderLogoContainer isLoading={loading} data-header-logo-container>
          <Skeleton loading={loading} animation={animation} height="36px">
            <HeaderLogoTextContainer
              isYuki={isYuki}
              isCustom={isCustom}
              isUnauthenticated={isUnauthenticated}
              data-header-logo-text-container
            >
              <Link href={homepageLink}>
                {image && <img src={image} alt={alt} data-header-logo-image />}
                {!image && <HeaderLogoText data-header-logo-text>{textLogoType}</HeaderLogoText>}
                {!image && (
                  <HeaderLogoTextSup data-header-logo-sup-text isYuki={isYuki}></HeaderLogoTextSup>
                )}
              </Link>
            </HeaderLogoTextContainer>
            {children}
          </Skeleton>
        </HeaderLogoContainer>
      )}
    </HeaderLogoWrapper>
  );
};

HeaderLogo.displayName = `${DISPLAYNAME_PREFIX}.HeaderLogo`;
