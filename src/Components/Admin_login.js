import React, { useState, useEffect } from 'react';
import { IconButton, Button, TextField, Snackbar } from '@mui/material';
import { Visibility, VisibilityOff, Login as LoginIcon, PersonAdd as PersonAddIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function Admin_login({ handleAdminloginbutton, isloggedin, isloggedin_admin, setisloggedin_admin, admin_id, setAdmin_id, admin_password, setAdmin_password }) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);

    useEffect(() => {
        if (isloggedin) {
            setShowSnackbar(true);
            setTimeout(() => {
                navigate('/Home');
            }, 4000); // Delay navigation to allow Snackbar to show
        }
    }, [isloggedin, navigate]);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const Changed = (event) => {
        if (event.target.id === 'admin_id') {
            setAdmin_id(event.target.value);
        } else {
            setAdmin_password(event.target.value);
        }
    }

    const handleSnackbarClose = () => {
        setShowSnackbar(false);
    };

    return (
        <div className='login-wrapper'>
            <div className="loginframe container mt-9 p-4 rounded shadow">
                <form>
                    <h2 className="text-center mb-4" style={{ color: 'blue', fontSize: '1.5rem' }}>Admin Login</h2>

                    <div className="mb-3">
                        <TextField
                            id="admin_id"
                            label="Admin ID"
                            variant="standard"
                            fullWidth
                            onChange={Changed}
                            disabled={isloggedin} // Disable input if logged in
                            slotProps={{ input: { style: { fontSize: '1.25rem' } }, inputLabel: { style: { fontSize: '1.25rem' } } }}
                        />
                    </div>

                    <div className="mb-3">
                        <TextField
                            id="admin_password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="standard"
                            fullWidth
                            onChange={Changed}
                            disabled={isloggedin} // Disable input if logged in
                            slotProps={{
                                input: {
                                    style: { fontSize: '1.25rem' },
                                    endAdornment: (
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            disabled={isloggedin} // Disable button if logged in
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    ),
                                },
                                inputLabel: { style: { fontSize: '1.25rem' } }
                            }}
                        />
                    </div>

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleAdminloginbutton}
                        startIcon={<LoginIcon />}
                        sx={{ mb: 2 }}
                        disabled={isloggedin} // Disable button if logged in
                    >
                        Login
                    </Button>
                </form>
            </div>
            <Snackbar
                open={showSnackbar}
                autoHideDuration={5000}
                onClose={handleSnackbarClose}
                message="Please Logout First, You are already logged in as User"
                action={
                    <Button color="primary" size="small" onClick={handleSnackbarClose}>
                        Close
                    </Button>
                }
                sx={{
                    '& .MuiSnackbarContent-root': {
                        color: 'black', // Change this to your desired color
                        backgroundColor: 'white', // Change this to your desired color
                    },
                }}
            />
        </div>
    );
}

Admin_login.propTypes = {
    handleAdminloginbutton: PropTypes.func.isRequired,
    isloggedin: PropTypes.bool.isRequired,
    isloggedin_admin: PropTypes.bool.isRequired,
    setisloggedin_admin: PropTypes.func.isRequired,
    admin_id: PropTypes.string.isRequired,
    setAdmin_id: PropTypes.func.isRequired,
    admin_password: PropTypes.string.isRequired,
    setAdmin_password: PropTypes.func.isRequired,
};

export default Admin_login;