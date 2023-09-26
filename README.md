# 📽️ 영화 소개 웹 사이트 'FIMLFLEX'

## 프로젝트 소개
- 전세계 다양한 영화를 소개하는 영화 웹 사이트
- 최신작품, 평점높은 작품, 사람들이 많이 찜한 작품을 추천해줍니다.
- 다양한 영화 목록을 정렬(인기순, 연도순, 제목순 등등)하여 확인 가능하며, 페이지당 항목수를 변경할 수 있습니다.
- 영화를 검색 할 수있으며, 영화를 찜하고 확인할 수 있습니다.
- 배포사이트 : https://movie-introduction.vercel.app/

<br>

## 🛠️ 사용 기술
- React.js
- css-module
- Zustand
- SWR
- react-intersection-observer
- react-router-dom
- axios

<br>

## 주요 기능
- `swr`과 `axios`를 이용하여 api 데이터 패칭 기능 구현
- swr 데이터 프리패칭을 사용하여 데이터 로딩 속도 향상
- `zustand`를 이용하여 전역 상태 관리
- 홈페이지 : '최신작품', '평점높은 작품', '사람들이 많이 찜한 작품'을 각각의 `캐러셀`로 구현
- 영화 목록 페이지 : `swr`을 이용하여 `페이지네이션`으로 구현하였으며, 정렬(인기순, 연도순, 제목순 등등)이 가능하고, 페이지당 항목수를 변경할 수 있음.
- 영화 검색결과 페이지 : 검색어가 제목에 포한된 작품을 보여주며, `react-intersection-observer` 라이브러리를 사용하여 `무한 스크롤`로 구현하였음. 제목에서 검색어에 해당되는 부분은 하이라이트로 표시됨.
- 영화 상세페이지 : 영화 제목, 평점, 줄거리 등을 확인할 수 있으며, 해당 영화와 비슷한 영화를 1~4개 추천해줌.
- 찜한 컨텐츠 페이지 : 찜한 작품을 확인할 수 있으며, 선택 삭제 및 전체 삭제가 가능함.

<br>

## 기능 구현 결과
|홈페이지|영화 상세페이지|
|:---:|:---:|
|![Alt text](src/assets/%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80.gif)|![Alt text](src/assets/%EC%83%81%EC%84%B8%ED%8E%98%EC%9D%B4%EC%A7%80.gif)|
|영화 목록 페이지|영화 검색결과 페이지|
|![Alt text](<src/assets/영화 목록 페이지.gif>)|![Alt text](<src/assets/검색 결과 페이지.gif>)|
|찜한 컨텐츠 페이지||
|![Alt text](<src/assets/찜한 컨텐츠 페이지.gif>)||


<br>

## 폴더 구조

```
📂common : 모든 컴포넌트에 공통으로 쓰이는 css파일 (reset.css 등)
📂assets : 이미지 파일 집합
📂components : 페이지를 이루는 컴포넌트 집합체
📂customHook : 데이터 패칭을 위한 커스텀 훅 파일들
📂pages : 유저가 보는 실제 페이지
📂store : 전역 상태 관리 파일 집합체

📦 movie-introduction
 ┣ 📂public
 ┗ 📂src
    ┣ 📂common
    ┣ 📂assets
    ┣ 📂components
    ┃ ┣ 📂footer
    ┃ ┣ 📂header
    ┃ ┣ 📂madal
    ┃ ┣ 📂main
    ┃ ┣ 📂menu
    ┃ ┣ 📂movieCard
    ┃ ┣ 📂movieCarousel
    ┃ ┣ 📂movieDetail
    ┃ ┣ 📂movieGrid
    ┃ ┣ 📂movieSuggestions
    ┃ ┣ 📂pagination
    ┃ ┣ 📂searchResultList
    ┃ ┗ 📂selectBox
    ┣ 📂customHook
    ┣ 📂pages
    ┗ 📂store
```
