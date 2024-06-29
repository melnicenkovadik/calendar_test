import './days_line.css';

const DaysLine = () => {

    const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    return (
        <thead
            className='days_line'
        >
        <tr>
            {
                days.map((day, idx) => (
                    <th key={idx}>
                        <div className='container'>
                            <p className='day'>{day}</p>
                        </div>
                    </th>
                ))
            }
        </tr>
        </thead>
    );
};

export default DaysLine;
