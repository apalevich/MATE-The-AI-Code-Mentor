import redCrossIcon from 'data-base64:/assets/red_cross.png';
import type { ErrorType } from "~types/types";

export const ErrorView = ({icon, message, button}: ErrorType) => {
    return (
        <div className="tw-min-w-[300] tw-w-full tw-p-6 tw-flex tw-flex-col tw-justify-center tw-align-middle tw-text-md tw-bg-gradient-to-b tw-gap-1 tw-border-50  tw-font-mono">
            { 
                icon
                ? <div className='tw-h-12 tw-w-12 tw-mx-auto tw-my-6 tw-text-4xl'>{icon}</div>
                : <img className='tw-h-12 tw-w-12 tw-mx-auto tw-my-6' src={redCrossIcon} alt="red cross icon" />
            }
            
            
            <h3 className='tw-text-center tw-font-medium tw-text-font'>{message}</h3>

            {
                button
                ? <a className='tw-px-2 tw-py-1 tw-my-4 tw-mx-auto tw-rounded-full tw-font-semibold tw-underline ' href={button.url} target='_blank'>{button.text}</a>
                : null
            }
        </div>
    )
}
