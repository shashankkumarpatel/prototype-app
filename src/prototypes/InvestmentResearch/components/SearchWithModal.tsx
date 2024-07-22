import React, { JSX, useContext, useState } from 'react';

import { Keys, Size } from '@spglobal/koi-helpers';
import { SEARCH } from '@spglobal/koi-icons';
import { CapsuleSelectControl, ICapsuleOption } from '@spglobal/koi-select';
import { ClearableField, Spinner, Tab, Tabs } from '@spglobal/react-components';

import tabImage from '../assets/images/tablistImage.png';
import { defaultArgs } from '../utils/helpers';
import { SkeletonContext } from '../index';
import OverflowCapsule from './OverflowCapsule';

import {
  ListDataCategoryWrapper,
  ListDataImageWrapper,
  ListDataTitleWrapper,
  NoDataFoundWrapper,
  SearchWithModalBody,
  SearchWithModalHeader,
  TabListDataWrapper,
  TabLoadingBar,
} from '../styles/investmentResearch.styles';

import { ModalStyled } from '../styles/searchWithModal.styles';

interface IRowData {
  title: string;
  subTitle: string;
  category: string;
}

const getLengthbyTabId = (currentTabId: string) => {
  return tabsList.filter((data) => data.id === currentTabId)[0].size;
};

