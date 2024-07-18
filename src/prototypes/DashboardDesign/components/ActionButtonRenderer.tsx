import { Purpose, Size } from "@spglobal/koi-helpers";
import { ACTION } from "@spglobal/koi-icons";
import {
  Button,
  DropDown,
  DropDownGroup,
  DropDownItem,
} from "@spglobal/react-components";

import { ITemplateData } from "./ManageDashboard";

import { AgGridActionButton } from "../styles/dashboardDesign.styles";
import React from "react";

interface IMultiActionButtonProps {
  disabled?: boolean;
  eGridHeader?: HTMLElement;
  handleEditListItem?: () => void;
  handleSaveAsListItem?: () => void;
  handleDeleteListItem?: () => void;
  listData?: ITemplateData;
  listScrolling?: boolean;
}

const ActionButtonRenderer = ({
  disabled,
  handleEditListItem,
  handleSaveAsListItem,
  handleDeleteListItem,
  listData,
  listScrolling,
}: IMultiActionButtonProps) => {
  const triggerElement = (
    <AgGridActionButton
      icon={ACTION}
      size={Size.XSMALL}
      purpose={Purpose.NONE}
      disabled={disabled}
    />
  );

  const handleShareListItem = () => {
    console.log("Share list data", listData);
  };

  const handleExportListItem = () => {
    console.log("Export list data", listData);
  };

  return (
    <DropDown
      triggerElement={triggerElement}
      style={{
        marginTop: "-20px",
        marginLeft: "20px",
        display: listScrolling ? "none" : "block",
      }}
    >
      <DropDownGroup style={{ width: "90px" }}>
        <DropDownItem>
          <Button onClick={handleEditListItem}>Edit</Button>
        </DropDownItem>
        <DropDownItem>
          <Button onClick={handleSaveAsListItem}>Save As</Button>
        </DropDownItem>
        <DropDownItem>
          <Button onClick={handleShareListItem}>Share</Button>
        </DropDownItem>
        <DropDownItem>
          <Button onClick={handleExportListItem}>Export</Button>
        </DropDownItem>
      </DropDownGroup>
      <DropDownGroup style={{ width: "90px" }}>
        <DropDownItem>
          <Button onClick={handleDeleteListItem}>Delete</Button>
        </DropDownItem>
      </DropDownGroup>
    </DropDown>
  );
};

export default ActionButtonRenderer;
