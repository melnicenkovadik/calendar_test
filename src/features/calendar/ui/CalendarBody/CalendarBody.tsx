import "./calendar_body.css";
import {
    eachDayOfInterval,
    endOfWeek,
    format,
    isSameMonth,
    startOfWeek,
} from "date-fns";
import {FC, useEffect} from "react";
import {ViewType} from "../../logic.tsx";
import DaysLine from "../DaysLine";

interface ICalendarBody {
    viewType: ViewType;
    setChangeView: (view: ViewType) => void;
    today: Date;
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    week: Date[];
    setWeek: (week: Date[]) => void;
    currentMonth: Date[];
    setMonth: (month: Date[]) => void;
    getMonth: (date: Date) => Date[];
}

const CalendarBody: FC<ICalendarBody> = ({
                                             viewType,
                                             setChangeView,
                                             today,
                                             selectedDate,
                                             setSelectedDate,
                                             week,
                                             setWeek,
                                             currentMonth,
                                             setMonth,
                                             getMonth,
                                         }) => {
    function buildDayStyle(day: Date) {
        const selected = selectedDate === format(day, "yyyy-MM-dd");

        const isDayFromPreviousMonth = !isSameMonth(day, currentMonth[15]);
        const isDayFromNextMonth = !isSameMonth(day, currentMonth[currentMonth.length - 1]);
        const dayIsFromDifferentMonth = isDayFromNextMonth || isDayFromPreviousMonth;

        function color(day: Date) {
            const todayDate = format(today, "yyyy-MM-dd");
            const isInPast = todayDate > format(day, "yyyy-MM-dd");
            const isDayInCurrentMonth = isSameMonth(day, currentMonth[15]);

            if (dayIsFromDifferentMonth && viewType === ViewType.Month) {
                return "transparent";
            }
            if (selected) {
                return "#ffffff";
            }
            if (isInPast) {
                return "#898E98";
            }
            if (!isDayInCurrentMonth) {
                return "#222";
            }

            if (isDayInCurrentMonth) {
                return "#222";
            }
            if (!isDayInCurrentMonth) {
                return "red";
            }

        }

        return {
            color: color(day),
            background: selected ? "#007AFF" : "transparent",
            borderRadius: "100%",
            padding: "8px",
            minWidth: "32px",
        };
    }

    function onDatePick(day: Date) {
        const isDayFromPreviousMonth = !isSameMonth(day, currentMonth[15]);
        const isDayFromNextMonth = !isSameMonth(day, currentMonth[currentMonth.length - 1]);
        const dayIsFromDifferentMonth = isDayFromNextMonth || isDayFromPreviousMonth;
        if (dayIsFromDifferentMonth && viewType === ViewType.Month) {
            return;
        }
        if (day < today) {
            return;
        }
        if (day >= today) {
            const week = eachDayOfInterval({
                start: startOfWeek(day),
                end: endOfWeek(day),
            });
            setWeek(week);
            setChangeView(ViewType.Week);
            setSelectedDate(format(day, "yyyy-MM-dd"));
        }
    }

    function buildWeek(week: Date[]) {
        return week.map((day, idx) => (
            <td key={idx}
                onClick={() => onDatePick(day)}>
                <div className="calendar_container">
                    <p className="calendar_date" style={buildDayStyle(day)}>
                        {format(day, "d")}
                    </p>
                </div>
            </td>
        ));
    }

    useEffect(() => {
        // is selectedDate not in the current month we need to change the month
        if (!currentMonth.find((day) => format(day, "yyyy-MM-dd") === selectedDate)) {
            const date = new Date(selectedDate);
            const month = getMonth(date);
            setMonth(month);
        }
    }, [selectedDate]);

    function buildMonth() {
        const month = currentMonth;
        const firstDay = month[0];
        const lastDay = month[month.length - 1];

        // if the first day of the month is not a Monday we need to add some days from the previous month
        const daysBefore = firstDay.getDay();
        const daysAfter = 6 - lastDay.getDay();
        const totalDays = daysBefore + month.length + daysAfter;
        const days = eachDayOfInterval({
            start: startOfWeek(firstDay, {weekStartsOn: 1}),
            end: endOfWeek(lastDay, {weekStartsOn: 1}),
        });

        const rows = [];
        for (let i = 0; i < totalDays; i += 7) {
            rows.push(days.slice(i, i + 7));
        }

        return rows.map((row, idx) => {
            return (
                <tr key={idx}>
                    {row.map((day, idx) => (
                        <td key={idx}
                            onClick={() => onDatePick(day)}>
                            <div className="calendar_container">
                                <p className="calendar_date" style={buildDayStyle(day)}>
                                    {format(day, "d")}
                                </p>
                            </div>
                        </td>
                    ))}
                </tr>
            );
        });
    }

    return (
        <div className="flex items-center justify-between pt-12">
            <table className="w-full">
                <DaysLine/>
                {viewType === ViewType.Week ? buildWeek(week) : buildMonth()}
            </table>
        </div>
    );
};

export default CalendarBody;
