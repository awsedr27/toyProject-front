"use client";
import React, { useState, useEffect, useRef } from "react";
import { useApi } from "@/hooks/useApi";
import { useLoading } from '@/context/LoadingContext'
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function MovieSlider({ genre, movies }) {
  const sliderRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };
  const onMouseLeave = () => (isDown.current = false);
  const onMouseUp = () => (isDown.current = false);
  const onMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <Box sx={{ mb: 6 }}>
      <Typography
        variant="h5"
        align="left"
        sx={{
          mb: 2,
          fontWeight: 700,
          textAlign: "left",
          background: "linear-gradient(90deg, #9c27b0, #e040fb)", // 보라-핑크 그라데이션
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {genre}
      </Typography>

      <Box
        ref={sliderRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          cursor: "grab",
          "&::-webkit-scrollbar": { display: "none" }, // 크롬/사파리
          msOverflowStyle: "none", // IE/Edge
          scrollbarWidth: "none", // Firefox
          p: 1,
        }}
      >
        {movies.map((movie, i) => {
          const poster =
            movie?.posters?.split("|")[0] ||
            "https://placehold.co/200x300/eeeeee/999999?text=No+Poster";
          const title = movie?.title || "제목 없음";

          return (
            <Card
              key={i}
              sx={{
                flex: "0 0 200px", // 카드 고정 크기
                borderRadius: "12px",
                overflow: "hidden",
                background: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "transform 0.25s",
                "&:hover": { transform: "translateY(-6px)" },
              }}
            >
              <Box
                component="img"
                src={poster}
                alt={title}
                sx={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/200x300/eeeeee/999999?text=No+Poster";
                }}
              />
              <CardContent sx={{ p: 2 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: "#333",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={title}
                >
                  {title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  {movie.prodYear ? `개봉: ${movie.prodYear}` : "개봉 정보 없음"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  감독: {movie.directors?.director?.[0]?.directorNm || "정보 없음"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  배우: {movie.actors?.actor?.[0]?.actorNm || "정보 없음"}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}

export default function MovieListPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const { post } = useApi();
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, setLoading } = useLoading();

  const fetchMovies = async (query = "") => {
    setError(null);
    try {
      setLoading(true);
      const request = { query };
      const response = await post("/api/movies", request);
      const movieList = Array.isArray(response?.Data)
        ? response.Data[0]?.Result || []
        : [];
      setMovies(movieList);
    } catch (err) {
      setError(err.message || "에러 발생");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = () => {
    fetchMovies(searchQuery);
  };

  // 장르별 그룹핑
  const groupMoviesByGenre = (movieList) => {
    const filtered = movieList.filter((movie) => {
      const genres = movie.genre?.split(",") || [];
      return !genres.some((g) => g.trim() === "에로");
    });

    return filtered.reduce((acc, movie) => {
      const genres =
        movie.genre?.split(",").map((g) => g.trim()).filter((g) => g !== "") ||
        ["기타"];
      genres.forEach((g) => {
        if (!acc[g]) acc[g] = [];
        acc[g].push(movie);
      });
      return acc;
    }, {});
  };

  const groupedMovies = groupMoviesByGenre(movies);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5", p: 4 }}>
      {/* 검색창 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 4,
          maxWidth: 720,
          mx: "auto",
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="영화 제목 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#fff",
            },
          }}
        />
        <IconButton
          onClick={handleSearch}
          sx={{
            ml: 1,
            width: 48,
            height: 48,
            borderRadius: "12px",
            background: "linear-gradient(90deg, #ff8a00, #e52e71)",
            color: "#fff",
          }}
        >
          <SearchIcon />
        </IconButton>
      </Box>

      {loading && (
        <Typography align="center" sx={{ mb: 3, color: "#666" }}>
          불러오는 중...
        </Typography>
      )}

      {error && (
        <Typography align="center" sx={{ color: "red", mb: 2 }}>
          오류: {error}
        </Typography>
      )}

      {/* 카테고리별 슬라이드 */}
      {Object.keys(groupedMovies).map((genre, idx) => (
        <MovieSlider key={idx} genre={genre} movies={groupedMovies[genre]} />
      ))}
    </Box>
  );
}
