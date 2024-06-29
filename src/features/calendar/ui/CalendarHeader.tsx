import {FC} from "react";
import {ViewType} from "../logic.tsx";

interface ICalendarHeader {
    week: Date[];
    setWeek: (week: Date[]) => void;
    viewType: ViewType;
    addDays: (date: Date, days: number) => Date;
    month : Date[];
    addMonths : (date: Date, months: number) => Date;
    setMonth : (month: Date[]) => void;
    currentMonthIndex: number;
    setCurrentMonthIndex: (index: number) => void;
}

const getMonthName = (monthIndex: number) => {
    const months = [
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"
    ];
    return months[monthIndex];
}
const CalendarHeader: FC<ICalendarHeader> = ({

                                                 week,
                                                 setWeek,
                                                 viewType,
                                                 addDays,
                                                 month,
                                                 addMonths,
                                                 setMonth,
                                                 currentMonthIndex,
                                                 setCurrentMonthIndex
                                             }) => {

    const handleNext = () => {
        if (viewType === ViewType.Week) {
            const nextWeek = week.map((day) => addDays(day, 7));
            if (nextWeek[0].getMonth() !== currentMonthIndex) {
                const newMonthIndex = nextWeek[0].getMonth();
                setCurrentMonthIndex(newMonthIndex);
                const newMonth = month.map((day) => addMonths(day, newMonthIndex - currentMonthIndex));
                setMonth(newMonth);
            }
            setWeek(nextWeek);
        } else {
            const nextMonth = month.map((day) => addMonths(day, 1));
            if (nextMonth[0].getMonth() !== currentMonthIndex) {
                setCurrentMonthIndex(nextMonth[0].getMonth());
            }
            setMonth(nextMonth);
        }
    }

    const handlePrev = () => {
        if (viewType === ViewType.Week) {
            const prevWeek = week.map((day) => addDays(day, -7));
            if (prevWeek[0].getMonth() !== currentMonthIndex) {
                const newMonthIndex = prevWeek[0].getMonth();
                setCurrentMonthIndex(newMonthIndex);
                const newMonth = month.map((day) => addMonths(day, newMonthIndex - currentMonthIndex));
                setMonth(newMonth);
            }
            setWeek(prevWeek);

        } else {
            const prevMonth = month.map((day) => addMonths(day, -1));
            if (prevMonth[0].getMonth() !== currentMonthIndex) {
                setCurrentMonthIndex(prevMonth[0].getMonth());
            }
            setMonth(prevMonth);
        }
    }

    return (
        <div className="flex justify-between items-center w-full">
            <button aria-label="calendar backward"
                    disabled={currentMonthIndex < 6}
                    onClick={handlePrev}
                    className="focus:text-gray-400 hover:text-gray-400 text-black-800">
                <svg xmlns="http://www.w3.org/2000/svg"
                     className="icon icon-tabler icon-tabler-chevron-left" width="24" height="24"
                     viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                     strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <polyline points="15 6 9 12 15 18"/>
                </svg>
            </button>
            <span tabIndex={0}
                  className="focus:outline-none  text-base font-bold dark:text-black-100">
                {getMonthName(currentMonthIndex)}
            </span>
            <button aria-label="calendar forward"
                    disabled={currentMonthIndex === 11}
                    onClick={handleNext}
                    className="focus:text-gray-400 hover:text-gray-400 ml-3 text-black-800">
                <svg xmlns="http://www.w3.org/2000/svg"
                     className="icon icon-tabler  icon-tabler-chevron-right" width="24" height="24"
                     viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                     strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <polyline points="9 6 15 12 9 18"/>
                </svg>
            </button>
        </div>
    );
};

export default CalendarHeader;
