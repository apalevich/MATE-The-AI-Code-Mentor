import type { User } from '@supabase/supabase-js';
import { useStorage } from '@plasmohq/storage/hook';
import { version } from '/package.json';
import icon from 'data-base64:/assets/icon.png';

const Footer = () => {
  const [user] = useStorage<User>("user");
  const username = user?.user_metadata?.preferred_username;

  return (
    <div className="tw-flex tw-flex-col tw-justify-center tw-py-4 tw-gap-2">
      {
        username && <div className="tw-text-grey-500/50 tw-text-center tw-text-xs">
          Logged as
          <span className="tw-font-semibold"> {username}</span>. 
          <span className='hover:tw-cursor-pointer' onClick={() => {chrome.runtime.openOptionsPage();}}> Want to logout?</span>
        </div>
      }
      <div className="tw-flex tw-justify-center tw-gap-1">
        <img className='tw-h-5' src={icon} alt="Icon" />
        <h1>MATE {version}</h1>
      </div>
    </div>
  )
}

export default Footer;