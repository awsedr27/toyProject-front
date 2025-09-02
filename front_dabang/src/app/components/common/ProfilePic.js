'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { Badge, Stack } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';

export default function ProfilePic({ picSize, uploadBtn }) {
  const [avatarSrc, setAvatarSrc] = React.useState(undefined);

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const ResizedAvatar = styled(Avatar)(({ theme, s }) => ({
    width: s === 1 ? 150 : s === 2 ? 75 : s === 3 ? 38 : 150,
    height: s === 1 ? 150 : s === 2 ? 75 : s === 3 ? 38 : 150,
    border: `2px solid ${theme.palette.background.paper}`,
  }));

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#d1a2f8ff',
      color: '#5c4c61ff',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      width: 22,
      height: 22,
      borderRadius: '50%',
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer', // Add a pointer cursor to indicate it's clickable
    },
    // The rest of your styles...
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
    <Stack direction="row" spacing={2}>
      {uploadBtn ? (
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            // Use ButtonBase for the badge content itself
            <ButtonBase
              component="label"
              role={undefined}
              tabIndex={-1}
              aria-label="Upload new avatar"
              sx={{
                borderRadius: '50%',
                width: '100%',
                height: '100%',
              }}
            >
              +
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleAvatarChange}
              />
            </ButtonBase>
          }
        >
          <ResizedAvatar alt="Upload new avatar" src={avatarSrc} s={Number(picSize)} />
        </StyledBadge>
      ) : (
        <ResizedAvatar alt="Profile picture" src={avatarSrc} s={Number(picSize)} />
      )}
    </Stack>
  );
}