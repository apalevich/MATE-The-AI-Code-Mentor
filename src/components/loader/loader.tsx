import './loader.css';

const LoadingAnimation = ({sideSize = 10}) => {
    const opt = { length: sideSize }

    return (
        <div className=" tw-my-16">
            {
            Array.from(opt, (_, rowIndex) => (
                <div className="row tw-flex tw-flex-grow-0 tw-flex-shrink-1 tw-w-full" key={rowIndex}>
                    {
                        Array.from(opt, (_, circleIndex) => (
                            <div className="circle tw-bg-accent tw-w-3 tw-h-3 tw-m-[10] tw-rounded-full" key={circleIndex}></div>
                        ))
                    }
                </div>
            ))
            }
        </div>
    );
};

export default LoadingAnimation;
