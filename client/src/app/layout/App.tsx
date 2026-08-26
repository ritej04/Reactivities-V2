import { Box, Container, CssBaseline } from '@mui/material'
import NavBAR from './NavBar'
import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import HomePage from '../../features/home/HomePage'
function App() {
  const location= useLocation()
  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <ScrollRestoration />
      <CssBaseline />
      {location.pathname === '/'? <HomePage/>:(
        <>
        <NavBAR />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Outlet />
      </Container>
      </>
       )
}
    </Box>
  )}
 
export default App

//function useQuery(_arg0: { querykey: string[]; queryFn: () => Promise<Activity[]> }): { data: any; isPending: any } {
//throw new Error('Function not implemented.')
//}
