import { IOption } from '@spglobal/koi-select';

const fetchedValues = [
  { value: 'English', label: 'English' },
  { value: 'Japanese', label: 'Japanese' },
  { value: 'Portuguese', label: 'Portuguese' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'Chinese', label: 'Chinese' },
  { value: 'Ukrainian', label: 'Ukrainian' },
  { value: 'Italic', label: 'Italic' },
  { value: 'France', label: 'France' },
  { value: 'Germany', label: 'Germany' },
  { value: 'Poland', label: 'Poland' },
  { value: 'USA', label: 'USA' },
  { value: 'Brazil', label: 'Brazil' },
  { value: 'Iran', label: 'Iran' },
  { value: 'Pakistan', label: 'Pakistan' },
  { value: 'India', label: 'India' },
];

const requestData = (): Promise<IOption[]> => {
  return new Promise((res) => {
    setTimeout(() => {
      res(fetchedValues);
    }, 2000);
  });
};

const defaultArgs = {
  label: 'Search',
  placeholder: 'Basic Search',
  isMulti: false,
  isError: false,
  isTypeAhead: false,
  isCustomFooter: false,
  isStaticView: false,
  isEntitySearch: false,
  isPreventAddingCapsule: false,
  isPreventHighlightingSelectedValues: false,
  isFirstItemDefaultSelected: true,
  isHideResultOnExternalSearch: false,
  isInputRightIconsHidden: false,
  isRetainTextOnFocusOut: false,
  isSpaceAllowedAtBeginning: false,
  isMultipleSpacesAllowed: false,
  isAutoClearSearchQuery: true,
  isDropOpenOnClick: false,
  isDropOpenOnFocus: false,
  hideLoadingControl: false,
  closeMobilePopup: false,
  disabled: false,
  autoMenuWidth: false,
  showCheckboxes: false,
  closeOnSelection: false,
  canEscapeKeyClose: true,
  disableInternalSearch: false,
  showDefaultSearchResults: false,
  externalKeyboardNavigation: false,
  additionalFilter: '',
  maxLength: 200,
  requestDelay: 500,
  tagsLimit: 5,
  searchMinLength: 1,
  limitSearchResults: 1000,
  testRegExp: '/\\s/g',
  externalSearchText: '',
  errorMessage: 'This field is required',
  noSearchResultText: 'No results returned',
  menuListFooter: 'withoutMenuListFooter',
  skeletonConfig: { animation: true, loading: false },
};

const trendingThemeList = [
  {
    title: 'Cloud Native',
    details: '+276 New Documents past 7 days',
    duration: 'Last 30 days',
  },
  {
    title: 'AI / Machine Learning',
    details: '188 New Documents past 7 days',
    duration: 'Last 30 days',
  },
  {
    title: 'Chip Supply',
    details: '+160 Documents past 7 days',
    duration: 'Last 30 days',
  },
];

const SearchHistoryList = [
  {
    title: '“Production Challenges” + AMD + Qualcomm + Asia-Pacific + USA',
    duration: '20 min ago',
    results: '1,203',
  },
  {
    title:
      '“Production Challenges” + Airline Screener List + Passenger Airlines + United States & Canada',
    duration: '5 hrs ago',
    results: '894',
  },
  {
    title: 'InfoTech Screener List + Custom Range:  3/21/22 - 6/8/23',
    duration: '43 min ago',
    results: '42,395',
  },
  {
    title: '“Production Challenges” + Airline Screener List + Custom Range:  3/21/22 - 6/8/23',
    duration: '2 days ago',
    results: '251',
  },
  {
    title: '“Solid State Batteries” + Sector:Energy + Custom Range:  3/21/22 - 6/8/23',
    duration: '1 hour ago',
    results: '12,409',
  },
  {
    title: '“Production Challenges” + Delta Airlines, Inc. ;Air Canada + Passenger Airlines + USA',
    duration: '5 days ago',
    results: '329',
  },
];

