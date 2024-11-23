import styles from "./rangedate.module.scss";
import Input from "../Input/Input.tsx";
import React from "react";
type TimeProps = {
    time: {hour: string, minute: string},
    setTime: (time: {hour: string, minute: string}) => void
}
export default function Time({time, setTime}: TimeProps) {
    return (
        <span className={styles.timeRange}>

								<Input type="number" className={styles.timeInput}
                                       value={time.hour.length < 2 ? "0" + time.hour : time.hour.slice(0, 2)}
                                       after={<span className={styles.arrow}></span>}
                                       props={{min: 0, max: 23, step: 1, maxLength: 2}}
                                       readOnly={true}
                                       placeholder={'00'}
                                       onChange={(e) => setTime(
                                           prevState => {
                                               return {
                                                   ...prevState,
                                                   hour: e.target.value.length < 2 ? "0" + e.target.value : e.target.value.slice(0, 2)
                                               }
                                           }
                                       )}/>
								<span>:</span>
								<Input type="number" className={styles.timeInput}
                                       value={time.minute.length < 2 ? "0" + time.minute : time.minute.slice(0, 2)}
                                       placeholder={'00'}
                                       props={{min: 0, max: 59, step: 5, maxLength: 2}}
                                       after={<span className={styles.arrow}></span>}
                                       onChange={(e) => setTime(
                                           prevState => {
                                               return {
                                                   ...prevState,
                                                   minute: e.target.value.length < 2 ? "0" + e.target.value : e.target.value.slise(0, 2)
                                               }
                                           }
                                       )}
                                       readOnly={true}
                                />
            {/*todo dropdown list*/}
            </span>)
            }

