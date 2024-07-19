/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-empty-function */
import classNames from 'classnames';
import Slider from 'rc-slider';
import * as React from 'react';
import { useState } from 'react';

import {
  GlobalHeader,
  GlobalHeaderContent,
  GlobalHeaderNavMobileWrapper,
  GlobalHeaderPlatformSelector,
  GlobalHeaderPlatformSelectorItem,
  GlobalHeaderUserSection,
  GlobalHeaderUserSectionIcon,
  GlobalHeaderUserSectionPopover,
  GlobalHeaderUserSectionQuickSupport,
  GlobalHeaderUserSectionTitleLink,
} from '@spglobal/koi-header';

// import { HeaderLogo } from '@spglobal/koi-header/src/header';
// import { Header, HeaderSearch } from '@spglobal/koi-header/src/header';

import { HeaderLogo } from './components/headerLogo/headerLogo';
import { HeaderSearch } from './components/headerSearch/headerSearch';
import {
  BreakPoint,
  Classes,
  Purpose,
  Size,
  SpacingSide,
  SpacingSize,
  SpacingType,
} from '@spglobal/koi-helpers';
import {
  BELL,
  CARET_UP,
  CHAT,
  CIRCLE_HELP,
  CIRCLE_INFO,
  EMAIL,
  EXTERNAL_LINK,
  FOLDER,
  LOCK,
  PHONE,
  USER,
} from '@spglobal/koi-icons';
import { Select } from '@spglobal/koi-select';
import {
  ITopMenuItemsOrder,
  MobileNavBasicButton,
  MobileNavHeader,
  MobileNavWrapper,
  TopNav,
  TopNavDropDownColumn,
  TopNavDropDownGroup,
  TopNavDropDownSubGroup,
  TopNavGroupLinkItem,
  TopNavLinkItem,
  TopNavMenuItem,
  VerticalTabItem,
  VerticalTabs,
  ShortcutEntity,
  ShortcutItem,
  ShortcutLabeledItem,
  Shortcuts,
  ShortcutsList,
} from '@spglobal/koi-top-nav';
//import * as mockShortcutsData from '@spglobal/koi-top-nav/src/shortcuts/mockShortcuts.json';
import mockShortcutsData from './utils/mockShortcuts.json';
import {
  Accordion,
  AccordionItem,
  Button,
  Divider,
  FormGroup,
  Icon,
  PositioningStrategy,
  Radio,
  RadioGroup,
  Switch,
  Tab,
  Tabs,
  Tooltip,
  TooltipPlacement,
  TooltipTriggerEvent,
  useIsBreakpoint,
} from '@spglobal/react-components';

import { AccordianList, OverLayHead, TextSizeSlider } from './styles/header.styles';

