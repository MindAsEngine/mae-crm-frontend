import clsx from "clsx";
import style from "./cell.module.scss";
import Checkbox from "../../../FormComponents/Checkbox/Checkbox.tsx";
import * as React from "react";
import StatusPlate from "../../../StatusPlate/StatusPlate.tsx";
import dayjs from "dayjs";
import {prepareCell} from "../../prepareCell.tsx";
type CellProps = {
    onClickCell: (rowPos: string | number, columnPos: string, cellData: string | number | boolean) => void,
    columnName: string,
    idData: number,
    cellData: string | Array<string>,
    columnFormat: string,
    isChecked?: boolean,
    setCheckedRows?: (updateFunction: (prev: (string | number)[]) => (string | number)[]) => void,
    className?: string,
    isArrayInRow?: boolean,
    isFooter?: boolean,
    isAsideHeader?: boolean,

}
// const prepareCell= (cellData, format)=> {
//     switch (format) {
//         case 'percent':
//             return typeof cellData === "number" ?
//                 `${(cellData as number) * 100}%` : '';
//         case 'enum':
//             return <StatusPlate name={cellData} inEdit={false}/>
//         case 'date':
//             return dayjs(cellData).format('DD.MM.YYYY');
//         default:
//             return (cellData);
//     }
// };


export default function Cell({onClickCell,isAsideHeader, isFooter,  isArrayInRow,className, columnName, columnFormat, idData, cellData,  setCheckedRows, isChecked}:CellProps){
    const onClick = () => {
        typeof onClickCell === "function" && onClickCell(idData, columnName, cellData);
    }
    return (
        <td className={clsx(style.tableCell,
            isArrayInRow && style.arrayInRow,
            isAsideHeader && style.asideHeader,
              isFooter && style.footer,

            typeof onClickCell === "function" && style.onClickCell,
            // headerCell.is_aside_header && style.asideHeader,
        )}

            onClick={() => {
                ((typeof onClickCell === "function") && (columnFormat === 'number'|| columnFormat === 'enum' && columnName==='actions'))
                    ? onClickCell(idData, columnName, cellData) : {}
            }}>
            <div className={clsx(style.cellElement, columnFormat === 'array' && style.array)}>

                {columnName !== 'id' ? (
                        <>
                            {columnFormat !== 'array'
                                ?
                                (prepareCell(cellData, columnFormat, columnFormat === 'enum' && columnName, onClick))
                                : (Array.isArray(cellData) && cellData?.map((one, index) => (
                                    <span key={index} className={style.arrayElement}>
 										{(prepareCell(one, 'string'))}
 									</span>
                                )))
                            }
                        </>

                    ) :
                    (
                        <>

                            <Checkbox
                                checked={isChecked}
                                onChange={() =>
                                    typeof setCheckedRows === "function" &&
                                    setCheckedRows((prev) => (
                                        isChecked
                                            ? prev.filter((id) => id !== idData)
                                            : [...prev, idData]
                                    ))}
                            />
                            {cellData}
                        </>
                    )
                }
            </div>
        </td>
    )
}