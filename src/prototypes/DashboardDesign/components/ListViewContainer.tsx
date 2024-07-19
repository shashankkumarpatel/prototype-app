import { ColDef, SuppressKeyboardEventParams } from '@ag-grid-community/core';
import parse from 'html-react-parser';
import React, { Dispatch, SetStateAction, useMemo, useRef, useState } from 'react';

import { AgGrid } from '@spglobal/koi-grid';
import { Keys, Purpose, Size } from '@spglobal/koi-helpers';
import { Button, FormGroup, InputField, TextArea, TextareaSize } from '@spglobal/react-components';

import { formatDate, generateRowsData } from '../utils/helpers';
import ActionButtonRenderer from './ActionButtonRenderer';
import { ITemplateData } from './ManageDashboard';

import {
  ListNameWrapper,
  ListViewFooterWrapper,
  ListViewSaveAsActionWrapper,
  ListViewSaveAsWrapper,
  ListViewWrapper,
  ListWrapper,
} from '../styles/dashboardDesign.styles';

const ActionButtonColumnDefs: ColDef[] = [
  {
    field: 'name',
    headerTooltip: 'Name',
    suppressMovable: true,
    width: 200,
    minWidth: 60,
    maxWidth: 250,
    wrapText: true,
    autoHeight: true,
    cellRenderer: (props: any) => {
      const { data } = props;
      return (
        <ListNameWrapper>
          <div>{data.name && parse(data.name)}</div>
          {data.isShared && (
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1 9.5C1.68537 10.0711 2.98303 10.5 4 10.5C5.01697 10.5 6.31463 10.0854 7 9.5C7.63239 10.2886 8 11.8722 8 13.5H0C0 11.9755 0.353271 10.2764 1 9.5ZM1 5.5C1 4.65934 1.28723 3.95055 1.8617 3.37363C2.43617 2.7967 3.15426 2.5 3.98404 2.5C4.81383 2.5 5.53191 2.7967 6.12234 3.37363C6.71277 3.95055 7 4.65934 7 5.5C7 6.34066 6.71277 7.04945 6.12234 7.62637C5.53191 8.2033 4.82979 8.5 3.98404 8.5C3.15426 8.5 2.43617 8.2033 1.8617 7.62637C1.28723 7.04945 1 6.34066 1 5.5ZM15.992 13.5H10C10 12.1721 9.65533 10.5 9 9.5C9.68537 10.0711 10.8761 10.5 12 10.5C13.1239 10.5 14.3146 10.0854 15 9.5C15.6113 10.2952 15.992 11.9218 15.992 13.5ZM11.984 8.5C12.8138 8.5 13.5319 8.2033 14.1223 7.62637C14.7128 7.04945 15 6.34066 15 5.5C15 4.65934 14.7128 3.95055 14.1223 3.37363C13.5319 2.7967 12.8138 2.5 11.984 2.5C11.1543 2.5 10.4362 2.7967 9.8617 3.37363C9.28723 3.95055 9 4.65934 9 5.5C9 6.34066 9.28723 7.04945 9.8617 7.62637C10.4362 8.21978 11.1383 8.5 11.984 8.5Z"
                  fill="#737676"
                />
              </svg>
            </span>
          )}
        </ListNameWrapper>
      );
    },
  },
  {
    field: 'description',
    headerTooltip: 'Description',
    suppressMovable: true,
    width: 400,
    minWidth: 60,
    maxWidth: 500,
    wrapText: true,
    autoHeight: true,
    cellRenderer: (props: any) => {
      const { data } = props;
      return data.description && parse(data.description);
    },
  },
  {
    field: 'type',
    headerTooltip: `Type`,
    suppressMovable: true,
    width: 150,
    minWidth: 60,
    maxWidth: 150,
  },
  {
    field: 'owner',
    headerTooltip: `Owner`,
    suppressMovable: true,
    width: 200,
    minWidth: 60,
    maxWidth: 200,
    wrapText: true,
    autoHeight: true,
  },
  {
    field: 'lastSaved',
    headerTooltip: `Last Saved`,
    suppressMovable: true,
    width: 150,
    minWidth: 60,
    maxWidth: 150,
    wrapText: true,
    autoHeight: true,
  },
];

export interface IListView {
  viewList: ITemplateData[];
  setViewList: Dispatch<SetStateAction<ITemplateData[]>>;
  handleRemoveTemplate: (id: number) => void;
  handleOpenButton: (templateData: ITemplateData) => void;
  modifyDefaultValuesToListView: boolean;
}

