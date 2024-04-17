import icon from 'data-base64:/assets/icon.png';
import { version } from '/package.json';

const Footer = () => {
    return (
      <div className="tw-flex tw-justify-center tw-py-4 tw-bg-gradient-to-b tw-gap-1">
        <img className='tw-h-5' src={icon} alt="Icon" />
        <h1>MATE {version}</h1>
      </div>
    )
}

export default Footer;