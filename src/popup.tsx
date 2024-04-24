import "~style.css";
import { ErrorView } from "~components/errorView";
import type { ErrorType } from "~types/types";

const popupErrorData: ErrorType = {
    icon: '🤖',
    message: `Oops! Looks like there's no popup here. Just hit the "AI Code Review" button on GitHub.com to get started. Happy coding!`,
    button: {
        url: 'https://github.com',
        text: 'Open GitHub.com'
    }
}

const Popup = () => {
    return (
        <ErrorView {...popupErrorData} />
    )
};

export default Popup;