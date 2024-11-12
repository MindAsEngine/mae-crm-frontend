import * as React from "react";
import TableRow from "./Row/TableRow.tsx";
import TableHeader from "./TableHeader/TableHeader.tsx";

type TableProps = {
    data: Array<{ [key: string]: string }>,
    header:{ [key: string]: string }
}
export default function Table({ data, header }: TableProps) {
    return (
        <table>
            <thead>
                <TableHeader row={header}/>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <TableRow key={index} row={row} />
                ))}
            </tbody>
        </table>
    );
}