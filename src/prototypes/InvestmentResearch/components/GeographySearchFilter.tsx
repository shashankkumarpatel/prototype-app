import React, { useContext } from 'react';

import { Select } from '@spglobal/koi-select';

import { geoGraphyDefault, geographyTreeMockOptions } from '../utils/helpers';
import { SkeletonContext } from '../index';

const GeographySearchFilter = (): React.JSX.Element => {
  const geographySearchDefault = [
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
  ];
  const [geographySearchOption, setGeographySearchOption] = React.useState(geographySearchDefault);

  const { setInitGridDataLoading, dataLoadingTime } = useContext(SkeletonContext);

  const handleGridDataLoading = () => {
    setInitGridDataLoading(true);
    setTimeout(() => setInitGridDataLoading(false), dataLoadingTime);
  };

  const handleGeographyChange = (selectedValues: any): void => {
    setGeographySearchOption(selectedValues);
    handleGridDataLoading();
  };

  return (
    <>
      <Select
        options={geographyTreeMockOptions}
        defaultValue={geographySearchDefault}
        values={geographySearchOption}
        inFieldLabel={'Geography:'}
        isMulti={true}
        isSearchable={true}
        //isAutoFocusMenu={false}
        closeOnSelection={false}
        //closeOnTriggerClick={false}
        isHighlightSearchMatches={true}
        searchPlaceholder={'Search'}
        placeholder="Select Geographies"
        isMobileMenu={true}
        autoResize
        showCheckboxes={true}
        onChange={handleGeographyChange}
      />
    </>
  );
};

export default GeographySearchFilter;
