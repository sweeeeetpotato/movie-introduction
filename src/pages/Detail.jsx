import React from "react";
import Header from "components/header/Header";
import DetailMain from "components/main/DetailMain";
import Footer from "components/footer/Footer";

export default function Detail() {
  return (
    <div className="layout">
      <Header />
      <DetailMain />
      <Footer />
    </div>
  );
}
