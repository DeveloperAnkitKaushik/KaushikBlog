'use client'

import styles from "./index.module.css";
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StudioPage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, []);
  return (
    <>
      <div className={`${styles.container} maincontainer`}>
        <NextStudio config={config} />
      </div>
    </>
  )
}