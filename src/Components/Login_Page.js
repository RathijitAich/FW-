import React, { useEffect, useState } from 'react';
import { IconButton, Button, TextField } from '@mui/material';
import { Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Login_Page({ handleloginbutton, setUsername, setPassword }) {
    useEffect(() => {
        // Add the no-scroll class to the body element when the component mounts
        document.body.classList.add('no-scroll');

        // Remove the no-scroll class from the body element when the component unmounts
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const Changed = (event) => {
        if (event.target.id === 'username') {
            setUsername(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    }

    return (
        <div className='login-wrapper'>
            <div className="loginframe container mt-9 p-4 rounded shadow">
                <form>
                    <h2 className="text-center mb-4" style={{ color: 'blue', fontSize: '1.5rem' }}>Login</h2>

                    <div className="mb-3">
                        <TextField
                            id="username"
                            label="Username"
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
                            variant="standard"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            onChange={Changed}
                            slotProps={{
                                input: {
                                    style: { fontSize: '1.25rem' },
                                    endAdornment: (
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    ),
                                },
                                inputLabel: { style: { fontSize: '1.25rem' } }
                            }}
                        />
                    </div>

                    <div className="text-center">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleloginbutton}
                            startIcon={<LoginIcon />}
                            className="w-100 rounded-pill"
                            style={{ fontSize: '1.1rem' }}
                        >
                            Login
                        </Button>
                    </div>
                    <div className="text-center my-2">
                        <Button
                            variant="contained"
                            color="secondary"
                            className="w-100 rounded-pill"
                            style={{ fontSize: '1.1rem' }}
                            component={Link}
                            to="/Registration"
                        >
                            New User?Click here to Register
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

Login_Page.propTypes = {
    handleloginbutton: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
};