const FromMyListArray = [
  {
    title: 'Emerging AI Players',
    duration: 'Past 24 hours',
    results: '34,003',
  },
  {
    title: 'Euro Infosec List',
    duration: 'Past 24 hours',
    results: '1,281',
  },
  {
    title: 'Bain Small Cap',
    duration: 'Past 24 hours',
    results: '513',
  },
];

const contributorGroupsOptions = [
  { value: 'My Contributors', label: 'My Contributors' },
  { value: 'My Analysts', label: 'My Analysts' },
  { value: 'Brokerage', label: 'Brokerage' },
  { value: 'Independent', label: 'Independent' },
  { value: 'Qualitative', label: 'Qualitative' },
  { value: 'S&P Global Contrbutors', label: 'S&P Global Contrbutors' },
];

const reportTypeOptions = [
  { value: 'EPS Estimates', label: 'EPS Estimates' },
  { value: 'Initiation of Coverage', label: 'Initiation of Coverage' },
  { value: 'Ratings Change', label: 'Ratings Change' },
  { value: 'Reporting Results', label: 'Reporting Results' },
  { value: 'Models', label: 'Models' },
  { value: 'Industry Overview', label: 'Industry Overview' },
  { value: 'Technical Analysis', label: 'Technical Analysis' },
  { value: 'Indices', label: 'Indices' },
  { value: 'Equity', label: 'Equity' },
  {
    value: 'Fixed Income',
    label: 'Fixed Income',
    options: [
      {
        value: 'Credit',
        label: 'Credit',
        options: [
          {
            value: 'High Grade',
            label: 'High Grade',
          },
          {
            value: 'High Yield',
            label: 'High Yield',
          },
        ],
      },
      {
        value: 'Rates, Govt, Agencies',
        label: 'Rates, Govt, Agencies',
      },
      {
        value: 'Structured Products, ABS and Mortgages',
        label: 'Structured Products, ABS and Mortgages',
        options: [
          {
            value: 'ABS',
            label: 'ABS',
          },
          {
            value: 'MBS & Mortgages',
            label: 'MBS & Mortgages',
          },
        ],
      },
    ],
  },
  { value: 'Emerging Markets', label: 'Emerging Markets' },
  { value: 'Economics', label: 'Economics' },
  { value: 'Commodities', label: 'Commodities' },
  { value: 'Derivatives', label: 'Derivatives' },
  { value: 'FX/ Currency', label: 'FX/ Currency' },
  { value: 'Strategy', label: 'Strategy' },
  { value: 'Reports', label: 'Reports' },
  { value: 'Notes', label: 'Notes' },
  { value: 'Convertibles', label: 'Convertibles' },
];

