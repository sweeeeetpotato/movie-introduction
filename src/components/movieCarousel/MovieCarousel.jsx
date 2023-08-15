import React, { useEffect, useRef, useState } from "react";
import styles from "./movieCarousel.module.css";
import left_arrow from "../../assets/left-arrow.png";
import right_arrow from "../../assets/right-arrow.png";
import MovieCard from "components/movieCard/MovieCard";

export default function MovieCarousel({ data, error }) {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [sliderStyle, setSliderStyle] = useState({});
  const [visibleItems, setVisibleItems] = useState(0);
  const carouselRef = useRef(null);
  const leftBtnRef = useRef(null);
  const rightBtnRef = useRef(null);

  const handleLeftBtn = () => {
    if (sliderIndex !== 0) {
      setSliderIndex(sliderIndex - visibleItems);
      rightBtnRef.current.style.display = "block";
    }
  };
  const handleRightBtn = () => {
    if (sliderIndex + visibleItems < data.movies.length) {
      setSliderIndex(sliderIndex + visibleItems);
      leftBtnRef.current.style.display = "block";
    }
  };

  // 영화목록 캐러셀에서 버튼 클릭시 이전 목록 or 다음 목록을 보여주는 코드
  useEffect(() => {
    setSliderStyle({
      transition: "all 0.5s ease-in-out",
      transform: `translateX(-${100 * sliderIndex}%) translateX(-${
        20 * sliderIndex
      }px)`,
    });

    if (sliderIndex === 0 && leftBtnRef.current) {
      leftBtnRef.current.style.display = "none";
    } else if (
      sliderIndex + visibleItems >= data?.movies.length &&
      rightBtnRef.current
    ) {
      rightBtnRef.current.style.display = "none";
    }
  }, [sliderIndex, visibleItems, data]);

  useEffect(() => {
    // 영화 목록 캐러셀이 화면 크기에 따라 현재 몇개 보이는지 계산하는 함수
    const calculateVisibleItems = () => {
      const carouselWidth = carouselRef.current.offsetWidth;
      const itemWidth = 250;
      const visibleItems = Math.floor(carouselWidth / itemWidth);
      const visibleGap = Math.floor(carouselWidth % itemWidth);
      visibleGap < 230
        ? setVisibleItems(visibleItems)
        : setVisibleItems(visibleItems + 1);
    };

    calculateVisibleItems();
    // 브라우저 창의 크기가 변경될 때마다 두번째 인자에 있는 함수를 호출하는 이벤트 리스너
    window.addEventListener("resize", calculateVisibleItems);

    // 언마운트 될때, window 객체에 등록된 이벤트 리스너를 삭제
    return () => {
      window.removeEventListener("resize", calculateVisibleItems);
    };
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.movie_carousel} ref={carouselRef}>
        {error && <p className={styles.error_message}>{error}</p>}
        {data.movies.map((movie) => (
          <MovieCard movie={movie} sliderStyle={sliderStyle} />
        ))}
      </div>
      <button
        type="button"
        className={`${styles.btn} ${styles.left_btn}`}
        onClick={() => handleLeftBtn()}
        ref={leftBtnRef}
      >
        <img src={left_arrow} alt="왼쪽 화살표" className={styles.button_img} />
      </button>
      <button
        type="button"
        className={`${styles.btn} ${styles.right_btn}`}
        onClick={() => handleRightBtn()}
        ref={rightBtnRef}
      >
        <img
          src={right_arrow}
          alt="오른쪽 화살표"
          className={styles.button_img}
        />
      </button>
    </section>
  );
}
