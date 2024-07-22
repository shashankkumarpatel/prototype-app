import {
  CellKeyDownEvent,
  ColDef,
  ComponentStateChangedEvent,
  ICellRendererParams,
  IRowNode,
  RowSelectedEvent,
  SuppressKeyboardEventParams,
} from '@ag-grid-community/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import { AgGrid } from '@spglobal/koi-grid';
import { PaginationContainer } from '../styles/gridTable.styles';
import { ActionGridCheckboxRenderer } from './ActionGridCheckboxRenderer';
import { MultiActionButtonRenderer } from './MultiActionButtonRenderer';
import { Keys, Size } from '@spglobal/koi-helpers';
import { DOWNLOAD } from '@spglobal/koi-icons';
import { Pagination } from '@spglobal/koi-pagination';
import { Button, ButtonSize, Icon, Link, Skeleton } from '@spglobal/react-components';

import { getFormatedDate, pageSizeOptions } from '../utils/helpers';
import { SkeletonContext } from '../index';

import {
  GridTableSkeletonWapper,
  LinkRendererWrapper,
  PdfRendererWrapper,
} from '../styles/investmentResearch.styles';

interface IRowData {
  contributor: string;
  analyst: string;
  dateTime: string;
  company: string;
  headline: string;
  type: string;
  pages: number;
  source: string;
}

const PdfRenderer = () => (
  <PdfRendererWrapper>
    <Button size={ButtonSize.XSMALL} rightIcon={<Icon size={Size.XXSMALL} icon={DOWNLOAD} />}>
      PDF
    </Button>
  </PdfRendererWrapper>
);

const LinkRenderer = (params: ICellRendererParams) => (
  <LinkRendererWrapper>
    <Link
      href="https://www.capitaliqdev.spglobal.com/apisv3/docviewer/documents?mid=-2123947702"
      isVisitedEnabled={false}
      target="_blank"
    >
      {params.value}
    </Link>
  </LinkRendererWrapper>
);

const generateRowsData = (length: number): IRowData[] => {
  const date = new Date('2020-04-05T15:00:00.000Z');
  const dateTime = getFormatedDate(date);

  const contributorArray = [
    'S and P Global Market Intelligence Energy',
    'S and P Global Market Intelligence Financial Institute',
    'S and P Global Market Intelligence Tech, Media, Telecon (Kagan)',
    'S and P Global Market Intelligence Metals and Mining',
  ];

  const anyalystArray = [
    'Lillian A. Federico',
    `Thomas "Tom" Mason`,
    'Keith Nissen',
    'Petter Leitzinger',
  ];

  const companyArray = [
    'Energy',
    'Financial Institute',
    'Tech, Media, Telecon (Kagan)',
    'Metals and Mining',
  ];

  const headlineArray = [
    'NJ governor moves quickly to name new Board of Public Utilities president',
    "Banking as a service still boosts banks' deposits but has its risks",
    'South Korea connected device ownership and branch preferences - 2023',
    'Digital multicast TV database: Channels grow as ATSC 3.0 broadens reach',
  ];

  const typeArray = ['Reports', 'Reports', 'Reports', 'Rating Changes'];

  let currentIndex = 0;

  return Array(length)
    .fill({})
    .map(() => {
      const data = {
        contributor: contributorArray[currentIndex],
        analyst: anyalystArray[currentIndex],
        dateTime: dateTime,
        company: companyArray[currentIndex],
        headline: headlineArray[currentIndex],
        type: typeArray[currentIndex],
        pages: currentIndex * 2 + 1,
        source: '',
      };
      currentIndex++;
      if (currentIndex === 4) currentIndex = 0;
      return data;
    });
};

const checkboxAndActionButtonColumnDefs: ColDef[] = [
  {
    field: 'contributor',
    headerTooltip: 'Contributor',
    suppressMovable: true,
    width: 200,
    minWidth: 60,
    maxWidth: 250,
    cellRenderer: LinkRenderer,
    wrapText: true,
    autoHeight: true,
  },
  {
    field: 'analyst',
    headerTooltip: 'Analyst',
    suppressMovable: true,
    width: 150,
    minWidth: 60,
    maxWidth: 200,
    cellRenderer: LinkRenderer,
    wrapText: true,
    autoHeight: true,
  },
  {
    field: 'dateTime',
    headerTooltip: `Date/Time`,
    suppressMovable: true,
    width: 150,
    minWidth: 60,
    maxWidth: 200,
  },
  {
    field: 'company',
    headerTooltip: `Company`,
    suppressMovable: true,
    width: 150,
    minWidth: 60,
    maxWidth: 200,
    cellRenderer: LinkRenderer,
    wrapText: true,
    autoHeight: true,
  },
  {
    field: 'headline',
    headerTooltip: `Headline`,
    suppressMovable: true,
    width: 450,
    minWidth: 60,
    maxWidth: 500,
    cellRenderer: LinkRenderer,
    wrapText: true,
    autoHeight: true,
  },
  {
    field: 'type',
    headerTooltip: `Type`,
    suppressMovable: true,
    width: 150,
    minWidth: 60,
    maxWidth: 200,
  },
  {
    field: 'pages',
    headerTooltip: `pages`,
    suppressMovable: true,
    width: 100,
    minWidth: 60,
    maxWidth: 100,
  },
  {
    field: 'source',
    headerTooltip: `source`,
    suppressMovable: true,
    width: 100,
    minWidth: 60,
    maxWidth: 100,
    cellRenderer: PdfRenderer,
  },
];

