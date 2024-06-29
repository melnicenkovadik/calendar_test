import CalendarHeader from "./CalendarHeader.tsx";
import CalendarBody from "./CalendarBody/CalendarBody.tsx";
import CalendarEvents from "./CalendarEvents";
import {useCallback, useState} from "react";
import ToggleCalendarTabs from "./ToggleCalendarTabs.tsx";
import {ViewType} from "../logic.tsx";
import {eachDayOfInterval, endOfWeek, format, startOfToday, startOfWeek} from "date-fns";

const CalendarWrapper = () => {
    const [changeView, setChangeView] = useState<ViewType>(ViewType.Week);

    const today = startOfToday();
    const [selectedDate, setSelectedDate] = useState(format(today, "yyyy-MM-dd"));
    const start = startOfWeek(today);
    const end = endOfWeek(today);

    const currentWeek = eachDayOfInterval({start, end});
    const [week, setWeek] = useState(currentWeek);

    const getMonth = useCallback((date: Date) => {
        const start = new Date(date.getFullYear(), date.getMonth(), 1);
        const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return eachDayOfInterval({start, end});
    }, []);
    const currentMonth = getMonth(today);
    const [month, setMonth] = useState(currentMonth);

    const addDays = useCallback((date: Date, days: number) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }, []);

    const addMonths = useCallback((date: Date, months: number) => {
        const result = new Date(date);
        result.setMonth(result.getMonth() + months);
        return result;
    }, []);
    const [currentMonthIndex, setCurrentMonthIndex] = useState(today.getMonth());

    return (
        <div className="flex items-center justify-center py-8 px-4 w-fit a">
            <div className="max-w-sm w-fit shadow-lg b">
                <ToggleCalendarTabs view={changeView} changeView={setChangeView}/>
                <div className="md:p-8 p-5 bg-white rounded-t c">
                    <CalendarHeader
                        week={week}
                        setWeek={setWeek}
                        viewType={changeView}
                        addDays={addDays}
                        month={month}
                        addMonths={addMonths}
                        setMonth={setMonth}
                        currentMonthIndex={currentMonthIndex}
                        setCurrentMonthIndex={setCurrentMonthIndex}
                    />
                    <CalendarBody
                        today={today}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        week={week}
                        setWeek={setWeek}
                        viewType={changeView} setChangeView={setChangeView}
                        currentMonth={month}
                        setMonth={setMonth}
                        getMonth={getMonth}
                    />
                </div>
                <CalendarEvents/>
            </div>
        </div>
    );
};

export default CalendarWrapper;
