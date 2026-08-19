import { Navigate, Outlet, useLocation } from "react-router"
import { useAccount } from "../../lib/hooks/useAccount"
import Typography from "@mui/material/Typography"

export default function RequireAuth() {
    const {currentUser,LoadingUserInfo} = useAccount()
    const location = useLocation();
    if(LoadingUserInfo) return <Typography>Loading...</Typography>
    if(!currentUser) return <Navigate to="/login" state={{ from: location }} />
  return (
    <Outlet />
  )
}