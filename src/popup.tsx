import "~style.css";
import { ErrorView } from "~components/errorView";
import type { ErrorType } from "~types/types";

const popupErrorData: ErrorType = {
    icon: '🤖',
    message: `Oops! There's no popup here. Please go to GitHub.com and hit the "AI Code Review" button on a file to get started. Happy coding!`,
    button: {
        url: 'https://github.com/facebook/react/blob/main/scripts/rollup/utils.js',
        text: 'Open example'
    }
}

const Popup = () => {
    return (
        <ErrorView {...popupErrorData} />
    )
};

export default Popup;