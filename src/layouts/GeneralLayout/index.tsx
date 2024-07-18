import { Size } from '@spglobal/koi-helpers';
import React from 'react';
import $ from 'jquery';
import { PrototypeHeader, PrototypeFooter } from '../../shared-components';

export interface ILayout {
  showHeader?: boolean;
  showFooter?: boolean;
  children?: React.ReactNode | Element[] | undefined;
}

const GeneralLayout = (props: ILayout) => {
  const { showHeader = true, showFooter = true, children } = props;
  const [displayDensity, setDisplayDensity] = React.useState<Size.SMALL | Size.MEDIUM | Size.LARGE>(
    Size.MEDIUM
  );
  const [appearance, setAppearance] = React.useState(false);
  const [fontSize, setFontSize] = React.useState(16);

  return (
    <>
      {showHeader && (
        <PrototypeHeader
          appearance={appearance}
          setAppearance={(pre: boolean) => {
            appearance
              ? $('body,html').removeClass('spg-dark dark-mode dark-mode-global')
              : $('body,html').addClass('spg-dark dark-mode dark-mode-global');
            return setAppearance(pre);
          }}
          displayDensity={displayDensity}
          setDisplayDensity={(pre: Size.SMALL | Size.MEDIUM | Size.LARGE) => {
            $('body').attr('displayDensity', pre);
            return setDisplayDensity(pre);
          }}
          fontSize={fontSize}
          setFontSize={(pre: any) => {
            $('html').css('font-size', pre + 'px');
            return setFontSize(pre);
          }}
        />
      )}
      {children}
      {showFooter && <PrototypeFooter />}
    </>
  );
};

export default GeneralLayout;
