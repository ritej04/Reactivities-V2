import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccount";
import { LoginSchema, loginSchema } from "../../lib/schemas/loginSchema";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import { Link, useLocation, useNavigate } from "react-router";

export default function LoginForm() {
    const { loginUser } = useAccount();
    const navigate = useNavigate();
    const location=useLocation();
    const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm<LoginSchema>({
        mode:'onTouched',
        resolver: zodResolver(loginSchema)
    });
    const onSubmit = async (data: LoginSchema) => {
        await loginUser.mutateAsync(data,{
            onSuccess: () => {
                navigate(location.state?.from || '/activities');
            }
        });
    };
  return (
    <Paper
    component="form"
    onSubmit={handleSubmit(onSubmit)}
    sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3,maxWidth:'md',mx:'auto',borderRadius:3}}>
        <Box sx={{display:'flex',alignItems:'center',gap:2,justifyContent:'center'
            ,color:'secondary.main'}}>
                <LockOpen fontSize="large"/>
                <Typography variant="h4" >Sign In</Typography>
     </Box>
     <TextInput label="Email" name="email" control={control} />
     <TextInput label="Password" name="password" control={control} type="password"/>
     <Button type="submit" disabled={!isValid || isSubmitting} variant="contained"  size="large">
        Login
     </Button>
     <Typography sx={{textAlign:'center'}}>
        don't have an account?
         <Typography sx={{ml:2}}component={Link} to='/register' color="primary">
            Sign up
        </Typography>
     </Typography>
    </Paper>
  )
}