const capitalIQLogo =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNS4yLjMsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxNzQgNDgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE3NCA0ODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2Rpc3BsYXk6bm9uZTt9DQoJLnN0MXtkaXNwbGF5OmlubGluZTtmaWxsOiNENzFGMkQ7fQ0KCS5zdDJ7ZGlzcGxheTppbmxpbmU7fQ0KCS5zdDN7ZmlsbDojMDEwMTAxO30NCgkuc3Q0e2ZpbGw6I0ZGRkZGRjt9DQoJLnN0NXtmaWxsOiNENzFGMkQ7fQ0KPC9zdHlsZT4NCjxnIGNsYXNzPSJzdDAiPg0KCTxyZWN0IHg9IjE0NC45IiB5PSIxMC4xOCIgY2xhc3M9InN0MSIgd2lkdGg9IjI5LjEiIGhlaWdodD0iMTMuODUiLz4NCgk8ZyBjbGFzcz0ic3QyIj4NCgkJPHBhdGggY2xhc3M9InN0MyIgZD0iTTExLjg1LDMzLjkyYy0xLjE4LDEuMjMtMywxLjY4LTQuOSwxLjY4Yy0xLjYzLDAtMy40LTAuNDUtNC42OC0xLjU5Yy0wLjkxLTAuODItMS42My0yLjEzLTEuNjMtMy42M2gyLjkxDQoJCQljMCwwLjc3LDAuMzYsMS40NSwwLjgyLDEuOTFjMC42OCwwLjY4LDEuNzIsMC44MiwyLjYzLDAuODJjMS4wOSwwLDIuMDktMC4yMywyLjcyLTAuODJjMC4zNi0wLjM2LDAuNjQtMC43MywwLjY0LTEuNQ0KCQkJYzAtMS4xMy0wLjg2LTEuNjgtMS44Ni0xLjg2Yy0xLjA0LTAuMTgtMi40MS0wLjIzLTMuNDUtMC40MWMtMi4xMy0wLjM2LTMuOTUtMS43Ny0zLjk1LTQuMzZjMC0xLjIzLDAuNTQtMi4yNywxLjM2LTMuMDkNCgkJCWMxLjA0LTEsMi43Ny0xLjYzLDQuNTgtMS42M2MxLjY4LDAsMy4zMSwwLjU0LDQuMzYsMS41YzAuOTEsMC44NiwxLjU0LDIuMDQsMS41OSwzLjMxaC0yLjkxYzAtMC41NC0wLjMyLTEuMTMtMC42OC0xLjU0DQoJCQljLTAuNS0wLjU0LTEuNTQtMC44Mi0yLjM2LTAuODJjLTAuODYsMC0xLjkxLDAuMTgtMi41NCwwLjg2Yy0wLjMyLDAuMzYtMC41NCwwLjczLTAuNTQsMS4zMmMwLDEsMC42OCwxLjU0LDEuNTksMS42OA0KCQkJYzEsMC4xNCwyLjM2LDAuMjcsMy40LDAuNDFjMi4zMiwwLjMyLDQuMjcsMS44Niw0LjI3LDQuNDlDMTMuMTcsMzIuMTUsMTIuNjIsMzMuMTksMTEuODUsMzMuOTJ6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0yNS40NywzNS4zM2wtMS4wOS0xLjIzYy0xLjI3LDEuMDktMi44MSwxLjYzLTQuNCwxLjYzYy0yLjc3LDAtNS4xNy0xLjgyLTUuMTctNC43Mg0KCQkJYzAtMS45NSwxLjEzLTMuMjcsMi43Ny00LjI3Yy0xLTEuMDktMS42OC0xLjk1LTEuNjgtMy40YzAtMi40NSwxLjkxLTMuOTUsNC4yNy0zLjk1YzIuMjcsMCw0LjMxLDEuNDEsNC4zMSwzLjg2DQoJCQljMCwyLjA0LTEuMjMsMy4xOC0yLjk1LDQuMThsMi43MiwyLjk1YzAuMjctMC41LDAuMzYtMS4xOCwwLjQxLTEuOTFjMC4wNS0wLjY4LDAuMDUtMS40MSwwLjA1LTEuOTFoNC4wNHYyLjE4aC0xLjgyDQoJCQljLTAuMDUsMS4yMy0wLjI3LDIuNDUtMC45NSwzLjVjMSwxLjA0LDEuOTEsMi4wOSwyLjg2LDMuMTNoLTMuMzZWMzUuMzN6IE0xOS4xNiwyOC40M2MtMS4wNCwwLjY0LTEuODYsMS4xMy0xLjg2LDIuNDUNCgkJCWMwLDEuNTksMS4zMiwyLjQ1LDIuODEsMi40NWMwLjkxLDAsMS45NS0wLjIzLDIuNjMtMC45NUMyMS41MiwzMS4wNiwyMC4zOSwyOS43NCwxOS4xNiwyOC40M3ogTTIwLjE2LDIxLjY2DQoJCQljLTAuOTEsMC0xLjcyLDAuNTQtMS43MiwxLjYzYzAsMSwwLjgyLDEuNzIsMS40NSwyLjQxYzAuOTUtMC41NCwyLTEuMDQsMi0yLjMyQzIxLjg4LDIyLjMsMjEuMTYsMjEuNjYsMjAuMTYsMjEuNjZ6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0zNy4wNSwyOS43NGgtMy4zMXY1LjU4aC0yLjgxVjE5Ljc2aDYuMTNjMy41OSwwLDUuNDksMiw1LjQ5LDQuOTlDNDIuNTQsMjcuNyw0MC42MywyOS43NCwzNy4wNSwyOS43NHoNCgkJCSBNMzYuOTUsMjIuMjFoLTMuMTh2NS4wNGgzLjE4YzEuOTEsMCwyLjc3LTEsMi43Ny0yLjVTMzguODIsMjIuMjEsMzYuOTUsMjIuMjF6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik01OS4xMSwzMy43OGMtMS4xOCwxLjE4LTIuODEsMS44Ni00LjQ1LDEuODZjLTEuNjgsMC0zLjIyLTAuNTQtNC40LTEuNzJjLTEuNjgtMS42OC0xLjk1LTMuNzctMS45NS02LjMxDQoJCQlzMC4yMy00LjYzLDEuOTUtNi4zMWMxLjE4LTEuMTgsMi43Ny0xLjc3LDQuNC0xLjc3YzEuNjgsMCwzLjMxLDAuNjQsNC40NSwxLjgyYzAuOTEsMC45MSwxLjM2LDIuMTMsMS41LDMuNEg1Ny43DQoJCQljLTAuMDUtMC42OC0wLjMyLTEuMTgtMC42OC0xLjYzYy0wLjUtMC42NC0xLjQxLTAuOTUtMi4zNi0wLjk1Yy0wLjkxLDAtMS43NywwLjM2LTIuNDEsMS4wNGMtMS4wOSwxLjEzLTEuMDksMy4wNC0xLjA5LDQuNDkNCgkJCWMwLDEuNDEsMCwzLjM2LDEuMDksNC40OWMwLjY0LDAuNjgsMS41LDEuMDQsMi40MSwxLjA0YzAuOTUsMCwxLjg2LTAuMzYsMi4zNi0xYzAuNDEtMC41LDAuNjQtMS4wNCwwLjY4LTEuNzJoMi45MQ0KCQkJQzYwLjQ3LDMxLjYxLDYwLjAxLDMyLjgzLDU5LjExLDMzLjc4eiIvPg0KCQk8cGF0aCBjbGFzcz0ic3QzIiBkPSJNNzEuMDUsMzUuNTFjLTEuMTgsMC0xLjg2LTAuNzMtMS45NS0xLjU5Yy0wLjU0LDAuOTEtMS44NiwxLjcyLTMuNSwxLjcyYy0yLjcyLDAtNC4xMy0xLjcyLTQuMTMtMy41OQ0KCQkJYzAtMi4xOCwxLjY4LTMuNDUsMy44Ni0zLjU5bDMuMzYtMC4yM3YtMC42OGMwLTEuMDktMC4zNi0xLjgyLTEuOTUtMS44MmMtMS4yNywwLTIuMDQsMC41OS0yLjA5LDEuNjNoLTIuNjgNCgkJCWMwLjE0LTIuNTksMi4xOC0zLjcyLDQuNzctMy43MmMxLjk1LDAsMy42MywwLjY0LDQuMjcsMi4zMmMwLjI3LDAuNzMsMC4zMiwxLjU0LDAuMzIsMi4zMnY0LjIyYzAsMC41NCwwLjE4LDAuNzMsMC42NCwwLjczDQoJCQljMC4xOCwwLDAuMzYtMC4wNSwwLjM2LTAuMDV2Mi4wNEM3MS45NSwzNS4zNyw3MS43MywzNS41MSw3MS4wNSwzNS41MXogTTY4LjczLDMwLjI0bC0yLjkxLDAuMjNjLTAuODIsMC4wNS0xLjYzLDAuNTktMS42MywxLjUNCgkJCWMwLDAuODYsMC43NywxLjQxLDEuNjMsMS40MWMxLjcyLDAsMi45MS0wLjkxLDIuOTEtMi42M1YzMC4yNHoiLz4NCgkJPHBhdGggY2xhc3M9InN0MyIgZD0iTTgyLjg5LDM0LjY5Yy0wLjczLDAuNTktMS42MywwLjkxLTIuODEsMC45MWMtMS4zNiwwLTIuNDUtMC41LTMtMS4xM3Y1LjIyaC0yLjc3di0xNS44aDIuMzZsMC4yMywxLjI3DQoJCQljMC42OC0xLjA0LDEuOTUtMS41LDMuMjItMS41YzEuMTMsMCwyLjA5LDAuNDEsMi43NywwLjk1YzEuMzYsMS4xMywyLjA0LDIuODEsMi4wNCw0Ljk5Qzg0Ljk0LDMxLjgzLDg0LjI2LDMzLjU2LDgyLjg5LDM0LjY5eg0KCQkJIE04MS40LDI2Ljg0Yy0wLjQxLTAuNS0xLTAuOTEtMS44Ni0wLjkxYy0yLjEzLDAtMi41OSwyLjA0LTIuNTksMy42OGMwLDEuNjMsMC40NSwzLjY4LDIuNTksMy42OGMwLjg2LDAsMS40NS0wLjQxLDEuODYtMC45MQ0KCQkJYzAuNTktMC43MywwLjczLTEuNzcsMC43My0yLjc3QzgyLjEyLDI4LjY2LDgxLjk5LDI3LjYxLDgxLjQsMjYuODR6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik04Ny4wNywyMi4zdi0yLjgxaDIuOTV2Mi44MUg4Ny4wN3ogTTg3LjE2LDM1LjMzVjIzLjg5aDIuODF2MTEuNDRIODcuMTZ6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik05Ny4wNiwzNS40NmMtMi4zMiwwLTMuNDUtMS4zMi0zLjQ1LTMuNXYtNS44MWgtMi4wOXYtMi4yN2gyLjA5di0yLjkxbDIuNzctMC42OHYzLjU5aDIuODZ2Mi4yN2gtMi44NnY1LjU4DQoJCQljMCwwLjg2LDAuNDEsMS4yNywxLjI3LDEuMjdjMC41OSwwLDEuMDQsMCwxLjc3LTAuMDl2Mi4zMkM5OC42NSwzNS4zNyw5Ny44NywzNS40Niw5Ny4wNiwzNS40NnoiLz4NCgkJPHBhdGggY2xhc3M9InN0MyIgZD0iTTEwOS44NiwzNS41MWMtMS4xOCwwLTEuODYtMC43My0xLjk1LTEuNTljLTAuNTQsMC45MS0xLjg2LDEuNzItMy41LDEuNzJjLTIuNzIsMC00LjEzLTEuNzItNC4xMy0zLjU5DQoJCQljMC0yLjE4LDEuNjgtMy40NSwzLjg2LTMuNTlsMy4zNi0wLjIzdi0wLjY4YzAtMS4wOS0wLjM2LTEuODItMS45NS0xLjgyYy0xLjI3LDAtMi4wNCwwLjU5LTIuMDksMS42M2gtMi42OA0KCQkJYzAuMTQtMi41OSwyLjE4LTMuNzIsNC43Ny0zLjcyYzEuOTUsMCwzLjYzLDAuNjQsNC4yNywyLjMyYzAuMjcsMC43MywwLjMyLDEuNTQsMC4zMiwyLjMydjQuMjJjMCwwLjU0LDAuMTgsMC43MywwLjY0LDAuNzMNCgkJCWMwLjE4LDAsMC4zNi0wLjA1LDAuMzYtMC4wNXYyLjA0QzExMC43NywzNS4zNywxMTAuNTQsMzUuNTEsMTA5Ljg2LDM1LjUxeiBNMTA3LjU0LDMwLjI0bC0yLjkxLDAuMjMNCgkJCWMtMC44MiwwLjA1LTEuNjMsMC41OS0xLjYzLDEuNWMwLDAuODYsMC43NywxLjQxLDEuNjMsMS40MWMxLjcyLDAsMi45MS0wLjkxLDIuOTEtMi42M1YzMC4yNHoiLz4NCgkJPHBhdGggY2xhc3M9InN0MyIgZD0iTTExNi4yMSwzNS40NmMtMS44NiwwLTMuMTMtMC45MS0zLjEzLTMuMDlWMTkuNDRoMi43N3YxMi40OGMwLDAuNjgsMC4xNCwxLjA5LDEuMDksMS4wOQ0KCQkJYzAuMjMsMCwwLjMyLDAsMC40NSwwdjIuMzJDMTE2Ljg1LDM1LjQyLDExNi43NiwzNS40NiwxMTYuMjEsMzUuNDZ6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0xMjMuNTcsMzUuMzNWMTkuNzZoMi44NnYxNS41N0gxMjMuNTd6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0xMzkuNzMsMzMuODNsMS4zNiwxLjcybC0xLjY4LDEuMzJsLTEuNDUtMS44MmMtMC44NiwwLjM2LTEuNzcsMC41NC0yLjcyLDAuNTRjLTEuNjgsMC0zLjMxLTAuNTktNC40OS0xLjc3DQoJCQljLTEuNjgtMS42OC0yLTMuNzctMi02LjMxczAuMjctNC42MywyLTYuMzFjMS4xOC0xLjE4LDIuODEtMS43Nyw0LjQ5LTEuNzdjMS42OCwwLDMuMzEsMC41OSw0LjQ5LDEuNzdjMS42OCwxLjY4LDIsMy43NywyLDYuMzENCgkJCUMxNDEuNjgsMzAuMTEsMTQxLjM2LDMyLjE1LDEzOS43MywzMy44M3ogTTEzNy42OCwyMy4wN2MtMC42NC0wLjY4LTEuNTQtMS4wNC0yLjQ1LTEuMDRzLTEuODYsMC4zNi0yLjQ1LDEuMDQNCgkJCWMtMS4wOSwxLjEzLTEuMTMsMy4wNC0xLjEzLDQuNDljMCwxLjQxLDAuMDUsMy4zNiwxLjEzLDQuNDVjMC42NCwwLjY4LDEuNTQsMS4wNCwyLjQ1LDEuMDRjMC4zMiwwLDAuNjgtMC4wNSwxLTAuMTRsLTEuNjgtMi4wOQ0KCQkJbDEuNzItMS4zNmwxLjcyLDIuMThjMC43Ny0xLjEzLDAuODItMi44MSwwLjgyLTQuMDlDMTM4Ljc3LDI2LjExLDEzOC43MywyNC4xNiwxMzcuNjgsMjMuMDd6Ii8+DQoJPC9nPg0KCTxnIGNsYXNzPSJzdDIiPg0KCQk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNMTUyLjg5LDE4LjA4aC0xLjV2Mi41NGgtMS4yN3YtNy4wOGgyLjc3YzEuNjMsMCwyLjUsMC45MSwyLjUsMi4yN0MxNTUuMzksMTcuMTcsMTU0LjUzLDE4LjA4LDE1Mi44OSwxOC4wOHoNCgkJCSBNMTUyLjg1LDE0LjY3aC0xLjQ1djIuMjdoMS40NWMwLjg2LDAsMS4yMy0wLjQ1LDEuMjMtMS4xM0MxNTQuMDcsMTUuMTMsMTUzLjcxLDE0LjY3LDE1Mi44NSwxNC42N3oiLz4NCgkJPHBhdGggY2xhc3M9InN0NCIgZD0iTTE2MC40NywyMC42MmwtMS4xOC0yLjY4aC0xLjU5djIuNjhoLTEuMzJ2LTcuMDhoM2MxLjY4LDAsMi40NSwxLjA0LDIuNDUsMi4xOGMwLDAuOTUtMC41LDEuNjgtMS4zMiwyDQoJCQlsMS4zMiwyLjkxSDE2MC40N3ogTTE1OS40MywxNC42N2gtMS42OHYyLjEzaDEuNzJjMC43MywwLDEuMTMtMC4zNiwxLjEzLTEuMDRDMTYwLjYxLDE1LjE3LDE2MC4xNSwxNC42NywxNTkuNDMsMTQuNjd6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik0xNjcuNjksMTkuOTRjLTAuNTQsMC41NC0xLjI3LDAuODItMi4wNCwwLjgyYy0wLjc3LDAtMS41LTAuMjctMi4wNC0wLjgyYy0wLjc3LTAuNzctMC45MS0xLjcyLTAuOTEtMi44Ng0KCQkJYzAtMS4xMywwLjE0LTIuMDksMC45MS0yLjg2YzAuNTQtMC41NCwxLjI3LTAuODIsMi4wNC0wLjgyYzAuNzcsMCwxLjUsMC4yNywyLjA0LDAuODJjMC43NywwLjc3LDAuOTEsMS43MiwwLjkxLDIuODYNCgkJCUMxNjguNiwxOC4yMSwxNjguNDYsMTkuMTcsMTY3LjY5LDE5Ljk0eiBNMTY2Ljc4LDE1LjA0Yy0wLjI3LTAuMzItMC43My0wLjQ1LTEuMTMtMC40NWMtMC40MSwwLTAuODIsMC4xOC0xLjEzLDAuNDUNCgkJCWMtMC41LDAuNS0wLjUsMS40MS0wLjUsMi4wNGMwLDAuNjQsMCwxLjUsMC41LDIuMDRjMC4yNywwLjMyLDAuNzMsMC40NSwxLjEzLDAuNDVjMC40MSwwLDAuODItMC4xOCwxLjEzLTAuNDUNCgkJCWMwLjUtMC41LDAuNS0xLjM2LDAuNS0yLjA0UzE2Ny4yNCwxNS41NCwxNjYuNzgsMTUuMDR6Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPHJlY3QgeD0iMTQ0LjkiIHk9IjkuOTgiIGNsYXNzPSJzdDUiIHdpZHRoPSIyOS4xIiBoZWlnaHQ9IjEzLjg1Ii8+DQoJPGc+DQoJCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik0xMS44NSwzMy43N2MtMS4xOCwxLjE4LTMsMS42OC00LjksMS42OGMtMS42MywwLTMuNC0wLjQ1LTQuNjgtMS41OWMtMC45MS0wLjgyLTEuNjMtMi4xMy0xLjYzLTMuNjNoMi45MQ0KCQkJYzAsMC43NywwLjM2LDEuNDUsMC44MiwxLjkxYzAuNjgsMC42OCwxLjcyLDAuODIsMi42MywwLjgyYzEuMDksMCwyLjA5LTAuMjMsMi43Mi0wLjgyYzAuMzYtMC4zNiwwLjY0LTAuNzMsMC42NC0xLjUNCgkJCWMwLTEuMTMtMC44Ni0xLjY4LTEuODYtMS44NmMtMS4wNC0wLjE4LTIuNDEtMC4yMy0zLjQ1LTAuNDFDMi45MSwyOCwxLjA5LDI2LjYsMS4wOSwyNC4wMWMwLTEuMjMsMC41NC0yLjI3LDEuMzYtMy4wOQ0KCQkJYzEuMDQtMSwyLjc3LTEuNjMsNC41OC0xLjYzYzEuNjgsMCwzLjMxLDAuNTQsNC4zNiwxLjVjMC45MSwwLjg2LDEuNTQsMi4wNCwxLjU5LDMuMzFoLTIuOTFjMC0wLjU0LTAuMzItMS4xMy0wLjY4LTEuNTQNCgkJCWMtMC41LTAuNTQtMS41NC0wLjgyLTIuMzYtMC44MmMtMC44NiwwLTEuOTEsMC4xOC0yLjU0LDAuODZjLTAuMzIsMC4zNi0wLjU0LDAuNzMtMC41NCwxLjMyYzAsMSwwLjY4LDEuNTQsMS41OSwxLjY4DQoJCQljMSwwLjE0LDIuMzYsMC4yNywzLjQsMC40MWMyLjMyLDAuMzIsNC4yNywxLjg2LDQuMjcsNC40OUMxMy4xNywzMS45NSwxMi42MiwzMywxMS44NSwzMy43N3oiLz4NCgkJPHBhdGggY2xhc3M9InN0NCIgZD0iTTI1LjQ3LDM1LjE4bC0xLjA5LTEuMjNjLTEuMjcsMS4wOS0yLjgxLDEuNjMtNC40LDEuNjNjLTIuNzcsMC01LjE3LTEuODItNS4xNy00LjcyDQoJCQljMC0xLjk1LDEuMTMtMy4yNywyLjc3LTQuMjdjLTEtMS4wOS0xLjY4LTEuOTUtMS42OC0zLjRjMC0yLjQ1LDEuOTEtMy45NSw0LjI3LTMuOTVjMi4yNywwLDQuMzEsMS40MSw0LjMxLDMuODYNCgkJCWMwLDIuMDQtMS4yMywzLjE4LTIuOTUsNC4xOGwyLjcyLDIuOTVjMC4yNy0wLjUsMC4zNi0xLjE4LDAuNDEtMS45MWMwLjA1LTAuNjgsMC4wNS0xLjQxLDAuMDUtMS45MWg0LjA0djIuMThoLTEuODINCgkJCWMtMC4wNSwxLjIzLTAuMjcsMi40NS0wLjk1LDMuNWMxLDEuMDQsMS45MSwyLjA5LDIuODYsMy4xM2gtMy4zNlYzNS4xOHogTTE5LjIxLDI4LjI4Yy0xLjA0LDAuNjQtMS44NiwxLjEzLTEuODYsMi40NQ0KCQkJYzAsMS41OSwxLjMyLDIuNDUsMi44MSwyLjQ1YzAuOTEsMCwxLjk1LTAuMjMsMi42My0wLjk1QzIxLjUyLDMwLjg2LDIwLjM5LDI5LjU5LDE5LjIxLDI4LjI4eiBNMjAuMTYsMjEuNDcNCgkJCWMtMC45MSwwLTEuNzIsMC41NC0xLjcyLDEuNjNjMCwxLDAuODIsMS43MiwxLjQ1LDIuNDFjMC45NS0wLjU0LDItMS4wNCwyLTIuMzJDMjEuOTMsMjIuMSwyMS4xNiwyMS40NywyMC4xNiwyMS40N3oiLz4NCgkJPHBhdGggY2xhc3M9InN0NCIgZD0iTTM3LjA1LDI5LjU1aC0zLjMxdjUuNThoLTIuODFWMTkuNTZoNi4xM2MzLjU5LDAsNS40OSwyLDUuNDksNC45OVM0MC42MywyOS41NSwzNy4wNSwyOS41NXogTTM2Ljk1LDIyLjA2DQoJCQloLTMuMTh2NS4wNGgzLjE4YzEuOTEsMCwyLjc3LTEsMi43Ny0yLjVTMzguODIsMjIuMDYsMzYuOTUsMjIuMDZ6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik01OS4xMSwzMy41OWMtMS4xOCwxLjE4LTIuODEsMS44Ni00LjQ1LDEuODZjLTEuNjgsMC0zLjIyLTAuNTQtNC40LTEuNzJjLTEuNjgtMS42OC0xLjk1LTMuNzctMS45NS02LjMxDQoJCQlzMC4yMy00LjYzLDEuOTUtNi4zMWMxLjE4LTEuMTgsMi43Ny0xLjc3LDQuNC0xLjc3YzEuNjgsMCwzLjMxLDAuNjQsNC40NSwxLjgyYzAuOTEsMC45MSwxLjM2LDIuMTMsMS41LDMuNEg1Ny43DQoJCQljLTAuMDUtMC42OC0wLjMyLTEuMTgtMC42OC0xLjYzYy0wLjUtMC42NC0xLjQxLTAuOTUtMi4zNi0wLjk1Yy0wLjkxLDAtMS43NywwLjM2LTIuNDEsMS4wNGMtMS4wOSwxLjEzLTEuMDksMy4wNC0xLjA5LDQuNDkNCgkJCWMwLDEuNDEsMCwzLjM2LDEuMDksNC40OWMwLjY0LDAuNjgsMS41LDEuMDQsMi40MSwxLjA0YzAuOTUsMCwxLjg2LTAuMzYsMi4zNi0xYzAuNDEtMC41LDAuNjQtMS4wNCwwLjY4LTEuNzJoMi45MQ0KCQkJQzYwLjQ3LDMxLjQxLDYwLjAxLDMyLjY0LDU5LjExLDMzLjU5eiIvPg0KCQk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNNzEuMDUsMzUuMzFjLTEuMTgsMC0xLjg2LTAuNzMtMS45NS0xLjU5Yy0wLjU0LDAuOTEtMS44NiwxLjcyLTMuNSwxLjcyYy0yLjcyLDAtNC4xMy0xLjcyLTQuMTMtMy41OQ0KCQkJYzAtMi4xOCwxLjY4LTMuNDUsMy44Ni0zLjU5bDMuMzYtMC4yM3YtMC42OGMwLTEuMDktMC4zNi0xLjgyLTEuOTUtMS44MmMtMS4yNywwLTIuMDQsMC41OS0yLjA5LDEuNjNoLTIuNjgNCgkJCWMwLjE0LTIuNTksMi4xOC0zLjcyLDQuNzctMy43MmMxLjk1LDAsMy42MywwLjY0LDQuMjcsMi4zMmMwLjI3LDAuNzMsMC4zMiwxLjU0LDAuMzIsMi4zMnY0LjIyYzAsMC41NCwwLjE4LDAuNzMsMC42NCwwLjczDQoJCQljMC4xOCwwLDAuMzYtMC4wNSwwLjM2LTAuMDV2Mi4wNEM3MS45NSwzNS4yMiw3MS43MywzNS4zMSw3MS4wNSwzNS4zMXogTTY4LjczLDMwLjA1bC0yLjkxLDAuMjNjLTAuODIsMC4wNS0xLjYzLDAuNTktMS42MywxLjUNCgkJCWMwLDAuODYsMC43NywxLjQxLDEuNjMsMS40MWMxLjcyLDAsMi45MS0wLjkxLDIuOTEtMi42M1YzMC4wNXoiLz4NCgkJPHBhdGggY2xhc3M9InN0NCIgZD0iTTgyLjg5LDM0LjVjLTAuNzMsMC41OS0xLjYzLDAuOTEtMi44MSwwLjkxYy0xLjM2LDAtMi40NS0wLjUtMy0xLjEzdjUuMjJoLTIuNzJ2LTE1LjhoMi4zNmwwLjE4LDEuMjcNCgkJCWMwLjY4LTEuMDQsMS45NS0xLjUsMy4yMi0xLjVjMS4xMywwLDIuMDksMC40MSwyLjc3LDAuOTVjMS4zNiwxLjEzLDIuMDQsMi44MSwyLjA0LDQuOTlDODQuOTQsMzEuNjQsODQuMjYsMzMuMzYsODIuODksMzQuNXoNCgkJCSBNODEuNCwyNi42NGMtMC40MS0wLjUtMS0wLjkxLTEuODYtMC45MWMtMi4xMywwLTIuNTksMi4wNC0yLjU5LDMuNjhzMC40NSwzLjY4LDIuNTksMy42OGMwLjg2LDAsMS40NS0wLjQxLDEuODYtMC45MQ0KCQkJYzAuNTktMC43MywwLjczLTEuNzcsMC43My0yLjc3QzgyLjEyLDI4LjQ2LDgxLjk5LDI3LjQxLDgxLjQsMjYuNjR6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik04Ny4wNywyMi4xNXYtMi44MWgyLjk1djIuODFIODcuMDd6IE04Ny4xNiwzNS4xM1YyMy42OWgyLjgxdjExLjQ0Qzg5Ljk3LDM1LjEzLDg3LjE2LDM1LjEzLDg3LjE2LDM1LjEzeiIvPg0KCQk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNOTcuMDYsMzUuMzFjLTIuMzIsMC0zLjQ1LTEuMzItMy40NS0zLjV2LTUuODZoLTIuMDl2LTIuMjdoMi4wOXYtMi45MWwyLjc3LTAuNjh2My41OWgyLjg2djIuMjdoLTIuODZ2NS41OA0KCQkJYzAsMC44NiwwLjQxLDEuMjcsMS4yNywxLjI3YzAuNTksMCwxLjA0LDAsMS43Ny0wLjA5djIuMzJDOTguNjUsMzUuMTgsOTcuODcsMzUuMzEsOTcuMDYsMzUuMzF6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik0xMDkuODYsMzUuMzFjLTEuMTgsMC0xLjg2LTAuNzMtMS45NS0xLjU5Yy0wLjU0LDAuOTEtMS44NiwxLjcyLTMuNSwxLjcyYy0yLjcyLDAtNC4xMy0xLjcyLTQuMTMtMy41OQ0KCQkJYzAtMi4xOCwxLjY4LTMuNDUsMy44Ni0zLjU5bDMuMzYtMC4yM3YtMC42OGMwLTEuMDktMC4zNi0xLjgyLTEuOTUtMS44MmMtMS4yNywwLTIuMDQsMC41OS0yLjA5LDEuNjNoLTIuNjgNCgkJCWMwLjE0LTIuNTksMi4xOC0zLjcyLDQuNzctMy43MmMxLjk1LDAsMy42MywwLjY0LDQuMjcsMi4zMmMwLjI3LDAuNzMsMC4zMiwxLjU0LDAuMzIsMi4zMnY0LjIyYzAsMC41NCwwLjE4LDAuNzMsMC42NCwwLjczDQoJCQljMC4xOCwwLDAuMzYtMC4wNSwwLjM2LTAuMDV2Mi4wNEMxMTAuNzcsMzUuMjIsMTEwLjU0LDM1LjMxLDEwOS44NiwzNS4zMXogTTEwNy41NCwzMC4wNWwtMi45MSwwLjIzDQoJCQljLTAuODIsMC4wNS0xLjYzLDAuNTktMS42MywxLjVjMCwwLjg2LDAuNzcsMS40MSwxLjYzLDEuNDFjMS43MiwwLDIuOTEtMC45MSwyLjkxLTIuNjNWMzAuMDV6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik0xMTYuMjEsMzUuMjdjLTEuODYsMC0zLjEzLTAuOTEtMy4xMy0zLjA5VjE5LjI0aDIuNzd2MTIuNDhjMCwwLjY4LDAuMTQsMS4wOSwxLjA5LDEuMDkNCgkJCWMwLjIzLDAsMC4zMiwwLDAuNDUsMHYyLjMyQzExNi44OSwzNS4yMiwxMTYuNzYsMzUuMjcsMTE2LjIxLDM1LjI3eiIvPg0KCQk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNMTIzLjU3LDM1LjEzVjE5LjU2aDIuODZ2MTUuNTdIMTIzLjU3eiIvPg0KCQk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNMTM5LjczLDMzLjYzbDEuMzYsMS43MmwtMS42OCwxLjMybC0xLjQ1LTEuODJjLTAuODYsMC4zNi0xLjc3LDAuNTQtMi43MiwwLjU0Yy0xLjY4LDAtMy4zMS0wLjU5LTQuNDktMS43Nw0KCQkJYy0xLjY4LTEuNjgtMi0zLjc3LTItNi4zMXMwLjI3LTQuNjMsMi02LjMxYzEuMTgtMS4xOCwyLjgxLTEuNzcsNC40OS0xLjc3YzEuNjgsMCwzLjMxLDAuNTksNC40OSwxLjc3YzEuNjgsMS42OCwyLDMuNzcsMiw2LjMxDQoJCQlDMTQxLjY4LDI5LjkxLDE0MS4zNiwzMS45NSwxMzkuNzMsMzMuNjN6IE0xMzcuNjgsMjIuODhjLTAuNjQtMC42OC0xLjU0LTEuMDQtMi40NS0xLjA0cy0xLjg2LDAuMzYtMi40NSwxLjA0DQoJCQljLTEuMDksMS4xMy0xLjEzLDMuMDQtMS4xMyw0LjQ5YzAsMS40MSwwLjA1LDMuMzYsMS4xMyw0LjQ1YzAuNjQsMC42OCwxLjU0LDEuMDQsMi40NSwxLjA0YzAuMzIsMCwwLjY4LTAuMDUsMS0wLjE0bC0xLjY4LTIuMDkNCgkJCWwxLjcyLTEuMzZsMS43MiwyLjE4YzAuNzctMS4xMywwLjgyLTIuODEsMC44Mi00LjA5QzEzOC43NywyNS45MiwxMzguNzMsMjQuMDEsMTM3LjY4LDIyLjg4eiIvPg0KCTwvZz4NCgk8Zz4NCgkJPHBhdGggY2xhc3M9InN0NCIgZD0iTTE1Mi44OSwxNy44OGgtMS41djIuNTRoLTEuMjd2LTcuMDhoMi43N2MxLjYzLDAsMi41LDAuOTEsMi41LDIuMjdDMTU1LjM5LDE2Ljk3LDE1NC41MywxNy44OCwxNTIuODksMTcuODh6DQoJCQkgTTE1Mi44NSwxNC40OGgtMS40NXYyLjI3aDEuNDVjMC44NiwwLDEuMjMtMC40NSwxLjIzLTEuMTNDMTU0LjA3LDE0LjkzLDE1My43MSwxNC40OCwxNTIuODUsMTQuNDh6Ii8+DQoJCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik0xNjAuNDcsMjAuNDJsLTEuMTgtMi42OGgtMS41OXYyLjY4aC0xLjMydi03LjA4aDNjMS42OCwwLDIuNDUsMS4wNCwyLjQ1LDIuMThjMCwwLjk1LTAuNSwxLjY4LTEuMzIsMg0KCQkJbDEuMzIsMi45MUgxNjAuNDd6IE0xNTkuNDMsMTQuNDhoLTEuNjh2Mi4xM2gxLjcyYzAuNzMsMCwxLjEzLTAuMzYsMS4xMy0xLjA0QzE2MC42MSwxNC45OCwxNjAuMTUsMTQuNDgsMTU5LjQzLDE0LjQ4eiIvPg0KCQk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNMTY3LjY5LDE5Ljc0Yy0wLjU0LDAuNTQtMS4yNywwLjgyLTIuMDQsMC44MmMtMC43NywwLTEuNS0wLjI3LTIuMDQtMC44MmMtMC43Ny0wLjc3LTAuOTEtMS43Mi0wLjkxLTIuODYNCgkJCXMwLjE0LTIuMDksMC45MS0yLjg2YzAuNTQtMC41NCwxLjI3LTAuODIsMi4wNC0wLjgyYzAuNzcsMCwxLjUsMC4yNywyLjA0LDAuODJjMC43NywwLjc3LDAuOTEsMS43MiwwLjkxLDIuODYNCgkJCVMxNjguNDYsMTguOTcsMTY3LjY5LDE5Ljc0eiBNMTY2Ljc4LDE0Ljg0Yy0wLjI3LTAuMzItMC43My0wLjQ1LTEuMTMtMC40NWMtMC40MSwwLTAuODIsMC4xOC0xLjEzLDAuNDUNCgkJCWMtMC41LDAuNS0wLjUsMS40MS0wLjUsMi4wNGMwLDAuNjQsMCwxLjUsMC41LDIuMDRjMC4yNywwLjMyLDAuNzMsMC40NSwxLjEzLDAuNDVjMC40MSwwLDAuODItMC4xOCwxLjEzLTAuNDUNCgkJCWMwLjUtMC41LDAuNS0xLjM2LDAuNS0yLjA0QzE2Ny4yOCwxNi4yLDE2Ny4yOCwxNS4zOSwxNjYuNzgsMTQuODR6Ii8+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo=';

