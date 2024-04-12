import redCrossIcon from 'data-base64:/assets/red_cross.png';

export const ErrorView = (error) => {
    return (
        <div className="tw-p-6 tw-flex tw-flex-col tw-justify-center tw-align-middle tw-bg-gradient-to-b tw-gap-1 tw-border-50">
            <img className='tw-h-12 tw-w-12 tw-mx-auto tw-my-6' src={redCrossIcon} alt="Icon" />
            <h3 className='tw-text-md tw-font-semibold'>{error.message}</h3>
        </div>
    )
}
