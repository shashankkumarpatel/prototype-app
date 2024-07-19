import classNames from 'classnames';
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

import { AccordianList, OverLayHead } from './styles/header.styles';

const capitalIQLogoDarkTheme =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTM4cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDEzOCAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDx0aXRsZT5jYXBpdGFsSVFQcm9fc3ZnPC90aXRsZT4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJEYXJrLU1vZGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNDQuMDAwMDAwLCAtMTExMi4wMDAwMDApIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8ZyBpZD0iY2FwaXRhbElRUHJvX3N2ZyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQ0LjAwMDAwMCwgMTExMi4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIGZpbGw9IiNENzFGMkQiIHg9IjExNS4xNjU0NjgiIHk9IjAiIHdpZHRoPSIyMi44MzQ1MzI0IiBoZWlnaHQ9IjEwLjkyMDg2MzMiPjwvcmVjdD4KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDYuOTQ5NjQwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTkuMzYyMDg4MzYsMTEuOTkxMjAyNSBDOC40Mjk4Mjk3NywxMi45Nzk3NTMzIDYuOTkxOTM5NDEsMTMuMzQxNDE4MyA1LjQ5MDg0NTA3LDEzLjM0MTQxODMgQzQuMjAzMDY0MTQsMTMuMzQxNDE4MyAyLjgwNDY3NjI2LDEyLjk3OTc1MzMgMS43OTM0MTI3MSwxMi4wNjM1MzU1IEMxLjA3NDQ2NzUyLDExLjQwNDUwMTUgMC41MDU2MzE3NzYsMTAuMzUxNjU0NyAwLjUwNTYzMTc3Niw5LjE0NjEwNDgzIEwyLjgwNDY3NjI2LDkuMTQ2MTA0ODMgQzIuODA0Njc2MjYsOS43NjQ5NTM3NSAzLjA4OTA5NDEzLDEwLjMxMTQ2OTcgMy40NTI1MTY5NywxMC42ODExNzE2IEMzLjk4OTc1MDczLDExLjIyNzY4NzYgNC44MTE0MDIzNywxMS4zNDAyMDU1IDUuNTMwMzQ3NTUsMTEuMzQwMjA1NSBDNi4zOTE1MDE2NywxMS4zNDAyMDU1IDcuMTgxNTUxMzIsMTEuMTU1MzU0NiA3LjY3OTI4MjYsMTAuNjgxMTcxNiBDNy45NjM3MDA0OCwxMC4zOTE4Mzk3IDguMTg0OTE0MzgsMTAuMDk0NDcwNyA4LjE4NDkxNDM4LDkuNDc1NjIxNzkgQzguMTg0OTE0MzgsOC41Njc0NDA5IDcuNTA1NDcxNjgsOC4xMjU0MDU5NiA2LjcxNTQyMjAzLDcuOTgwNzM5OTggQzUuODkzNzcwMzksNy44MzYwNzQgNC44MTE0MDIzNyw3Ljc5NTg4OSAzLjk4OTc1MDczLDcuNjUxMjIzMDIgQzIuMzA2OTQ0OTgsNy4zNjE4OTEwNiAwLjg2OTA1NDYxNSw2LjIyODY3NDIgMC44NjkwNTQ2MTUsNC4xNDcwOTE0NyBDMC44NjkwNTQ2MTUsMy4xNTg1NDA2IDEuMjk1NjgxNDMsMi4zMjI2OTI3IDEuOTQzNTIyMTQsMS42NjM2NTg3OSBDMi43NjUxNzM3OCwwLjg1OTk1ODg5IDQuMTMxOTU5NjcsMC4zNTM2Mjc5NTUgNS41NjE5NDk1NCwwLjM1MzYyNzk1NSBDNi44ODkyMzI5NSwwLjM1MzYyNzk1NSA4LjE3NzAxMzg4LDAuNzg3NjI1ODk5IDkuMDA2NTY2MDEsMS41NTkxNzc4IEM5LjcyNTUxMTIsMi4yNTAzNTk3MSAxMC4yMjMyNDI1LDMuMTk4NzI1NTkgMTAuMjYyNzQ1LDQuMjE5NDI0NDYgTDcuOTYzNzAwNDgsNC4yMTk0MjQ0NiBDNy45NjM3MDA0OCwzLjc4NTQyNjUyIDcuNzEwODg0NTksMy4zMTEyNDM1OCA3LjQyNjQ2NjcxLDIuOTgxNzI2NjIgQzcuMDMxNDQxODksMi41NDc3Mjg2NyA2LjIwOTc5MDI1LDIuMzIyNjkyNyA1LjU2MTk0OTU0LDIuMzIyNjkyNyBDNC44ODI1MDY4NCwyLjMyMjY5MjcgNC4wNTI5NTQ3MSwyLjQ2NzM1ODY4IDMuNTU1MjIzNDMsMy4wMTM4NzQ2MSBDMy4zMDI0MDc1NCwzLjMwMzIwNjU4IDMuMTI4NTk2NjIsMy42MDA1NzU1NCAzLjEyODU5NjYyLDQuMDc0NzU4NDggQzMuMTI4NTk2NjIsNC44Nzg0NTgzOCAzLjY2NTgzMDM4LDUuMzEyNDU2MzIgNC4zODQ3NzU1Niw1LjQyNDk3NDMxIEM1LjE3NDgyNTIxLDUuNTM3NDkyMjkgNi4yNDkyOTI3Myw1LjY0MTk3MzI4IDcuMDcwOTQ0MzcsNS43NTQ0OTEyNiBDOC45MDM4NTk1Niw2LjAxMTY3NTIzIDEwLjQ0NDQ1NjQsNy4yNDkzNzMwNyAxMC40NDQ0NTY0LDkuMzYzMTAzOCBDMTAuNDA0OTUzOSwxMC41Njg2NTM2IDkuOTcwNDI2NTksMTEuNDA0NTAxNSA5LjM2MjA4ODM2LDExLjk5MTIwMjUgWiIgaWQ9IlBhdGgiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjAuMTIyNTY0NiwxMy4xMjQ0MTkzIEwxOS4yNjE0MTA1LDEyLjEzNTg2ODQgQzE4LjI1ODA0NzQsMTMuMDExOTAxMyAxNy4wNDEzNzEsMTMuNDQ1ODk5MyAxNS43ODUxOTIsMTMuNDQ1ODk5MyBDMTMuNTk2NzU0NSwxMy40NDU4OTkzIDExLjcwMDYzNTMsMTEuOTgzMTY1NSAxMS43MDA2MzUzLDkuNjUyNDM1NzcgQzExLjcwMDYzNTMsOC4wODUyMjA5NyAxMi41OTMzOTE0LDcuMDI0MzM3MSAxMy44ODkwNzI5LDYuMjIwNjM3MiBDMTMuMDk5MDIzMiw1LjM0NDYwNDMyIDEyLjU2MTc4OTQsNC42NTM0MjI0IDEyLjU2MTc4OTQsMy40ODgwNTc1NSBDMTIuNTYxNzg5NCwxLjUxODk5MjgxIDE0LjA3MDc4NDMsMC4zMTM0NDI5NiAxNS45MzUzMDE0LDAuMzEzNDQyOTYgQzE3LjcyODcxNDIsMC4zMTM0NDI5NiAxOS4zNDA0MTU0LDEuNDQ2NjU5ODIgMTkuMzQwNDE1NCwzLjQxNTcyNDU2IEMxOS4zNDA0MTU0LDUuMDU1MjcyMzUgMTguMzY4NjU0NCw1Ljk3MTQ5MDI0IDE3LjAwOTc2OSw2Ljc3NTE5MDEzIEwxOS4xNTg3MDQsOS4xNDYxMDQ4MyBDMTkuMzcyMDE3NCw4Ljc0NDI1NDg4IDE5LjQ0MzEyMTksOC4xOTc3Mzg5NSAxOS40ODI2MjQ0LDcuNjExMDM4MDMgQzE5LjUyMjEyNjksNy4wNjQ1MjIxIDE5LjUyMjEyNjksNi40Nzc4MjExNyAxOS41MjIxMjY5LDYuMDc1OTcxMjIgTDIyLjcxMzkyNzQsNi4wNzU5NzEyMiBMMjIuNzEzOTI3NCw3LjgyODAzNyBMMjEuMjc2MDM3MSw3LjgyODAzNyBDMjEuMjM2NTM0Niw4LjgxNjU4Nzg3IDIxLjA2MjcyMzcsOS43OTcxMDE3NSAyMC41MjU0ODk5LDEwLjY0MDk4NjYgQzIxLjMxNTUzOTYsMTEuNDc2ODM0NSAyMi4wMzQ0ODQ4LDEyLjMyMDcxOTQgMjIuNzg1MDMxOSwxMy4xNTY1NjczIEwyMC4xMzA0NjUxLDEzLjE1NjU2NzMgTDIwLjEzMDQ2NTEsMTMuMTI0NDE5MyBMMjAuMTIyNTY0NiwxMy4xMjQ0MTkzIFogTTE1LjEzNzM1MTMsNy41Nzg4OTAwMyBDMTQuMzE1Njk5Nyw4LjA5MzI1Nzk3IDEzLjY2Nzg1OSw4LjQ4NzA3MDkxIDEzLjY2Nzg1OSw5LjU0Nzk1NDc4IEMxMy42Njc4NTksMTAuODI1ODM3NiAxNC43MTA3MjQ1LDExLjUxNzAxOTUgMTUuODg3ODk4NSwxMS41MTcwMTk1IEMxNi42MDY4NDM3LDExLjUxNzAxOTUgMTcuNDI4NDk1MywxMS4zMzIxNjg2IDE3Ljk2NTcyOTEsMTAuNzUzNTA0NiBDMTcuMDAxODY4NSw5LjY5MjYyMDc2IDE2LjEwOTExMjQsOC42MzE3MzY5IDE1LjEzNzM1MTMsNy41Nzg4OTAwMyBaIE0xNS45Mjc0MDEsMi4xMzc4NDE3MyBDMTUuMjA4NDU1OCwyLjEzNzg0MTczIDE0LjU2ODUxNTYsMi41NzE4Mzk2NyAxNC41Njg1MTU2LDMuNDQ3ODcyNTYgQzE0LjU2ODUxNTYsNC4yNTE1NzI0NiAxNS4yMTYzNTYzLDQuODMwMjM2MzggMTUuNzE0MDg3NSw1LjM4NDc4OTMxIEMxNi40NjQ2MzQ3LDQuOTUwNzkxMzcgMTcuMjk0MTg2OCw0LjU0ODk0MTQyIDE3LjI5NDE4NjgsMy41MjAyMDU1NSBDMTcuMjg2Mjg2NCwyLjY1MjIwOTY2IDE2LjcxNzQ1MDYsMi4xMzc4NDE3MyAxNS45Mjc0MDEsMi4xMzc4NDE3MyBaIiBpZD0iU2hhcGUiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjkuMjcxMzM5NSw4LjYzMTczNjkgTDI2LjY1NjI3NTIsOC42MzE3MzY5IEwyNi42NTYyNzUyLDEzLjExNjM4MjMgTDI0LjQzNjIzNTcsMTMuMTE2MzgyMyBMMjQuNDM2MjM1NywwLjYxMDgxMTkyMiBMMjkuMjc5MjQsMC42MTA4MTE5MjIgQzMyLjExNTUxODMsMC42MTA4MTE5MjIgMzMuNjE2NjEyNiwyLjIxODIxMTcyIDMzLjYxNjYxMjYsNC42MjEyNzQ0MSBDMzMuNjA4NzEyMSw2Ljk5MjE4OTExIDMyLjA5OTcxNzMsOC42MzE3MzY5IDI5LjI3MTMzOTUsOC42MzE3MzY5IFogTTI5LjE5MjMzNDYsMi41Nzk4NzY2NyBMMjYuNjc5OTc2NywyLjU3OTg3NjY3IEwyNi42Nzk5NzY3LDYuNjMwNTI0MTUgTDI5LjE5MjMzNDYsNi42MzA1MjQxNSBDMzAuNzAxMzI5NCw2LjYzMDUyNDE1IDMxLjM4MDc3MjEsNS44MjY4MjQyNSAzMS4zODA3NzIxLDQuNjIxMjc0NDEgQzMxLjM4MDc3MjEsMy40MTU3MjQ1NiAzMC42Njk3Mjc0LDIuNTc5ODc2NjcgMjkuMTkyMzM0NiwyLjU3OTg3NjY3IFoiIGlkPSJTaGFwZSI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik00Ni42OTk4MzQ4LDExLjg3ODY4NDUgQzQ1Ljc2NzU3NjIsMTIuODI3MDUwNCA0NC40Nzk3OTUzLDEzLjM3MzU2NjMgNDMuMTg0MTEzOSwxMy4zNzM1NjYzIEM0MS44NTY4MzA1LDEzLjM3MzU2NjMgNDAuNjQwMTU0LDEyLjkzOTU2ODMgMzkuNzA3ODk1NCwxMS45OTEyMDI1IEMzOC4zODA2MTIsMTAuNjQwOTg2NiAzOC4xNjcyOTg2LDguOTYxMjUzODUgMzguMTY3Mjk4Niw2LjkxOTg1NjEyIEMzOC4xNjcyOTg2LDQuODc4NDU4MzggMzguMzQ5MDEsMy4xOTg3MjU1OSAzOS43MDc4OTU0LDEuODQ4NTA5NzYgQzQwLjY0MDE1NCwwLjkwMDE0Mzg4NSA0MS44OTYzMzMsMC40MjU5NjA5NDYgNDMuMTg0MTEzOSwwLjQyNTk2MDk0NiBDNDQuNTExMzk3MywwLjQyNTk2MDk0NiA0NS43OTkxNzgyLDAuOTQwMzI4ODggNDYuNjk5ODM0OCwxLjg4ODY5NDc2IEM0Ny40MTg3OCwyLjYyMDA2MTY2IDQ3Ljc3NDMwMjQsMy42MDA1NzU1NCA0Ny44ODQ5MDkzLDQuNjIxMjc0NDEgTDQ1LjU4NTg2NDgsNC42MjEyNzQ0MSBDNDUuNTQ2MzYyMyw0LjA3NDc1ODQ4IDQ1LjMzMzA0ODksMy42NzI5MDg1MyA0NS4wNDg2MzExLDMuMzExMjQzNTggQzQ0LjY1MzYwNjIsMi43OTY4NzU2NCA0My45MzQ2NjExLDIuNTQ3NzI4NjcgNDMuMTg0MTEzOSwyLjU0NzcyODY3IEM0Mi40NjUxNjg3LDIuNTQ3NzI4NjcgNDEuNzg1NzI2LDIuODM3MDYwNjQgNDEuMjgwMDk0MiwzLjM4MzU3NjU3IEM0MC40MTg5NDAxLDQuMjkxNzU3NDUgNDAuNDE4OTQwMSw1LjgyNjgyNDI1IDQwLjQxODk0MDEsNi45OTIxODkxMSBDNDAuNDE4OTQwMSw4LjEyNTQwNTk2IDQwLjQxODk0MDEsOS42OTI2MjA3NiA0MS4yODAwOTQyLDEwLjYwMDgwMTYgQzQxLjc4NTcyNiwxMS4xNDczMTc2IDQyLjQ2NTE2ODcsMTEuNDM2NjQ5NSA0My4xODQxMTM5LDExLjQzNjY0OTUgQzQzLjkzNDY2MTEsMTEuNDM2NjQ5NSA0NC42NTM2MDYyLDExLjE0NzMxNzYgNDUuMDQ4NjMxMSwxMC42MzI5NDk2IEM0NS4zNzI1NTE0LDEwLjIzMTA5OTcgNDUuNTU0MjYyOCw5Ljc5NzEwMTc1IDQ1LjU4NTg2NDgsOS4yNTA1ODU4MiBMNDcuODg0OTA5Myw5LjI1MDU4NTgyIEM0Ny43NzQzMDI0LDEwLjEzNDY1NTcgNDcuNDEwODc5NSwxMS4xMTUxNjk2IDQ2LjY5OTgzNDgsMTEuODc4Njg0NSBaIiBpZD0iUGF0aCI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik01Ni4xMzMwMjc3LDEzLjI2OTA4NTMgQzU1LjIwMDc2OTEsMTMuMjY5MDg1MyA1NC42NjM1MzUzLDEyLjY4MjM4NDQgNTQuNTkyNDMwOCwxMS45OTEyMDI1IEM1NC4xNjU4MDQsMTIuNzIyNTY5NCA1My4xMjI5Mzg1LDEzLjM3MzU2NjMgNTEuODI3MjU3MSwxMy4zNzM1NjYzIEM0OS42NzgzMjIsMTMuMzczNTY2MyA0OC41NjQzNTIsMTEuOTkxMjAyNSA0OC41NjQzNTIsMTAuNDg4MjgzNyBDNDguNTY0MzUyLDguNzM2MjE3ODggNDkuODkxNjM1NCw3LjcxNTUxOTAxIDUxLjYxMzk0MzcsNy42MDMwMDEwMyBMNTQuMjY4NTEwNSw3LjQxODE1MDA1IEw1NC4yNjg1MTA1LDYuODcxNjM0MTIgQzU0LjI2ODUxMDUsNS45OTU2MDEyMyA1My45ODQwOTI2LDUuNDA4OTAwMzEgNTIuNzI3OTEzNyw1LjQwODkwMDMxIEM1MS43MjQ1NTA2LDUuNDA4OTAwMzEgNTEuMTE2MjEyNCw1Ljg4MzA4MzI1IDUxLjA3NjcwOTksNi43MTg5MzExNCBMNDguOTU5Mzc2OCw2LjcxODkzMTE0IEM0OS4wNjk5ODM4LDQuNjM3MzQ4NDEgNTAuNjgxNjg1MSwzLjcyOTE2NzUyIDUyLjcyNzkxMzcsMy43MjkxNjc1MiBDNTQuMjY4NTEwNSwzLjcyOTE2NzUyIDU1LjU5NTc5MzksNC4yNDM1MzU0NiA1Ni4xMDE0MjU3LDUuNTkzNzUxMjggQzU2LjMxNDczOTEsNi4xODA0NTIyMSA1Ni4zNTQyNDE2LDYuODMxNDQ5MTMgNTYuMzU0MjQxNiw3LjQ1ODMzNTA1IEw1Ni4zNTQyNDE2LDEwLjg0OTk0ODYgQzU2LjM1NDI0MTYsMTEuMjgzOTQ2NiA1Ni40OTY0NTA1LDExLjQzNjY0OTUgNTYuODU5ODczMywxMS40MzY2NDk1IEM1Ny4wMDIwODIzLDExLjQzNjY0OTUgNTcuMTQ0MjkxMiwxMS4zOTY0NjQ1IDU3LjE0NDI5MTIsMTEuMzk2NDY0NSBMNTcuMTQ0MjkxMiwxMy4wMzYwMTIzIEM1Ni44NDQwNzIzLDEzLjE1NjU2NzMgNTYuNjcwMjYxNCwxMy4yNjkwODUzIDU2LjEzMzAyNzcsMTMuMjY5MDg1MyBaIE01NC4zMDAxMTI1LDkuMDMzNTg2ODQgTDUyLjAwMTA2OCw5LjIxODQzNzgyIEM1MS4zNTMyMjczLDkuMjU4NjIyODIgNTAuNzEzMjg3MSw5LjY5MjYyMDc2IDUwLjcxMzI4NzEsMTAuNDIzOTg3NyBDNTAuNzEzMjg3MSwxMS4xMTUxNjk2IDUxLjMyMTYyNTMsMTEuNTU3MjA0NSA1Mi4wMDEwNjgsMTEuNTU3MjA0NSBDNTMuMzU5OTUzNCwxMS41NTcyMDQ1IDU0LjMwMDExMjUsMTAuODI1ODM3NiA1NC4zMDAxMTI1LDkuNDQzNDczNzkgTDU0LjMwMDExMjUsOS4wMzM1ODY4NCBaIiBpZD0iU2hhcGUiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNjUuNDg3MjE1NSwxMi42MTAwNTE0IEM2NC45MTA0NzkzLDEzLjA4NDIzNDMgNjQuMTk5NDM0NiwxMy4zNDE0MTgzIDYzLjI2NzE3NiwxMy4zNDE0MTgzIEM2Mi4xOTI3MDg1LDEzLjM0MTQxODMgNjEuMzMxNTU0NCwxMi45Mzk1NjgzIDYwLjg5NzAyNzEsMTIuNDMzMjM3NCBMNjAuODk3MDI3MSwxNi42Mjg1NTA5IEw1OC43MDg1ODk1LDE2LjYyODU1MDkgTDU4LjcwODU4OTUsMy45MzAwOTI1IEw2MC41NzMxMDY3LDMuOTMwMDkyNSBMNjAuNzU0ODE4MSw0Ljk1MDc5MTM3IEM2MS4yOTIwNTE5LDQuMTE0OTQzNDcgNjIuMjk1NDE0OSwzLjc0NTI0MTUyIDYzLjI5ODc3OCwzLjc0NTI0MTUyIEM2NC4xOTE1MzQxLDMuNzQ1MjQxNTIgNjQuOTQ5OTgxOCw0LjA3NDc1ODQ4IDY1LjQ4NzIxNTUsNC41MDg3NTY0MiBDNjYuNTYxNjgzLDUuNDE2OTM3MzEgNjcuMDk4OTE2OCw2Ljc2NzE1MzEzIDY3LjA5ODkxNjgsOC41MTkyMTg5MSBDNjcuMTA2ODE3MywxMC4zMTE0Njk3IDY2LjU2OTU4MzUsMTEuNzAxODcwNSA2NS40ODcyMTU1LDEyLjYxMDA1MTQgWiBNNjQuMzEwMDQxNSw2LjMwMTAwNzE5IEM2My45ODYxMjEyLDUuODk5MTU3MjUgNjMuNTE5OTkxOSw1LjU2OTY0MDI5IDYyLjg0MDU0OTIsNS41Njk2NDAyOSBDNjEuMTU3NzQzNCw1LjU2OTY0MDI5IDYwLjc5NDMyMDYsNy4yMDkxODgwOCA2MC43OTQzMjA2LDguNTI3MjU1OTEgQzYwLjc5NDMyMDYsOS44MzcyODY3NCA2MS4xNDk4NDI5LDExLjQ4NDg3MTUgNjIuODQwNTQ5MiwxMS40ODQ4NzE1IEM2My41MTk5OTE5LDExLjQ4NDg3MTUgNjMuOTg2MTIxMiwxMS4xNTUzNTQ2IDY0LjMxMDA0MTUsMTAuNzUzNTA0NiBDNjQuNzc2MTcwOCwxMC4xNjY4MDM3IDY0Ljg4Njc3NzgsOS4zMzA5NTU4MSA2NC44ODY3Nzc4LDguNTI3MjU1OTEgQzY0Ljg3ODg3NzMsNy43NjM3NDEwMSA2NC43NzYxNzA4LDYuOTE5ODU2MTIgNjQuMzEwMDQxNSw2LjMwMTAwNzE5IFoiIGlkPSJTaGFwZSI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik02OC43ODk2MjMxLDIuNjUyMjA5NjYgTDY4Ljc4OTYyMzEsMC4zOTM4MTI5NSBMNzEuMTIwMjY5NSwwLjM5MzgxMjk1IEw3MS4xMjAyNjk1LDIuNjUyMjA5NjYgTDY4Ljc4OTYyMzEsMi42NTIyMDk2NiBaIE02OC44NjA3Mjc1LDEzLjEyNDQxOTMgTDY4Ljg2MDcyNzUsMy45MzAwOTI1IEw3MS4wODA3NjcsMy45MzAwOTI1IEw3MS4wODA3NjcsMTMuMTI0NDE5MyBMNjguODYwNzI3NSwxMy4xMjQ0MTkzIFoiIGlkPSJTaGFwZSI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik03Ni42ODIyMTkxLDEzLjIyODkwMDMgQzc0Ljg0OTMwMzksMTMuMjI4OTAwMyA3My45NTY1NDc4LDEyLjE2ODAxNjQgNzMuOTU2NTQ3OCwxMC40MTU5NTA3IEw3My45NTY1NDc4LDUuNzQ2NDU0MjcgTDcyLjMwNTM0NCw1Ljc0NjQ1NDI3IEw3Mi4zMDUzNDQsMy45MjIwNTU1IEw3My45NTY1NDc4LDMuOTIyMDU1NSBMNzMuOTU2NTQ3OCwxLjU4MzI4ODggTDc2LjE0NDk4NTMsMS4wMzY3NzI4NyBMNzYuMTQ0OTg1MywzLjkyMjA1NTUgTDc4LjQwNDUyNzMsMy45MjIwNTU1IEw3OC40MDQ1MjczLDUuNzQ2NDU0MjcgTDc2LjE0NDk4NTMsNS43NDY0NTQyNyBMNzYuMTQ0OTg1MywxMC4yMzEwOTk3IEM3Ni4xNDQ5ODUzLDEwLjkyMjI4MTYgNzYuNDY4OTA1NywxMS4yNTE3OTg2IDc3LjE0ODM0ODQsMTEuMjUxNzk4NiBDNzcuNjE0NDc3NywxMS4yNTE3OTg2IDc3Ljk3LDExLjI1MTc5ODYgNzguNTQ2NzM2MiwxMS4xNzk0NjU2IEw3OC41NDY3MzYyLDEzLjA0NDA0OTMgQzc3LjkzODM5OCwxMy4xNTY1NjczIDc3LjMyMjE1OTMsMTMuMjI4OTAwMyA3Ni42ODIyMTkxLDEzLjIyODkwMDMgWiIgaWQ9IlBhdGgiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNODYuNzk0ODU0NiwxMy4yNjkwODUzIEM4NS44NjI1OTYsMTMuMjY5MDg1MyA4NS4zMjUzNjIyLDEyLjY4MjM4NDQgODUuMjU0MjU3OCwxMS45OTEyMDI1IEM4NC44Mjc2MzEsMTIuNzIyNTY5NCA4My43ODQ3NjU0LDEzLjM3MzU2NjMgODIuNDg5MDg0LDEzLjM3MzU2NjMgQzgwLjM0MDE0OSwxMy4zNzM1NjYzIDc5LjIyNjE3ODksMTEuOTkxMjAyNSA3OS4yMjYxNzg5LDEwLjQ4ODI4MzcgQzc5LjIyNjE3ODksOC43MzYyMTc4OCA4MC41NTM0NjI0LDcuNzE1NTE5MDEgODIuMjc1NzcwNiw3LjYwMzAwMTAzIEw4NC45MzAzMzc0LDcuNDE4MTUwMDUgTDg0LjkzMDMzNzQsNi44NzE2MzQxMiBDODQuOTMwMzM3NCw1Ljk5NTYwMTIzIDg0LjY0NTkxOTUsNS40MDg5MDAzMSA4My4zODk3NDA2LDUuNDA4OTAwMzEgQzgyLjM4NjM3NzUsNS40MDg5MDAzMSA4MS43NzgwMzkzLDUuODgzMDgzMjUgODEuNzM4NTM2OCw2LjcxODkzMTE0IEw3OS42MjEyMDM4LDYuNzE4OTMxMTQgQzc5LjczMTgxMDcsNC42MzczNDg0MSA4MS4zNDM1MTIsMy43MjkxNjc1MiA4My4zODk3NDA2LDMuNzI5MTY3NTIgQzg0LjkzMDMzNzQsMy43MjkxNjc1MiA4Ni4yNTc2MjA4LDQuMjQzNTM1NDYgODYuNzYzMjUyNiw1LjU5Mzc1MTI4IEM4Ni45NzY1NjYsNi4xODA0NTIyMSA4Ny4wMTYwNjg1LDYuODMxNDQ5MTMgODcuMDE2MDY4NSw3LjQ1ODMzNTA1IEw4Ny4wMTYwNjg1LDEwLjg0OTk0ODYgQzg3LjAxNjA2ODUsMTEuMjgzOTQ2NiA4Ny4xNTgyNzc0LDExLjQzNjY0OTUgODcuNTIxNzAwMywxMS40MzY2NDk1IEM4Ny42NjM5MDkyLDExLjQzNjY0OTUgODcuODA2MTE4MSwxMS4zOTY0NjQ1IDg3LjgwNjExODEsMTEuMzk2NDY0NSBMODcuODA2MTE4MSwxMy4wMzYwMTIzIEM4Ny41MTM3OTk4LDEzLjE1NjU2NzMgODcuMzMyMDg4NCwxMy4yNjkwODUzIDg2Ljc5NDg1NDYsMTMuMjY5MDg1MyBaIE04NC45NjE5Mzk0LDkuMDMzNTg2ODQgTDgyLjY2Mjg5NDksOS4yMTg0Mzc4MiBDODIuMDE1MDU0Miw5LjI1ODYyMjgyIDgxLjM3NTExNCw5LjY5MjYyMDc2IDgxLjM3NTExNCwxMC40MjM5ODc3IEM4MS4zNzUxMTQsMTEuMTE1MTY5NiA4MS45ODM0NTIyLDExLjU1NzIwNDUgODIuNjYyODk0OSwxMS41NTcyMDQ1IEM4NC4wMjE3ODAzLDExLjU1NzIwNDUgODQuOTYxOTM5NCwxMC44MjU4Mzc2IDg0Ljk2MTkzOTQsOS40NDM0NzM3OSBMODQuOTYxOTM5NCw5LjAzMzU4Njg0IFoiIGlkPSJTaGFwZSI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik05MS44MTE2Njk5LDEzLjIyODkwMDMgQzkwLjM0MjE3NzUsMTMuMjI4OTAwMyA4OS4zMzg4MTQ1LDEyLjQ5NzUzMzQgODkuMzM4ODE0NSwxMC43NDU0Njc2IEw4OS4zMzg4MTQ1LDAuMzUzNjI3OTU1IEw5MS41MjcyNTIsMC4zNTM2Mjc5NTUgTDkxLjUyNzI1MiwxMC4zODM4MDI3IEM5MS41MjcyNTIsMTAuOTMwMzE4NiA5MS42Mzc4NTksMTEuMjU5ODM1NiA5Mi4zODg0MDYxLDExLjI1OTgzNTYgQzkyLjU3MDExNzUsMTEuMjU5ODM1NiA5Mi42NDEyMjIsMTEuMjU5ODM1NiA5Mi43NDM5Mjg1LDExLjI1OTgzNTYgTDkyLjc0MzkyODUsMTMuMTI0NDE5MyBDOTIuMzE3MzAxNywxMy4xOTY3NTIzIDkyLjI0NjE5NzIsMTMuMjI4OTAwMyA5MS44MTE2Njk5LDEzLjIyODkwMDMgWiIgaWQ9IlBhdGgiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aCIgcG9pbnRzPSI5Ny42MjY0MzUzIDEzLjEyNDQxOTMgOTcuNjI2NDM1MyAwLjYxMDgxMTkyMiA5OS44ODU5NzczIDAuNjEwODExOTIyIDk5Ljg4NTk3NzMgMTMuMTI0NDE5MyI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMTAuMzkzNjM4LDExLjkxODg2OTUgTDExMS40NjgxMDUsMTMuMzAxMjMzMyBMMTEwLjE0MDgyMiwxNC4zNjIxMTcyIEwxMDguOTk1MjUsMTIuODk5MzgzNCBDMTA4LjMxNTgwNywxMy4xODg3MTUzIDEwNy41OTY4NjIsMTMuMzMzMzgxMyAxMDYuODQ2MzE1LDEzLjMzMzM4MTMgQzEwNS41MTkwMzEsMTMuMzMzMzgxMyAxMDQuMjMxMjUsMTIuODU5MTk4NCAxMDMuMjk4OTkyLDExLjkxMDgzMjUgQzEwMS45NzE3MDgsMTAuNTYwNjE2NiAxMDEuNzE4ODkyLDguODgwODgzODYgMTAxLjcxODg5Miw2LjgzOTQ4NjEzIEMxMDEuNzE4ODkyLDQuNzk4MDg4MzkgMTAxLjkzMjIwNiwzLjExODM1NTYgMTAzLjI5ODk5MiwxLjc2ODEzOTc3IEMxMDQuMjMxMjUsMC44MTk3NzM4OTUgMTA1LjUxOTAzMSwwLjM0NTU5MDk1NiAxMDYuODQ2MzE1LDAuMzQ1NTkwOTU2IEMxMDguMTczNTk4LDAuMzQ1NTkwOTU2IDEwOS40NjEzNzksMC44MTk3NzM4OTUgMTEwLjM5MzYzOCwxLjc2ODEzOTc3IEMxMTEuNzIwOTIxLDMuMTE4MzU1NiAxMTEuOTczNzM3LDQuNzk4MDg4MzkgMTExLjk3MzczNyw2LjgzOTQ4NjEzIEMxMTEuOTM0MjM0LDguOTI5MTA1ODYgMTExLjY4MTQxOSwxMC41Njg2NTM2IDExMC4zOTM2MzgsMTEuOTE4ODY5NSBaIE0xMDguNzc0MDM2LDMuMjcxMDU4NTggQzEwOC4yNjg0MDQsMi43MjQ1NDI2NSAxMDcuNTU3MzU5LDIuNDM1MjEwNjkgMTA2LjgzODQxNCwyLjQzNTIxMDY5IEMxMDYuMTE5NDY5LDIuNDM1MjEwNjkgMTA1LjM2ODkyMiwyLjcyNDU0MjY1IDEwNC45MDI3OTMsMy4yNzEwNTg1OCBDMTA0LjA0MTYzOCw0LjE3OTIzOTQ3IDEwNC4wMTAwMzYsNS43MTQzMDYyNyAxMDQuMDEwMDM2LDYuODc5NjcxMTIgQzEwNC4wMTAwMzYsOC4wMTI4ODc5OCAxMDQuMDQ5NTM5LDkuNTgwMTAyNzcgMTA0LjkwMjc5MywxMC40NTYxMzU3IEMxMDUuNDA4NDI0LDExLjAwMjY1MTYgMTA2LjExOTQ2OSwxMS4yOTE5ODM2IDEwNi44Mzg0MTQsMTEuMjkxOTgzNiBDMTA3LjA5MTIzLDExLjI5MTk4MzYgMTA3LjM3NTY0OCwxMS4yNTE3OTg2IDEwNy42Mjg0NjQsMTEuMTc5NDY1NiBMMTA2LjMwMTE4LDkuNDk5NzMyNzkgTDEwNy42NjAwNjYsOC40MDY3MDA5MiBMMTA5LjAxODk1MSwxMC4xNTg3NjY3IEMxMDkuNjI3Mjg5LDkuMjUwNTg1ODIgMTA5LjY2Njc5Miw3LjkwMDM2OTk5IDEwOS42NjY3OTIsNi44NzE2MzQxMiBDMTA5LjYzNTE5LDUuNzE0MzA2MjcgMTA5LjYwMzU4OCw0LjE0NzA5MTQ3IDEwOC43NzQwMzYsMy4yNzEwNTg1OCBaIiBpZD0iU2hhcGUiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTE5LjEzNjY5MSwgMi45Nzg0MTcpIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMi4yNjUxNjQ3MSwzLjc4MjU4OTkzIEwxLjA4OTQ3MzY4LDMuNzgyNTg5OTMgTDEuMDg5NDczNjgsNS42NzM4ODQ4OSBMMC4wOTQwNTUyODIxLDUuNjczODg0ODkgTDAuMDk0MDU1MjgyMSwwLjQwMjA4NjMzMSBMMi4yNjUxNjQ3MSwwLjQwMjA4NjMzMSBDMy41NDI3NDg5NiwwLjQwMjA4NjMzMSA0LjIyNDY0OTc1LDEuMDc5Njc2MjYgNC4yMjQ2NDk3NSwyLjA5MjMzODEzIEM0LjIyNDY0OTc1LDMuMTA1IDMuNTUwNTg2OSwzLjc4MjU4OTkzIDIuMjY1MTY0NzEsMy43ODI1ODk5MyBaIE0yLjIzMzgxMjk1LDEuMjQzNDg5MjEgTDEuMDk3MzExNjIsMS4yNDM0ODkyMSBMMS4wOTczMTE2MiwyLjkzMzc0MTAxIEwyLjIzMzgxMjk1LDIuOTMzNzQxMDEgQzIuOTA3ODc1OCwyLjkzMzc0MTAxIDMuMTk3ODc5NTksMi41OTg2NjkwNiAzLjE5Nzg3OTU5LDIuMDkyMzM4MTMgQzMuMTkwMDQxNjUsMS41ODYwMDcxOSAyLjkwNzg3NTgsMS4yNDM0ODkyMSAyLjIzMzgxMjk1LDEuMjQzNDg5MjEgWiIgaWQ9IlNoYXBlIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTguMjA2MzIzMzYsNS42NzM4ODQ4OSBMNy4yODE0NDY0MiwzLjY3ODM0NTMyIEw2LjAzNTIxMzkzLDMuNjc4MzQ1MzIgTDYuMDM1MjEzOTMsNS42NzM4ODQ4OSBMNS4wMDA2MDU4Myw1LjY3Mzg4NDg5IEw1LjAwMDYwNTgzLDAuNDAyMDg2MzMxIEw3LjM1MTk4Nzg4LDAuNDAyMDg2MzMxIEM4LjY2ODc2MTgzLDAuNDAyMDg2MzMxIDkuMjcyMjgzMjMsMS4xNzY0NzQ4MiA5LjI3MjI4MzIzLDIuMDI1MzIzNzQgQzkuMjcyMjgzMjMsMi43MzI2OTc4NCA4Ljg4MDM4NjIyLDMuMjc2MjU4OTkgOC4yMzc2NzUxMiwzLjUxNDUzMjM3IEw5LjI3MjI4MzIzLDUuNjgxMzMwOTQgTDguMjA2MzIzMzYsNS42ODEzMzA5NCBMOC4yMDYzMjMzNiw1LjY3Mzg4NDg5IFogTTcuMzkxMTc3NTgsMS4yNDM0ODkyMSBMNi4wNzQ0MDM2MywxLjI0MzQ4OTIxIEw2LjA3NDQwMzYzLDIuODI5NDk2NCBMNy40MjI1MjkzNCwyLjgyOTQ5NjQgQzcuOTk0Njk4OTgsMi44Mjk0OTY0IDguMzA4MjE2NTgsMi41NjE0Mzg4NSA4LjMwODIxNjU4LDIuMDU1MTA3OTEgQzguMzE2MDU0NTIsMS42MTU3OTEzNyA3Ljk1NTUwOTI4LDEuMjQzNDg5MjEgNy4zOTExNzc1OCwxLjI0MzQ4OTIxIFoiIGlkPSJTaGFwZSI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMy44NjUzMTYyLDUuMTY3NTUzOTYgQzEzLjQ0MjA2NzQsNS41Njk2NDAyOSAxMi44Njk4OTc4LDUuNzc4MTI5NSAxMi4yNjYzNzY0LDUuNzc4MTI5NSBDMTEuNjYyODU1LDUuNzc4MTI5NSAxMS4wOTA2ODUzLDUuNTc3MDg2MzMgMTAuNjY3NDM2Niw1LjE2NzU1Mzk2IEMxMC4wNjM5MTUyLDQuNTk0MjA4NjMgOS45NTQxODQwMiwzLjg4NjgzNDUzIDkuOTU0MTg0MDIsMy4wMzc5ODU2MSBDOS45NTQxODQwMiwyLjE5NjU4MjczIDEwLjA2MzkxNTIsMS40ODE3NjI1OSAxMC42Njc0MzY2LDAuOTA4NDE3MjY2IEMxMS4wOTA2ODUzLDAuNTA2MzMwOTM1IDExLjY2Mjg1NSwwLjI5Nzg0MTcyNyAxMi4yNjYzNzY0LDAuMjk3ODQxNzI3IEMxMi44Njk4OTc4LDAuMjk3ODQxNzI3IDEzLjQ0MjA2NzQsMC40OTg4ODQ4OTIgMTMuODY1MzE2MiwwLjkwODQxNzI2NiBDMTQuNDY4ODM3NiwxLjQ4MTc2MjU5IDE0LjU3ODU2ODcsMi4xODkxMzY2OSAxNC41Nzg1Njg3LDMuMDM3OTg1NjEgQzE0LjU3ODU2ODcsMy44NzkzODg0OSAxNC40Njg4Mzc2LDQuNTk0MjA4NjMgMTMuODY1MzE2Miw1LjE2NzU1Mzk2IFogTTEzLjE1MjA2MzYsMS41MTg5OTI4MSBDMTIuOTQwNDM5MiwxLjI4MDcxOTQyIDEyLjU3OTg5NCwxLjE4MzkyMDg2IDEyLjI2NjM3NjQsMS4xODM5MjA4NiBDMTEuOTQ1MDIwOCwxLjE4MzkyMDg2IDExLjYyMzY2NTMsMS4zMTc5NDk2NCAxMS4zODA2ODkxLDEuNTE4OTkyODEgQzEwLjk4ODc5MjEsMS44OTEyOTQ5NiAxMC45ODg3OTIxLDIuNTY4ODg0ODkgMTAuOTg4NzkyMSwzLjAzNzk4NTYxIEMxMC45ODg3OTIxLDMuNTE0NTMyMzcgMTAuOTg4NzkyMSw0LjE1NDg5MjA5IDExLjM4MDY4OTEsNC41NTY5Nzg0MiBDMTEuNTkyMzEzNSw0Ljc5NTI1MTggMTEuOTUyODU4OCw0Ljg5MjA1MDM2IDEyLjI2NjM3NjQsNC44OTIwNTAzNiBDMTIuNTg3NzMxOSw0Ljg5MjA1MDM2IDEyLjkwOTA4NzUsNC43NTgwMjE1OCAxMy4xNTIwNjM2LDQuNTU2OTc4NDIgQzEzLjU0Mzk2MDYsNC4xODQ2NzYyNiAxMy41NDM5NjA2LDMuNTQ0MzE2NTUgMTMuNTQzOTYwNiwzLjAzNzk4NTYxIEMxMy41NDM5NjA2LDIuNTMxNjU0NjggMTMuNTEyNjA4OSwxLjg5MTI5NDk2IDEzLjE1MjA2MzYsMS41MTg5OTI4MSBaIiBpZD0iU2hhcGUiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+';

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
  isEditEnabled?: boolean;
  isStatic?: boolean;
  appearance: boolean;
  setAppearance: (data: any) => unknown;
  displayDensity: string;
  setDisplayDensity: (data: any) => unknown;
}

