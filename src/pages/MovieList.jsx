import React from "react";
import Header from "components/header/Header";
import MovieListMain from "components/main/MovieListMain";
import Footer from "components/footer/Footer";

export default function MovieList() {
  return (
    <div className="layout">
      <Header />
      <MovieListMain />
      <Footer />
    </div>
  );
}
