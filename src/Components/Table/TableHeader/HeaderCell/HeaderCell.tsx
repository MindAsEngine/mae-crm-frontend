import clsx from "clsx";
import styles from "../tableHeader.module.scss";
import Checkbox from "../../../FormComponents/Checkbox/Checkbox.tsx";
import * as React from "react";

export type TableHeaderCell = {
    name: string;
    title: string;
    is_visible: boolean;
    is_additional: boolean;
    is_id: boolean;
    format: string;
    is_hidden_by_user?: boolean;
    is_aside_header?: boolean;
};

type HeaderCellProps = {
    cellData: TableHeaderCell;
    isAllChecked?: boolean;
    // setAllChecked?: (isChecked: boolean) => void;
    isAllUnchecked?: boolean;
    handleAllChecked?: () => void;
    onClickHeaderCell?: () => void;
}


export default function  HeaderCell({cellData,onClickHeaderCell, isAllChecked=false, handleAllChecked, isAllUnchecked=true}: HeaderCellProps){
    // console.log(cellData.is_aside_header, "Is aside")
    return (
        <th
           onClick={onClickHeaderCell}
            className={clsx(
                styles.tableCell,
                cellData.is_hidden_by_user && styles.isInVisible,
                cellData.is_additional && styles.isAdditional,
                cellData.is_id && styles.isId,
                cellData.is_aside_header && styles.asideHeader,
                cellData.is_sortable === false && styles.isNotSortable
            )}
        >
            <span className={styles.cellElement}>
                {cellData.is_id && (
                    <Checkbox onChange={handleAllChecked}
                              checked={isAllChecked}
                              allCheckbox={true}
                              isAllUnchecked={isAllUnchecked}
                              isAllChecked={isAllChecked}
                    />)}
                {cellData.title}
            </span>
        </th>
    )
}