export const LoginView = () => {
    return (
        <>
            <div className="tw-text-center tw-pb-4">Have we met before?</div>
            <button
            className="tw-py-2 tw-px-4 tw-border-2 tw-border-black"
                onClick={() => {chrome.runtime.openOptionsPage();}}
            >
                Sign In with Github
            </button>
        </>
    )
}