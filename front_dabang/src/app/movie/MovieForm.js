"use client";
import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function MovieListPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchMovies = async (query = '') => {
      setError(null);
      try {
        const response = await fetch('/api/movies');

        if (!response.ok) {
          console.log(response)
          throw new Error('네트워크 응답이 올바르지 않습니다111.');
        }

        const data = await response.json();
        const movieList = data?.Data?.[0]?.Result || [];
        setMovies(movieList);

      } catch (err) {
        console.error("데이터 로딩 중 오류 발생:", err);
        setError(err.message);
      } finally {}
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = () => {
    fetchMovies(searchQuery);
  };

  const groupMoviesByGenre = (movieList) => {
    const filteredMovies = movieList.filter(movie => {
      const genres = movie.genre?.split(',') || [];
      return !genres.some(g => g.trim() === '에로');
    });

    return filteredMovies.reduce((acc, movie) => {
      const genres = movie.genre?.split(',').map(g => g.trim()).filter(g => g !== '') || ['기타'];

      genres.forEach(genre => {
        const trimmedGenre = genre.trim();
        if (!acc[trimmedGenre]) {
          acc[trimmedGenre] = [];
        }
        acc[trimmedGenre].push(movie);
      });
      return acc;
    }, {});
  };

  const groupedMovies = groupMoviesByGenre(movies);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-red-400">
        <p className="text-xl">오류: {error}</p>
      </div>
    );
  }

 return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#121212', color: '#fff', p: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <TextField
          variant="outlined"
          placeholder="영화 제목 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          sx={{
            flexGrow: 1,
            mr: 1,
            '& .MuiOutlinedInput-root': {
              color: '#fff',
              '& fieldset': {
                borderColor: '#bdbdbd',
              },
              '&:hover fieldset': {
                borderColor: '#00e5ff',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#00e5ff',
              },
            },
            '& .MuiInputBase-input::placeholder': {
              color: '#bdbdbd',
              opacity: 1,
            },
          }}
        />
        <IconButton
          color="primary"
          onClick={handleSearch}
          sx={{
            backgroundColor: '#212121',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#424242',
            },
          }}
        >
          <SearchIcon />
        </IconButton>
      </Box>

      {Object.keys(groupedMovies).length > 0 ? (
        Object.keys(groupedMovies).map((genre, index) => (
          <Box key={genre} sx={{ mb: 6, width: '100%' }}>
            <Typography
              variant="h5"
              align="left"
              sx={{ mb: 2, color: '#80deea' }}
            >
              {genre}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                overflowX: 'auto',
                gap: 2,
                pb: 2,
                justifyContent: 'flex-start',
                '&::-webkit-scrollbar': {
                  height: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#424242',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#212121',
                },
              }}
            >
              {groupedMovies[genre].map((movie, movieIndex) => (
                <Box
                  key={movieIndex}
                  sx={{
                    flexShrink: 0,
                    width: { xs: '150px', sm: '200px', md: '220px' },
                    backgroundColor: '#212121',
                    borderRadius: '12px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.7)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={movie.posters ? movie.posters.split('|')[0] : 'https://placehold.co/200x300/323232/ababab?text=No+Poster'}
                    alt={`${movie.title} 포스터`}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                      aspectRatio: '2 / 3',
                      borderTopLeftRadius: '12px',
                      borderTopRightRadius: '12px',
                    }}
                  />
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 'medium' }}>
                      {movie.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#bdbdbd' }}>
                      {movie.prodYear ? `개봉: ${movie.prodYear}` : '개봉 정보 없음'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#bdbdbd' }}>
                      감독: {movie.directors?.director?.[0]?.directorNm || '정보 없음'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#bdbdbd' }}>
                      배우: {movie.actors?.actor?.[0]?.actorNm || '정보 없음'}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        ))
      ) : (
        <Typography variant="h6" align="center" sx={{ color: '#9e9e9e' }}>
          영화 정보가 없습니다.
        </Typography>
      )}
    </Box>
  );
}
