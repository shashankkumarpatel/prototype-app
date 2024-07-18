import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import React, { useMemo, useRef, useState } from 'react';

import { Size } from '@spglobal/koi-helpers';
import { CATEGORY, CLEAR, EMPTY, SEARCH } from '@spglobal/koi-icons';
//import { ModalStyled } from '@spglobal/koi-select/src/basicSearch/basicSearch.stories.styles';
import {
  ChoiceList,
  ClearableField,
  IOptionProps,
  Icon,
  IconButton,
  ModalHeader,
  Skeleton,
  SystemNotification,
} from '@spglobal/react-components';

import { generateDefaultTemplatesList, generateRowsData, useIsDark } from '../utils/helpers';
import CardViewContainer from './CardViewContainer';
import ListViewContainer from './ListViewContainer';

import {
  CardDataSkeletonWapper,
  ChoiceListSectionWrapper,
  DataSkeletonWapper,
  ManageDashboardModalInput,
  ManageDashboardModalWrapper,
  SwitchWrapper,
  ModalStyled,
} from '../styles/dashboardDesign.styles';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const choiceListOptions: IOptionProps[] = [
  { label: 'All', value: '1', selected: true },
  { label: 'My Dashboards', value: '2' },
  { label: 'Shared', value: '3' },
  { label: 'Templates', value: '4' },
];

export interface ITemplateData {
  id: number;
  name: string;
  description: string;
  type: string;
  owner: string;
  lastSaved: string;
  imageUrl: string;
  typeValue: string;
  isShared: boolean;
}

