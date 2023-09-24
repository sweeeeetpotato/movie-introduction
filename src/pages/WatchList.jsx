import React from "react";
import Header from "components/header/Header";
import WatchListMain from "components/main/WatchListMain";
import Footer from "components/footer/Footer";
import modalStore from "store/modalStore";
import Modal from "components/madal/Modal";

export default function WatchList() {
  const { modalName } = modalStore();
  
  return (
    <div className="layout">
      <Header />
      <WatchListMain />
      <Footer />
      {modalName === "total" && (
        <Modal text={"전체 목록을 찜 취소하시겠습니까?"} />
      )}
    </div>
  );
}
