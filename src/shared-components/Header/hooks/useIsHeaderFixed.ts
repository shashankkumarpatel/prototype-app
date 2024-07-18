/* eslint-disable deprecation/deprecation */
import * as React from 'react';

export const useIsHeaderFixed = (isStatic: boolean): boolean => {
  const [isHeaderFixed, setIsHeaderFixed] = React.useState(false);
  const setFixedOnScroll = () => setIsHeaderFixed(window.pageYOffset > 0);

  React.useEffect(() => {
    // Set header fixed on scroll start
    if (isStatic) {
      setIsHeaderFixed(false);
    } else {
      setIsHeaderFixed(window.pageYOffset > 0);
      window.addEventListener('scroll', setFixedOnScroll, { passive: true });
    }
    return () => {
      window.removeEventListener('scroll', setFixedOnScroll);
    };
  }, [isStatic]);

  return isHeaderFixed;
};
