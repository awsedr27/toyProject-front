'use client';
 import React, { useState, useEffect } from "react";
 import {
   Box,
   Typography,
   Grid,
   CardMedia,
   CardContent,
   useTheme,
   TextField,
   InputAdornment,
   Button,
 } from "@mui/material";
 import MovieIcon from '@mui/icons-material/Movie';
 import SearchIcon from '@mui/icons-material/Search';
 import callInternalApi from '@/lib/callInternalApi';

 import {
   StyledMovieCard,
   moviePosterStyles,
   movieCardContentStyles,
   movieTitleTypographyStyles,
   scrollbarStyles,
   PLACEHOLDER_COLOR,
   PLACEHOLDER_ICON_COLOR
 } from '@/styles/MovieCardStyles';

 export default function Home() {
   const theme = useTheme();

   const [movies, setMovies] = useState([]);
   const [loadingMovies, setLoadingMovies] = useState(false);
   const [errorMovies, setErrorMovies] = useState(null);
   const [searchTerm, setSearchTerm] = useState("");

   const fetchMoviesData = async () => {
     setLoadingMovies(true);
     setErrorMovies(null);

     try {
       const requestBody = {
         collection: "kmdb_new2",
         ...(searchTerm && { query: searchTerm }),
         count: 20,
       };

       console.log("API 요청 바디:", requestBody);

       const response = await callInternalApi.post('/movie/list', requestBody);

       if (response.data && response.data.data
           && response.data.data.Data && response.data.data.Data.length > 0) {
         const allMovies = response.data.data.Data.map(item => item.Result).flat();
         setMovies(allMovies);
       } else {
         setErrorMovies("영화 데이터를 찾을 수 없습니다. 응답 구조를 확인하세요.");
         setMovies([]);
         console.error("API 응답 구조가 예상과 다릅니다:", response.data);
       }
     } catch (error) {
         console.error("영화 목록 불러오기 실패:", error);
         if (error.response && error.response.data && error.response.data.message) {
           setErrorMovies(`영화 데이터 로딩 실패: ${error.response.data.message}`);
         } else {
           setErrorMovies('영화 데이터 로딩 실패.');
         }
         setErrorMovies('영화 데이터 로딩 실패.');
         setMovies([]);
     } finally {
       setLoadingMovies(false);
     }
   };

   const handleSearchChange = (event) => {
     setSearchTerm(event.target.value);
   };

   const handleSearchSubmit = (event) => {
     if (event.key === 'Enter') {
       fetchMoviesData();
     }
   };

   return (
     <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh' }}>
       <Box
         sx={{
           display: 'flex',
           flexDirection: { xs: 'column', sm: 'row' },
           justifyContent: 'space-between',
           alignItems: { xs: 'flex-start', sm: 'center' },
           py: 3,
           px: { xs: 2, sm: 4, md: 6 },
           bgcolor: theme.palette.background.paper,
           borderBottom: `1px solid ${theme.palette.divider}`,
           gap: { xs: 2, sm: 0 },
         }}
       >
         <Typography variant="h4" sx={{ color: 'text.primary' }}>
             Top 10
         </Typography>
         <TextField
           variant="outlined"
           placeholder="검색..."
           size="small"
           value={searchTerm}
           onChange={handleSearchChange}
           onKeyPress={handleSearchSubmit}
           InputProps={{
             startAdornment: (
               <InputAdornment position="start">
               </InputAdornment>
             ),
             style: {
               color: 'black',
                backgroundColor: 'white',
               borderRadius: theme.shape.borderRadius,
             }
           }}
           sx={{
             minWidth: { xs: '100%', sm: '200px', md: '500px' },
             '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
                borderRadius: theme.shape.borderRadius,
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.87)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main,
                },
              },
           }}
         />
       </Box>

       <Box sx={{ py: 4, px: { xs: 2, sm: 4, md: 6 } }}>
         <Typography variant="h5" mt={0} sx={{ pl: { xs: 0, sm: 2, md: 4 }, color: 'text.primary' }}>
           오늘 대한민국에서 Top 10 시리즈
         </Typography>

         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 4 }}>
             <Button
                 variant="contained"
                 onClick={() => {
                     fetchMoviesData();
                 }}
                 disabled={loadingMovies}
             >
                 {loadingMovies ? '불러오는 중...' : '영화 불러오기'}
             </Button>
         </Box>
         {loadingMovies && <Typography color="text.secondary" sx={{ pl: { xs: 0, sm: 2, md: 4 } }}>영화 목록 로딩 중...</Typography>}
         {errorMovies && <Typography color="error" sx={{ pl: { xs: 0, sm: 2, md: 4 } }}>{errorMovies}</Typography>}

         <Box sx={{ mt: 3, paddingBottom: 2 }}>
           <Grid container spacing={2}>
             {movies.map((movie) => (
               <Grid
                 item
                 key={movie.DOCID}
                 xs={6}
                 sm={4}
                 md={3}
                 xl={2}
               >
                 <StyledMovieCard>
                   {movie.posters && movie.posters.split('|')[0] ? (
                     <CardMedia
                       component="img"
                       image={movie.posters.split('|')[0]}
                       alt={movie.title.replace(/!HS|!HE/g, '')}
                       sx={moviePosterStyles}
                     />
                   ) : (
                     <Box sx={{
                       ...moviePosterStyles,
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       bgcolor: PLACEHOLDER_COLOR
                     }}>
                       <MovieIcon sx={{ fontSize: 60, color: PLACEHOLDER_ICON_COLOR }} />
                     </Box>
                   )}
                   <CardContent sx={movieCardContentStyles}>
                     <Typography
                       gutterBottom
                       variant="subtitle2"
                       component="div"
                       sx={movieTitleTypographyStyles}
                     >
                       {movie.title.replace(/!HS|!HE/g, '')}
                     </Typography>
                     <Typography variant="caption" color="text.secondary">
                       {movie.prodYear}
                     </Typography>
                   </CardContent>
                 </StyledMovieCard>
               </Grid>
             ))}
           </Grid>
         </Box>
       </Box>
     </Box>
   );
 }