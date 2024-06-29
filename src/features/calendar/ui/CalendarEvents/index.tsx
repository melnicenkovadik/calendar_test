import "./calendar_events.css";

const CalendarEvents = () => {
    const mockEvents = [
        {
            start: new Date(2024, 10, 15, 11, 0),
            end: new Date(2024, 10, 15, 23, 0),
            price: 80,
        },
        {
            start: new Date(2024, 10, 15, 14, 0),
            end: new Date(2024, 10, 15, 23, 0),
            price: 80,
        },
        {
            start: new Date(2024, 10, 15, 16, 0),
            end: new Date(2024, 10, 15, 23, 0),
            price: 80,
        },
    ];
    return (
        <div className="md:py-8 py-5 md:px-5 px-5 calendar_events">
            {mockEvents.map((event, idx) => (
                <div key={idx} className="calendar_event">
                    <div className="calendar_event_time">
                        <div className="calendar_event_time_start">
                            {event.start.getHours()}:00
                        </div>
                        <div className="calendar_event_time_end">
                            {event.end.getHours() - event.start.getHours()} min
                        </div>
                    </div>
                    <div className="calendar_event_price">
                        €{event.price}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CalendarEvents;
