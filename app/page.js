"use client";

import Header from "@/components/old/Header";
import Pricing from "@/components/old/Pricing";
import FAQ from "@/components/old/FAQ";
import GetStarted from "@/components/old/GetStarted";
import Cover from "@/components/old/Cover";
import Footer from "@/components/old/Footer";
import Showcase from "@/components/old/Showcase";

export default  function Home(){



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
