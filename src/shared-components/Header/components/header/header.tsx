import React, { JSX } from 'react';

import { DISPLAYNAME_PREFIX, Shape } from '@spglobal/koi-helpers';
import { ISkeletonConfig, Skeleton } from '@spglobal/react-components';

import { useIsHeaderFixed } from '../../hooks';

import {
  AdditionalSectionContainer,
  HeaderAdditionalSectionContent,
  HeaderContainer,
  HeaderUnauthenticated,
} from './header.styles';

export interface IHeaderProps extends React.ComponentPropsWithoutRef<'header'> {
  isYuki?: boolean;
  isStatic?: boolean;
  isCustom?: boolean;
  isUnauthenticated?: boolean;
  additionalContent?: string | JSX.Element;
  skeletonConfig?: ISkeletonConfig;
}

export const Header: React.FC<IHeaderProps> = ({
  isYuki,
  isStatic,
  isCustom,
  isUnauthenticated,
  additionalContent,
  skeletonConfig = { loading: false, animation: true },
  children,
  ...htmlProps
}) => {
  const isHeaderFixed = useIsHeaderFixed(isStatic);

  const skeletonHeight = isUnauthenticated ? '32px' : '70px';
  const skeletonStyles: React.CSSProperties = isHeaderFixed
    ? { position: 'fixed', top: 0, left: 0, right: 0, height: '32px' }
    : { height: skeletonHeight };

  return (
    <Skeleton
      animation={skeletonConfig.animation}
      loading={skeletonConfig.loading}
      variant={Shape.RECTANGLE}
      style={skeletonStyles}
    >
      <HeaderContainer
        isYuki={isYuki}
        isCustom={isCustom}
        isHeaderFixed={isHeaderFixed}
        isUnauthenticated={isUnauthenticated}
        isAdditionalContent={!!additionalContent}
        data-header-additional-content={!!additionalContent}
        data-header-unauthenticated={isUnauthenticated}
        data-header-yuki={isYuki}
        {...htmlProps}
      >
        {isUnauthenticated ? (
          <HeaderUnauthenticated isUnauthenticated={isUnauthenticated} data-unauthenticated>
            {children}
          </HeaderUnauthenticated>
        ) : (
          children
        )}
        {additionalContent && !isUnauthenticated && !isYuki && (
          <AdditionalSectionContainer>
            <HeaderAdditionalSectionContent>{additionalContent}</HeaderAdditionalSectionContent>
          </AdditionalSectionContainer>
        )}
      </HeaderContainer>
    </Skeleton>
  );
};

Header.displayName = `${DISPLAYNAME_PREFIX}.Header`;
