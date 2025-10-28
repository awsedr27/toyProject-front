"use client";
import React, { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi'
import { Box, Typography, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

 export default function searchMovie(searchKey) {
    const [movies, setMovies] = useState([]);
    const [Key, setKey]= useState(searchKey);
    const [error, setError] = useState(null);
    const { post,get } = useApi();
    const [searchQuery, setSearchQuery] = useState('');
    const searchMovies = async (query) => {
     setError(null);
     try {
         const request = { Key };
         const response = await post('/api/movies/searchDetail', request,true);

         const movieList = response?.results
             || [];
         setMovies(movieList);

     } catch (err) {
         console.error("데이터 로딩 중 오류 발생:", err);
         setError(err.message);
     } finally {}
    };

    const onSearch = () => {
        searchMovies(Key);
    };


  return (
      <Box sx={{ position: 'relative', alignItems: 'left', mb: 4 ,textAlign: 'left'}}>
          {Object.keys(movies).length > 0 ? (
              Object.values(movies).map((movie, index) => (
                  <Box key={index} sx={{ mb: 6, width: '100%', height: '330px', pb: 6}}>
                      <Box
                          component="img"
                          src={movie.poster_path ? "https://image.tmdb.org/t/p/w500/" + movie.poster_path : 'https://placehold.co/200x300/323232/ababab?text=No+Poster'}
                          alt={`${movie.title} 포스터`}
                          sx={{
                              width : '440px',
                              display : 'inline-block',
                              height : 'auto',
                              objectFit: 'fill',
                              aspectRatio: '4 / 3',
                              borderTopLeftRadius: '12px',
                              borderTopRightRadius: '12px',
                              borderBottomLeftRadius: '12px',
                              borderBottomRightRadius: '12px',
                              float : "left",
                          }}
                      />
                      <Box
                          sx={{ display: 'flex', float: "left", mb: 2, width: '70%', alignItems: 'center' , flexDirection: 'column'}}>
                          <Typography
                              variant="h5"

                              sx={{ width:'100%',display: 'inline-block', float: "left", mb: 2, color: '#333',  textAlign:"center"}}
                          >
                              {movie.title}
                          </Typography>

                          <Typography
                              variant="h5"
                              align="left"
                              sx={{ display: 'inline-block', float: "left", mb: 2, color: '#666' }}
                          >
                              {movie.overview!= '' ?  movie.overview : 'No Storyline'}
                          </Typography>
                      </Box>
                  </Box>
                  )
              )
          ): <Box>
              <TextField
                  variant="outlined"
                  value={searchKey.value != "" ? searchKey.value : " "}
                  onChange={(e) => setKey(e.target.value)}

                  onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                          onSearch();
                      }
                  }}
                  sx={{
                      flexGrow: 1,
                      mr: 1,
                      '& .MuiOutlinedInput-root': {
                          color: '#000',
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
                  onClick={onSearch}
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
          </Box>}
      </Box>
  );
 }