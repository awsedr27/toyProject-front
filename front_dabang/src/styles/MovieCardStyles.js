// src/styles/MovieCardStyles.js
import { styled } from '@mui/material/styles';
import { Card, Box } from '@mui/material';

export const CARD_BACKGROUND_COLOR = '#141414';
export const CARD_HOVER_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
export const PLACEHOLDER_COLOR = '#333';
export const PLACEHOLDER_ICON_COLOR = '#555';

export const StyledMovieCard = styled(Card)(({ theme }) => ({
  backgroundColor: CARD_BACKGROUND_COLOR,
  color: theme.palette.text.primary,
  height: '100%', // Grid item 내에서 부모 높이를 꽉 채우도록 유지
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius || 1,
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    zIndex: 10,
    boxShadow: `0px 0px 20px ${CARD_HOVER_SHADOW_COLOR}`,
  },
  // --- 새로운 추가 또는 수정 사항 ---
  // 모든 카드가 최소한의 높이를 가지도록 강제하여 빈약한 콘텐츠로 인한 줄어듦 방지
  // 이 값은 실제 포스터 비율과 타이틀/연도 영역의 최소 높이를 고려하여 조정 필요
  minHeight: '100px', // 예시 값, 실제 콘텐츠에 맞춰 조절하세요. (포스터+내용 최소 높이)
}));

export const moviePosterStyles = {
  aspectRatio: '2 / 3', // 이미지 비율 유지
  objectFit: 'cover', // 이미지가 컨테이너를 꽉 채우도록
  width: '100%',     // 이미지 너비를 100%로 설정
 // height: 'auto',    // aspectRatio와 함께 사용하여 비율 유지
  // --- 새로운 추가 또는 수정 사항 ---
  // minHeight를 추가하여 이미지가 없거나 로딩 중일 때도 일관된 높이 유지
  minHeight: '200px', // 예시 값, 포스터 영역의 최소 높이
  display: 'block', // 이미지 요소가 블록 레벨이 되도록
};


export const movieCardContentStyles = {
  flexGrow: 1, // 남은 공간을 채우도록
  padding: '12px', // 상하좌우 패딩
  '&:last-child': {
    paddingBottom: '12px', // MUI CardContent의 기본 `:last-child` 패딩 오버라이드 방지
  },
  // --- 새로운 추가 또는 수정 사항 ---
  // CardContent의 최소 높이를 설정하여 제목이나 다른 내용이 짧아도 일관된 하단 여백 유지
  minHeight: '70px', // 예시 값, 제목과 연도를 포함하기에 충분한 최소 높이
  display: 'flex', // 내부 콘텐츠 (제목, 연도) 정렬을 위해 flexbox 사용
  flexDirection: 'column', // 세로 방향으로 정렬
  justifyContent: 'flex-start', // 콘텐츠를 위쪽부터 정렬
};

export const movieTitleTypographyStyles = {
  fontWeight: 'bold',
  whiteSpace: 'nowrap',      // 텍스트 줄바꿈 방지
  overflow: 'hidden',       // 넘치는 텍스트 숨김
  textOverflow: 'ellipsis', // 넘치는 텍스트를 ...으로 표시
  fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
  // --- 새로운 추가 또는 수정 사항 ---
  // 제목의 줄 높이와 최대 높이를 명시적으로 설정하여 항상 한 줄로 고정하고 높이 일관성 확보
  lineHeight: '1.2em', // 폰트 크기에 맞는 줄 높이 (폰트 크기에 따라 조절)
  maxHeight: '1.2em',  // 최대 높이를 한 줄 높이로 제한하여 두 줄이 되는 것을 방지
  marginBottom: '4px', // 제목과 연도 사이의 간격
  color: 'white',
  
};

// scrollbarStyles는 이 변경에 직접적인 영향 없음`
export const scrollbarStyles = (theme) => ({
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
        height: '8px',
        width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.custom?.scrollbarThumb || '#444',
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: theme.palette.custom?.scrollbarTrack || '#222',
    },
});