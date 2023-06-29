import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./movieCarousel.module.css"

export default function MovieCarousel() {
  const navigate = useNavigate();
  const [moviesInfo, setMoviesInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [sliderStyle, setSliderStyle] = useState({});
  const leftBtn = useRef();
  const rightBtn = useRef();

  const handleLeftBtn = () => {
    if (sliderIndex !== 0) {
      setSliderIndex(sliderIndex - 7);
      rightBtn.current.style = "display : block";
    }
  };
  const handleRightBtn = () => {
    if (sliderIndex + 7 < moviesInfo.length) {
      setSliderIndex(sliderIndex + 7);
      leftBtn.current.style = "display : block";
    }
  };

  useEffect(() => {
    setSliderStyle({
      transition: "all 0.5s ease-in-out",
      transform: `translateX(-${100 * sliderIndex}%) translateX(-${
        20 * sliderIndex
      }px)`,
    });
    if (sliderIndex === 0) {
      leftBtn.current.style = "display : none";
    } else if (sliderIndex + 7 > moviesInfo.length) {
      rightBtn.current.style = "display : none";
    }
  }, [sliderIndex, moviesInfo]);

  useEffect(() => {
    const getAPI = () => {
      fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year"
      )
        .then((response) => response.json())
        .then((json) => {
          setLoading(true);
          setMoviesInfo(
            json.data.movies.map((val) => [
              val.medium_cover_image,
              val.title,
              val.id,
            ])
          );
        });
    };
    getAPI();
  }, [loading]);

  const handleMovieClick = (movieId) => {
    navigate(`/detail/${movieId}`);
  };

  return (
    <section className={styles.container}>
      <div className={styles.movie_carousel}>
        {moviesInfo.map((val) => (
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
        ))}
      </div>
      <button
        type="button"
        className={`${styles.btn} ${styles.left_btn}`}
        onClick={() => handleLeftBtn()}
        ref={leftBtn}
      >{`<`}</button>
      <button
        type="button"
        className={`${styles.btn} ${styles.right_btn}`}
        onClick={() => handleRightBtn()}
        ref={rightBtn}
      >{`>`}</button>
    </section>
  );
}
