import { useEffect, useRef } from 'react';

const PieChart = ({ value }) => {
    const total = 157; /* 2π × 25 */
    const fillValue = ((value * total) / 100);
    const pieRef = useRef(null);

    useEffect(() => {
        if (pieRef.current) {
            pieRef.current.style.strokeDasharray = `${fillValue} ${total}`;
        }
    }, [fillValue]);

    return (
        <svg width="100" height="100" className="tw-my-0 tw-mx-4 tw-bg-bg-primary tw-border-50 tw-block tw--rotate-90">
            <circle r="50" cx="50" cy="50" className="tw-fill-bg-secondary"/>
            <circle r="25" cx="50" cy="50" className="tw-fill-bg-primary tw-stroke-accent tw-stroke-[50] tw-[stroke-dasharray]-[0_158;] transition duration-500 ease-in-out" ref={pieRef} />
        </svg>
    );
}

export default PieChart;