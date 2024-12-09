import React, { useState } from 'react'
import {Container,Paper, TextField, Typography,Button, Stack, Avatar, IconButton} from '@mui/material'
import {CameraAlt as CameraAltIcon} from '@mui/icons-material'
import { VisuallyHiddenInput } from '../components/styles/StyledComponents'

import {useFileHandler, useInputValidation, useStrongPassword} from '6pp'
import { usernameValidator } from '../utils/validators'

const Login = () => {
    const [isLogin,setIsLogin] = useState(true)
    const toggleLogin = () => setIsLogin((prev) => !prev)

    const name = useInputValidation("")
    const bio = useInputValidation("")
    const username = useInputValidation("",usernameValidator)
    const password = useStrongPassword()
    const avatar = useFileHandler("single")

    const handleLogin = (e) => {
        e.preventDefault()
        // Perform login logic here
    }
    const handleSignup = (e) => {
        e.preventDefault()
        //Perform signup logic here
    }

    return (
        <Container component={'main'} maxWidth='xs' sx={{
            height:'100vh',
            display: 'flex',
            justifyContent:"center",
            alignItems:"center"
        }}>
            <Paper
                elevation={3}
                sx={{
                    padding:4,
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                }}
            >
                {isLogin?(
                    <>
                        <Typography variant='hs'>Login</Typography>
                        <form style={{
                            width:'100%',
                            marginTop:"1rem"
                            }}
                            onSubmit={handleLogin}
                        >
                            <TextField
                                required
                                fullWidth
                                label='Username'
                                margin='normal'
                                variant='outlined'
                                value={username.value}
                                onChange={username.changeHandler}
                            />
                            {
                                username.error && (
                                    <Typography color='error'>{username.error}</Typography>
                                )
                            }
                            <TextField
                                required
                                fullWidth
                                label='Password'
                                type='password'
                                margin='normal'
                                variant='outlined'
                                value={password.value}
                                onChange={password.changeHandler}
                            />
                            {
                                password.error && (
                                    <Typography color='error'>{password.error}</Typography>
                                )
                            }
                            <Button 
                                sx={{marginTop:'1rem'}}
                                variant='contained'
                                color='primary'
                                type='submit'
                            >Login</Button>
                            <Typography textAlign={'center'} m={'1rem'}>Or</Typography>
                            <Button 
                                sx={{marginTop:'1rem'}}
                                variant='text'
                                fullWidth
                                color='secondary'
                                onClick={toggleLogin}
                            >Register</Button>
                        </form>
                    </>
                ):(
                    <>
                        <Typography variant='hs'>Sign Up</Typography>
                        <form style={{
                            width:'100%',
                            marginTop:"1rem"
                            }}
                            onSubmit={handleSignup}
                        >
                            <Stack position={'relative'} width={'10rem'} margin={'auto'}>
                                <Avatar 
                                    sx={{
                                        width:'10rem',
                                        height:'10rem',
                                        objectFit:"contain"
                                    }}
                                    src={avatar.preview}
                                />
                                {
                                    avatar.error && (
                                        <Typography 
                                            m={"1rem auto"}
                                            width={"fit-content"}
                                            display={"block"}
                                            color='error'
                                            variant='caption'>
                                            {avatar.error}
                                        </Typography>
                                    )
                                }
                                <IconButton
                                    sx={{
                                        position:"absolute",
                                        bottom:"0",
                                        right:"0",
                                        bgcolor:"rgba(0,0,0,0,0.5) ",
                                        ":hover":{
                                            bgcolor:"rgba(0,0,0,0.7)"
                                        }
                                    }}
                                    component='label'
                                >
                                    <>
                                        <CameraAltIcon />
                                        <VisuallyHiddenInput onChange={avatar.changeHandler} type='file' />
                                    </>
                                </IconButton>
                            </Stack>
                            <TextField
                                required
                                fullWidth
                                label='Name'
                                margin='normal'
                                variant='outlined'
                                value={name.value}
                                onChange={name.changeHandler}
                            />
                            <TextField
                                required
                                fullWidth
                                label='Username'
                                margin='normal'
                                variant='outlined'
                                value={username.value}
                                onChange={username.changeHandler}
                            />
                            {
                                username.error && (
                                    <Typography color='error'>{username.error}</Typography>
                                )
                            }
                            <TextField
                                required
                                fullWidth
                                label='Bio'
                                margin='normal'
                                variant='outlined'
                                value={bio.value}
                                onChange={bio.changeHandler}
                            />
                            <TextField
                                required
                                fullWidth
                                label='Password'
                                type='password'
                                margin='normal'
                                variant='outlined'
                                value={password.value}
                                onChange={password.changeHandler}
                            />
                            {
                                password.error && (
                                    <Typography color='error'>{password.error}</Typography>
                                )
                            }
                            <Button 
                                sx={{marginTop:'1rem'}}
                                variant='contained'
                                color='primary'
                                type='submit'
                            >Sign Up</Button>
                            <Typography textAlign={'center'} m={'1rem'}>Or</Typography>
                            <Button 
                                sx={{marginTop:'1rem'}}
                                variant='text'
                                fullWidth
                                color='secondary'
                                onClick={toggleLogin}
                            >Login Instead</Button>
                        </form>
                    </>
                )}
            </Paper>
        </Container>
    )
}

export default Login