import icon from 'data-base64:/assets/icon.png';
import { version } from '/package.json';

const Footer = ({username = 'Unknown!'}) => {
    return (
      <div className="tw-flex tw-flex-col tw-justify-center tw-py-4 tw-gap-2">
        <div className="tw-text-grey-500/50 tw-text-center tw-text-xs">
          Logged as
          <span className="tw-font-semibold"> {username}</span>
        </div>
        <div className="tw-flex tw-justify-center">
          <img className='tw-h-5' src={icon} alt="Icon" />
          <h1>MATE {version}</h1>
        </div>
      </div>
    )
}

export default Footer;