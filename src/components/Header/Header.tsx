import styles from './Header.module.scss';
import { NewTransactionModal } from '../NewTransactionModal/NewTransactionModal';
import Image from 'next/image';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <Image
              src="/assets/logo.svg"
              alt="Logo Ticto"
              width={160}              
              height={40}              
              fetchPriority="high"
              loading="eager"
            />
          </div>
        </div>
        <div className={styles.actions}>
          <NewTransactionModal />
        </div>
      </div>
    </header>
  );
}
