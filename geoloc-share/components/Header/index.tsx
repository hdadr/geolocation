import Image from 'next/image';

import refreshIcon from '../../public/icons/refresh.svg';
import styles from './Header.module.css';

type Props = {
  online: boolean;
  handleLocationUpdate: () => void;
};

const Header = ({ online, handleLocationUpdate }: Props) => {
  return (
    <h1 className={styles.title}>
      <div>
        Device
        <span title="refresh location data" className={styles.refresh}>
          <Image onClick={handleLocationUpdate} src={refreshIcon} width={24} height={24} />
        </span>
      </div>
      <div className={styles.onlineStatus}>{online ? "online" : "Your device is offline"}</div>
    </h1>
  );
};

export default Header;
