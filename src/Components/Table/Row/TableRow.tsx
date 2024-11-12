import * as React from "react";
import {cn} from "@bem-react/classname";

type TableRowProps = {
  row:{ [key: string]: string }
}
export default function TableRow({ row }: TableRowProps) {
  const cnTable = cn("Table");
  return (
    <tr className={cnTable("Row")}>
        {Object.values(row).map((cell, index) => (
            <td key={index} className={cnTable("Cell")}>
            {cell}
            </td>
        ))}
    </tr>
    );
}