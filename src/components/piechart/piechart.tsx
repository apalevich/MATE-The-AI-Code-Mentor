import './piechart.css';
import { useEffect, useRef } from 'react';

const PieChart = ({ value }) => {
    const total = 158; /* 2π × 25 */
    const fillValue = ((value * total) / 100);
    const pieRef = useRef(null);

    useEffect(() => {
        if (pieRef.current) {
            pieRef.current.style.strokeDasharray = `${fillValue} ${total}`;
        }
    }, [fillValue]);

    return (
        <svg width="100" height="100" className="chart">
            <circle r="25" cx="50" cy="50" className="pie" ref={pieRef} />
        </svg>
    );
}

export default PieChart;