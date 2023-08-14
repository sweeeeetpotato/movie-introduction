import React from "react";
import Header from "components/header/Header";
import SearchResultMain from "components/main/SearchMain";
import Footer from "components/footer/Footer";

export default function SearchResult() {
  return (
    <div className="layout">
      <Header />
      <SearchResultMain />
      <Footer />
    </div>
  );
}
