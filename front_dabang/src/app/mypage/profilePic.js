import ButtonBase from '@mui/material/ButtonBase';
import Avatar from '@mui/material/Avatar';
import { useState } from "react";

export default function ProfilePic() {
    const [avatarSrc, setAvatarSrc] = useState(undefined);

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



    return (
        <>
            <Avatar alt={profileId} src={profilePic}/>
            <ButtonBase
                    component="label"
                    role={undefined}
                    tabIndex={-1} // prevent label from tab focus
                    aria-label="Avatar image"
                    sx={{
                        borderRadius: '40px',
                        '&:has(:focus-visible)': {
                        outline: '2px solid',
                        outlineOffset: '2px',
                        },
                    }}>
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
            </ButtonBase>
        </>
        )
}