const PrototypeHeader: any = ({
  appearance = true,
  setAppearance,
  displayDensity = Size.MEDIUM,
  setDisplayDensity,
  isEditEnabled = true,
  isStatic = true,
}: IHeaderProps) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isFocusInput, setFocusInput] = useState(false);
  const [menuItemsOrder, setMenuItemsOrder] = useState<ITopMenuItemsOrder>(defaultMenuItemsOrder);
  const isMobile = useIsBreakpoint(BreakPoint.LG);

  const handleToggleMobileNav = (): void => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const handleFocusSearch = (): void => {
    setFocusInput(true);
  };

  const handleBlurSearch = (): void => {
    setFocusInput(false);
  };

  const handleSave = (): void => {
    // code for Save functionality
  };

  const handleDelete = (): void => {
    // code for delete functionality
  };

  const handleOrderChange = (): void => {
    // code for order change functionality
  };

  const handleLocationChange = (): void => {
    // code for location functionality
  };

  const onShortcutLabelSet = (): void => {
    // code for shoutcut label set functionality
  };

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
    <GlobalHeader isStatic={isStatic}>
      <HeaderLogo image={capitalIQLogoDarkTheme} homepageLink={'#'} alt="S&P Global">
        <GlobalHeaderPlatformSelector>
          <GlobalHeaderPlatformSelectorItem href="#" selected>
            S&P Capital IQ Pro
          </GlobalHeaderPlatformSelectorItem>
          <GlobalHeaderPlatformSelectorItem href="#">Ratings 360</GlobalHeaderPlatformSelectorItem>
          <GlobalHeaderPlatformSelectorItem href="#">Platts</GlobalHeaderPlatformSelectorItem>
        </GlobalHeaderPlatformSelector>
      </HeaderLogo>
      <GlobalHeaderContent>
        <HeaderSearch
          isGlobalSearchStyles
          isFocusInput={isFocusInput}
          placeholder={'Search'}
          onFocus={handleFocusSearch}
          onBlur={handleBlurSearch}
        />
        <MobileNavWrapper
          className={'spg-dark spg-yuki-dark'}
          isMobileNavOpen={isMobileNavOpen}
          setIsMobileNavOpen={setIsMobileNavOpen}
        >
          <GlobalHeaderNavMobileWrapper>
            <MobileNavBasicButton onClick={handleToggleMobileNav} />
          </GlobalHeaderNavMobileWrapper>
          <TopNav
            isGlobalHeaderStyles
            isEditEnabled={isEditEnabled}
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
              <ShortcutsList
                handleOrderChange={handleOrderChange}
                handleLocationChange={handleLocationChange}
              >
                <Shortcuts>
                  <ShortcutLabeledItem
                    id="homepage"
                    title="Homepage"
                    label="HOME PAGE"
                    href={'#homepage'}
                    onSet={onShortcutLabelSet}
                    setButtonText={'Set current page as homepage'}
                  />
                  {mockShortcutsData.recentLinks.map((item) => (
                    <ShortcutItem
                      id={item.id}
                      key={item.id}
                      title={item.title}
                      href={item.href}
                      entity={ShortcutEntity.RecentLink}
                      onSave={handleSave}
                      onDelete={handleDelete}
                    />
                  ))}
                </Shortcuts>
              </ShortcutsList>
            </TopNavMenuItem>
            <TopNavMenuItem
              id={'1'}
              title={'Apps'}
              active
              isGlobalHeaderStyles
              dropDownMenuRole={'menu'}
              dropDownMenuAriaOwns={'Apps'}
              dropdownProps={{ transitionContainerClassName: 'customDropdownClassName' }}
            >
              <TopNavDropDownColumn>
                <TopNavDropDownGroup>
                  <TopNavGroupLinkItem href="#some_href">
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
                <TopNavDropDownGroup>
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
                  <TopNavGroupLinkItem href={'#'}>Launch Streaming Transcripts</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>RSS Feeds</TopNavGroupLinkItem>
                </TopNavDropDownGroup>
              </TopNavDropDownColumn>
              <TopNavDropDownColumn>
                <TopNavDropDownGroup title={'U.S. BRANCH ANALYTICS'}>
                  <TopNavGroupLinkItem href={'#'}>HHI Analysis</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Market Share</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Market Overlap</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Branch List Builder</TopNavGroupLinkItem>
                </TopNavDropDownGroup>
                <TopNavDropDownGroup title={'BANK ANALYTICS'}>
                  <TopNavGroupLinkItem href={'#'}>
                    Residential & Commercial Mortgage Analytics
                  </TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Bank Valuation Model</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>Insurance Stat Select-A-Page</TopNavGroupLinkItem>
                </TopNavDropDownGroup>
              </TopNavDropDownColumn>
            </TopNavMenuItem>
            <TopNavMenuItem isLock title={'News'} id={'2'} isGlobalHeaderStyles>
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
            <TopNavMenuItem title={'Research'} id={'3'} isGlobalHeaderStyles>
              <TopNavDropDownColumn>
                <TopNavDropDownGroup>
                  <TopNavGroupLinkItem href={'#'}>Investment & Market Research</TopNavGroupLinkItem>
                  <TopNavGroupLinkItem href={'#'}>
                    Market Intelligence Research Library
                  </TopNavGroupLinkItem>
                </TopNavDropDownGroup>
              </TopNavDropDownColumn>
            </TopNavMenuItem>
            <TopNavLinkItem active isLock href={'#'} id={'dashboard'} isGlobalHeaderStyles>
              Dashboard
            </TopNavLinkItem>
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
                  onChange={function (): void {
                    //onChange function called
                  }}
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
                    // onChange={function noRefCheck() {}}
                    // onParentSelectChange={function noRefCheck() {}}
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