const generateRowsData = (
  currentTabId: string,
  selectedCapsules: ICapsuleOption[],
  filterText?: string
): IRowData[] => {
  const titleArray = [
    'Qualcomm (NASDAQS:QCOM)',
    'Qualcomm Ventures LLC',
    'Qualcomm Technologies, Inc.',
    'Qualcomm Atheros, Inc.',
    'Qualcomm Japan Limited Liability Company',
    'Qualcomm Spinco, Inc.',
    'Qualcomm, France',
    'Qualcomm Life Fund',
    'Qualcomm India Fund',
    'QUALCOMM Incorporated (XTRA:QCI)',
  ];

  const subTitleArray = [
    'Seimconductors • San Diego, CA • Operating',
    'Seimconductors • San Diego, CA • Operating Subsidiary',
    'Systems Software • Minato, Japan • Operating',
    'Semiconductors • San Diego, California, USA',
    'Seimconductors • San Diego, CA • Operating',
    'Seimconductors • San Diego, CA • Operating Subsidiary',
    'Systems Software • Minato, Japan • Operating',
    'Semiconductors • San Diego, California, USA',
    'Seimconductors • San Diego, CA • Operating',
    'Seimconductors • San Diego, CA • Operating Subsidiary',
  ];

  const categoryArray = [
    'Public Company',
    'Private Company',
    'Private Funds',
    'Equity',
    'Public Company',
    'Private Company',
    'Private Funds',
    'Equity',
    'Public Company',
    'Private Company',
  ];

  let currentIndex = 0;

  const length = getLengthbyTabId(currentTabId);

  let response = Array(length)
    .fill({})
    .map(() => {
      const data = {
        title: titleArray[currentIndex],
        subTitle: subTitleArray[currentIndex],
        category: categoryArray[currentIndex],
      };
      currentIndex++;
      if (currentIndex === 10) currentIndex = 0;
      return data;
    });

  if (selectedCapsules.length > 0 && response?.length > 0) {
    const valuesArray = selectedCapsules.map((capsule) =>
      capsule.value?.toString().toLocaleLowerCase()
    );
    response = response.filter((data) => !valuesArray.includes(data.title.toLowerCase()));
  }

  if (filterText && response?.length > 0) {
    response = response.filter((data) =>
      data.title.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  return response;
};

const tabsList = [
  { title: 'All', id: 'all', size: 20 },
  { title: 'Companies', id: 'companies', size: 10 },
  { title: 'Contributors', id: 'contributors', size: 5 },
  { title: 'Analysts', id: 'analysts', size: 2 },
  { title: 'Lists', id: 'lists', size: 3 },
  { title: 'Indices', id: 'indices', size: 0 },
];

const SearchWithModal = (props: any): React.JSX.Element => {
  const args = {
    ...defaultArgs,
    isStaticView: true,
    externalKeyboardNavigation: true,
    ...props,
  };

  const [capsuleOptionsControl, setCapsuleOptionsControl] = React.useState<ICapsuleOption[]>([]);
  const [searchModal, setSearchModal] = React.useState<boolean>(false);
  const [searchWithModalInput, setSearchWithModalInput] = useState('');
  const [currentTabId, setCurrentTabId] = useState(tabsList[0].id);
  const [rowData, setRowData] = useState<IRowData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { setInitGridDataLoading, dataLoadingTime } = useContext(SkeletonContext);

  const handleGridDataLoading = () => {
    setInitGridDataLoading(true);
    setTimeout(() => setInitGridDataLoading(false), dataLoadingTime);
  };

  const handleTabData = (searchText: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setRowData(generateRowsData(currentTabId, capsuleOptionsControl, searchText));
    }, 500);
  };

  const keyDownHandler = (event: React.KeyboardEvent): void => {
    const { key } = event;

    if (key === Keys.ENTER) {
      setSearchModal(true);
    }
  };

  const removeCapsuleHandler = (removedOption: any): void => {
    setCapsuleOptionsControl((prevState) =>
      prevState.filter((option) => option.value !== removedOption.value)
    );
    handleGridDataLoading();
  };

  const handleCloseModal = (): void => {
    setSearchModal(false);
    setSearchWithModalInput('');
  };

  const handleSearchWithModal = (event: any) => {
    setSearchWithModalInput(event.target.value);
    handleTabData(event.target.value);
  };

  const handleClearInput = () => {
    setSearchWithModalInput('');
    handleTabData('');
  };

  const handleSearchSelected = (title: string) => {
    const prevCapsulesData = [...capsuleOptionsControl];
    const isOptionSelected = prevCapsulesData.filter((data) => data.value === title);
    if (isOptionSelected.length <= 0) {
      prevCapsulesData.push({
        label: title,
        value: title,
      });
      setCapsuleOptionsControl(prevCapsulesData);
      handleGridDataLoading();
      handleCloseModal();
    }
  };

  const handleTabClick = (newTabId: string) => {
    setCurrentTabId(newTabId);
    setRowData(generateRowsData(newTabId, capsuleOptionsControl, searchWithModalInput));
  };

  const generateTabs = (): JSX.Element[] => {
    return tabsList.map((listData) => {
      return (
        <Tab key={listData.id} id={listData.id} title={listData.title}>
          {isLoading ? (
            <TabLoadingBar>
              <Spinner size={16} />
            </TabLoadingBar>
          ) : rowData?.length ? (
            rowData.map((data, index) => {
              return (
                <TabListDataWrapper key={index} onClick={() => handleSearchSelected(data.title)}>
                  <ListDataImageWrapper>
                    <img src={tabImage}></img>
                  </ListDataImageWrapper>
                  <ListDataTitleWrapper>
                    <p>{data.title}</p>
                    <span>{data.subTitle}</span>
                  </ListDataTitleWrapper>
                  <ListDataCategoryWrapper>
                    <p>{data.category}</p>
                  </ListDataCategoryWrapper>
                </TabListDataWrapper>
              );
            })
          ) : (
            <NoDataFoundWrapper>
              <p>No Data Found</p>
            </NoDataFoundWrapper>
          )}
        </Tab>
      );
    });
  };

  const handleChangeOfCapsule = () => {
    // handle Change Of Capsule Select Component
  };

  const handleChangeSearchTextOfCapsule = () => {
    // handle Change Search Text Of Capsule Select Component
  };

  return (
    <>
      <CapsuleSelectControl
        searchText={''}
        capsules={capsuleOptionsControl}
        placeholder={args.placeholder}
        onClick={() => {
          setSearchModal(true);
          setRowData(generateRowsData(currentTabId, capsuleOptionsControl));
        }}
        onKeyDown={keyDownHandler}
        onRemoveCapsule={removeCapsuleHandler}
        onChange={handleChangeOfCapsule}
        onChangeSearchText={handleChangeSearchTextOfCapsule}
        isRightIconHidden={true}
        tagsLimit={args.tagLimit}
        rightElement={args.rightElement}
        leftElement={
          <OverflowCapsule
            capsules={capsuleOptionsControl}
            onRemoveCapsule={removeCapsuleHandler}
            count={args.tagOverflowCount}
            length={args.length}
          />
        }
        crossOrigin={undefined}
      />
      <ModalStyled
        autoFocus
        usePortal
        isOutlined
        hasBackdrop
        enforceFocus
        canEscapeKeyClose
        canOutsideClickClose
        isOpen={searchModal}
        size={Size.LARGE}
        onClose={handleCloseModal}
      >
        <SearchWithModalHeader>
          <ClearableField
            placeholder={args.placeholder}
            icon={SEARCH}
            value={searchWithModalInput}
            onClean={handleClearInput}
            onChange={handleSearchWithModal}
            crossOrigin={undefined}
          />
        </SearchWithModalHeader>
        <SearchWithModalBody>
          <Tabs onChange={handleTabClick} selectedTabId={currentTabId}>
            {generateTabs()}
          </Tabs>
        </SearchWithModalBody>
      </ModalStyled>
    </>
  );
};

export default SearchWithModal;
