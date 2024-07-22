import React, { useContext, useState } from 'react';

import { IPeriodPickerOption, PeriodPicker } from '@spglobal/koi-datepicker';
import '@spglobal/koi-datepicker/dist/css/index.min.css';

import { SkeletonContext } from '../index';

export interface iTimeRangeDefault {
  Day: IPeriodPickerOption;
  Days7: IPeriodPickerOption;
  Days30: IPeriodPickerOption;
  Days90: IPeriodPickerOption;
  YTD: IPeriodPickerOption;
  OneYear: IPeriodPickerOption;
  ThreeYears: IPeriodPickerOption;
  FiveYears: IPeriodPickerOption;
  Custom: IPeriodPickerOption;
}

export const timeRangeDefault: iTimeRangeDefault = {
  Day: {
    label: 'Last 24 hrs',
    periodValue: [1667865600000, 1675814400000],
    value: 0,
  },
  Days7: {
    label: 'Last 7 Days',
    periodValue: [1667865600000, 1675814400000],
    value: 1,
  },
  Days30: {
    label: 'Last 30 Days',
    periodValue: [1667865600000, 1675814400000],
    value: 2,
  },
  Days90: {
    label: '90 Days',
    periodValue: [1667865600000, 1675814400000],
    value: 3,
  },
  YTD: { label: 'YTD', periodValue: [1644278400000, 1675814400000], value: 4 },
  OneYear: { label: 'One Year', periodValue: [1644278400000, 1675814400000], value: 5 },
  ThreeYears: { label: 'Three Years', periodValue: [1581120000000, 1675814400000], value: 6 },
  FiveYears: { label: 'Five Years', periodValue: [1518048000000, 1675814400000], value: 7 },
  Custom: {
    label: 'Customize Periods',
    periodValue: [1675728000000, 1675814400000],
    value: 'Custom',
  },
};

const options: IPeriodPickerOption[] = [
  timeRangeDefault.Day,
  timeRangeDefault.Days7,
  timeRangeDefault.Days30,
  timeRangeDefault.Days90,
  timeRangeDefault.YTD,
  timeRangeDefault.OneYear,
  timeRangeDefault.ThreeYears,
  timeRangeDefault.FiveYears,
  timeRangeDefault.Custom,
];
const TimeRangeSearchFilter = () => {
  const timeRangeDefaultValue = [timeRangeDefault.Days7];
  const [timeRangeOption, setTimeRangeOption] = useState(timeRangeDefaultValue);

  const { setInitGridDataLoading, dataLoadingTime } = useContext(SkeletonContext);

  const handleGridDataLoading = () => {
    setInitGridDataLoading(true);
    setTimeout(() => setInitGridDataLoading(false), dataLoadingTime);
  };

  const timeRangeChange = (selectedValues: IPeriodPickerOption[]): void => {
    setTimeRangeOption(selectedValues);
    handleGridDataLoading();
  };

  return (
    <>
      <PeriodPicker
        autoPosition
        autoResize
        customId="custom-id"
        customPeriodNote={
          <span>
            <b>Note:</b> Choose a date range
          </span>
        }
        customPeriodOption={timeRangeDefault.Custom}
        dateRangeProps={{
          allowCrossDateSelection: true,
          maxValue: new Date('2024-02-08T00:00:00.000Z'),
          minValue: new Date('2000-02-08T00:00:00.000Z'),
        }}
        defaultValue={timeRangeDefaultValue}
        values={timeRangeOption}
        onChange={timeRangeChange}
        inFieldLabel="Date Range:"
        isAutoFocusMenu
        isDropOpenOnClick
        label="Period Picker"
        mobileMenuClassName="mobile-menu-className"
        options={options}
        periodValueFormat="MM/DD/YYYY"
      />
    </>
  );
};

export default TimeRangeSearchFilter;
