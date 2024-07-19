import React, { FC, useEffect, useRef, useState } from 'react';
import { ICellRendererParams } from '@ag-grid-community/core';
import {
  DockviewApi,
  DockviewDidDropEvent,
  DockviewReact,
  DockviewReadyEvent,
  IDockviewPanelProps,
  positionToDirection,
} from 'dockview';
import 'dockview/dist/styles/dockview.css';
import Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';

import '@spglobal/css-components/dist/css/koi-highcharts.css';
import { AgGrid } from '@spglobal/koi-grid';
//import { Default as DefaultHeader } from '@spglobal/koi-header/src/globalHeader/globalHeader.stories';
import { Classes, Color, Size } from '@spglobal/koi-helpers';
import { BARS, CATEGORY } from '@spglobal/koi-icons';
import { BingMap } from '@spglobal/koi-mini-map';
import {
  Accordion,
  accordionAppearance,
  AccordionItem,
  Button,
  ButtonRow,
  ComponentSize,
  ContextMenu,
  DropDown,
  DropDownGroup,
  DropDownItem,
  DropDownPlacement,
  Icon,
  IconButton,
  InputField,
  Link,
  MediaBody,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  TableGrid,
  Tabs,
} from '@spglobal/react-components';

import './styles/dashboard.css';
import { EllipseIcon, WidgetsIcon } from './utils/dashboardDesignIcon';
import ManageDashboard, { ITemplateData } from './components/ManageDashboard';
import { GeneralLayout } from '../../layouts';

