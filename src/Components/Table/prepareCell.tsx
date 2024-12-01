import * as React from "react";
import StatusPlate from "../StatusPlate/StatusPlate.tsx";
import dayjs from "dayjs";
import ActionButton from "../FormComponents/ActionButton/ActionButton.tsx";
import {switchEnum} from "./switchEnum.tsx";

type PrepareCellProps = {
    cellData: string | number | boolean | Array<string>,
    format: string,
    enumName?: string
    onClick?: () => void
}

export const prepareCell= (cellData, format, enumName, onClick)=> {
    switch (format) {
        case 'percent':
            return typeof cellData === "number" ?
                `${(cellData as number) * 100}%` : '';
        case 'enum':
            return switchEnum(cellData as string, enumName || 'process', false, onClick);
        case 'date':
            return dayjs(cellData).format('DD.MM.YYYY');
        default:
            return (cellData);
    }
};
