import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Link } from '@mui/icons-material';

const CustomLinkIcon = ({ sx }) => {
  const [imageError, setImageError] = useState(false);

    return (
      <Box
        component="span"
        sx={{ display: 'inline-block', width: '24px', height: '24px', ...sx }}
      >
      {imageError ? (
        <Link sx={{ width: '24px', height: '24px', ...sx }} />
      ) : (
        <Box
          component="img"
          src="https://upload.wikimedia.org/wikipedia/commons/5/56/Chain_link_icon_slanted.png"
          alt="Link Icon"
          sx={{ width: '24px', height: '24px', ...sx }}
          onError={() => setImageError(true)}
        />
      )}
      </Box>
    );
  };
  
  export default CustomLinkIcon;