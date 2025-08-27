'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { Badge, Stack } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';

export default function ProfilePic({picSize, uploadBtn}) {
  const [avatarSrc, setAvatarSrc] = React.useState(undefined);

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Read the file as a data URL
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  /*
  prefixedSize 
      1 : 150
      2 : 75
      3 : 38 (헤더 아이콘)
      기본값 : 150
  */
  const ResizedAvatar = styled(Avatar)(({ theme , s}) => ({
        width: s === 1 ? 150 : s === 2 ? 75 : s === 3 ? 38 : 150, 
        height: s === 1 ? 150 : s === 2 ? 75 : s === 3 ? 38 : 150, 
        border: `2px solid ${theme.palette.background.paper}`,
    }));

  const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#d1a2f8ff',
    color: '#5c4c61ff',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    width: 22,                  // 뱃지 너비
    height: 22,                 // 뱃지 높이
    borderRadius: '50%',
    fontSize: '1rem',         // 텍스트 크기 지정 
    display: 'flex',            // flexbox를 사용하여
    alignItems: 'center',       // 수직 중앙 정렬
    justifyContent: 'center',   // 수평 중앙 정렬
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

  return (
    <>
    {uploadBtn &&
      <ButtonBase
        component="label"
        role={undefined}
        tabIndex={-1} // prevent label from tab focus
        aria-label="Avatar image"
        sx={{
          borderRadius: '45px',
          '&:has(:focus-visible)': {
            outline: '2px solid',
            outlineOffset: '2px',
          },
        }}
      >
    </ButtonBase>}

    <Stack direction="row" spacing={2}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent="+"
      >
        <ResizedAvatar alt="Upload new avatar"  src={avatarSrc} s={Number(picSize)} />
        <input
          type="file"
          accept="image/*"
          style={{
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: '1px',
            margin: '-1px',
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            whiteSpace: 'nowrap',
            width: '1px',
          }}
          onChange={handleAvatarChange}
        />
      </StyledBadge>
    </Stack>
  </>
  );
}