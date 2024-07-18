import { useEffect, useState } from 'react';

import { ITemplateData } from '../components/ManageDashboard';

export const useIsDark = (): boolean => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver((mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          setIsDark(document.body.classList.contains('spg-dark'));
        }
      }
    });
    observer.observe(document.body, { attributes: true });
    setIsDark(document.body.classList.contains('spg-dark'));

    return () => {
      observer.disconnect();
    };
  }, []);

  return isDark;
};

export const generateRowsData = (filterById: string, filterText?: string) => {
  const nameArray = [
    'Market Monitor',
    'Real Estate Dashboard',
    'Corporate Development',
    'Credit Monitor Dashboard',
    'IB FIG Banks',
  ];

  const descriptionArray = [
    'Track and analyze critical indicators and metrics across sector activity, sales data, and industry trends.',
    'Custom Real Estate Dashboard Banking & Financial Services Monitor valuation changes and sector performance. See crucial real estate data in one place, providing a comprehensive overview.',
    'Deals, divestitures, joint ventures – map out potential growth areas and identify opportunities aligned with your company’s long-term goals.',
    'A valuable tool to track credit scores and history. Stay aware of macro trends and company credit health.',
    'Get insights tailored for the investment banking industry. Visualize key performance indicators to measure a bank’s preformance for strategic decision making.',
  ];

  const typeArray = ['Dashboard', 'Custom', 'Shared', 'Template', 'Dashboard'];

  const ownerArray = [
    'Steve Justa',
    'S&P Global Capital IQ Pro',
    'Kumar Jones',
    'S&P Global Capital IQ Pro',
    'Steve Justa',
  ];

  const lastSavedArray = ['7/15/2024', '5/8/2024', '5/23/2024', '6/04/2024', '5/13/2024'];

  const imageUrlArray = [
    'https://s3-alpha-sig.figma.com/img/1eef/59db/dc66d6bc6f0fbc4c18b30c51006b6b5a?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EOZk8gkCWtIEIc6ixNmUnfKehMK7Jwpvtwp2Vbw11VwwMEXIB51d40aFoW2gP7DS77y9eNWClb7pC1JqTwhiLTFhV02VdSsANFlFZ4iDd6ZvvXeBu1qhndBX4jucc78kH4YlDi~XjA320VRh-Sd15~NSBaq~vA90KYQcGNoVZh4P0SX6BZVz5bP89LPsOd8IxDJIWjz9WGb7Znxi262PdiXzxHduanmAd9A8UwRgx6RN1qJDaiR85-58M1qgbgDLYrjil~EqeYVEr3vSaempof6e7OEkVtA1YuRqrbio-hMesiSFzjEK1H6z-ttFZEXwFcuFptCFXaxO7abfd~5-0Q__',
    'https://s3-alpha-sig.figma.com/img/6526/f38c/61a7319e488097f3117abcf4153956ec?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=C1IeW5SZpnXhcqkXdErRrMMlfxpoK8wyFlaeop8baMWzciX9yhMDj3pE6fPfAEyc-K4rhF-zdgISJFJ2EcJJ6vIJ03xrCt~1rN4-JAKeOBFfkFOhOS-JycfU4Ano2FzOSPFJpzbhk6I0~uyu0ZrqfHN~xJwYiyOoi9srKwZ0JLEsrOrYSEPb-VNSz23KRkBSVsc4~xpnepYxLecB2DEmXwqZIINq-K16eLK38jjjmabMCSyVzCUGsk5t2mAqp3M~f9O7vzUJ8dHWfqYygaXuvpW51qtWKmzVO4cU8KV4p1a4O-vBuRiznPvO8oF7Fuh-yJUKDu1Bs9RZR6ImSgwVuQ__',
    'https://s3-alpha-sig.figma.com/img/1641/9d87/8330a5b914d2588bc33b374506e14b5b?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=P8a7hh1hPg5FmRo~HiFsW-zqjY4~Jlygp307z3sJ8eECllAa9VTotSLySYob77h-dWT6X6AcVJ62-hhsJ6OvbHF8kzMmqdz4EbeSd4JfYI7iJpBXz2OXEL~Wm5JYMwT02FExKEfd02fBueFGqOCBk7RJvyohDFEGDgVJWURUGRQmWCMVO9aMqvVg9s4Fa3TzZuvbhJwIg3Qu6L4zcqqppCUM5LOyGsiaTj~kWOKCuvOMb9AcHkW0HmNqavD9So3m0zaP7Cqtrm333zXjxquEeAARzndLZKPwoI3DCBKc5bkJqS1Xc~jMg1gFaJL4snsX5g0r3IGubmyNvnxc786vsw__',
    'https://s3-alpha-sig.figma.com/img/9bb4/e0d4/3008f8c38e839494c37ef853c81bf665?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=F2nJDWf2JumJDYXaqVBzTwLfON01AMAFi5LwanMYH1NcEtzBf934i~3GmpNyCery6-dmwoDK1ei7dcY-l5W1StFfnqq95eUk7XqmGHOpb8vh5wr7qN-tHuorTwdJfXIVHFKVmagypoR5Q10F11isViPc9NE5Zu-AN1BoRUSypuTQnzO9ozPJbAjkVfe83oggNzlCaU0aJKyheV7WwDerhwOJRjCDs-DUCi0~AopG0m9qxlmrq1Gwi0lLCgDVUjNTXrCKrpe8fjgqH7bE-bGNmzUbEwBWtQlrVbg8HqUVYLYJRglhG5YDkTWw01lajxYTeU6EC7LjiCNKy3YchCtpaw__',
    'https://s3-alpha-sig.figma.com/img/6526/f38c/61a7319e488097f3117abcf4153956ec?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=C1IeW5SZpnXhcqkXdErRrMMlfxpoK8wyFlaeop8baMWzciX9yhMDj3pE6fPfAEyc-K4rhF-zdgISJFJ2EcJJ6vIJ03xrCt~1rN4-JAKeOBFfkFOhOS-JycfU4Ano2FzOSPFJpzbhk6I0~uyu0ZrqfHN~xJwYiyOoi9srKwZ0JLEsrOrYSEPb-VNSz23KRkBSVsc4~xpnepYxLecB2DEmXwqZIINq-K16eLK38jjjmabMCSyVzCUGsk5t2mAqp3M~f9O7vzUJ8dHWfqYygaXuvpW51qtWKmzVO4cU8KV4p1a4O-vBuRiznPvO8oF7Fuh-yJUKDu1Bs9RZR6ImSgwVuQ__',
  ];

  const typeValueArray = ['2', '1', '3', '4', '2'];

  let currentIndex = 0;
  let index = 0;

  let response = Array(25)
    .fill({})
    .map(() => {
      const data = {
        id: index,
        name: nameArray[currentIndex],
        description: descriptionArray[currentIndex],
        type: typeArray[currentIndex],
        owner: ownerArray[currentIndex],
        lastSaved: lastSavedArray[currentIndex],
        imageUrl: imageUrlArray[currentIndex],
        typeValue: typeValueArray[currentIndex],
        isShared: currentIndex === 1 ? true : false,
      };
      currentIndex++;
      index++;
      if (currentIndex === 5) currentIndex = 0;
      return data;
    });

  if (filterById !== '1' && response?.length > 0) {
    response = response.filter((data) => data.typeValue === filterById);
  }

  if (filterText && response?.length > 0) {
    response = snipetsSearch(response, filterText);
  }

  return response;
};

