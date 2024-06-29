import {FC} from "react";
import {ViewType} from "../logic.tsx";

interface IToggleCalendarTabs {
    changeView: (view: ViewType) => void;
    view: ViewType;
}

const ToggleCalendarTabs: FC<IToggleCalendarTabs> = (props) => {

    return (
        <div className="flex justify-center items-center bg-gray-200 rounded-t">
            <button
                style={{
                    backgroundColor: props.view !== ViewType.Month ? "#f5f5f5" : "#fff",
                    color: props.view !== ViewType.Month ? "#000" : "#000"
                }}
                onClick={() => props.changeView(ViewType.Month)} className="p-2 w-1/2 text-center">Month</button>
            <button
                style={{
                    backgroundColor: props.view !== ViewType.Week ? "#f5f5f5" : "#fff",
                    color: props.view !== ViewType.Week ? "#000" : "#000"
                }}
                onClick={() => props.changeView(ViewType.Week)} className="p-2 w-1/2 text-center">Week</button>
        </div>
    );
};

export default ToggleCalendarTabs;