const CustomTabRenderer = (e: IDockviewPanelProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tabTitle, setTabTitle] = useState(e.api.id);
  const [showModal, setShowModal] = useState(false);

  const handleIconClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDeleteClick = () => {
    e.api.close();
  };

  const handleRenameClick = () => {
    setIsEditing(true);
    setShowDropdown(false);
  };

  const handleTabTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTabTitle(event.target.value);
  };

  const handleSaveTabTitle = () => {
    setIsEditing(false);
  };
  const handleOpenModal = () => {
    setShowModal(true);
    setShowDropdown(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div
      style={{
        padding: '0px 6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {EllipseIcon}
      {isEditing ? (
        <InputField
          componentSize={Size.SMALL}
          type="text"
          value={tabTitle}
          onChange={handleTabTitleChange}
          onBlur={handleSaveTabTitle}
          autoFocus
        />
      ) : (
        <Tabs showMore={false} isPrimary={false}>
          <Tab id={e.api.id} title={tabTitle}></Tab>
        </Tabs>
      )}
      <Icon onContextMenu={handleIconClick} icon={BARS} />
      {showDropdown && (
        // <ContextMenu width={100}>
        <ContextMenu>
          <DropDownGroup>
            <DropDownItem>
              <Button onClick={handleRenameClick}>Rename</Button>
            </DropDownItem>
            <DropDownItem>
              <Button onClick={handleDeleteClick}>Close</Button>
            </DropDownItem>
            <DropDownItem>
              <Button onClick={handleOpenModal}>Setting</Button>
            </DropDownItem>
          </DropDownGroup>
        </ContextMenu>
      )}
      <>
        {showModal && (
          <>
            <Modal
              isOpen={showModal}
              ariaLabel="Modal"
              autoFocus
              backdropColor={Color.WHITE_TRANSPARENT}
              className="custom-class"
              enforceFocus
              hasBackdrop
              isOutlined
              onClose={handleCloseModal}
              usePortal
            >
              <ModalHeader title="News Edit">
                <ButtonRow>
                  <DropDown
                    disablePortal
                    placement={DropDownPlacement.RIGHT}
                    triggerElement={
                      <IconButton
                        className="spg-mr-xs"
                        icon={{
                          icon: [
                            'M4.5 11a1.5 1.5 0 0 1 1.415 1H14v1H5.914a1.5 1.5 0 0 1-2.828 0H2v-1h1.085A1.5 1.5 0 0 1 4.5 11m6-5a1.5 1.5 0 0 1 1.415 1H14v1h-2.086a1.5 1.5 0 0 1-2.828 0H2V7h7.085A1.5 1.5 0 0 1 10.5 6m-6-5a1.5 1.5 0 0 1 1.415 1H14v1H5.914a1.5 1.5 0 0 1-2.828 0H2V2h1.085A1.5 1.5 0 0 1 4.5 1',
                          ],
                          iconName: 'tools-filters',
                        }}
                        size="medium"
                      />
                    }
                  >
                    <DropDownGroup>
                      <DropDownItem>
                        <Button>Dropdown Item 1</Button>
                      </DropDownItem>
                      <DropDownItem>
                        <Button>Dropdown Item 2</Button>
                      </DropDownItem>
                    </DropDownGroup>
                  </DropDown>
                  <DropDown
                    disablePortal
                    placement={DropDownPlacement.RIGHT}
                    triggerElement={
                      <IconButton
                        className="spg-mr-xs"
                        icon={{
                          icon: [
                            'M9 0a1 1 0 0 1 1 1v1.342A6 6 0 0 1 11.9 3.439l1.163-.671a1 1 0 0 1 1.366.366l1 1.732a1 1 0 0 1-.366 1.366l-1.162.672a6 6 0 0 1 0 2.192l1.162.672a1 1 0 0 1 .366 1.366l-1 1.732a1 1 0 0 1-1.366.366l-1.163-.671A6 6 0 0 1 10 13.659V15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-1.341A6 6 0 0 1 4.1 12.56l-1.163.671a1 1 0 0 1-1.366-.366l-1-1.732a1 1 0 0 1 .366-1.366L2.1 9.096a6 6 0 0 1 0-2.192L.938 6.232a1 1 0 0 1-.366-1.366l1-1.732a1 1 0 0 1 1.366-.366l1.163.671A6 6 0 0 1 6 2.342V1a1 1 0 0 1 1-1zM8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6',
                          ],
                          iconName: 'gear',
                        }}
                        size="medium"
                      />
                    }
                  >
                    <DropDownGroup>
                      <DropDownItem>
                        <Button>Dropdown Item 1</Button>
                      </DropDownItem>
                      <DropDownItem>
                        <Button>Dropdown Item 2</Button>
                      </DropDownItem>
                    </DropDownGroup>
                  </DropDown>
                  <IconButton
                    icon={{
                      icon: [
                        'M8 12a2 2 0 1 1 0 4 2 2 0 0 1 0-4m0-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4m0-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4',
                      ],
                      iconName: 'action',
                    }}
                    size="medium"
                  />
                </ButtonRow>
              </ModalHeader>
              <ModalContent>
                <AgGrid
                  rowData={[
                    {
                      title:
                        'Dow Jones Industrial Average Tops 40000 for the First Time -- 2nd Update',
                      name: 'Dow Jones - Barrons.com',
                      time: '4:28 PM',
                    },
                    {
                      title: 'Dow Jones Industrial Average Tops 40000 for the First Time -- Update',
                      name: 'Market Intelligence',
                      time: '10:00 AM',
                    },
                    {
                      title: 'Dow Jones Industrial Average Tops 40000 for the First Time ',
                      name: 'Dow Jones - WSJ',
                      time: '12:05 PM',
                    },
                    {
                      title:
                        'Dow Jones Industrial Average Tops 40000 for the First Time -- 2nd Update',
                      name: 'Dow Jones - Barrons.com',
                      time: '4:28 PM',
                    },
                    {
                      title: 'Dow Jones Industrial Average Tops 40000 for the First Time -- Update',
                      name: 'Market Intelligence',
                      time: '10:00 AM',
                    },
                    {
                      title: 'Dow Jones Industrial Average Tops 40000 for the First Time ',
                      name: 'Dow Jones - WSJ',
                      time: '12:05 PM',
                    },
                    {
                      title:
                        'Dow Jones Industrial Average Tops 40000 for the First Time -- 2nd Update',
                      name: 'Dow Jones - Barrons.com',
                      time: '4:28 PM',
                    },
                    {
                      title: 'Dow Jones Industrial Average Tops 40000 for the First Time -- Update',
                      name: 'Market Intelligence',
                      time: '10:00 AM',
                    },
                    {
                      title: 'Dow Jones Industrial Average Tops 40000 for the First Time ',
                      name: 'Dow Jones - WSJ',
                      time: '12:05 PM',
                    },
                    {
                      title:
                        'Dow Jones Industrial Average Tops 40000 for the First Time -- 2nd Update',
                      name: 'Dow Jones - Barrons.com',
                      time: '4:28 PM',
                    },
                    {
                      title: 'Dow Jones Industrial Average Tops 40000 for the First Time -- Update',
                      name: 'Market Intelligence',
                      time: '10:00 AM',
                    },
                    {
                      title: 'Dow Jones Industrial Average Tops 40000 for the First Time ',
                      name: 'Dow Jones - WSJ',
                      time: '12:05 PM',
                    },
                    {
                      title:
                        'Dow Jones Industrial Average Tops 40000 for the First Time -- 2nd Update',
                      name: 'Dow Jones - Barrons.com',
                      time: '4:28 PM',
                    },
                    {
                      title: 'Dow Jones Industrial Average Tops 40000 for the First Time -- Update',
                      name: 'Market Intelligence',
                      time: '10:00 AM',
                    },
                    {
                      title: 'Dow Jones Industrial Average Tops 40000 for the First Time ',
                      name: 'Dow Jones - WSJ',
                      time: '12:05 PM',
                    },
                  ]}
                  columnDefs={[
                    {
                      field: 'title',
                      cellRenderer: (params: ICellRendererParams) => (
                        <Link href="#">{params.value}</Link>
                      ),
                    },
                    { field: 'name', maxWidth: 160 },
                    { field: 'time', maxWidth: 150, type: 'rightAligned' },
                  ]}
                />
              </ModalContent>
              <ModalFooter>
                <Button
                  className="spg-mr-md"
                  onClick={handleCloseModal}
                  purpose="primary"
                  text="Close"
                />
                <Button onClick={handleCloseModal} purpose="secondary" text="Close" />
              </ModalFooter>
            </Modal>
          </>
        )}
      </>
    </div>
  );
};
const components = {
  newsWire: () => {
    return (
      <AgGrid
        rowData={[
          {
            title: 'Dow Jones Industrial Average Tops 40000 for the First Time -- 2nd Update',
            name: 'Dow Jones',
            time: '4:28 PM',
          },
          {
            title: 'Netflix Reveals Big',
            name: 'Market Intelligence',
            time: '12:50 PM',
          },
          {
            title: 'Dow Jones Industrial Average Tops 40000 for the First Time -- Update',
            name: 'Dow Jones',
            time: '12:05 PM',
          },
          {
            title: 'Here is How the Dow Got to 40K. Thank Caterpillar and Goldman Sachs Stock. ',
            name: 'Dow Jones - Barrons.com',
            time: '10:45 AM',
          },
          {
            title: 'Dow Jones Industrial Average Tops 40000 for the First Time ',
            name: 'Dow Jones - WSJ',
            time: '10:32 AM',
          },
          {
            title: 'The Dow Just Hit 40,000 for First Time. What Comes Next. -- Barrons.com',
            name: 'Dow Jones - Barrons.com',
            time: '10:32 AM',
          },
          {
            title:
              'Netflix Stock Rises Amid Ad-Tier Subscriber Growth. What is Got Wall Street Excited.',
            name: 'Dow Jones - Barrons.com',
            time: '10:04 AM',
          },
          {
            title: 'Think AI Can Perceive Emotion? Think Again.',
            name: 'Dow Jones - WSJ',
            time: '10:00 AM',
          },
          {
            title: 'Press Release: Opera goes native for Windows on Arm',
            name: 'Market Intelligence',
            time: '8:45 AM',
          },
          {
            title: 'Netflix plans ad-tech platform; IBM to sell QRadar; Ingram Micro readies IPO',
            name: 'Dow Jones',
            time: '8:04 AM',
          },
          {
            title: 'Cisco, Dell, Microsoft, Amazon, and Other Tech Stocks in Focus Today',
            name: 'Dow Jones - Barrons.com',
            time: '7:50 AM',
          },
          {
            title:
              'Microsoft Asks Hundreds of China-Based AI Staff to Consider Relocating Amid U.S.-China Tensions -- Update',
            name: 'Dow Jones',
            time: '12:05 PM',
          },
          {
            title:
              'Netflix Reveals This Surprise Update. How It Could Help the Stock. -- Barrons.com',
            name: 'Dow Jones - Barrons.com',
            time: '7:31 AM',
          },
          {
            title: 'The 10-Point: The Wall Street',
            name: 'Dow Jones',
            time: '6:23 AM',
          },
          {
            title:
              'Sage Group Growth Prospects Still Promising Despite Guidance Cut -- Market Talk',
            name: 'Dow Jones',
            time: '4:18 AM',
          },
        ]}
        columnDefs={[
          {
            field: 'title',
            cellRenderer: (params: ICellRendererParams) => <Link href="#">{params.value}</Link>,
          },
          { field: 'name', maxWidth: 160 },
          { field: 'time', maxWidth: 150, type: 'rightAligned' },
        ]}
      />
    );
  },
  map: () => (
    <div className="spg-mx-md">
      <BingMap
        bingMapProps={{
          bingkey: 'AkzBACdR6Sxr4ai5F3eup8QFwc8TEsn_VBZAf11z8AFB4RXYOwt3_OgKE3UZLD-5',
          pageId: '4149660',
          zoomButtonsTooltipText:
            'Click to zoom a full step or press the “+” or “-” keys on your keyboard to perform a fractional zoom.',
        }}
        buttonTitle="Customize map"
        legend={[
          {
            Count: 38,
            Image:
              'iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAElSURBVDhPY6A2iGBg5bgHpP+DMSPTbyB/K5BtAJLEBTgY2LgOMogrfWSwi/3P4FMMwV75/xmMvP8zcAu+YWDnzIKqRQMgjQaev+Ca0DHIEDGldwxMHLFQHVDAxJLLIKP9CasmZAwygJXjI1CHBEQjCLCwvmZwSsWuAR2rmv9mYGRugeoEmsLC9hWrQmzYPPg/AxvHcaheBg0GDp6PWBViw5ZhIM3noXoZBBiYWX5gVYgNo9nMAAyE6wzWUdgVo2N5/S/AAC6B6gQDDwYhqfdYFSNj14z/wPB5C1TPAdEGAxw8ExgUjD9g1QTCII28ws+BKnGkNHbuVgYe4fcM+h6QgIFhJZPvQH++AqrAm0RBwIKBlX01OERhmImlBiguAJGmCmBgAAD6qcm9fBI+1wAAAABJRU5ErkJggg==',
            Title: 'Base Metals',
          },
          {
            Count: 60,
            Image:
              'iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAExSURBVDhPY6A2iGDmZrgHpP+DMCMTw28WHoatQLYBSBIX4GDlZzgoYMzwUbeD4b/5Cgg2XczwXyWP4T+HJMMbFgGGLKhaVADSqJTL8AumCR2DDBE0YnjHxMEQC9UCAUzsDLki9gyfsGlCxiADgF74CNQiAdEJBMwcDK8NJmPXgI6lghh+MzIztEC1MkgwczJ8xaYQG1avZPjPzMNwHKqXQYNVkOEjNoXYsGYd0Om8DOehehkEmNgYfmBTiA2j28wAjNfr2s3YFaNjMReGL0DLSqBawcCDR53hPTbFyNhoBtBWToa3QPUcEG1QAPT3BHFPhg/YNIEwSCOnDMNzoFLsKQ2YUFqBCt4rZUICBoYlfBi+AwPpFVAJ3iQKAhYs3AyrQSEKw0A/1gDFBSDSVAEMDAA2ztXZkNsjwQAAAABJRU5ErkJggg==',
            Title: 'Bulk Commodities',
          },
          {
            Count: 6,
            Image:
              'iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE3SURBVDhPY6A2iBDkZrgHpP+DMAsTw29hHoatQLYBSBIX4BDnZzjoZ8zw8Xwnw///KyH4+xKG/8vzGf6rSTK8kRBgyIKqRQUgjUtyGX7BNKFjkCE+RgzveDkYYqFaIICbnSE33p7hEzZNyBhkANALH4FaJCA6gQBo2uv7U7BrQMc1wQy/2ZkZWqBaGST4OBm+YlOIDW+vZPgvwsNwHKqXQUNakOEjNoXY8P56oNN5Gc5D9TIIcLIx/MCmEBtGt5lBiJfh+vEW7IrRcaYbwxcONoYSqFYw8LBWZ3iPTTEyfj6T4T8/J8NboHoOiDYokBFkmJDnxfABmyYQBmnUkWF4DlSKPaVJ8DO0askwvJ+fCQkYGC72YfguwsvwCqgEbxIFAQtg2l4NClEYBvqxBiguAJGmCmBgAACfDCIL8kNXuwAAAABJRU5ErkJggg==',
            Title: 'Precious Metals',
          },
          {
            Count: 20,
            Image:
              'iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEySURBVDhPY6A2iOBmZrgHpP+DMBMjw28eFoatQLYBSBIX4OBnZThoLMDwsUOX4f8KcwhebMrwP0+F4b8kB8MbARaGLKhaVADSmKvE8AumCR2DDDESZHjHwcQQC9UCAexMDLn2IgyfsGlCxiADgF74CNQiAdEJBBzMDK8nG2DXgI6DpBh+MzMytEC1MkhwMjN8xaYQG65UB9rOzHAcqpdBQ5CV4SM2hdhwnSbDf14WhvNQvQwCbEwMP7ApxIbRbWYAxuv1Zm3sitGxixjDF6BlJVCtYOChzsPwHptiZDzDiOE/MHzeAtVzQLRBAdDfEzzFGT5g0wTCII0ynAzPgUqxpzRgQmkFKnifqQQJGBj2kWD4DgykV0AleJMoCFhwszCsBoUoDAP9WAMUF4BIUwUwMAAAYZzV2cEjWyIAAAAASUVORK5CYII=',
            Title: 'Specialty Commodities',
          },
          {
            Count: 6170,
            Image:
              'iVBORw0KGgoAAAANSUhEUgAAAB4AAAAbCAYAAABr/T8RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABmSURBVEhLYxgFo4Au4L68usJjeXUHSjHIHKiRxIHH8qoNj+XV/lOOVRugRhIHBofFcmrfH8mpvScWg9RTxeJHcqr3gXg/Cfj+qMVEg0Fh8YAlLsrwULF4wIrMUTAKRsEoGAKAgQEA8nK1vFYadqsAAAAASUVORK5CYII=',
            Title: 'Mining Claims',
          },
        ]}
        mapContainerProps={{
          center: [-20, 119],
          height: 300,
          width: 800,
          zoom: 1,
        }}
      />
    </div>
  ),
  events: () => {
    return (
      <div style={{ padding: '1rem' }}>
        <MediaBody
          title={'Wednesday, May 15, 2024'}
          excerpt={'Conference	Excelerate Finance 2024'}
        />
        <MediaBody
          title={'Monday, May 20, 2024'}
          excerpt={
            'Conference	The 52nd J.P. Morgan Annual Global Technology, Media & Communications Conference'
          }
        />
        <MediaBody title={'Tuesday, May 21, 2024'} excerpt={'Conference	.NEXT 2024'} />
        <MediaBody
          title={'Wednesday, May 22, 2024'}
          excerpt={'Conference	Reuters Supply Chain USA 2024'}
        />
        <MediaBody title={'Wednesday, May 29, 2024'} excerpt={'Conference	CANSEC 2024'} />
        <MediaBody title={'Monday, June 3, 2024'} excerpt={'Conference	VeeamON 2024'} />
        <MediaBody title={'Tuesday, June 25, 2024'} excerpt={'Conference	Meltwater Summit 2024'} />
      </div>
    );
  },
  chart: () => {
    const lineOptions: Highcharts.Options = {
      chart: {
        styledMode: true,
        className: Classes.HIGHCHARTS_THEME,
      },
      title: {
        align: 'left',
        text: 'Amazing Inc. - Example Chart',
      },
      subtitle: {
        align: 'left',
        text: '12/25/2020 - 3/26/2021',
      },
      legend: {
        verticalAlign: 'top',
        itemDistance: 50,
      },
      tooltip: {
        shared: true,
      },
      xAxis: {
        title: {
          text: 'X Axis Values',
        },
        tickInterval: 1,
      },
      yAxis: {
        title: {
          text: 'Y Axis Values',
        },
      },
      series: [
        {
          type: 'line',
          name: 'Tokyo',
          data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        },
        {
          type: 'line',
          name: 'New York',
          data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5],
        },
        {
          type: 'line',
          name: 'Berlin',
          data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0],
        },
        {
          type: 'line',
          name: 'London',
          data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8],
        },
        {
          type: 'line',
          name: 'Madrid',
          data: [-2, -1.2, 2.8, 4.2, 7.1, 9.7, 12.0, 12.1, 10.2, 7.3, 4.6, 1.8],
        },
        {
          type: 'line',
          name: 'Rome',
          data: [1.9, 2.2, 4.7, 6.5, 9.9, 13.2, 15.0, 14.6, 12.2, 8.3, 4.6, 2.8],
        },
      ],
      credits: {
        enabled: false,
      },
    };
    return <HighchartsReact highcharts={Highcharts} options={lineOptions} />;
  },
  quote: () => {
    return (
      <div className="spg-d-flex ">
        <TableGrid
          className="spg-m-md"
          columns={[
            {
              path: 'name',
              title: 'name',
            },
            {
              path: 'number',
              title: 'number',
            },
          ]}
          data={[
            {
              name: 'YTD Pct. Change (%)',
              number: '-49.29%',
            },
            {
              name: '1 Year Pct. Change (%)',
              number: '-52.48%',
            },
            {
              name: '3 Year Pct. Change (%)',
              number: '-9.76%',
            },
            {
              name: 'Price/Book (CIQ) [Current] (x)',
              number: '3.73',
            },
            {
              name: 'Ask ($)',
              number: '169.95',
            },
            {
              name: 'Average Daily Volume [Current|3M]',
              number: '-',
            },
            {
              name: 'Volume',
              number: '18,655,056',
            },
            {
              name: 'Shares Outstanding [Current]',
              number: '-',
            },
          ]}
          hasHeader={false}
        />

        <TableGrid
          className="spg-m-md"
          columns={[
            {
              path: 'name',
              title: 'name',
            },
            {
              path: 'number',
              title: 'number',
            },
          ]}
          data={[
            {
              name: 'Dividend Yield [Current] (%)',
              number: '0.00%',
            },
            {
              name: 'Market Capitalization [Current] ($000)',
              number: '473,383,337.9',
            },
            {
              name: 'Total Enterprise Value (SNL) ($000)',
              number: '473,155,337.9',
            },
            {
              name: 'Beta Three Year [Country]',
              number: '0.03',
            },
            {
              name: '1 Week Pct. Change (%)',
              number: '+6.13%',
            },
            {
              name: '1 Month Pct. Change (%)',
              number: '+3.84%',
            },
            {
              name: 'Price/ EPS (CIQ) [Current] (x)',
              number: '12.81',
            },
          ]}
          hasHeader={false}
        />
      </div>
    );
  },
};