const GridTable = (): React.JSX.Element => {
  const args = {
    columnDefs: checkboxAndActionButtonColumnDefs,
    paginationPageSize: 20,
    rowData: generateRowsData(80),
    components: {
      checkboxRenderer: ActionGridCheckboxRenderer,
      headerActionButton: MultiActionButtonRenderer,
    },
  };

  const [selectedRowNodes, setSelectedRowNodes] = useState<IRowNode<IRowData>[]>([]);
  const { rowData, paginationPageSize } = args;
  const [currentPageData, setCurrentPageData] = useState<IRowData[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [currentPageSize, setCurrentPageSize] = useState<number>(paginationPageSize);

  const { initGridDataLoading, setInitGridDataLoading, dataLoadingTime } =
    useContext(SkeletonContext);

  useEffect(() => {
    console.log('initGridDataLoading', initGridDataLoading);
  }, [initGridDataLoading]);

  useEffect(() => {
    setInitGridDataLoading(true);
    setTimeout(() => setInitGridDataLoading(false), dataLoadingTime);
  }, []);

  const handleClickOnRowCheckbox = ({ node }: ICellRendererParams) => {
    node.setSelected(!node.isSelected());
  };

  const handleClickOnHeaderCheckbox = ({ api }: ICellRendererParams): void => {
    if (!currentPageData) return;

    if (selectedRowNodes.length < currentPageData.length) {
      api.selectAll();
    } else {
      api.deselectAll();
    }
  };

  const onRowSelected = (event: RowSelectedEvent<IRowData>): void => {
    const selectedNodes = event.api.getSelectedNodes();

    setSelectedRowNodes(selectedNodes);
  };

  const handleComponentStateChanged = (event: ComponentStateChangedEvent<IRowData>): void => {
    event.api.forEachNode((node) => {
      let selected: boolean | undefined;

      const foundSelectedNode = selectedRowNodes.find((rowNode) => rowNode.id === node.id);

      selected = foundSelectedNode ? foundSelectedNode.isSelected() : false;

      if (selected === undefined) {
        selected = false;
      }

      node.setSelected(selected);
    });
  };

  const onCellKeyDown = (e: CellKeyDownEvent<IRowData>): void => {
    if (
      e.colDef?.cellRenderer === 'headerActionButton' &&
      (e.event as KeyboardEvent).code === 'Space'
    ) {
      const btn = (e.event?.target as HTMLElement).querySelector('button');
      btn?.click();
    }
  };

  const columnDefs: ColDef<IRowData>[] = [
    {
      width: 24,
      minWidth: 24,
      maxWidth: 24,
      cellRenderer: 'checkboxRenderer',
      cellRendererParams: {
        onCheckboxClick: handleClickOnRowCheckbox,
      },
      headerComponent: 'checkboxRenderer',
      headerComponentParams: {
        checked: selectedRowNodes.length === currentPageData?.length,
        onCheckboxClick: handleClickOnHeaderCheckbox,
      },
    },
    {
      width: 28,
      minWidth: 28,
      maxWidth: 28,
      suppressKeyboardEvent: (params: SuppressKeyboardEventParams) => {
        const key = params.event.key;
        return key === Keys.SPACE;
      },
      cellRenderer: 'headerActionButton',
    },
    ...(args.columnDefs as ColDef<IRowData>[]),
  ];

  const handleChangePage = useCallback(
    (pageNumber: number) => setCurrentPageIndex(pageNumber - 1),
    [currentPageSize]
  );

  useEffect(() => {
    if (!currentPageSize) return;

    const currentPageRowData = rowData.slice(
      currentPageIndex * currentPageSize,
      currentPageIndex * currentPageSize + currentPageSize
    );

    setCurrentPageData(currentPageRowData);
  }, [currentPageIndex, currentPageSize]);

  return (
    <>
      {initGridDataLoading ? (
        <GridTableSkeletonWapper>
          <Skeleton loading={initGridDataLoading} count={1} />
        </GridTableSkeletonWapper>
      ) : (
        <>
          <AgGrid
            {...args}
            rowData={currentPageData}
            columnDefs={columnDefs}
            onCellKeyDown={onCellKeyDown}
            onRowCheckboxSelected={onRowSelected}
            onComponentStateChanged={handleComponentStateChanged}
          />
          <PaginationContainer style={{ marginTop: '14px' }}>
            <Pagination
              currentPage={1}
              defaultPageSize={currentPageSize}
              itemName=""
              onChange={handleChangePage}
              onChangePageSize={setCurrentPageSize}
              pageSizeOptions={pageSizeOptions}
              totalItems={rowData.length}
            />
          </PaginationContainer>
        </>
      )}
    </>
  );
};

export default GridTable;
