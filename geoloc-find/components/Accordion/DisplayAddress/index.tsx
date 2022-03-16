import { Address } from '../../../models/Address';
import KeyValue from '../../KeyValue';
import styles from './DisplayAddress.module.css';

type Props = {
  address: Address;
};

const DisplayAddress = ({ address }: Props) => {
  return (
    <div className={styles.container}>
      <KeyValue keyTitle="County" value={address.county} smallKey />
      <KeyValue keyTitle="City" value={address.city} smallKey />
    </div>
  );
};

export default DisplayAddress;
