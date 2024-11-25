import StatusPlate from "../StatusPlate/StatusPlate.tsx";
import ActionButton from "../FormComponents/ActionButton/ActionButton.tsx";
import * as React from "react";

export function switchEnum(cellData: string, enumName: string, inEdit: boolean=false) {
    switch (enumName) {
        case 'process':
            return <StatusPlate name={cellData} inEdit={inEdit}/>
        case 'action':
            return <ActionButton onClick={() => {}}
    stylizedAs={'white'}
    disabled={false} name={cellData}/>
        case 'notenum':
            return <StatusPlate name={cellData} inEdit={inEdit}/>
default:
    return cellData;
}
}