import StatusPlate from "../StatusPlate/StatusPlate.tsx";
import ActionButton from "../FormComponents/ActionButton/ActionButton.tsx";
import * as React from "react";

export function switchEnum(cellData: string, enumName: string, inEdit?: boolean=false, onClick?: () => void) {
    switch (enumName) {
        case 'status_name':
            return <StatusPlate name={cellData} inEdit={inEdit} onClick={onClick}/>
        case 'property_types':
            return getPropertyType(cellData);
        case 'property_type':
            return getPropertyType(cellData);
        case 'action':
            return <ActionButton onClick={onClick}
    stylizedAs={'white'}
    disabled={false} name={cellData}/>
        case 'notenum':
            return <StatusPlate name={cellData} inEdit={inEdit } onClick={onClick}/>
default:
    return cellData;
    }
}
const getPropertyType = (cellData: string) => {
    switch (cellData) {
        case 'flat':
            return 'Квартира';
        case 'land':
            return 'Земля';
        case 'comm':
            return 'Коммерческая';
        case 'garage':
            return 'Гараж';
        case 'storageroom':
            return 'Склад';
        default:
            return cellData;
    }
}