const DraggableElement = (props: { title: string }) => {
  const handleDragStart = (event: any) => {
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', props.title);
    }
  };

  return (
    <span tabIndex={-1} onDragStart={handleDragStart} draggable={true}>
      {props.title}
    </span>
  );
};

const DndDockview = (props: {
  renderVisibleOnly: boolean;
  theme?: string;
  defaultTemplateList?: any;
}) => {
  const [api, setApi] = useState<DockviewApi>();
  const [contentToShow, setContentToShow] = useState<string>('widgets');
  const [activeIcon, setActiveIcon] = useState<string>('widgets');
  const { defaultTemplateList } = props;
  const onReady = (event: DockviewReadyEvent) => {
    setApi(event.api);
  };

  const handleIconClick = (content: string) => {
    setContentToShow(content);
    setActiveIcon(content);
  };
  const onDidDrop = (event: DockviewDidDropEvent) => {
    const dataTransfer = event.nativeEvent.dataTransfer;
    const title = dataTransfer.getData('text/plain');
    let component;
    if (title === 'NewsWire') {
      component = 'newsWire';
    } else if (title === 'Events') {
      component = 'events';
    } else if (title === 'Maps') {
      component = 'map';
    } else if (title === 'Quote') {
      component = 'quote';
    } else if (title === 'Chart') {
      component = 'chart';
    } else {
      component = 'default';
    }
    const uniqueId = `${title}_${Date.now()}`;
    api?.addPanel({
      id: uniqueId,
      component: component,
      position: {
        direction: positionToDirection(event.position),
        referenceGroup: event.group || undefined,
      },
    });
  };

  const showDndOverlay = () => {
    return true;
  };

  useEffect(() => {
    if (defaultTemplateList?.length > 0) {
      defaultTemplateList.forEach((element: any) => {
        const data: any = element;
        api?.addPanel({
          id: data.id,
          component: data.component,
          position: {
            direction: data.position.direction,
            referenceGroup: data.position.group || undefined,
          },
        });
      });
    }
  }, [defaultTemplateList]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          paddingTop: '14px',
        }}
      >
        <div
          onClick={() => handleIconClick('widgets')}
          style={{
            borderLeft: activeIcon === 'widgets' ? '4px solid #8AB4F8' : 'none',
            padding: '8px 11px',
            cursor: 'pointer',
            backgroundColor: activeIcon === 'widgets' ? '#26364A' : 'transparent',
          }}
        >
          {WidgetsIcon}
        </div>
        <div
          style={{
            borderLeft: activeIcon === 'watchlist' ? '4px solid #8AB4F8' : 'none',
            padding: '8px 11px',
            cursor: 'pointer',
            backgroundColor: activeIcon === 'watchlist' ? '#26364A' : 'transparent',
          }}
        >
          <Icon icon={CATEGORY} onClick={() => handleIconClick('watchlist')} />
        </div>
      </div>
      <div
        style={{
          maxWidth: '226px',
          width: '100%',
          borderLeft: '2px solid black',
        }}
      >
        {contentToShow === 'widgets' && (
          <>
            <h3 className="spg-heading spg-heading spg-heading--xsmall spg-mt-md spg-pb-sm spg-pl-sm">
              Widgets
            </h3>

            <div className="spg-pl-sm ">
              <DraggableElement title="NewsWire" />
              <DraggableElement title="Events" />
              <DraggableElement title="Quote" />
              <DraggableElement title="Maps" />
              <DraggableElement title="Chart" />
            </div>
          </>
        )}
        {contentToShow === 'watchlist' && (
          <>
            <h3 className="spg-heading spg-heading spg-heading--xsmall  spg-mt-md spg-pb-sm spg-pl-sm">
              Watchlist
            </h3>
            <div className="spg-pl-sm">
              <Accordion appearance={accordionAppearance.light}>
                <AccordionItem header="News">Accordion Item Content 1</AccordionItem>
              </Accordion>
            </div>
          </>
        )}
      </div>

      <DockviewReact
        components={components}
        onReady={onReady}
        className={`${props.theme || 'dockview-all-themes'}`}
        onDidDrop={onDidDrop}
        showDndOverlay={showDndOverlay}
        defaultTabComponent={CustomTabRenderer}
      />
    </div>
  );
};

