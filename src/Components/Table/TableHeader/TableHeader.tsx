import {cn} from "@bem-react/classname";
import * as React from "react";

type TableHeaderProps = {
    row: { [key: string]: string }
}

export default function TableHeader({ row }: TableHeaderProps) {
    const cnTable = cn("Table");
    return (
        <tr className={cnTable("HeaderRow")}>
        {Object.entries(row).map(([key, cellData]) => {
            return (
                <th key={key} className={cnTable("HeaderCell")}>
                    <span className={cnTable("HeaderCellText")}>{cellData}</span>
                    <span className={cnTable("HeaderCellSort")}></span>
                </th>);})}

        </tr>
    );
}