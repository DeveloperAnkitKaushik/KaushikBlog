"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from "./index.module.css";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import toast from 'react-hot-toast';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = () => {
        if (username === process.env.NEXT_PUBLIC_ADMIN_USERNAME && password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
            toast.success('Successfully toasted!')
            localStorage.setItem('isLoggedIn', 'true');
            router.push('/studio');
        } else {
            toast.error("Wrong Username or Password");
        }
    };

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            router.push('/studio');
        }
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div>
                    <h1>Admin Login</h1>
                    <div className={styles.inputbox}>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <FaUserAlt className={styles.icon} />
                    </div>
                    <div className={styles.inputbox}>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <FaLock className={styles.icon} />
                    </div>
                    <button className={styles.btn} onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
