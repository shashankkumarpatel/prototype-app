import React, { useContext } from 'react';

import { Select } from '@spglobal/koi-select';
import { IOption } from '@spglobal/react-components';

import { SkeletonContext } from '../index';

export const IndustryDefault = {
  Financials_Banking_Bank: { value: '3', label: 'Bank' },
  Financials_Insurance: { value: '5', label: 'Insurance' },
  RealEstate_REIT: { value: '81', label: 'Equity REIT' },
  Energy_OGC: { value: '11', label: 'Oil, Gas and Coa' },
  Technology_Banking: { value: '14', label: 'Banking Technology' },
  Technology_Lending: { value: '15', label: 'Digital Lending' },
  Technology_Insurance: { value: '16', label: 'Insurance Technology' },
};

const industryTreeMockOptions: IOption[] = [
  {
    value: '1',
    label: 'Financials',
    options: [
      {
        value: '2',
        label: 'Banking',
        options: [
          {
            ...IndustryDefault.Financials_Banking_Bank,
          },
          {
            value: '4',
            label: 'Credit Unions and Mutuals',
          },
        ],
      },
      {
        ...IndustryDefault.Financials_Insurance,
      },
      {
        value: '6',
        label: 'Mortgage Banks and Brokers',
      },
    ],
  },
  {
    value: '7',
    label: 'Real Estate',
    options: [
      {
        ...IndustryDefault.RealEstate_REIT,
      },
      {
        value: '92',
        label: 'Real Estate Management and Development',
      },
    ],
  },
  {
    value: '10',
    label: 'Energy and Utilitie',
    options: [
      { ...IndustryDefault.Energy_OGC },
      {
        value: '12',
        label: 'Utilities',
      },
    ],
  },
  {
    value: '13',
    label: 'Financial Technology',
    options: [
      { ...IndustryDefault.Technology_Banking },
      { ...IndustryDefault.Technology_Lending },
      { ...IndustryDefault.Technology_Insurance },
    ],
  },
];

const IndustrySearchFilter = (): React.JSX.Element => {
  const [industrySearchOption, setIndustrySearchOption] = React.useState(industryTreeMockOptions);

  const { setInitGridDataLoading, dataLoadingTime } = useContext(SkeletonContext);

  const handleGridDataLoading = () => {
    setInitGridDataLoading(true);
    setTimeout(() => setInitGridDataLoading(false), dataLoadingTime);
  };

  const handleIndustryChange = (selectedValues: IOption[]): void => {
    setIndustrySearchOption(selectedValues);
    handleGridDataLoading();
  };

  return (
    <>
      <Select
        defaultValue={industryTreeMockOptions}
        values={industrySearchOption}
        options={industryTreeMockOptions}
        inFieldLabel={'Industries:'}
        isMulti={true}
        isSearchable={true}
        closeOnSelection={false}
        isHighlightSearchMatches={true}
        searchPlaceholder={'Search'}
        placeholder="Select Industries"
        isMobileMenu={true}
        autoResize
        showCheckboxes={true}
        onChange={handleIndustryChange}
      />
    </>
  );
};

export default IndustrySearchFilter;
