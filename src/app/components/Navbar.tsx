import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { useAuth } from '../contexts';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  
  
  return (
    <nav className={`${styles.navbar} ${styles.fixed}`}>
      <ul className={styles.navbarList}>
      <li className={styles.navItem}>
          <Link href="/" className={styles.navLink}>
           Home
          </Link>
        </li>
        {isLoggedIn ? <li className={styles.navItem}>
          <Link href="/manage-dashboard" className={styles.navLink}>
           Manage Dashboard
          </Link>
        </li>:null}  
        {isLoggedIn ? (
          <li className={styles.navItem}>
            <button onClick={logout} className={styles.logoutButton}>
              Logout
            </button>
          </li>
        ) : (
          <li className={styles.navItem}>
            <Link href="/login" className={styles.navLink}>
              Login/Sign Up
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
