import redCrossIcon from 'data-base64:/assets/red_cross.png';
import type { ErrorType } from "~types/types";

export const ErrorView = ({icon, message, button}: ErrorType) => {
    return (
        <div className="tw-p-6 tw-flex tw-flex-col tw-justify-center tw-align-middle tw-bg-gradient-to-b tw-gap-1 tw-border-50">
            { 
                icon
                ? <div className='tw-h-12 tw-w-12 tw-mx-auto tw-my-6 tw-text-4xl'>{icon}</div>
                : <img className='tw-h-12 tw-w-12 tw-mx-auto tw-my-6' src={redCrossIcon} alt="red cross icon" />
            }
            
            
            <h3 className='tw-text-md tw-font-semibold'>{message}</h3>

            {
                button
                ? <a href={button.url}>{button.text}</a>
                : null
            }
        </div>
    )
}
