"use client";
import styles from './main.module.css'
import {  useQueryClient  } from '@tanstack/react-query';

import Header from "@/components/old/Header";
import Pricing from "@/components/old/Pricing";
import FAQ from "@/components/old/FAQ";
import GetStarted from "@/components/old/GetStarted";
import Cover from "@/components/old/Cover";
import Footer from "@/components/old/Footer";
import Showcase from "@/components/old/Showcase";
import { useEffect } from 'react';


export default  function Home(){

  return (
    <span className={styles.main}>
      <Header/>
      <Cover/>
      <Showcase/>
      <GetStarted/>
      <Pricing/>
      <FAQ/>
      <Footer/>
    </span>
  );
}
