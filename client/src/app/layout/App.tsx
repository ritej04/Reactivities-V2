import { Box, Container, CssBaseline } from '@mui/material'
import NavBAR from './NavBar'
import { Outlet } from 'react-router'
function App() {
  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <CssBaseline />
      <NavBAR />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Outlet />
      </Container>
    </Box>
  )
}
export default App

//function useQuery(_arg0: { querykey: string[]; queryFn: () => Promise<Activity[]> }): { data: any; isPending: any } {
//throw new Error('Function not implemented.')
//}
