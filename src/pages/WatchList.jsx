import React from "react";
import Header from "components/header/Header";
import WatchListMain from "components/main/WatchListMain";
import Footer from "components/footer/Footer";

export default function WatchList() {
  return (
    <div className="layout">
      <Header />
      <WatchListMain />
      <Footer />
    </div>
  );
}