const languageOptions = [
  { value: 'English', label: 'English' },
  { value: 'Albanian', label: 'Albanian' },
  { value: 'Amharic', label: 'Amharic' },
  { value: 'Arabic', label: 'Arabic' },
  { value: 'Armenian', label: 'Armenian' },
  { value: 'Azeri', label: 'Azeri' },
  { value: 'Bashkir', label: 'Bashkir' },
  { value: 'Basque', label: 'Basque' },
  { value: 'Bulgarian', label: 'Bulgarian' },
  { value: 'Catalan', label: 'Catalan' },
  { value: 'Chinese', label: 'Chinese' },
  { value: 'Croatian', label: 'Croatian' },
  { value: 'Czech', label: 'Czech' },
  { value: 'Danish', label: 'Danish' },
  { value: 'Dutch', label: 'Dutch' },
  { value: 'Estonian', label: 'Estonian' },
  { value: 'Filipino', label: 'Filipino' },
  { value: 'Finnish', label: 'Finnish' },
  { value: 'French', label: 'French' },
  { value: 'Frisian', label: 'Frisian' },
  { value: 'Galician', label: 'Galician' },
  { value: 'German', label: 'German' },
  { value: 'Greek', label: 'Greek' },
  { value: 'Gujarati', label: 'Gujarati' },
  { value: 'Gurani', label: 'Gurani' },
  { value: 'Hausa', label: 'Hausa' },
  { value: 'Hebrew', label: 'Hebrew' },
  { value: 'Hindi', label: 'Hindi' },
  { value: 'Hungarian', label: 'Hungarian' },
  { value: 'Icelandic', label: 'Icelandic' },
  { value: 'Indonesian', label: 'Indonesian' },
  { value: 'Japanese', label: 'Japanese' },
  { value: 'Korean', label: 'Korean' },
  { value: 'Latvian', label: 'Latvian' },
  { value: 'Lithuanian', label: 'Lithuanian' },
  { value: 'Malay', label: 'Malay' },
  { value: 'Mongolian', label: 'Mongolian' },
  { value: 'Norwegian', label: 'Norwegian' },
  { value: 'Occitan', label: 'Occitan' },
  { value: 'Pashto', label: 'Pashto' },
  { value: 'Persian', label: 'Persian' },
  { value: 'Polish', label: 'Polish' },
  { value: 'Portuguese', label: 'Portuguese' },
  { value: 'Quechua', label: 'Quechua' },
  { value: 'Romanian', label: 'Romanian' },
  { value: 'Russian', label: 'Russian' },
  { value: 'Sinhala', label: 'Sinhala' },
  { value: 'Slovak', label: 'Slovak' },
  { value: 'Slovenian', label: 'Slovenian' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'Swahili', label: 'Swahili' },
  { value: 'Swedish', label: 'Swedish' },
  { value: 'Tamil', label: 'Tamil' },
  { value: 'Thai', label: 'Thai' },
  { value: 'Turkish', label: 'Turkish' },
  { value: 'Turkmen', label: 'Turkmen' },
  { value: 'Ukrainian', label: 'Ukrainian' },
  { value: 'Vietnamese', label: 'Vietnamese' },
];

const productTypeOptions = [
  { value: 'Initiation of Coverage', label: 'Initiation of Coverage' },
  { value: 'EPS Estimates', label: 'EPS Estimates' },
  { value: 'Ratings Change', label: 'Ratings Change' },
  { value: 'Reporting Results', label: 'Reporting Results' },
  { value: 'Models', label: 'Models' },
  { value: 'Industry Overview', label: 'Industry Overview' },
  { value: 'Technical Analysis', label: 'Technical Analysis' },
  { value: 'Indices', label: 'Indices' },
  { value: 'Equity', label: 'Equity' },
  {
    value: 'Fixed Income',
    label: 'Fixed Income',
    options: [
      {
        value: 'Credit',
        label: 'Credit',
        options: [
          {
            value: 'High Grade',
            label: 'High Grade',
          },
          {
            value: 'High Yield',
            label: 'High Yield',
          },
        ],
      },
      {
        value: 'Rates, Govt, Agencies',
        label: 'Rates, Govt, Agencies',
      },
      {
        value: 'Structured Products, ABS and Mortgages',
        label: 'Structured Products, ABS and Mortgages',
        options: [
          {
            value: 'ABS',
            label: 'ABS',
          },
          {
            value: 'MBS & Mortgages',
            label: 'MBS & Mortgages',
          },
        ],
      },
    ],
  },
  { value: 'Emerging Markets', label: 'Emerging Markets' },
  { value: 'Economics', label: 'Economics' },
  { value: 'Commodities', label: 'Commodities' },
  { value: 'Derivatives', label: 'Derivatives' },
  { value: 'FX/ Currency', label: 'FX/ Currency' },
  { value: 'Strategy', label: 'Strategy' },
  { value: 'Reports', label: 'Reports' },
  { value: 'Notes', label: 'Notes' },
  { value: 'Convertibles', label: 'Convertibles' },
];

const numberOfPagesOptions = [
  { value: 'Greater Than', label: 'Greater Than' },
  { value: 'Less Than', label: 'Less Than' },
  { value: 'Between', label: 'Between' },
  { value: 'Equals', label: 'Equals' },
];