const ManageDashboard = (props: any): React.JSX.Element => {
  const { showModal, handleCloseModal, handleOpenTemplate } = props;
  const isDarkMode = useIsDark();
  const [filterInput, setFilterInput] = useState('');
  const [selectedChoice, setSelectedChoice] = useState('1');
  const [switchValue, setSwitchValue] = useState('Card');
  const [viewList, setViewList] = useState(generateRowsData('1'));
  const [isLoading, setIsLoading] = useState(false);
  const [modifyDefaultValuesToListView, setModifyDefaultValuesToListView] = useState(false);

  const cardElementRef = useRef(null);

  useMemo(() => {
    setViewList(generateRowsData(selectedChoice, filterInput));
  }, [selectedChoice, filterInput]);

  const switchCardColor = (type: string) => {
    if (type === 'category') {
      return switchValue === 'List' ? (isDarkMode ? '#ffffff' : '#000000') : '#737676';
    } else {
      return switchValue === 'Card' ? (isDarkMode ? '#ffffff' : '#000000') : '#737676';
    }
  };

  const handleModalOpening = () => {
    handleDataLoading();
  };

  const handleDataLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleDefaultValuesofListView = () => {
    setModifyDefaultValuesToListView(true);
    setTimeout(() => setModifyDefaultValuesToListView(false), 1000);
  };

  const handleClearInput = () => {
    setFilterInput('');
    handleDataLoading();
    handleDefaultValuesofListView();
  };

  const handleViewSwitch = (value: string) => {
    setSwitchValue(value);
    handleDefaultValuesofListView();
    handleDataLoading();
  };

  const setDefaultValuesOnClose = () => {
    setFilterInput('');
    setSelectedChoice('1');
    setSwitchValue('Card');
    setViewList(generateRowsData('1'));
    handleDefaultValuesofListView();
    handleCloseModal();
  };

  const handleOpenButton = (templateData: ITemplateData) => {
    console.log('templateData', templateData);
    setDefaultValuesOnClose();
    handleOpenTemplate(generateDefaultTemplatesList);
  };

  const handleSearchWithModal = (event: any) => {
    setFilterInput(event.target.value);
    handleDefaultValuesofListView();
    handleDataLoading();
  };

  const handleChoiceListChange = (values: any) => {
    const changeValue = values[0];
    setSelectedChoice(changeValue);
    handleDefaultValuesofListView();
  };

  const handleRemoveTemplate = (id: number) => {
    const oldViewList = [...viewList];
    oldViewList.forEach((item, index) => {
      if (item.id === id) {
        oldViewList.splice(index, 1);
      }
    });
    const blurElement = cardElementRef?.current?.querySelector(':focus');
    if (blurElement) blurElement?.blur();
    setViewList(oldViewList);
    handleDefaultValuesofListView();
  };

  return (
    <ModalStyled
      isOutlined
      isOpen={showModal}
      style={{ width: '1300px' }}
      onOpening={() => handleModalOpening()}
    >
      <ManageDashboardModalWrapper>
        <ModalHeader title={'Manage Dashboard'}>
          <IconButton icon={CLEAR} onClick={() => setDefaultValuesOnClose()}></IconButton>
        </ModalHeader>
        <ManageDashboardModalInput>
          <ClearableField
            placeholder={'Filter by keyword'}
            icon={SEARCH}
            value={filterInput}
            onClean={handleClearInput}
            onChange={handleSearchWithModal}
            crossOrigin={undefined}
          />
        </ManageDashboardModalInput>
        <ChoiceListSectionWrapper>
          <ChoiceList
            options={choiceListOptions}
            multiselect={false}
            isCheckIcon={false}
            capsuleSize={Size.SMALL}
            onChange={handleChoiceListChange}
          />
          <SwitchWrapper>
            <Icon
              icon={CATEGORY}
              onClick={() => handleViewSwitch('List')}
              style={{ color: switchCardColor('category') }}
            ></Icon>
            <div onClick={() => handleViewSwitch('Card')}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M4.7996 0.642857V2.78571C4.7996 3.14076 4.4974 3.42857 4.1246 3.42857H1.27461C0.901812 3.42857 0.599609 3.14076 0.599609 2.78571V0.642857C0.599609 0.287812 0.901812 0 1.27461 0H4.1246C4.4974 0 4.7996 0.287812 4.7996 0.642857ZM9.89962 7.07143V4.92857C9.89962 4.57353 9.59741 4.28571 9.22462 4.28571H6.3746C6.0018 4.28571 5.6996 4.57353 5.6996 4.92857V7.07143C5.6996 7.42647 6.0018 7.71429 6.3746 7.71429H9.22459C9.59741 7.71429 9.89962 7.42647 9.89962 7.07143ZM10.7996 0.642857V2.78571C10.7996 3.14076 11.1018 3.42857 11.4746 3.42857H14.3246C14.6974 3.42857 14.9996 3.14076 14.9996 2.78571V0.642857C14.9996 0.287812 14.6974 0 14.3246 0H11.4746C11.1018 0 10.7996 0.287812 10.7996 0.642857ZM9.89962 2.78571V0.642857C9.89962 0.287812 9.59741 0 9.22462 0H6.3746C6.0018 0 5.6996 0.287812 5.6996 0.642857V2.78571C5.6996 3.14076 6.0018 3.42857 6.3746 3.42857H9.22459C9.59741 3.42857 9.89962 3.14076 9.89962 2.78571ZM4.1246 4.28571H1.27461C0.901812 4.28571 0.599609 4.57353 0.599609 4.92857V7.07143C0.599609 7.42647 0.901812 7.71429 1.27461 7.71429H4.1246C4.4974 7.71429 4.7996 7.42647 4.7996 7.07143V4.92857C4.7996 4.57353 4.4974 4.28571 4.1246 4.28571ZM0.599609 9.21429V11.3571C0.599609 11.7122 0.901812 12 1.27461 12H4.1246C4.4974 12 4.7996 11.7122 4.7996 11.3571V9.21429C4.7996 8.85924 4.4974 8.57143 4.1246 8.57143H1.27461C0.901812 8.57143 0.599609 8.85924 0.599609 9.21429ZM11.4746 7.71429H14.3246C14.6974 7.71429 14.9996 7.42647 14.9996 7.07143V4.92857C14.9996 4.57353 14.6974 4.28571 14.3246 4.28571H11.4746C11.1018 4.28571 10.7996 4.57353 10.7996 4.92857V7.07143C10.7996 7.42647 11.1018 7.71429 11.4746 7.71429ZM11.4746 12H14.3246C14.6974 12 14.9996 11.7122 14.9996 11.3571V9.21429C14.9996 8.85924 14.6974 8.57143 14.3246 8.57143H11.4746C11.1018 8.57143 10.7996 8.85924 10.7996 9.21429V11.3571C10.7996 11.7122 11.1018 12 11.4746 12ZM5.6996 9.21429V11.3571C5.6996 11.7122 6.0018 12 6.3746 12H9.22459C9.59739 12 9.89959 11.7122 9.89959 11.3571V9.21429C9.89959 8.85924 9.59739 8.57143 9.22459 8.57143H6.3746C6.0018 8.57143 5.6996 8.85924 5.6996 9.21429Z"
                  fill={switchCardColor('card')}
                />
              </svg>
            </div>
          </SwitchWrapper>
        </ChoiceListSectionWrapper>
        {isLoading ? (
          switchValue === 'Card' ? (
            <CardDataSkeletonWapper>
              <Skeleton loading={isLoading} count={8} />
            </CardDataSkeletonWapper>
          ) : (
            <DataSkeletonWapper>
              <Skeleton loading={isLoading} count={1} />
            </DataSkeletonWapper>
          )
        ) : switchValue === 'Card' ? (
          viewList.length > 0 && (
            <CardViewContainer
              cardElementRef={cardElementRef}
              viewList={viewList}
              handleOpenButton={handleOpenButton}
              handleRemoveTemplate={handleRemoveTemplate}
            />
          )
        ) : (
          <ListViewContainer
            viewList={viewList}
            setViewList={setViewList}
            handleOpenButton={handleOpenButton}
            handleRemoveTemplate={handleRemoveTemplate}
            modifyDefaultValuesToListView={modifyDefaultValuesToListView}
          />
        )}
        {viewList.length <= 0 && !isLoading && switchValue === 'Card' && (
          <SystemNotification className="spg-text-center" icon={EMPTY} style={{ width: '100%' }}>
            There are no templates found in list.
          </SystemNotification>
        )}
      </ManageDashboardModalWrapper>
    </ModalStyled>
  );
};

export default ManageDashboard;
