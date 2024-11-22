import * as React from "react";
import StatusPlate from "../StatusPlate/StatusPlate.tsx";
import dayjs from "dayjs";
import ActionButton from "../FormComponents/ActionButton/ActionButton.tsx";

type PrepareCellProps = {
    cellData: string | number | boolean | Array<string>,
    format: string,
    enumName?: string
}

export const prepareCell= (cellData, format, enumName)=> {
    switch (format) {
        case 'percent':
            return typeof cellData === "number" ?
                `${(cellData as number) * 100}%` : '';
        case 'enum':
            return switchEnum(cellData as string, enumName || 'process');
        case 'date':
            return dayjs(cellData).format('DD.MM.YYYY');
        default:
            return (cellData);
    }
};
function switchEnum(cellData: string, enumName: string) {
    switch (enumName) {
        case 'process':
            return <StatusPlate name={cellData} inEdit={false}/>
        case 'action':
            return <ActionButton onClick={() => {}}
                                 stylizedAs={'white'}
                                 disabled={false} name={cellData}/>
        default:
            return cellData;
    }
}