const profileOptions = [
  { value: 'ib', label: 'Investment Banking' },
  { value: 'com', label: 'Commercial' },
  { value: 'cu', label: 'Credit Union' },
];

const defaultMenuItemsOrder: ITopMenuItemsOrder = {
  activeItems: ['999', 'dashboard', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'sitemap'],
  inactiveItems: [],
};

interface IHeaderProps {
  appearance: boolean;
  setAppearance: (data: any) => unknown;
  displayDensity: string;
  setDisplayDensity: (data: any) => unknown;
  setFontSize: (data: any) => unknown;
}

const PrototypeHeader: any = ({
  appearance = false,
  setAppearance,
  displayDensity = Size.MEDIUM,
  setDisplayDensity,
  setFontSize,
}: IHeaderProps) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);

  const [menuItemsOrder, setMenuItemsOrder] = useState<ITopMenuItemsOrder>(defaultMenuItemsOrder);

  const isMobile = useIsBreakpoint(BreakPoint.LG);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == 'small') {
      setDisplayDensity(Size.SMALL);
    } else if (e.target.value == 'medium') {
      setDisplayDensity(Size.MEDIUM);
    } else if (e.target.value == 'large') {
      setDisplayDensity(Size.LARGE);
    }

    setTimeout(function () {
      window.dispatchEvent(new Event('resize'));
    }, 400);
  };

  return (
    <GlobalHeader>
      <HeaderLogo
        image={capitalIQLogo}
        homepageLink={'#'}
        alt="S&P Capital IQ Pro"
        className={'nextGen-header-logo'}
      >
        <GlobalHeaderPlatformSelector>
          <GlobalHeaderPlatformSelectorItem href="#" selected>
            S&P Capital IQ Pro
          </GlobalHeaderPlatformSelectorItem>
          <GlobalHeaderPlatformSelectorItem href="#">Ratings 360</GlobalHeaderPlatformSelectorItem>
          <GlobalHeaderPlatformSelectorItem href="#">Platts</GlobalHeaderPlatformSelectorItem>
        </GlobalHeaderPlatformSelector>
      </HeaderLogo>
      <GlobalHeaderContent>
        <HeaderSearch isGlobalSearchStyles placeholder={'Search'} />
        <MobileNavWrapper
          className={'spg-dark spg-yuki-dark'}
          isMobileNavOpen={isMobileNavOpen}
          setIsMobileNavOpen={setIsMobileNavOpen}
        >
          <GlobalHeaderNavMobileWrapper>
            <MobileNavBasicButton />
          </GlobalHeaderNavMobileWrapper>
          <TopNav
            isGlobalHeaderStyles
            isEditEnabled={true}
            mobileNavHeader={<MobileNavHeader />}
            menuItemsOrder={menuItemsOrder}
            onMenuItemsOrderChange={setMenuItemsOrder}
            defaultMenuItemsOrder={defaultMenuItemsOrder}
          >
            <TopNavMenuItem
              isGlobalHeaderStyles
              id={'999'}
              title={'Shortcuts'}
              dropdownProps={{ transitionContainerClassName: 'customDropdownClassName' }}
              className={isMobile ? 'spg-d-none' : ''}
            >
              <ShortcutsList>
                <Shortcuts>
                  <ShortcutLabeledItem
                    id="homepage"
                    title="Homepage"
                    label="HOME PAGE"
                    href={'#homepage'}
                    setButtonText={'Set current page as homepage'}
                  />
                  {mockShortcutsData.recentLinks.map((item) => (
                    <ShortcutItem
                      id={item.id}
                      key={item.id}
                      title={item.title}
                      href={item.href}
                      entity={ShortcutEntity.RecentLink}
                      // onSave={handleSave}
                      // onDelete={handleDelete}
                    />
                  ))}
                </Shortcuts>
              </ShortcutsList>
            </TopNavMenuItem>
            <TopNavLinkItem href={'#'} id={'dashboard'} isGlobalHeaderStyles>
              Dashboard
            </TopNavLinkItem>
            <TopNavMenuItem title={'News'} id={'2'} isGlobalHeaderStyles>
              <TopNavDropDownColumn>
                <TopNavDropDownGroup title={'News Home'}>
                  <TopNavGroupLinkItem href={'#'}>All Sector News</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Coronavirus Latest News</TopNavGroupLinkItem>
                </TopNavDropDownGroup>
                <TopNavDropDownGroup title={'Industries'}>
                  <TopNavGroupLinkItem href={'#'}>Financials</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Real Estate</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Energy & Utilities</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Materials</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Healthcare</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Industrials</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Consumer</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>
                    Technology, Media, and Telecommunications
                  </TopNavGroupLinkItem>
                </TopNavDropDownGroup>
              </TopNavDropDownColumn>
              <TopNavDropDownColumn>
                <TopNavDropDownGroup title={'Features'}>
                  <TopNavGroupLinkItem href={'#'} isExternalLink>
                    News and Analysis
                  </TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'} leftIconName={LOCK}>
                    Recaps
                  </TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Research</TopNavGroupLinkItem>
                </TopNavDropDownGroup>
                <TopNavDropDownGroup>
                  <TopNavGroupLinkItem href={'#'}>Blogs</TopNavGroupLinkItem>
                </TopNavDropDownGroup>
                <TopNavDropDownGroup>
                  <TopNavGroupLinkItem href={'#'}>News Archive</TopNavGroupLinkItem>
                </TopNavDropDownGroup>
                <TopNavDropDownGroup>
                  <TopNavGroupLinkItem href={'#'}>Key Developments</TopNavGroupLinkItem>
                </TopNavDropDownGroup>
                <TopNavDropDownGroup>
                  <TopNavGroupLinkItem href={'#'}>Newswire</TopNavGroupLinkItem>
                </TopNavDropDownGroup>
                <TopNavDropDownGroup>
                  <TopNavGroupLinkItem href={'#'}>Issues In Focus</TopNavGroupLinkItem>
                </TopNavDropDownGroup>
                <TopNavDropDownGroup>
                  <TopNavGroupLinkItem href={'#'}>Publications</TopNavGroupLinkItem>
                </TopNavDropDownGroup>
              </TopNavDropDownColumn>
              <TopNavDropDownColumn>
                <TopNavDropDownGroup title={'LEVERAGED COMMENTARY & DATA'}>
                  <TopNavGroupLinkItem href={'#'}>All Sector News</TopNavGroupLinkItem>
                  <TopNavDropDownSubGroup title={'LEVERAGED COMMENTARY & DATA'}>
                    <TopNavGroupLinkItem href={'#'}>Leveraged Loans</TopNavGroupLinkItem>
                    <TopNavGroupLinkItem href={'#'} leftIconName={LOCK}>
                      Fixed Income
                    </TopNavGroupLinkItem>
                    <TopNavGroupLinkItem href={'#'}>Bankruptcy & Distressed</TopNavGroupLinkItem>
                    <TopNavDropDownSubGroup title={'LEVERAGED COMMENTARY & DATA'}>
                      <TopNavGroupLinkItem href={'#'}>Leveraged Loans</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'} leftIconName={LOCK}>
                        Fixed Income
                      </TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Bankruptcy & Distressed</TopNavGroupLinkItem>
                    </TopNavDropDownSubGroup>
                  </TopNavDropDownSubGroup>
                </TopNavDropDownGroup>
                <TopNavDropDownGroup title={'Documents'}>
                  <TopNavGroupLinkItem href={'#'}>Recent Documents</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Key Exhibits</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>
                    Transcripts & Investor Presentations
                  </TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Coverage Information</TopNavGroupLinkItem>
                </TopNavDropDownGroup>
                <TopNavDropDownGroup title={'Events'}>
                  <TopNavGroupLinkItem href={'#'}>Events Calendar</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Event Search</TopNavGroupLinkItem>
                </TopNavDropDownGroup>
              </TopNavDropDownColumn>
            </TopNavMenuItem>
            <TopNavMenuItem active title={'Research'} id={'3'} isGlobalHeaderStyles>
              <TopNavDropDownColumn>
                <TopNavDropDownGroup>
                  <TopNavGroupLinkItem href={'#'}>Investment & Market Research</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>
                    Market Intelligence Research Library
                  </TopNavGroupLinkItem>
                </TopNavDropDownGroup>
              </TopNavDropDownColumn>
            </TopNavMenuItem>

            <TopNavMenuItem title={'Screener'} id={'4'} isGlobalHeaderStyles>
              <TopNavDropDownColumn>
                <TopNavDropDownGroup>
                  <TopNavGroupLinkItem href={'#'}>Companies</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Key Developments</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>
                    Regulated Depositories (U.S.)
                  </TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>
                    Insurance Statutory Financials (U.S.)
                  </TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>
                    Reinsurance Relationships (U.S.)
                  </TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>
                    Insurance Product Filings (U.S.)
                  </TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Energy Companies by State</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Regulated Energy Companies</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Wireline Regulatory (ARMIS)</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Companies (Classic)</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>
                    Specialty Financial Services (U.S.)
                  </TopNavGroupLinkItem>
                </TopNavDropDownGroup>
              </TopNavDropDownColumn>
            </TopNavMenuItem>
            <TopNavMenuItem title={'Companies'} id={'5'} isGlobalHeaderStyles>
              <TopNavDropDownColumn>
                <TopNavDropDownGroup title={'Key reports'}>
                  <TopNavGroupLinkItem href={'#'}>Credit Ratings</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Transactions Overview</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Portfolio Stocks Summary</TopNavGroupLinkItem>
                </TopNavDropDownGroup>
                <TopNavDropDownGroup title={'Documents'}>
                  <TopNavGroupLinkItem href={'#'}>Recent Documents</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Key Exhibits</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>
                    Transcripts & Investor Presentations
                  </TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Coverage Information</TopNavGroupLinkItem>
                </TopNavDropDownGroup>
                <TopNavDropDownGroup title={'Events'}>
                  <TopNavGroupLinkItem href={'#'}>Events Calendar</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Event Search</TopNavGroupLinkItem>
                </TopNavDropDownGroup>
              </TopNavDropDownColumn>
            </TopNavMenuItem>
            <TopNavMenuItem title={'Markets & Details'} id={'6'} isGlobalHeaderStyles>
              <TopNavDropDownColumn>
                <TopNavDropDownGroup title={'Energy markets'}>
                  <TopNavGroupLinkItem href={'#'}>Power Summary</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>ISO Capacity Summary</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Natural Gas Summary</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Coal Summary</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>
                    Market Intelligence Power Forecast Summary
                  </TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>SNL Coal Forecast Summary</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>SNL Bidweek Index</TopNavGroupLinkItem>
                </TopNavDropDownGroup>
                <TopNavDropDownGroup active title={'Pricing highlights'}>
                  <TopNavGroupLinkItem href={'#'}>Portfolio Stocks Summary</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Pricing Highlights</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'} active>
                    Commodities Summary
                  </TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Commodities Estimates</TopNavGroupLinkItem>
                </TopNavDropDownGroup>
              </TopNavDropDownColumn>
              <TopNavDropDownColumn>
                <TopNavDropDownGroup title={'Index values'}>
                  <TopNavGroupLinkItem href={'#'}>Index Summary</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Component Companies</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Index Financials</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Industry Trends & Statistics</TopNavGroupLinkItem>
                </TopNavDropDownGroup>
                <TopNavDropDownGroup title={'Rates & yields'}>
                  <TopNavGroupLinkItem href={'#'}>Rates & Yields</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Currency Exchange Rates</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>
                    Currency Exchange Rates Charts
                  </TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>U.S. Depository Rates</TopNavGroupLinkItem>
                </TopNavDropDownGroup>
                <TopNavDropDownGroup title={'Market charts'}>
                  <TopNavGroupLinkItem href={'#'}>Market Charts</TopNavGroupLinkItem>
                </TopNavDropDownGroup>
              </TopNavDropDownColumn>
              <TopNavDropDownColumn>
                <TopNavDropDownGroup title={'Market analysis'}>
                  <TopNavGroupLinkItem href={'#'}>Transactions Statistics</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Transactions Overview</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>
                    U.S. Financial Institutions M&A Summary
                  </TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Credit Ratings</TopNavGroupLinkItem>
                </TopNavDropDownGroup>
                <TopNavDropDownGroup title={'Private eqity'}>
                  <TopNavGroupLinkItem href={'#'}>Investments</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Investors</TopNavGroupLinkItem>
                </TopNavDropDownGroup>
                <TopNavDropDownGroup title={'League tables'}>
                  <TopNavGroupLinkItem href={'#'}>Transactions League Tables</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Audit Fees</TopNavGroupLinkItem>
                </TopNavDropDownGroup>
              </TopNavDropDownColumn>
            </TopNavMenuItem>
            <TopNavMenuItem title={'Industries'} id={'7'} isGlobalHeaderStyles>
              <VerticalTabs verticalTabRole={'group'}>
                <VerticalTabItem isLock title="Company Data" id="exampleTab1">
                  <TopNavDropDownColumn>
                    <TopNavDropDownGroup ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'} leftIconName={LOCK}>
                        S&P Capital IQ Platform
                      </TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>S&P Global Marketplace</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>451 Research</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>
                        Leveraged Commentary & Data (LCD)
                      </TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>
                        Supply Chain Intelligence (Panjiva)
                      </TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>China Credit Analytics</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Maps</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Peer Comps</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Peer Analytics (Classic)</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Chart Builder</TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                  </TopNavDropDownColumn>
                  <TopNavDropDownColumn>
                    <TopNavDropDownGroup ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'}>Report Builder</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Screener</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>
                        Market Intelligence Office Download
                      </TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>
                        Market Intelligence Mobile iOS App
                      </TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>
                        Market Intelligence Mobile Android App
                      </TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Excel Template Library</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Events Calendar</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>
                        Launch Streaming Transcripts
                      </TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>RSS Feeds</TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                  </TopNavDropDownColumn>
                  <TopNavDropDownColumn>
                    <TopNavDropDownGroup title={'U.S. branch analytics'} ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'}>HHI Analysis</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Market Share</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Market Overlap</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Branch List Builder</TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                    <TopNavDropDownGroup title={'Bank analytics'} ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'}>
                        Residential & Commercial Mortgage Analytics
                      </TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Bank Valuation Model</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>
                        Insurance Stat Select-A-Page
                      </TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                  </TopNavDropDownColumn>
                </VerticalTabItem>
                <VerticalTabItem title="Asset Data" id="exampleTab2">
                  <TopNavDropDownColumn>
                    <TopNavDropDownGroup title={'News Home'} ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'}>All Sector News</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Coronavirus Latest News</TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                    <TopNavDropDownGroup title={'Industries'} ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'}>Financials</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Real Estate</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Energy & Utilities</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Materials</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Healthcare</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Industrials</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Consumer</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>
                        Technology, Media, and Telecommunications
                      </TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                  </TopNavDropDownColumn>
                  <TopNavDropDownColumn>
                    <TopNavDropDownGroup title={'Features'} ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'}>News and Analysis</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Recaps</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Research</TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                    <TopNavDropDownGroup ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'}>Blogs</TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                    <TopNavDropDownGroup ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'}>News Archive</TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                    <TopNavDropDownGroup ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'}>Key Developments</TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                    <TopNavDropDownGroup ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'}>Newswire</TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                    <TopNavDropDownGroup ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'}>Issues In Focus</TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                    <TopNavDropDownGroup ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'}>Publications</TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                  </TopNavDropDownColumn>
                  <TopNavDropDownColumn>
                    <TopNavDropDownGroup title={'Leveraged commentary & data'} ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'}>Leveraged Loans</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Fixed Income</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Bankruptcy & Distressed</TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                    <TopNavDropDownGroup title={'Documents'} ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'}>Recent Documents</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Key Exhibits</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>
                        Transcripts & Investor Presentations
                      </TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Coverage Information</TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                    <TopNavDropDownGroup title={'Events'} ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'}>Events Calendar</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Event Search</TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                  </TopNavDropDownColumn>
                </VerticalTabItem>
                <VerticalTabItem title="Capital and M&A" id="exampleTab3">
                  <TopNavDropDownColumn>
                    <TopNavDropDownGroup ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'}>
                        Investment & Market Research
                      </TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>
                        Market Intelligence Research Library
                      </TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                  </TopNavDropDownColumn>
                </VerticalTabItem>
                <VerticalTabItem title="Industry Data" id="exampleTab4">
                  <TopNavDropDownColumn>
                    <TopNavDropDownGroup ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'}>Companies</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Key Developments</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>
                        Regulated Depositories (U.S.)
                      </TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>
                        Insurance Statutory Financials (U.S.)
                      </TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>
                        Reinsurance Relationships (U.S.)
                      </TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>
                        Insurance Product Filings (U.S.)
                      </TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>
                        Energy Companies by State
                      </TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>
                        Regulated Energy Companies
                      </TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>
                        Wireline Regulatory (ARMIS)
                      </TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Companies (Classic)</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>
                        Specialty Financial Services (U.S.)
                      </TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                  </TopNavDropDownColumn>
                </VerticalTabItem>
                <VerticalTabItem title="Geographic Data" id="exampleTab5">
                  <TopNavDropDownColumn>
                    <TopNavDropDownGroup title={'Key reports'} ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'}>Credit Ratings</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Transactions Overview</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Portfolio Stocks Summary</TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                    <TopNavDropDownGroup title={'Documents'} ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'}>Recent Documents</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Key Exhibits</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>
                        Transcripts & Investor Presentations
                      </TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Coverage Information</TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                    <TopNavDropDownGroup title={'Events'} ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'}>Events Calendar</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Event Search</TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                  </TopNavDropDownColumn>
                </VerticalTabItem>
                <VerticalTabItem title="Market Data" id="exampleTab6">
                  <TopNavDropDownColumn>
                    <TopNavDropDownGroup title={'Energy markets'} ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'}>Power Summary</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>ISO Capacity Summary</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Natural Gas Summary</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Coal Summary</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>
                        Market Intelligence Power Forecast Summary
                      </TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>
                        SNL Coal Forecast Summary
                      </TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>SNL Bidweek Index</TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                    <TopNavDropDownGroup title={'Pricing highlights'} ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'}>Portfolio Stocks Summary</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Pricing Highlights</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Commodities Summary</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Commodities Estimates</TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                  </TopNavDropDownColumn>
                  <TopNavDropDownColumn>
                    <TopNavDropDownGroup title={'Index values'} ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'}>Index Summary</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Component Companies</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Index Financials</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>
                        Industry Trends & Statistics
                      </TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                    <TopNavDropDownGroup title={'Rates & yields'} ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'}>Rates & Yields</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Currency Exchange Rates</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>
                        Currency Exchange Rates Charts
                      </TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>U.S. Depository Rates</TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                    <TopNavDropDownGroup title={'Market charts'} ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'}>Market Charts</TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                  </TopNavDropDownColumn>
                  <TopNavDropDownColumn>
                    <TopNavDropDownGroup title={'Market analysis'} ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'}>Transactions Statistics</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Transactions Overview</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>
                        U.S. Financial Institutions M&A Summary
                      </TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Credit Ratings</TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                    <TopNavDropDownGroup title={'Private equity'} ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'}>Investments</TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Investors</TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                    <TopNavDropDownGroup title={'Leegue tables'} ariaRole="menu">
                      <TopNavGroupLinkItem href={'#'}>
                        Transactions League Tables
                      </TopNavGroupLinkItem>
                      <TopNavGroupLinkItem href={'#'}>Audit Fees</TopNavGroupLinkItem>
                    </TopNavDropDownGroup>
                  </TopNavDropDownColumn>
                </VerticalTabItem>
                <VerticalTabItem
                  isLock
                  title="Excel Template Library"
                  id="exampleTab7"
                  href="#templateBrowser"
                />
                <VerticalTabItem title="Find Buyers" id="exampleTab8" href="#findBuyers" />
                <VerticalTabItem
                  title="Investor Targeting"
                  id="exampleTab9"
                  href="#investorTargeting"
                />
                <VerticalTabItem
                  title="Manage My Screens"
                  id="exampleTab10"
                  href="#manageMyScreens"
                />
              </VerticalTabs>
            </TopNavMenuItem>
            <TopNavMenuItem title={'Geographies'} id={'8'} isGlobalHeaderStyles>
              <TopNavDropDownColumn>
                <TopNavDropDownGroup title={'Global'}>
                  <TopNavGroupLinkItem href={'#'}>Country Risk</TopNavGroupLinkItem>
                </TopNavDropDownGroup>
                <TopNavDropDownGroup title={'UNITED STATES ONLY'}>
                  <TopNavGroupLinkItem href={'#'}>Demographic Data</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Unemployment Data</TopNavGroupLinkItem>
                </TopNavDropDownGroup>
              </TopNavDropDownColumn>
            </TopNavMenuItem>
            <TopNavMenuItem title={'ESG'} id={'9'} isGlobalHeaderStyles>
              <TopNavDropDownColumn>
                <TopNavDropDownGroup>
                  <TopNavGroupLinkItem href={'#'}>ESG Home</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>ESG Coverage List</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>ESG Sector Profile</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>
                    Environmental & Climate Analytics Map
                  </TopNavGroupLinkItem>
                </TopNavDropDownGroup>
                <TopNavDropDownGroup title={'ANALYTICAL TOOLS'}>
                  <TopNavGroupLinkItem href={'#'}>Portfolio Analysis</TopNavGroupLinkItem>
                </TopNavDropDownGroup>
              </TopNavDropDownColumn>
            </TopNavMenuItem>
            <TopNavMenuItem title={'S&P Global Labs'} id={'10'} isGlobalHeaderStyles>
              <TopNavDropDownColumn>
                <TopNavDropDownGroup>
                  <TopNavGroupLinkItem href={'#'}>Shipment Search (Beta)</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>
                    Macro Trade Statistics (Beta)
                  </TopNavGroupLinkItem>
                </TopNavDropDownGroup>
              </TopNavDropDownColumn>
            </TopNavMenuItem>
            <TopNavLinkItem href={'#'} id={'sitemap'} isGlobalHeaderStyles>
              Sitemap
            </TopNavLinkItem>
            <TopNavLinkItem isLock href={'#'} id={'example1'} isGlobalHeaderStyles>
              Example 1
            </TopNavLinkItem>
            <TopNavLinkItem isLock href={'#'} id={'example2'} isGlobalHeaderStyles>
              Example 2
            </TopNavLinkItem>
            <TopNavLinkItem isLock href={'#'} id={'example3'} isGlobalHeaderStyles>
              Example 3
            </TopNavLinkItem>
            <TopNavLinkItem isLock href={'#'} id={'example4'} isGlobalHeaderStyles>
              Example 4
            </TopNavLinkItem>
          </TopNav>
        </MobileNavWrapper>
      </GlobalHeaderContent>
      <GlobalHeaderUserSection>
        <Tooltip
          isSecondary
          returnFocus
          offset={9}
          autoResize={false}
          contentPadding={0}
          width={'408px'}
          tabIndex={0}
          placement={TooltipPlacement.BOTTOM}
          popperPositionStrategy={PositioningStrategy.FIXED}
          triggerEvent={TooltipTriggerEvent.CLICK}
          triggerElement={
            <Button purpose={Purpose.NONE} aria-label={'Open folder'}>
              <GlobalHeaderUserSectionIcon size={Size.MEDIUM} icon={FOLDER} />
            </Button>
          }
        >
          <GlobalHeaderUserSectionPopover
            title={'Saved Items'}
            headerRightElement={
              <a className={classNames(Classes.LINK, Classes.TEXT_MEDIUM)}>Import Saved Items</a>
            }
          >
            <Accordion accordionSize={Size.MEDIUM} removeItemSpacing>
              <AccordionItem
                angleIconSize={0}
                header={'CHARTS'}
                skeletonConfig={{
                  animation: true,
                  loading: false,
                }}
              >
                <div>
                  <a className={Classes.LINK}>Bank Charts</a>
                </div>
                <div
                  className={Classes.spacingClass(
                    SpacingType.MARGIN,
                    SpacingSide.T,
                    SpacingSize.SM
                  )}
                >
                  <a className={Classes.LINK}>Aerospace Global Total Debt 1B</a>
                </div>
                <div
                  className={Classes.spacingClass(
                    SpacingType.MARGIN,
                    SpacingSide.T,
                    SpacingSize.SM
                  )}
                >
                  <a className={Classes.LINK}>Emerging Markets Charts</a>
                </div>
                <div
                  className={Classes.spacingClass(
                    SpacingType.MARGIN,
                    SpacingSide.T,
                    SpacingSize.SM
                  )}
                >
                  <a className={Classes.LINK}>JPMC Porfolio Charts</a>
                </div>
                <div
                  className={Classes.spacingClass(
                    SpacingType.MARGIN,
                    SpacingSide.T,
                    SpacingSize.SM
                  )}
                >
                  <a className={Classes.LINK}>AAPL Day Close</a>
                </div>
                <div
                  className={Classes.spacingClass(
                    SpacingType.MARGIN,
                    SpacingSide.T,
                    SpacingSize.SM
                  )}
                >
                  <a className={Classes.LINK}>Bank Charts</a>
                </div>
                <div
                  className={Classes.spacingClass(
                    SpacingType.MARGIN,
                    SpacingSide.T,
                    SpacingSize.SM
                  )}
                >
                  <a className={Classes.LINK}>Aerospace Global Total Debt 1B</a>
                </div>
                <div
                  className={Classes.spacingClass(
                    SpacingType.MARGIN,
                    SpacingSide.T,
                    SpacingSize.SM
                  )}
                >
                  <a className={Classes.LINK}>Emerging Markets Charts</a>
                </div>
                <div
                  className={Classes.spacingClass(
                    SpacingType.MARGIN,
                    SpacingSide.T,
                    SpacingSize.SM
                  )}
                >
                  <a className={Classes.LINK}>JPMC Porfolio Charts</a>
                </div>
                <div
                  className={Classes.spacingClass(
                    SpacingType.MARGIN,
                    SpacingSide.T,
                    SpacingSize.SM
                  )}
                >
                  <a className={Classes.LINK}>AAPL Day Close</a>
                </div>
              </AccordionItem>
              <AccordionItem
                angleIconSize={0}
                header={'DASHBOARDS'}
                skeletonConfig={{
                  animation: true,
                  loading: false,
                }}
              >
                Accordion Item Content 2
              </AccordionItem>
              <AccordionItem
                angleIconSize={0}
                header={'Key Developments'}
                skeletonConfig={{
                  animation: true,
                  loading: false,
                }}
              >
                Dashboard Content
              </AccordionItem>
              <AccordionItem
                angleIconSize={0}
                header={'Documents'}
                skeletonConfig={{
                  animation: true,
                  loading: false,
                }}
              >
                Documents Content
              </AccordionItem>
              <AccordionItem
                angleIconSize={0}
                header={'List & Portfolios'}
                skeletonConfig={{
                  animation: true,
                  loading: false,
                }}
              >
                List & Portfolios Content
              </AccordionItem>
              <AccordionItem
                angleIconSize={0}
                header={'Screens'}
                skeletonConfig={{
                  animation: true,
                  loading: false,
                }}
              >
                Screens Content
              </AccordionItem>
              <AccordionItem
                angleIconSize={0}
                header={'Maps'}
                skeletonConfig={{
                  animation: true,
                  loading: false,
                }}
              >
                Maps Content
              </AccordionItem>
              <AccordionItem
                angleIconSize={0}
                header={'Reports'}
                skeletonConfig={{
                  animation: true,
                  loading: false,
                }}
              >
                Reports Content
              </AccordionItem>
              <AccordionItem
                angleIconSize={0}
                header={'Searches'}
                skeletonConfig={{
                  animation: true,
                  loading: false,
                }}
              >
                Searches Content
              </AccordionItem>
              <AccordionItem
                angleIconSize={0}
                header={'Shortcuts'}
                skeletonConfig={{
                  animation: true,
                  loading: false,
                }}
              >
                Shortcuts Content
              </AccordionItem>
            </Accordion>
          </GlobalHeaderUserSectionPopover>
        </Tooltip>
        <Tooltip
          isSecondary
          returnFocus
          offset={9}
          autoResize={false}
          contentPadding={0}
          width={'408px'}
          tabIndex={0}
          placement={TooltipPlacement.BOTTOM}
          triggerEvent={TooltipTriggerEvent.CLICK}
          triggerElement={
            <Button purpose={Purpose.NONE} aria-label={'Open user page'}>
              <GlobalHeaderUserSectionIcon size={Size.MEDIUM} icon={USER} />
            </Button>
          }
        >
          <GlobalHeaderUserSectionPopover
            title={'User Profile & Settings'}
            headerRightElement={
              <a className={classNames(Classes.LINK, Classes.TEXT_MEDIUM)}>Sign Out</a>
            }
          >
            <OverLayHead className="overlayHead spg-p-lg">
              <div className="spg-d-flex spg-flex-column spg-flex-row spg-justify-between">
                <span className="spg-d-flex spg-flex-row">
                  <div className="profilePic spg-heading spg-heading--medium spg-text-regular">
                    MM
                  </div>
                  <div className="spg-heading--small spg-ml-sm spg-pt-md">
                    <span className="profileDataName">Mitch Melvin</span>
                    <br />
                    <span className="spg-text spg-text-medium profileDataEmail spg-text-link">
                      mitch.melvin@spglobal.com
                    </span>
                  </div>
                </span>
              </div>
            </OverLayHead>
            <Tabs isPrimary={false} id={'defaultTabs'} className="spg-p-lg">
              <Tab id="t1" title="Profile & Display Settings">
                <FormGroup label={''} className={'spg-mt-xs'}>
                  <Select
                    options={profileOptions}
                    isMulti={false}
                    inFieldLabel="Profile:"
                    isSearchable={false}
                    closeOnSelection
                    defaultValue={[{ value: 'ib', label: 'Investment Banking' }]}
                  />
                </FormGroup>
                <FormGroup label={''}>
                  <Select
                    options={[
                      { value: 'news', label: 'News' },
                      { value: 'dashboard', label: 'Dashboard' },
                      { value: 'cp', label: 'Corporate Profile' },
                    ]}
                    isMulti={false}
                    inFieldLabel="Profile:"
                    isSearchable={false}
                    closeOnSelection
                    defaultValue={[{ value: 'news', label: 'News' }]}
                  />
                </FormGroup>
                <div className="spg-d-flex spg-flex-row spg-align-center spg-mb-sm">
                  <h6 className="spg-heading spg-heading--xxsmall spg-mr-xs spg-mb-sm noWrap">
                    Display Density:{' '}
                  </h6>
                  <RadioGroup
                    id="custom-id-2"
                    className="spg-px-xs spg-mb-0"
                    inline
                    onChange={handleChange}
                    selectedValue={displayDensity}
                  >
                    <Radio label="Compact" id="small" value={Size.SMALL} />
                    <Radio label="Default" id="medium" value={Size.MEDIUM} />
                    <Radio label="Relaxed" id="relaxed" value={Size.LARGE} />
                  </RadioGroup>
                </div>
                <div className="spg-d-flex spg-flex-row spg-align-center spg-mb-md">
                  <h6 className="spg-heading spg-heading--xxsmall spg-mr-xs noWrap">
                    Appearance:{' '}
                  </h6>
                  <div className="spg-text spg-text-medium spg-ml-xs">
                    <a href="#settings/userProfileDisplayInfo" className="spg-text-link">
                      {appearance ? 'Darkmode' : 'Lightmode'}
                    </a>
                  </div>
                  <Switch
                    checked={appearance}
                    className="spg-ml-sm"
                    onChange={() => {
                      setAppearance((pre: any) => {
                        return !pre;
                      });
                    }}
                  />
                </div>
                <div className="spg-d-flex spg-flex-row spg-align-center">
                  <h6 className="spg-heading spg-heading--xxsmall noWrap" style={{ width: '70px' }}>
                    Text Size:{' '}
                  </h6>
                  <TextSizeSlider className="spg-d-flex spg-flex-row spg-align-center ">
                    <span className="textSize small">A</span>
                    <Slider
                      onChangeComplete={(nextValues: any) => {
                        setFontSize(nextValues);
                      }}
                      min={11}
                      max={21}
                      step={0.2}
                      marks={{ 11: 'Smaller', 16: 'Medium', 21: 'Larger' }}
                    />
                    <span className="textSize big">A</span>
                  </TextSizeSlider>
                </div>
                <Divider />
                <div className="profileLinks">
                  <p className="spg-text spg-text-xlarge spg-link spg-mb-sm">
                    Market Indicies & Exchanges
                  </p>
                  <p className="spg-text spg-text-medium spg-text-secondary">
                    DJIA, S&P 500, NASDAQ, MSCI Europe Banks (USD), Hang Seng ...
                  </p>
                </div>
                <Divider />
                <div className="profileLinks">
                  <p className="spg-text spg-text-xlarge spg-link spg-mb-sm">Current Accounts</p>
                  <p className="spg-text spg-text-medium spg-text-secondary">
                    Docs OnLine, News OnLine, Online Newsletter
                  </p>
                </div>
                <Divider />
                <div className="profileLinks">
                  <p className="spg-text spg-text-xlarge spg-link spg-mb-sm">Sharing Groups</p>
                </div>
                <Divider />
                <div className="profileLinks">
                  <p className="spg-text spg-text-xlarge spg-link spg-mb-sm">Research Settings</p>
                </div>
                <Divider />
                <div className="profileLinks">
                  <p className="spg-text spg-text-xlarge spg-mb-md">Internal Only</p>
                  <AccordianList className="spg-list spg-pl-0">
                    <li className="spg-link spg-text-medium spg-mb-sm">MI Assist Admin</li>
                    <li className="spg-link spg-text-medium">SPG Internal Platform Applications</li>
                  </AccordianList>
                </div>
              </Tab>
              <Tab id="searchSetting" title="Search Settings">
                <p className="spg-text spg-text-medium">
                  These preferences help boost the relevancy of certain results over others of
                  similar types.
                </p>

                <h6 className="spg-heading spg-heading--xxsmall spg-mt-xl spg-mb-xs">
                  Search Result Ranking:
                </h6>
                <RadioGroup
                  id="custom-id"
                  className="spg-px-xs"
                  inline
                  onChange={function noRefCheck() {}}
                >
                  <Radio label="Default" id="radio1" />
                  <Radio label="Private companies" id="radio2" />
                  <Radio label="Public companies" id="radio3" />
                </RadioGroup>
                <FormGroup label={''}>
                  <Select
                    autoPosition
                    customId="custom-id"
                    defaultValue={[
                      {
                        label: 'U.S. Exchange',
                        value: '1',
                      },
                    ]}
                    inFieldLabel="Preferred Exchange"
                    isAutoFocusMenu
                    isControlButtons
                    isDropOpenOnClick
                    isHighlightSearchMatches
                    isSearchable
                    options={[
                      {
                        label: 'U.S. Exchange',
                        value: 'USE',
                      },
                      {
                        label: 'ADX - Abu Dhabi Securities Exchange',
                        value: 'ADX',
                      },
                      {
                        label: 'AIM - AIM London Stock Exchange',
                        value: 'AIM',
                      },
                      {
                        label: 'ASE - Amman Stock Exchange',
                        value: 'ASE',
                      },
                      {
                        label: 'ASX - Australian Securities Exchange',
                        value: 'ASX',
                      },
                      {
                        label: 'ATSE - Athens Stock Exchange',
                        value: 'ATSE',
                      },
                      {
                        label: 'BASE - Buenos Aires Stock Exchange',
                        value: 'BASE',
                      },
                      {
                        label: 'BATS-CHIXE - BATS Chi-X Europe',
                        value: 'BATS-CHIXE',
                      },
                      {
                        label: 'BAX - Bahrain Stock Exchange',
                        value: 'BAX',
                      },
                      {
                        label: 'BDB - Bourse de Beyrouth',
                        value: 'BDB',
                      },
                      {
                        label: 'BDL - Bourse de Luxembourg',
                        value: 'BDL',
                      },
                      {
                        label: 'BDM - Bolsa de Madrid',
                        value: 'BDM',
                      },
                      {
                        label: 'BELEX - Belgrade Stock Exchange',
                        value: 'BELEX',
                      },
                      {
                        label: 'BER - Bermuda Stock Exchange',
                        value: 'BER',
                      },
                      {
                        label: 'BIT - Borsa Italiana',
                        value: 'BIT',
                      },
                      {
                        label: 'BITE - Borsa Italiana ETFplus',
                        value: 'BITE',
                      },
                      {
                        label: 'BME - Bolsas y Mercados Espanoles',
                        value: 'BME',
                      },
                      {
                        label: 'BMV - Bolsa Mexicana de Valores',
                        value: 'BMV',
                      },
                      {
                        label: 'BOVESPA - Bolsa de Valores de Sao Paulo',
                        value: 'BOVESPA',
                      },
                      {
                        label: 'BRSE - BX Swiss',
                        value: 'BRSE',
                      },
                      {
                        label: 'BRVM - BRVM Stock Exchange',
                        value: 'BRVM',
                      },
                      {
                        label: 'BSE - BSE Ltd',
                        value: 'BSE',
                      },
                      {
                        label: 'BSM - Botswana Stock Exchange',
                        value: 'BSM',
                      },
                      {
                        label: 'BSSE - Bratislava Stock Exchange',
                        value: 'BSSE',
                      },
                      {
                        label: 'BST - Boerse-Stuttgart',
                        value: 'BST',
                      },
                      {
                        label: 'BUL - Bulgarian Stock Exchange',
                        value: 'BUL',
                      },
                      {
                        label: 'BUSE - Budapest Stock Exchange',
                        value: 'BUSE',
                      },
                      {
                        label: 'BVB - Bucharest Stock Exchange',
                        value: 'BVB',
                      },
                      {
                        label: 'BVC - Bolsa de Valores de Colombia',
                        value: 'BVC',
                      },
                      {
                        label: 'BVL - Bolsa de Valores de Lima',
                        value: 'BVL',
                      },
                      {
                        label: 'BVMT - Bourse des Valeurs Mobilieres',
                        value: 'BVMT',
                      },
                      {
                        label: 'CASE - Egyptian Exchange',
                        value: 'CASE',
                      },
                      {
                        label: 'Catalist - Singapore Exchange Catalist Market',
                        value: 'Catalist',
                      },
                      {
                        label: 'CBSE - Casablanca Stock Exchange',
                        value: 'CBSE',
                      },
                      {
                        label: 'CCSE - Caracas Stock Exchange',
                        value: 'CCSE',
                      },
                      {
                        label: 'CHIA - Chi-X Australia',
                        value: 'CHIA',
                      },
                      {
                        label: 'CNSX - Canadian Securities Exchange',
                        value: 'CNSX',
                      },
                      {
                        label: 'COSE - Colombo Stock Exchange',
                        value: 'COSE',
                      },
                      {
                        label: 'CPSE - NASDAQ Copenhagen',
                        value: 'CPSE',
                      },
                      {
                        label: 'CSE - Cyprus Stock Exchange',
                        value: 'CSE',
                      },
                      {
                        label: 'DAR - Dar es Salaam Stock Exchange',
                        value: 'DAR',
                      },
                      {
                        label: 'DB - Deutsche Boerse AG',
                        value: 'DB',
                      },
                      {
                        label: 'DFM - Dubai Financial Market',
                        value: 'DFM',
                      },
                      {
                        label: 'DIFX - NASDAQ Dubai',
                        value: 'DIFX',
                      },
                      {
                        label: 'DSE - Dhaka Stock Exchange',
                        value: 'DSE',
                      },
                      {
                        label: 'DSM - Qatar Exchange',
                        value: 'DSM',
                      },
                      {
                        label: 'DUSE - Dusseldorf Stock Exchange',
                        value: 'DUSE',
                      },
                      {
                        label: 'ENXTAM - Euronext (Amsterdam)',
                        value: 'ENXTAM',
                      },
                    ]}
                    placeholder="No Preferred Exchange"
                    searchPlaceholder="Search"
                    skeletonConfig={{
                      animation: true,
                      loading: false,
                    }}
                    tabIndex={0}
                  />
                </FormGroup>
                <FormGroup label={''}>
                  <Select
                    autoPosition
                    customId="custom-id"
                    inFieldLabel="Company Location"
                    initialExpandDepth={2}
                    isAutoFocusMenu
                    isControlButtons
                    isDropOpenOnClick
                    isHighlightSearchMatches
                    isMulti
                    isParentNodeTreeDisplay
                    isSearchable
                    mobileMenuClassName="mobile-menu-className"
                    onChange={function noRefCheck() {}}
                    onParentSelectChange={function noRefCheck() {}}
                    options={[
                      {
                        value: '0',
                        label: 'Select All',
                        options: [
                          {
                            value: '1',
                            label: 'United States and Canada',
                            options: [
                              {
                                value: '2',
                                label: 'USA',
                                options: [
                                  {
                                    value: '4',
                                    label: 'Mid Atlantic',
                                    options: [
                                      {
                                        value: '31',
                                        label: 'Delaware',
                                      },
                                      {
                                        value: '32',
                                        label: 'Maryland',
                                      },
                                      {
                                        value: '33',
                                        label: 'New York',
                                      },
                                      {
                                        value: '34',
                                        label: 'Pennsylvania',
                                      },
                                    ],
                                  },
                                  {
                                    value: '43434',
                                    label: 'Midwest',
                                    options: [
                                      {
                                        value: '35',
                                        label: 'Illinois',
                                      },
                                      {
                                        value: '36',
                                        label: 'Iowa',
                                      },
                                      {
                                        value: '37',
                                        label: 'Michigan',
                                      },
                                      {
                                        value: '38',
                                        label: 'Ohio',
                                      },
                                    ],
                                  },
                                  {
                                    value: '476',
                                    label: 'Northeast',
                                    options: [
                                      {
                                        value: '39',
                                        label: 'Connecticut',
                                      },
                                      {
                                        value: '310',
                                        label: 'Massachusetts',
                                      },
                                      {
                                        value: '311',
                                        label: 'Rhode Island',
                                      },
                                      {
                                        value: '312',
                                        label: 'Vermont',
                                      },
                                    ],
                                  },
                                  {
                                    value: '432',
                                    label: 'Southeast',
                                    options: [
                                      {
                                        value: '313',
                                        label: 'Florida',
                                      },
                                      {
                                        value: '314',
                                        label: 'Mississippi',
                                      },
                                      {
                                        value: '315',
                                        label: 'Tennessee',
                                      },
                                      {
                                        value: '316',
                                        label: 'Virginia',
                                      },
                                    ],
                                  },
                                  {
                                    value: '412',
                                    label: 'Southwest',
                                    options: [
                                      {
                                        value: '317',
                                        label: 'Colorado',
                                      },
                                      {
                                        value: '318',
                                        label: 'New Mexico',
                                      },
                                      {
                                        value: '319',
                                        label: 'Texas',
                                      },
                                      {
                                        value: '320',
                                        label: 'Utah',
                                      },
                                    ],
                                  },
                                  {
                                    value: '498',
                                    label: 'West',
                                    options: [
                                      {
                                        value: '321',
                                        label: 'California',
                                      },
                                      {
                                        value: '322',
                                        label: 'Hawaii',
                                      },
                                      {
                                        value: '323',
                                        label: 'Montana',
                                      },
                                      {
                                        value: '324',
                                        label: 'Nevada',
                                      },
                                    ],
                                  },
                                ],
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
                                value: '81',
                                label: 'Anguilla',
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
                                value: '11',
                                label: 'United Kingdom',
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
                                value: '111',
                                label: 'Developed Asia-Pacific',
                                options: [
                                  {
                                    value: '81',
                                    label: 'Australia',
                                  },
                                  {
                                    value: '82',
                                    label: 'Hong Kong',
                                  },
                                  {
                                    value: '83',
                                    label: 'Japan',
                                  },
                                  {
                                    value: '84',
                                    label: 'New Zealand',
                                  },
                                  {
                                    value: '85',
                                    label: 'Singapore',
                                  },
                                  {
                                    value: '86',
                                    label: 'South Korea',
                                  },
                                  {
                                    value: '87',
                                    label: 'Taiwan',
                                  },
                                ],
                              },
                              {
                                value: '121',
                                label: 'Emerging Asia-Pacific',
                                options: [
                                  {
                                    value: '88',
                                    label: 'Afghanistan',
                                  },
                                  {
                                    value: '89',
                                    label: 'Antarctica',
                                  },
                                  {
                                    value: '810',
                                    label: 'Bangladesh',
                                  },
                                  {
                                    value: '811',
                                    label: 'Bhutan',
                                  },
                                  {
                                    value: '812',
                                    label: 'Brit Indian Ocn Trty',
                                  },
                                  {
                                    value: '813',
                                    label: 'Brunei',
                                  },
                                  {
                                    value: '814',
                                    label: 'Cambodia',
                                  },
                                  {
                                    value: '815',
                                    label: 'China',
                                  },
                                  {
                                    value: '816',
                                    label: 'Christmas Island',
                                  },
                                  {
                                    value: '817',
                                    label: 'Cook Islands',
                                  },
                                  {
                                    value: '818',
                                    label: 'Fiji',
                                  },
                                  {
                                    value: '819',
                                    label: 'French Polynesia',
                                  },
                                  {
                                    value: '820',
                                    label: 'French Southern Trty',
                                  },
                                  {
                                    value: '821',
                                    label: 'Heard Island',
                                  },
                                  {
                                    value: '822',
                                    label: 'India',
                                  },
                                  {
                                    value: '823',
                                    label: 'Indonesia',
                                  },
                                  {
                                    value: '824',
                                    label: 'Kiribati',
                                  },
                                  {
                                    value: '825',
                                    label: 'Laos',
                                  },
                                  {
                                    value: '826',
                                    label: 'Macau',
                                  },
                                  {
                                    value: '827',
                                    label: 'Malaysia',
                                  },
                                  {
                                    value: '828',
                                    label: 'Maldives',
                                  },
                                  {
                                    value: '829',
                                    label: 'Marshall Islands',
                                  },
                                  {
                                    value: '830',
                                    label: 'Mongolia',
                                  },
                                  {
                                    value: '831',
                                    label: 'Myanmar',
                                  },
                                  {
                                    value: '832',
                                    label: 'Nauru',
                                  },
                                  {
                                    value: '833',
                                    label: 'Nepal',
                                  },
                                  {
                                    value: '834',
                                    label: 'New Caledonia',
                                  },
                                  {
                                    value: '835',
                                    label: 'Niue',
                                  },
                                  {
                                    value: '836',
                                    label: 'Norfolk Island',
                                  },
                                  {
                                    value: '837',
                                    label: 'North Korea',
                                  },
                                  {
                                    value: '838',
                                    label: 'Pakistan',
                                  },
                                  {
                                    value: '839',
                                    label: 'Palau',
                                  },
                                  {
                                    value: '840',
                                    label: 'Papua New Guinea',
                                  },
                                  {
                                    value: '841',
                                    label: 'Philippines',
                                  },
                                  {
                                    value: '842',
                                    label: 'Pitcairn Islands',
                                  },
                                  {
                                    value: '843',
                                    label: 'Samoa',
                                  },
                                  {
                                    value: '844',
                                    label: 'Solomon Islands',
                                  },
                                  {
                                    value: '845',
                                    label: 'Sri Lanka',
                                  },
                                  {
                                    value: '846',
                                    label: 'Thailand',
                                  },
                                  {
                                    value: '847',
                                    label: 'Timor - Leste',
                                  },
                                  {
                                    value: '848',
                                    label: 'Tokelau',
                                  },
                                  {
                                    value: '849',
                                    label: 'Tonga',
                                  },
                                  {
                                    value: '850',
                                    label: 'Tuvalu',
                                  },
                                  {
                                    value: '851',
                                    label: 'Vanuatu',
                                  },
                                  {
                                    value: '852',
                                    label: 'Vietnam',
                                  },
                                  {
                                    value: '853',
                                    label: 'Wallis & Futuna',
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            value: '71',
                            label: 'Middle East',
                            options: [
                              {
                                value: '616',
                                label: 'Bahrain',
                              },
                              {
                                value: '615',
                                label: 'Egypt',
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
                        ],
                      },
                    ]}
                    placeholder="No geographies selectd"
                    searchPlaceholder="Search"
                    skeletonConfig={{
                      animation: true,
                      loading: false,
                    }}
                    tabIndex={0}
                  />
                </FormGroup>

                <Switch
                  alignIndicator="center"
                  checked
                  className="custom-class"
                  id="switch-control-1"
                  label="Include Industry asset results in global typeahead."
                  //onChange={function noRefCheck(){}}
                  wrapperId="custom-wrapper-id"
                />
              </Tab>
            </Tabs>
          </GlobalHeaderUserSectionPopover>
        </Tooltip>
        <Tooltip
          isSecondary
          returnFocus
          offset={9}
          autoResize={false}
          contentPadding={0}
          width={'408px'}
          tabIndex={0}
          placement={TooltipPlacement.BOTTOM}
          triggerEvent={TooltipTriggerEvent.CLICK}
          triggerElement={
            <Button purpose={Purpose.NONE} aria-label={'Open alerts notification panel'}>
              <GlobalHeaderUserSectionIcon icon={BELL} size={Size.MEDIUM} />
            </Button>
          }
        >
          <GlobalHeaderUserSectionPopover
            title={'Alerts'}
            headerRightElement={
              <div className={Classes.TEXT_MEDIUM}>
                <a
                  className={classNames(
                    Classes.LINK,
                    Classes.TEXT_MEDIUM,
                    Classes.spacingClass(SpacingType.MARGIN, SpacingSide.R, SpacingSize.SM)
                  )}
                >
                  Create New Alert
                </a>
                |
                <a
                  className={classNames(
                    Classes.LINK,
                    Classes.TEXT_MEDIUM,
                    Classes.spacingClass(SpacingType.MARGIN, SpacingSide.X, SpacingSize.SM)
                  )}
                >
                  Manage Alert
                </a>
                |
                <a
                  className={classNames(
                    Classes.LINK,
                    Classes.TEXT_MEDIUM,
                    Classes.spacingClass(SpacingType.MARGIN, SpacingSide.L, SpacingSize.SM)
                  )}
                >
                  <Icon
                    icon={EXTERNAL_LINK}
                    size={Size.SMALL}
                    color={'var(--color-text-link)'}
                    className={classNames(
                      Classes.LINK,
                      Classes.TEXT_MEDIUM,
                      Classes.spacingClass(SpacingType.MARGIN, SpacingSide.L, SpacingSize.SM)
                    )}
                  />
                </a>
              </div>
            }
          >
            <div
              className={Classes.spacingClass(
                SpacingType.PADDING,
                SpacingSide.ALL_SIDES,
                SpacingSize.LG
              )}
            >
              <div
                className={classNames(
                  Classes.ROW,
                  Classes.spacingClass(SpacingType.PADDING, SpacingSide.Y, SpacingSize.SM),
                  Classes.spacingClass(SpacingType.PADDING, SpacingSide.X, SpacingSize.XS)
                )}
              >
                <div className={Classes.columnClass(1)}>
                  <Icon icon={BELL} size={Size.XLARGE} color={'var(--color-base-orange-30)'} />
                </div>
                <div className={Classes.columnClass(11)}>
                  <div className={classNames(Classes.HEADING, Classes.HEADING_XSMALL)}>
                    Ratings Bulletin: Buying ABB Ltd.&apos;s Power Grid Business Would Soak Up
                    Hitachi Ltd.&apos;s Financial …
                  </div>
                  <p
                    className={classNames(
                      Classes.TEXT,
                      Classes.TEXT_MEDIUM,
                      Classes.TEXT_SECONDARY,
                      Classes.spacingClass(SpacingType.PADDING, SpacingSide.Y, SpacingSize.MD)
                    )}
                  >
                    TOKYO (S&P Global Ratings) Dec. 13, 2018--Japan-based ?diversified electronics
                    and capital goods...
                  </p>
                  <div>
                    <p
                      className={classNames(
                        Classes.TEXT,
                        Classes.TEXT_SECONDARY,
                        Classes.TEXT_SMALL,
                        Classes.FLOAT_LEFT
                      )}
                    >
                      1 min ago
                    </p>
                    <a
                      className={classNames(Classes.LINK, Classes.TEXT_SMALL, Classes.FLOAT_RIGHT)}
                    >
                      Edit Alert
                    </a>
                  </div>
                </div>
              </div>
              <Divider />
              <div
                className={classNames(
                  Classes.ROW,
                  Classes.spacingClass(SpacingType.PADDING, SpacingSide.Y, SpacingSize.SM),
                  Classes.spacingClass(SpacingType.PADDING, SpacingSide.X, SpacingSize.XS)
                )}
              >
                <div className={Classes.columnClass(1)}>
                  <Icon icon={BELL} size={Size.XLARGE} color={'var(--color-base-orange-30)'} />
                </div>
                <div className={Classes.columnClass(11)}>
                  <div className={classNames(Classes.HEADING, Classes.HEADING_XSMALL)}>
                    Stock Price - (NYSE: GISI)
                  </div>
                  <p
                    className={classNames(
                      Classes.TEXT,
                      Classes.TEXT_XLARGE,
                      Classes.spacingClass(SpacingType.PADDING, SpacingSide.Y, SpacingSize.SM)
                    )}
                  >
                    <span className={Classes.HEADING_LARGE}>$4.81</span>
                    <span className={`${Classes.TEXT}-success`}>
                      <Icon
                        icon={CARET_UP}
                        size={Size.SMALL}
                        purpose={Purpose.SUCCESS}
                        className={classNames(
                          `${Classes.TEXT}-success`,
                          Classes.spacingClass(SpacingType.MARGIN, SpacingSide.L, SpacingSize.SM)
                        )}
                      />
                      +$0.23 +6.99%
                    </span>
                  </p>
                  <div>
                    <p
                      className={classNames(
                        Classes.TEXT,
                        Classes.TEXT_SECONDARY,
                        Classes.TEXT_SMALL,
                        Classes.FLOAT_LEFT
                      )}
                    >
                      1 min ago
                    </p>
                    <a
                      className={classNames(Classes.LINK, Classes.TEXT_SMALL, Classes.FLOAT_RIGHT)}
                    >
                      Edit Alert
                    </a>
                  </div>
                </div>
              </div>
              <Divider />
              <div
                className={classNames(
                  Classes.ROW,
                  Classes.spacingClass(SpacingType.PADDING, SpacingSide.Y, SpacingSize.SM),
                  Classes.spacingClass(SpacingType.PADDING, SpacingSide.X, SpacingSize.XS)
                )}
              >
                <div className={Classes.columnClass(1)}>
                  <Icon icon={BELL} size={Size.XLARGE} color={'var(--color-base-orange-30)'} />
                </div>
                <div className={Classes.columnClass(11)}>
                  <div className={classNames(Classes.HEADING, Classes.HEADING_XSMALL)}>
                    Stock Price - (NYSE: GISI)
                  </div>
                  <p
                    className={classNames(
                      Classes.TEXT,
                      Classes.TEXT_XLARGE,
                      Classes.spacingClass(SpacingType.PADDING, SpacingSide.Y, SpacingSize.SM)
                    )}
                  >
                    <span className={Classes.HEADING_LARGE}>$4.81</span>
                    <span className={`${Classes.TEXT}-success`}>
                      <Icon
                        icon={CARET_UP}
                        size={Size.SMALL}
                        purpose={Purpose.SUCCESS}
                        className={classNames(
                          `${Classes.TEXT}-success`,
                          Classes.spacingClass(SpacingType.MARGIN, SpacingSide.L, SpacingSize.SM)
                        )}
                      />{' '}
                      +$0.23 +6.99%
                    </span>
                  </p>
                  <div>
                    <p
                      className={classNames(
                        Classes.TEXT,
                        Classes.TEXT_SECONDARY,
                        Classes.TEXT_SMALL,
                        Classes.FLOAT_LEFT
                      )}
                    >
                      1 min ago
                    </p>
                    <a
                      className={classNames(Classes.LINK, Classes.TEXT_SMALL, Classes.FLOAT_RIGHT)}
                    >
                      Edit Alert
                    </a>
                  </div>
                </div>
              </div>
              <Divider />
              <div
                className={classNames(
                  Classes.ROW,
                  Classes.spacingClass(SpacingType.PADDING, SpacingSide.Y, SpacingSize.SM),
                  Classes.spacingClass(SpacingType.PADDING, SpacingSide.X, SpacingSize.XS)
                )}
              >
                <div className={Classes.columnClass(1)}>
                  <Icon icon={BELL} size={Size.XLARGE} color={'var(--color-base-orange-30)'} />
                </div>
                <div className={Classes.columnClass(11)}>
                  <div className={classNames(Classes.HEADING, Classes.HEADING_XSMALL)}>
                    Not All Blank Cassettes Are Created Equal, Say Fed and SEC Chairs
                  </div>
                  <p
                    className={classNames(
                      Classes.TEXT,
                      Classes.TEXT_MEDIUM,
                      Classes.TEXT_SECONDARY,
                      Classes.spacingClass(SpacingType.PADDING, SpacingSide.Y, SpacingSize.MD)
                    )}
                  >
                    HDMI, or high definition multimedia interface by the efforts of several
                    prominent names in the{' '}
                  </p>
                  <div>
                    <p
                      className={classNames(
                        Classes.TEXT,
                        Classes.TEXT_SECONDARY,
                        Classes.TEXT_SMALL,
                        Classes.FLOAT_LEFT
                      )}
                    >
                      1 min ago
                    </p>
                    <a
                      className={classNames(Classes.LINK, Classes.TEXT_SMALL, Classes.FLOAT_RIGHT)}
                    >
                      Edit Alert
                    </a>
                  </div>
                </div>
              </div>
              <Divider />
              <div
                className={classNames(
                  Classes.ROW,
                  Classes.spacingClass(SpacingType.PADDING, SpacingSide.Y, SpacingSize.SM),
                  Classes.spacingClass(SpacingType.PADDING, SpacingSide.X, SpacingSize.XS)
                )}
              >
                <div className={Classes.columnClass(1)}>
                  <Icon icon={BELL} size={Size.XLARGE} className={`${Classes.TEXT}-orange`} />
                </div>
                <div className={Classes.columnClass(11)}>
                  <div className={classNames(Classes.HEADING, Classes.HEADING_XSMALL)}>
                    Stocking A Commercial Kitchen Finding High Quality Cookware Online
                  </div>
                  <p
                    className={classNames(
                      Classes.TEXT,
                      Classes.TEXT_MEDIUM,
                      Classes.TEXT_SECONDARY,
                      Classes.spacingClass(SpacingType.PADDING, SpacingSide.Y, SpacingSize.MD)
                    )}
                  >
                    The Idea of DOS Is Not Henceforth Relevant multimedia interface by the efforts
                    of several prominent names in…
                  </p>
                  <div>
                    <p
                      className={classNames(
                        Classes.TEXT,
                        Classes.TEXT_SECONDARY,
                        Classes.TEXT_SMALL,
                        Classes.FLOAT_LEFT
                      )}
                    >
                      5 min ago
                    </p>
                    <a
                      className={classNames(Classes.LINK, Classes.TEXT_SMALL, Classes.FLOAT_RIGHT)}
                    >
                      Edit Alert
                    </a>
                  </div>
                </div>
              </div>
              <Divider />
              <div
                className={classNames(
                  Classes.ROW,
                  Classes.spacingClass(SpacingType.PADDING, SpacingSide.Y, SpacingSize.SM),
                  Classes.spacingClass(SpacingType.PADDING, SpacingSide.X, SpacingSize.XS)
                )}
              >
                <div className={Classes.columnClass(1)}>
                  <Icon icon={BELL} size={Size.XLARGE} className={`${Classes.TEXT}-orange`} />
                </div>
                <div className={Classes.columnClass(11)}>
                  <div className={classNames(Classes.HEADING, Classes.HEADING_XSMALL)}>
                    Stock Price - (NYSE: GISI)
                  </div>
                  <p
                    className={classNames(
                      Classes.TEXT,
                      Classes.TEXT_XLARGE,
                      Classes.spacingClass(SpacingType.PADDING, SpacingSide.Y, SpacingSize.SM)
                    )}
                  >
                    <span className={Classes.HEADING_LARGE}>$4.81</span>
                    <span className={`${Classes.TEXT}-success`}>
                      <Icon
                        icon={CARET_UP}
                        size={Size.SMALL}
                        purpose={Purpose.SUCCESS}
                        className={classNames(
                          `${Classes.TEXT}-success`,
                          Classes.spacingClass(SpacingType.MARGIN, SpacingSide.L, SpacingSize.SM)
                        )}
                      />{' '}
                      +$0.23 +6.99%
                    </span>
                  </p>
                  <div>
                    <p
                      className={classNames(
                        Classes.TEXT,
                        Classes.TEXT_SECONDARY,
                        Classes.TEXT_SMALL,
                        Classes.FLOAT_LEFT
                      )}
                    >
                      1 min ago
                    </p>
                    <a
                      className={classNames(Classes.LINK, Classes.TEXT_SMALL, Classes.FLOAT_RIGHT)}
                    >
                      Edit Alert
                    </a>
                  </div>
                </div>
              </div>
              <Divider />
              <div
                className={classNames(
                  Classes.ROW,
                  Classes.spacingClass(SpacingType.PADDING, SpacingSide.Y, SpacingSize.SM),
                  Classes.spacingClass(SpacingType.PADDING, SpacingSide.X, SpacingSize.XS)
                )}
              >
                <div className={Classes.columnClass(1)}>
                  <Icon icon={BELL} size={Size.XLARGE} className={`${Classes.TEXT}-orange`} />
                </div>
                <div className={Classes.columnClass(11)}>
                  <div className={classNames(Classes.HEADING, Classes.HEADING_XSMALL)}>
                    Stock Price - (NYSE: GISI)
                  </div>
                  <p
                    className={classNames(
                      Classes.TEXT,
                      Classes.TEXT_XLARGE,
                      Classes.spacingClass(SpacingType.PADDING, SpacingSide.Y, SpacingSize.SM)
                    )}
                  >
                    <span className={Classes.HEADING_LARGE}>$4.81</span>
                    <span className={`${Classes.TEXT}-success`}>
                      <Icon
                        size={Size.SMALL}
                        icon={CARET_UP}
                        className={classNames(
                          `${Classes.TEXT}-success`,
                          Classes.spacingClass(SpacingType.MARGIN, SpacingSide.L, SpacingSize.SM)
                        )}
                        purpose={Purpose.SUCCESS}
                      />{' '}
                      +$0.23 +6.99%
                    </span>
                  </p>
                  <div>
                    <p
                      className={classNames(
                        Classes.TEXT,
                        Classes.TEXT_SECONDARY,
                        Classes.TEXT_SMALL,
                        Classes.FLOAT_LEFT
                      )}
                    >
                      1 min ago
                    </p>
                    <a
                      className={classNames(Classes.LINK, Classes.TEXT_SMALL, Classes.FLOAT_RIGHT)}
                    >
                      Edit Alert
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </GlobalHeaderUserSectionPopover>
        </Tooltip>
        <Tooltip
          isSecondary
          returnFocus
          offset={9}
          autoResize={false}
          contentPadding={0}
          width={'408px'}
          tabIndex={0}
          placement={TooltipPlacement.BOTTOM}
          triggerEvent={TooltipTriggerEvent.CLICK}
          triggerElement={
            <Button purpose={Purpose.NONE} aria-label={'Open help page'}>
              <GlobalHeaderUserSectionIcon size={Size.MEDIUM} icon={CIRCLE_HELP} />
            </Button>
          }
        >
          <GlobalHeaderUserSectionPopover title={'Help'}>
            <div
              className={Classes.spacingClass(
                SpacingType.PADDING,
                SpacingSide.ALL_SIDES,
                SpacingSize.LG
              )}
            >
              <div>
                <GlobalHeaderUserSectionTitleLink>Platform Tours</GlobalHeaderUserSectionTitleLink>
                <p
                  className={classNames(
                    Classes.TEXT,
                    Classes.TEXT_LARGE,
                    Classes.spacingClass(SpacingType.MARGIN, SpacingSide.T, SpacingSize.XS)
                  )}
                >
                  Guided tours presenting tips and new features.
                </p>
              </div>
              <Divider />
              <div>
                <GlobalHeaderUserSectionTitleLink>
                  FAQs and Training
                </GlobalHeaderUserSectionTitleLink>
                <p
                  className={classNames(
                    Classes.TEXT,
                    Classes.TEXT_LARGE,
                    Classes.spacingClass(SpacingType.MARGIN, SpacingSide.T, SpacingSize.XS)
                  )}
                >
                  User guides, FAQs and training for Capital IQ Pro
                </p>
              </div>
              <Divider />
              <div>
                <GlobalHeaderUserSectionTitleLink>
                  S&P Capital IQ Academy
                </GlobalHeaderUserSectionTitleLink>
                <p
                  className={classNames(
                    Classes.TEXT,
                    Classes.TEXT_LARGE,
                    Classes.spacingClass(SpacingType.MARGIN, SpacingSide.T, SpacingSize.XS)
                  )}
                >
                  Self-paced learning designed to get you up to speed on Capital IQ Pro quickly and
                  easily.
                </p>
              </div>
              <Divider />
              <div>
                <div
                  className={classNames(
                    Classes.HEADING,
                    Classes.HEADING_XSMALL,
                    Classes.spacingClass(SpacingType.MARGIN, SpacingSide.B, SpacingSize.XS)
                  )}
                >
                  Quick Support
                </div>
                <GlobalHeaderUserSectionQuickSupport>
                  <Icon icon={EMAIL} size={Size.MEDIUM} color={'var(--color-icon-primary)'} />
                  <a href="" className={classNames(Classes.TEXT_LARGE, Classes.LINK)}>
                    Support.capiqpro@spglobal.com
                  </a>
                </GlobalHeaderUserSectionQuickSupport>
                <GlobalHeaderUserSectionQuickSupport>
                  <Icon icon={PHONE} size={Size.MEDIUM} color={'var(--color-icon-primary)'} />
                  <a href="" className={classNames(Classes.TEXT_LARGE, Classes.LINK)}>
                    Request a call
                  </a>
                </GlobalHeaderUserSectionQuickSupport>
                <GlobalHeaderUserSectionQuickSupport>
                  <Icon icon={CHAT} size={Size.MEDIUM} color={'var(--color-icon-primary)'} />
                  <a href="" className={classNames(Classes.TEXT_LARGE, Classes.LINK)}>
                    Chat with us
                  </a>
                </GlobalHeaderUserSectionQuickSupport>
              </div>
              <Divider />
              <div>
                <div
                  className={classNames(
                    Classes.TEXT,
                    Classes.TEXT_LARGE,
                    Classes.spacingClass(SpacingType.MARGIN, SpacingSide.B, SpacingSize.MD)
                  )}
                >
                  <span className={classNames(Classes.HEADING, Classes.HEADING_XSMALL)}>
                    Personalized Support
                  </span>{' '}
                  +1 (888) 275-2822
                </div>
                <div
                  className={classNames(
                    Classes.TEXT,
                    Classes.TEXT_LARGE,
                    Classes.spacingClass(SpacingType.MARGIN, SpacingSide.B, SpacingSize.SM)
                  )}
                >
                  <a
                    className={classNames(
                      Classes.LINK,
                      Classes.spacingClass(SpacingType.MARGIN, SpacingSide.B, SpacingSize.MD),
                      Classes.spacingClass(SpacingType.MARGIN, SpacingSide.R, SpacingSize.XS)
                    )}
                  >
                    Authorize MI Assist
                  </a>
                  <Tooltip
                    withArrow
                    placement={TooltipPlacement.RIGHT}
                    triggerEvent={TooltipTriggerEvent.HOVER}
                    triggerElement={<Icon icon={CIRCLE_INFO} size={Size.SMALL} />}
                  >
                    <p
                      className={classNames(
                        Classes.HEADING_XSMALL,
                        Classes.spacingClass(
                          SpacingType.MARGIN,
                          SpacingSide.ALL_SIDES,
                          SpacingSize.ZERO
                        )
                      )}
                    >
                      Title
                    </p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  </Tooltip>{' '}
                  User ID: -2147446765
                </div>
                <div className={classNames(Classes.TEXT, Classes.TEXT_LARGE)}>
                  Your relationship manager is <a className={Classes.LINK}>Jane Williams</a>{' '}
                </div>
              </div>
              <Divider />
              <div>
                <div
                  className={classNames(
                    Classes.HEADING,
                    Classes.HEADING_XSMALL,
                    Classes.spacingClass(SpacingType.MARGIN, SpacingSide.B, SpacingSize.MD)
                  )}
                >
                  More
                </div>
                <div
                  className={classNames(
                    Classes.TEXT,
                    Classes.TEXT_LARGE,
                    Classes.spacingClass(SpacingType.MARGIN, SpacingSide.B, SpacingSize.SM)
                  )}
                >
                  <a className={Classes.LINK}>Upcoming Events</a>
                </div>
                <div
                  className={classNames(
                    Classes.TEXT,
                    Classes.TEXT_LARGE,
                    Classes.spacingClass(SpacingType.MARGIN, SpacingSide.B, SpacingSize.SM)
                  )}
                >
                  <a className={Classes.LINK}>Release Notes</a>
                </div>
                <div
                  className={classNames(
                    Classes.TEXT,
                    Classes.TEXT_LARGE,
                    Classes.spacingClass(SpacingType.MARGIN, SpacingSide.B, SpacingSize.SM)
                  )}
                >
                  <a className={Classes.LINK}>Quality Program</a>
                </div>
              </div>
            </div>
          </GlobalHeaderUserSectionPopover>
        </Tooltip>
      </GlobalHeaderUserSection>
    </GlobalHeader>
  );
};

export default PrototypeHeader;
