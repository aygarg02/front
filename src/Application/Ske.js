import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Box1 from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';
export default function Ske() {
  return (
    <>
    <Box sx={{   width: 300, height: 500 }}> {/* Set width and height appropriately */}
              
    <Skeleton variant="rectangular" width={800} height={70}  style={{marginTop:30,marginLeft: 185}} />
    
  
    
    
    <Skeleton variant="rectangular" width={1100} height={100} animation={false} style={{ marginTop: 17,marginLeft: 52}} />
    <Skeleton variant="rectangular" width={1100} height={100} style={{ marginTop: 17,marginLeft: 52}} />
    <Skeleton variant="rectangular" width={1100} height={100} animation={false} style={{ marginTop: 17,marginLeft: 52}} />
    <Skeleton variant="rectangular" width={1100} height={100}  style={{ marginTop: 17,marginLeft: 52}} />
    <Skeleton variant="rectangular" width={1100} height={100} animation={false} style={{ marginTop: 17,marginLeft: 52}} />
    <Skeleton variant="rectangular" width={1100} height={100}  style={{ marginTop: 17,marginLeft: 52}} />
    <Skeleton variant="rectangular" width={1100} height={100} animation={false} style={{ marginTop: 17,marginLeft: 52}} />
  
  </Box>

 
  </>
  );
}
