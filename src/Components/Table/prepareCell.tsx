import * as React from "react";
import StatusPlate from "../StatusPlate/StatusPlate.tsx";
import dayjs from "dayjs";

type PrepareCellProps = {
    cellData: string | number | boolean | Array<string>,
    format: string
}

export default function prepareCell ({cellData, format}: PrepareCellProps) {
    switch (format) {
        case 'percent':
            return typeof cellData === "number" ?
                `${(cellData as number) * 100}%` : '';
        case 'enum':
            return <StatusPlate name={cellData} inEdit={false}/>
        case 'date':
            return dayjs(cellData).format('DD.MM.YYYY');
        default:
            return (cellData);
    }
};