const DashboardDesign: FC = () => {
  const [tabs, setTabs] = useState([
    { id: 't1', title: 'Tab 1' },
    { id: 't2', title: 'Tab 2' },
    { id: 't3', title: 'Tab 3' },
  ]);
  const [activeTab, setActiveTab] = useState('t1');
  const [openDropdownTab, setOpenDropdownTab] = useState<string | null>(null);
  const [editTabId, setEditTabId] = useState<string | null>(null);
  const [editTabTitle, setEditTabTitle] = useState<string>('');
  const [showManageDashboardModal, setShowManageDashboardModal] = useState<boolean>(false);
  const [defaultTemplateList, setDefaultTemplateList] = useState<any>(null);

  const totalTabsRef = useRef(tabs.length);

  const handleActiveTab = (tabId: string) => {
    setTimeout(() => {
      const element: HTMLElement = document.querySelector(`li[data-tab-id='${tabId}']`);
      element.focus();
    }, 0);
    setActiveTab(tabId);
    setDefaultTemplateList(null);
    setShowManageDashboardModal(true);
  };

  const addNewTab = () => {
    setTabs((prevTabs) => {
      totalTabsRef.current += 1;
      const newTabId = `t${totalTabsRef.current}`;
      const newTab = { id: newTabId, title: `Tab ${totalTabsRef.current}` };
      handleActiveTab(newTabId);
      return [...prevTabs, newTab];
    });
  };
  const handleRemoveTab = (tabId: string) => {
    setTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== tabId));
    if (activeTab === tabId) {
      const newActiveTab = tabs.length > 1 ? tabs[0].id : '';
      setActiveTab(newActiveTab);
    }
    setOpenDropdownTab(null);
  };
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };
  const handleTabContextMenu = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, tabId: string) => {
    e.preventDefault();
    setOpenDropdownTab(tabId);
  };
  const handleEditTab = (tabId: string) => {
    const tabToEdit = tabs.find((tab) => tab.id === tabId);
    if (tabToEdit) {
      setEditTabId(tabId);
      setEditTabTitle(tabToEdit.title);
      setOpenDropdownTab(null);
    }
  };

  const handleEditTabTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTabTitle(e.target.value);
  };

  const handleSaveTabTitle = () => {
    if (editTabId) {
      setTabs((prevTabs) =>
        prevTabs.map((tab) => (tab.id === editTabId ? { ...tab, title: editTabTitle } : tab))
      );
      setEditTabId(null);
    }
  };
  const handleDuplicateTab = (tabId: string) => {
    const tabToDuplicate = tabs.find((tab) => tab.id === tabId);
    if (tabToDuplicate) {
      const newTabId = `t${totalTabsRef.current + 1}`;
      const newTab = { id: newTabId, title: `${tabToDuplicate.title} Copy` };
      setTabs((prevTabs) => [...prevTabs, newTab]);
      totalTabsRef.current += 1;
    }
  };

  const handleOpenTemplate = (templateData: ITemplateData) => {
    setDefaultTemplateList(templateData);
  };

  return (
    <GeneralLayout showFooter={false}>
      <div className="spg-layout__header">
        {/* {DefaultHeader.render(
          {
            ...DefaultHeader.args,
            children: null,
          },
          context
        )} */}
      </div>
      <div className="spg-ml-xs ">
        <Tabs
          addNewTab={addNewTab}
          addNewTabId="add-new-tab"
          alignment="left"
          id="scroll-container"
          isAddNewTabAvailable
          isPageLevel
          isSeparated
          leftElement={null}
          moreButtonTitle=""
          onChange={handleTabChange}
          resizeDelay={3000}
          rightElement={null}
          selectedTabId={activeTab}
          showMore
          isPrimary={false}
          skeletonConfig={{
            animation: true,
            loading: false,
          }}
          tabsContainerTabIndex={-1}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              id={tab.id}
              title={
                tab.id === editTabId ? (
                  <InputField
                    componentSize={ComponentSize.SMALL}
                    type="text"
                    value={editTabTitle}
                    onChange={handleEditTabTitleChange}
                    onBlur={handleSaveTabTitle}
                    autoFocus
                  />
                ) : (
                  tab.title
                )
              }
              onChange={() => setActiveTab(tab.id)}
              onContextMenu={(e) => handleTabContextMenu(e, tab.id)}
            />
          ))}
        </Tabs>
      </div>
      <div>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            style={{
              display: activeTab === tab.id ? 'block' : 'none',
              height: 'calc(100vh - 100px)',
            }}
          >
            <DndDockview renderVisibleOnly={true} defaultTemplateList={defaultTemplateList} />
          </div>
        ))}
      </div>
      {openDropdownTab && (
        <ContextMenu>
          <DropDownGroup>
            <DropDownItem>
              <Button onClick={() => handleEditTab(openDropdownTab)}>Edit</Button>
            </DropDownItem>
            <DropDownItem>
              <Button disabled={tabs.length == 1} onClick={() => handleRemoveTab(openDropdownTab)}>
                Delete
              </Button>
            </DropDownItem>
            <DropDownItem>
              <Button onClick={() => handleDuplicateTab(openDropdownTab)}>Duplicate</Button>
            </DropDownItem>
          </DropDownGroup>
        </ContextMenu>
      )}
      <ManageDashboard
        showModal={showManageDashboardModal}
        handleCloseModal={() => setShowManageDashboardModal(false)}
        handleOpenTemplate={(data: ITemplateData) => handleOpenTemplate(data)}
      />
    </GeneralLayout>
  );
};

export default DashboardDesign;
