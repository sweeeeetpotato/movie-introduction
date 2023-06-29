import React from "react";
import Header from "../components/header/Header";
import HomeMain from "components/homeMain/HomeMain";
import Footer from "../components/footer/Footer";

export default function Home() {
  return (
    <div className="layout">
      <Header />
      <HomeMain />
      <Footer />
    </div>
  );
}
