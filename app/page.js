"use client";

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
  const queryClient = useQueryClient()

  useEffect(() => {
    console.log("dwddw")
    queryClient.invalidateQueries({queryKey: ['user']})
    queryClient.invalidateQueries({queryKey: ['userdata']})
  }, [])
  return (
    <main>
      <Header/>
      <Cover/>
      <Showcase/>
      <GetStarted/>
      <Pricing/>
      <FAQ/>
      <Footer/>
    </main>
  );
}