export const generateDefaultTemplatesList = () => {
  const title1 = `NewsWire_${Date.now()}`;
  const title2 = `Chart_${Date.now()}`;
  const title3 = `Quote_${Date.now()}`;

  return [
    {
      id: title1,
      component: 'newsWire',
      position: {
        direction: 'within',
      },
    },
    {
      id: title2,
      component: 'chart',
      position: {
        direction: 'right',
        referenceGroup: {
          views: [title1],
          activeView: title1,
          id: '1',
        },
      },
    },
    {
      id: title3,
      component: 'quote',
      position: {
        direction: 'below',
        referenceGroup: {
          views: [title2],
          activeView: title2,
          id: '2',
        },
      },
    },
  ];
};

export const snipetsSearch = (InitialData: ITemplateData[], filterText: string) => {
  const search_regexp = new RegExp(`(?:${filterText.toString()})`, 'ig');

  const highLightText = (text: string) => {
    if (text.indexOf('<') == -1 || text.indexOf('>') == -1) {
      return '<bm>' + text + '</bm>';
    } else {
      return text;
    }
  };

  return InitialData.filter(
    (data) =>
      data.name.toLowerCase().includes(filterText.toLowerCase()) ||
      data.description.toLowerCase().includes(filterText.toLowerCase())
  ).map((data: ITemplateData) => {
    return {
      ...data,
      name: data?.name !== '' && data?.name?.replace(search_regexp, highLightText),
      description:
        data?.description !== '' && data?.description?.replace(search_regexp, highLightText),
    };
  });
};

export const formatDate = (date: any) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('/');
};