const trendingThemeOptions = [
  { value: 1, caption: '30 Days' },
  { value: 2, caption: '60 Days' },
  { value: 3, caption: '90 Days' },
];

const lineOptions: Highcharts.Options = {
  chart: {
    type: 'area',
    panKey: 'shift',
    scrollablePlotArea: {
      minWidth: 10,
    },
    backgroundColor: 'transparent',
  },

  title: {
    text: '',
    align: 'left',
  },

  xAxis: {
    visible: false,
  },

  yAxis: {
    visible: false,
  },

  legend: {
    enabled: false,
  },

  series: [
    {
      type: 'area',
      data: [
        5.4, 5.2, 5.7, 6.3, 5.2, 5.6, 6.1, 5.6, 5.9, 7.1, 8.6, 7.8, 8.6, 8.0, 9.7, 11.2, 12.5, 13.1,
        10.6, 10.9, 8.9, 9.5, 7.5, 3.5, 4.2,
      ],
      color: 'transparent',
      lineColor: '#F1A649',
      fillOpacity: 0.5,
      name: 'Elevation',
      marker: {
        enabled: false,
      },
      threshold: null,
      enableMouseTracking: false,
    },
  ],

  tooltip: {
    headerFormat: 'x : {point.x} y : {point.y}',
    pointFormat: '',
    enabled: false,
  },
};

const geoGraphyDefault = {
  USC_USA: { value: '2', label: 'USA' },
  LAC_Anguilla: { value: '81', label: 'Anguilla' },
  Europe_UK: { value: '11', label: 'United Kingdom' },
  Asia_Developed: { value: '111', label: 'Developed Asia-Pacific' },
  Asia_Emerging: { value: '121', label: 'Emerging Asia-Pacific' },
  MiddleEast_Bahrain: { value: '616', label: 'Bahrain' },
  MiddleEast_Egypt: { value: '615', label: 'Egypt' },
};

