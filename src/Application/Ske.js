import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Box1 from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';
export default function Ske() {
  return (
    <>
    <Box sx={{ width: 300, height: 500 }}> {/* Set width and height appropriately */}
              
    <Skeleton variant="rectangular" width={500} height={45}  style={{marginTop:30,marginLeft: 290}} />
    
  
    
    
    <Skeleton variant="rectangular" width={1100} height={50} animation={false} style={{ marginTop: 17,marginLeft: 52}} />
    <Skeleton variant="rectangular" width={1100} height={50} animation={false} style={{ marginTop: 17,marginLeft: 52}} />
    <Skeleton variant="rectangular" width={1100} height={50} animation={false} style={{ marginTop: 17,marginLeft: 52}} />
    <Skeleton variant="rectangular" width={1100} height={50} animation={false} style={{ marginTop: 17,marginLeft: 52}} />
    <Skeleton variant="rectangular" width={1100} height={50} animation={false} style={{ marginTop: 17,marginLeft: 52}} />
    <Skeleton variant="rectangular" width={1100} height={50} animation={false} style={{ marginTop: 17,marginLeft: 52}} />
    <Skeleton variant="rectangular" width={1100} height={50} animation={false} style={{ marginTop: 17,marginLeft: 52}} />
  
  </Box>

  <Box1 sx={{ display: 'flex', gap: 2,  flexWrap: 'wrap' , marginTop: 5, width:1200,justifyContent:'center' }}>
      {/* <CircularProgress variant="solid" /> */}
      {/* <CircularProgress variant="soft" /> */}
      <CircularProgress variant="outlined" />
      {/* <CircularProgress variant="plain" /> */}
    </Box1>
  </>
  );
}
