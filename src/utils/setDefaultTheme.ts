import $ from 'jquery';

export const setDefaultTheme = (theme: 'DARK' | 'LIGHT') => {
  theme === 'DARK'
    ? $('body,html').addClass('spg-dark dark-mode dark-mode-global')
    : $('body,html').removeClass('spg-dark dark-mode dark-mode-global');
};