const geographyTreeMockOptions: any = [
  {
    value: '1',
    label: 'United States and Canada',

    options: [
      {
        ...geoGraphyDefault.USC_USA,
      },
      {
        value: '5',
        label: 'Canada',
      },
      {
        value: '6',
        label: 'Bermuda',
      },
    ],
  },
  {
    value: '7',
    label: 'Latin America and Caribbean',
    options: [
      {
        ...geoGraphyDefault.LAC_Anguilla,
      },
      {
        value: '92',
        label: 'Antigua and Barbuda',
      },
      {
        value: '83',
        label: 'Argentina',
      },
      {
        value: '94',
        label: 'Aruba',
      },
      {
        value: '85',
        label: 'Bahamas',
      },
      {
        value: '96',
        label: 'Barbados',
      },
      {
        value: '87',
        label: 'Belize',
      },
      {
        value: '98',
        label: 'Bolivia',
      },
      {
        value: '89',
        label: 'Bonaire',
      },
      {
        value: '910',
        label: 'Brazil',
      },
      {
        value: '811',
        label: 'BVI',
      },
      {
        value: '912',
        label: 'Cayman Islands',
      },
      {
        value: '813',
        label: 'Chile',
      },
      {
        value: '9',
        label: 'Cocos Islands',
      },
      {
        value: '814',
        label: 'Colombia',
      },
      {
        value: '915',
        label: 'Costa Rica',
      },
      {
        value: '816',
        label: 'Cuba',
      },
      {
        value: '917',
        label: 'Curaçao',
      },
      {
        value: '918',
        label: 'Dominica',
      },
      {
        value: '819',
        label: 'Dominican Republic',
      },
      {
        value: '920',
        label: 'Ecuador',
      },
      {
        value: '821',
        label: 'El Salvador',
      },
      {
        value: '922',
        label: 'Falkland Islands',
      },
      {
        value: '823',
        label: 'French Guiana',
      },
      {
        value: '924',
        label: 'Grenada',
      },
      {
        value: '925',
        label: 'Guadeloupe',
      },
      {
        value: '826',
        label: 'Guatemala',
      },
      {
        value: '927',
        label: 'Guyana',
      },
      {
        value: '828',
        label: 'Haiti',
      },
      {
        value: '929',
        label: 'Honduras',
      },
      {
        value: '830',
        label: 'Jamaica',
      },
      {
        value: '931',
        label: 'Martinique',
      },
      {
        value: '932',
        label: 'Mexico',
      },
      {
        value: '833',
        label: 'Montserrat',
      },
      {
        value: '934',
        label: 'Nicaragua',
      },
      {
        value: '835',
        label: 'Panama',
      },
      {
        value: '936',
        label: 'Paraguay',
      },
      {
        value: '837',
        label: 'Peru',
      },
      {
        value: '938',
        label: 'Saint Lucia',
      },
      {
        value: '939',
        label: 'Saint Vincent',
      },
      {
        value: '840',
        label: 'Sint Maarten',
      },
      {
        value: '941',
        label: 'South Georgia',
      },
      {
        value: '842',
        label: 'St.Kitts and Nevis',
      },
      {
        value: '943',
        label: 'Turks & Caicos',
      },
      {
        value: '844',
        label: 'Uruguay',
      },
      {
        value: '945',
        label: 'Venezuela',
      },
    ],
  },
  {
    value: '10',
    label: 'Europe',

    options: [
      {
        ...geoGraphyDefault.Europe_UK,
      },
      {
        value: '12',
        label: 'Germany',
      },
      {
        value: '13',
        label: 'Bulgaria',
      },
    ],
  },
  {
    value: '101',
    label: 'Asia-Pacific',

    options: [
      {
        ...geoGraphyDefault.Asia_Developed,
      },
      { ...geoGraphyDefault.Asia_Emerging },
    ],
  },
  {
    value: '71',
    label: 'Middle East',
    options: [
      {
        ...geoGraphyDefault.MiddleEast_Bahrain,
      },
      {
        ...geoGraphyDefault.MiddleEast_Egypt,
      },
      {
        value: '614',
        label: 'Iran',
      },
      {
        value: '612',
        label: 'Iraq',
      },
      {
        value: '611',
        label: 'Israel',
      },
      {
        value: '610',
        label: 'Jordan',
      },
      {
        value: '69',
        label: 'Kuwait',
      },
      {
        value: '68',
        label: 'Lebanon',
      },
      {
        value: '67',
        label: 'Oman',
      },
      {
        value: '66',
        label: 'Palestine',
      },
      {
        value: '65',
        label: 'Qatar',
      },
      {
        value: '64',
        label: 'Saudi Arabia',
      },
      {
        value: '63',
        label: 'Syria',
      },
      {
        value: '62',
        label: 'United Arab Emirates',
      },
      {
        value: '61',
        label: 'Yemen',
      },
    ],
  },
];

const pageSizeOptions = [
  { label: '5', value: '5' },
  { label: '10', value: '10' },
  { label: '20', value: '20' },
  { label: '25', value: '25' },
  { label: '50', value: '50' },
  { label: '100', value: '100' },
];

const getFormatedDate = (date: Date) => {
  const dateData = new Date(date.setDate(date.getDate())).toLocaleDateString();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minuteString = minutes < 10 ? '0' + minutes : minutes;
  const strTime = hours + ':' + minuteString + ' ' + ampm;
  return `${dateData} ${strTime}`;
};

export {
  fetchedValues,
  requestData,
  defaultArgs,
  trendingThemeList,
  SearchHistoryList,
  FromMyListArray,
  contributorGroupsOptions,
  reportTypeOptions,
  productTypeOptions,
  numberOfPagesOptions,
  languageOptions,
  trendingThemeOptions,
  lineOptions,
  geoGraphyDefault,
  geographyTreeMockOptions,
  pageSizeOptions,
  getFormatedDate,
};
