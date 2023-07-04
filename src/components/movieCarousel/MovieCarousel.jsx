import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxiosMovies } from "customHook/useAxiosMovies";
import styles from "./movieCarousel.module.css";

export default function MovieCarousel() {
  const API_URL =
    "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year";
  const navigate = useNavigate();
  const { data, loading, error } = useAxiosMovies(API_URL);
  const [moviesInfo, setMoviesInfo] = useState([]);
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
    if (sliderIndex + 7 < moviesInfo.length) {
      setSliderIndex(sliderIndex + visibleItems);
      leftBtnRef.current.style.display = "block";
    }
  };

  useEffect(() => {
    data &&
      setMoviesInfo(
        data.movies.map((val) => [val.medium_cover_image, val.title, val.id])
      );
  }, [data]);

  const handleMovieClick = (movieId) => {
    navigate(`/detail/${movieId}`);
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
      sliderIndex + visibleItems > moviesInfo.length &&
      rightBtnRef.current
    ) {
      rightBtnRef.current.style.display = "none";
    }
  }, [sliderIndex, moviesInfo, visibleItems]);

  useEffect(() => {
    // 영화 목록 캐러셀이 화면 크기에 따라 현재 몇개 보이는지 계산하는 함수
    const calculateVisibleItems = () => {
      const carouselWidth = carouselRef.current.offsetWidth;
      const itemWidth = 250;
      const visibleItems = Math.floor(carouselWidth / itemWidth);
      const visibleGap = Math.floor(carouselWidth % itemWidth);
      visibleGap < 230
        ? setVisibleItems(visibleItems)
        : setVisibleItems(visibleItems+1);
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
        {loading ? (
          <p className={styles.loading_text}>Loading...</p>
        ) : (
          moviesInfo.map((val) => (
            <article
              className={styles.movie_box}
              style={sliderStyle}
              key={val[2]}
              onClick={() => {
                handleMovieClick(val[2]);
              }}
            >
              <img
                src={val[0]}
                alt={`영화 ${val[1]} 포스터`}
                className={styles.movie_img}
                onError={(e) => (e.target.parentNode.style.display = "none")}
              />
              <p className={styles.movie_title}>{val[1]}</p>
            </article>
          ))
        )}
      </div>
      {!loading && (
        <>
          <button
            type="button"
            className={`${styles.btn} ${styles.left_btn}`}
            onClick={() => handleLeftBtn()}
            ref={leftBtnRef}
          >{`<`}</button>
          <button
            type="button"
            className={`${styles.btn} ${styles.right_btn}`}
            onClick={() => handleRightBtn()}
            ref={rightBtnRef}
          >{`>`}</button>
        </>
      )}
    </section>
  );
}
