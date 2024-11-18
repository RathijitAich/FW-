import React, { useEffect, useState } from 'react';
import { IconButton, Button, TextField } from '@mui/material';
import { Visibility, VisibilityOff, Login as LoginIcon, PersonAdd as PersonAddIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function Login_Page({ handleloginbutton, setPassword, setUser_id }) {
  

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const Changed = (event) => {
        if (event.target.id === 'user_id') {
            setUser_id(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    }

    const handleRegisterButton = () => {
        navigate('/Registration');
    }

    return (
        <div className='login-wrapper'>
            <div className="loginframe container mt-9 p-4 rounded shadow">
                <form>
                    <h2 className="text-center mb-4" style={{ color: 'blue', fontSize: '1.5rem' }}>Login</h2>

                    <div className="mb-3">
                        <TextField
                            id="user_id"
                            label="User ID"
                            variant="standard"
                            fullWidth
                            onChange={Changed}
                            slotProps={{ input: { style: { fontSize: '1.25rem' } }, inputLabel: { style: { fontSize: '1.25rem' } } }}
                        />
                    </div>

                    <div className="mb-3">
                        <TextField
                            id="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="standard"
                            fullWidth
                            onChange={Changed}
                            slotProps={{ input: { style: { fontSize: '1.25rem' } }, inputLabel: { style: { fontSize: '1.25rem' } } }}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                ),
                            }}
                        />
                    </div>

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleloginbutton}
                        startIcon={<LoginIcon />}
                        sx={{ mb: 2 }}
                    >
                        Login
                    </Button>

                    <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={handleRegisterButton}
                        startIcon={<PersonAddIcon />}
                    >
                        Register
                    </Button>
                </form>
            </div>
        </div>
    );
}

Login_Page.propTypes = {
    handleloginbutton: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    setUser_id: PropTypes.func.isRequired,
};