const ListViewContainer = (props: IListView) => {
  const {
    viewList,
    setViewList,
    handleRemoveTemplate,
    handleOpenButton,
    modifyDefaultValuesToListView,
  } = props;
  const GridArgs = {
    columnDefs: ActionButtonColumnDefs,
    rowData: generateRowsData('1'),
  };
  const [gridDetails, setGridDetails] = useState(null);
  const [saveSectionType, setSaveSectionType] = useState('');
  const [templateData, setTemplateData] = useState(null);
  const [listScrolling, setListScrolling] = useState(false);
  const [showSaveAsSection, setShowSaveAsSection] = useState(false);
  const [saveDashboardName, setSaveDashboardName] = useState('');
  const [saveDashboardDescription, setSaveDashboardDescription] = useState('');
  const [disableOpenButton, setDisableOpenButton] = useState(true);

  const saveInputElementRef = useRef(null);
  const openButtonElementRef = useRef(null);

  const setDefualtValuestoSaveSection = () => {
    setShowSaveAsSection(false);
    setSaveDashboardName('');
    setSaveDashboardDescription('');
  };

  useMemo(() => {
    console.log('modifyDefaultValuesToListView', modifyDefaultValuesToListView);
    if (modifyDefaultValuesToListView) {
      setDefualtValuestoSaveSection();
      setDisableOpenButton(true);
    }
  }, [modifyDefaultValuesToListView]);

  const columnDefs: ColDef<ITemplateData>[] = [
    {
      width: 28,
      minWidth: 28,
      maxWidth: 28,
      suppressKeyboardEvent: (params: SuppressKeyboardEventParams) => {
        const key = params.event.key;
        return key === Keys.SPACE;
      },
      cellRenderer: (props: any) => {
        const { data } = props;
        return (
          <ActionButtonRenderer
            handleDeleteListItem={() => handleRemoveTemplate(data.id)}
            handleEditListItem={() => handleEditListItem(data)}
            handleSaveAsListItem={() => handleSaveAsListItem(data)}
            listData={data}
            listScrolling={listScrolling}
          />
        );
      },
    },
    ...(GridArgs.columnDefs as ColDef<ITemplateData>[]),
  ];

  const handleEditListItem = (data: ITemplateData) => {
    setSaveSectionType('Edit');
    setTemplateData(data);
    setSaveDashboardName(`${data.name}`);
    setSaveDashboardDescription(data.description);
    setShowSaveAsSection(true);
    setTimeout(() => {
      const focusElement = saveInputElementRef?.current;
      if (focusElement) focusElement?.focus();
    }, 100);
  };

  const handleSaveAsListItem = (data: ITemplateData) => {
    setSaveSectionType('Save');
    setTemplateData(data);
    setSaveDashboardName(`${data.name} (1)`);
    setSaveDashboardDescription('');
    setShowSaveAsSection(true);
    setTimeout(() => {
      const focusElement = saveInputElementRef?.current;
      if (focusElement) focusElement?.focus();
    }, 100);
  };

  const handleSaveNameInput = (event: any) => {
    setSaveDashboardName(event.target.value);
  };

  const handleSaveNameDescription = (event: any) => {
    setSaveDashboardDescription(event.target.value);
  };

  const handleSaveEditClick = () => {
    setDefualtValuestoSaveSection();
    const oldViewList = [...viewList];
    const currentDate = formatDate(new Date());
    if (saveSectionType === 'Edit') {
      for (const viewData of oldViewList) {
        if (viewData.id === templateData.id) {
          viewData.name = saveDashboardName;
          viewData.description = saveDashboardDescription;
          viewData.lastSaved = currentDate;
        }
      }
    } else {
      const newTemplate = {
        ...templateData,
        name: saveDashboardName,
        description: saveDashboardDescription,
        isShared: false,
        lastSaved: currentDate,
      };
      oldViewList.push(newTemplate);
    }
    setViewList(oldViewList);
    setDisableOpenButton(true);
  };

  const handleOnScrollOfList = () => {
    setListScrolling(true);
    setTimeout(() => setListScrolling(false), 1000);
  };

  const onListRowSelectionChanged = () => {
    const isRowSelected = gridDetails!.api.getSelectedRows();
    if (isRowSelected?.length > 0) {
      setDisableOpenButton(false);
      setTemplateData(isRowSelected[0]);
      const focusElement = openButtonElementRef?.current;
      if (focusElement) focusElement.focus();
    } else {
      setTemplateData(null);
    }
  };

  const cancelRowSelection = () => {
    gridDetails!.api.deselectAll();
    setDisableOpenButton(true);
  };

  return (
    <ListViewWrapper>
      <ListWrapper
        style={{ height: `calc(100% - ${showSaveAsSection ? '200px' : '50px'})` }}
        onScroll={handleOnScrollOfList}
      >
        <AgGrid
          {...GridArgs}
          rowData={viewList}
          columnDefs={columnDefs}
          noRowsOverlayComponent={() => (
            <p style={{ fontSize: '14px', color: 'var(--ag-header-foreground-color)' }}>
              There are no templates found in list.
            </p>
          )}
          rowSelection={'single'}
          onSelectionChanged={onListRowSelectionChanged}
          rowMultiSelectWithClick={false}
          suppressRowClickSelection={false}
          onGridReady={setGridDetails}
        />
      </ListWrapper>
      {showSaveAsSection ? (
        <ListViewSaveAsWrapper>
          <FormGroup label={'Dashboard Name'}>
            <InputField
              value={saveDashboardName}
              ref={saveInputElementRef}
              onChange={handleSaveNameInput}
            />
          </FormGroup>
          <TextArea
            componentSize={TextareaSize.SMALL}
            block={true}
            placeholder="Add optional description: 147 characters max."
            maxLength={147}
            rows={4}
            value={saveDashboardDescription}
            onChange={handleSaveNameDescription}
          />
          <ListViewSaveAsActionWrapper>
            <Button
              purpose={Purpose.PRIMARY}
              size={Size.LARGE}
              onClick={() => handleSaveEditClick()}
              disabled={!saveDashboardName}
            >
              {saveSectionType}
            </Button>
            <Button
              purpose={Purpose.SECONDARY}
              size={Size.LARGE}
              onClick={() => setDefualtValuestoSaveSection()}
            >
              Cancel
            </Button>
          </ListViewSaveAsActionWrapper>
        </ListViewSaveAsWrapper>
      ) : (
        <ListViewFooterWrapper>
          <Button
            purpose={Purpose.PRIMARY}
            size={Size.LARGE}
            onClick={() => handleOpenButton(templateData)}
            disabled={disableOpenButton}
            ref={openButtonElementRef}
          >
            Open
          </Button>
          <Button
            purpose={Purpose.SECONDARY}
            size={Size.LARGE}
            disabled={disableOpenButton}
            onClick={() => cancelRowSelection()}
          >
            Cancel
          </Button>
        </ListViewFooterWrapper>
      )}
    </ListViewWrapper>
  );
};

export default ListViewContainer;
