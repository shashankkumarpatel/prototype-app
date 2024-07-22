import i18next from 'i18next';

import cn from './locales/cn/index.json';
import en from './locales/en/index.json';
import es from './locales/es/index.json';
import jp from './locales/jp/index.json';
import pt from './locales/pt/index.json';

const TopNav = 'topNav';

const nameSpaceArray = [TopNav];

const addBundles = () => {
  nameSpaceArray.forEach((nameSpace) => {
    i18next.addResourceBundle('en', nameSpace, en, true);
    i18next.addResourceBundle('cn', nameSpace, cn, true);
    i18next.addResourceBundle('es', nameSpace, es, true);
    i18next.addResourceBundle('jp', nameSpace, jp, true);
    i18next.addResourceBundle('pt', nameSpace, pt, true);
  });
};

if (i18next.isInitialized) {
  addBundles();
} else {
  i18next.on('initialized', () => {
    addBundles();
  });
}
