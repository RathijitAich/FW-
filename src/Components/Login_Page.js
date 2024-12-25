import React, { useState } from 'react';
import { IconButton, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Visibility, VisibilityOff, Login as LoginIcon, PersonAdd as PersonAddIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function Login_Page({ handleloginbutton, setPassword, setUser_id, loginType, setLoginType , setAdmin_id, setTrainer_id }) {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const handleChange = (event) => {
        if (event.target.id === 'id_field') {           
            setUser_id(event.target.value);//so even for admin we are storing it in the userid state          
        } else {
            setPassword(event.target.value);
        }
    };

    const handleLoginTypeChange = (event) => {
        setLoginType(event.target.value);
    };

    const handleRegisterButton = () => {
        navigate('/Registration');
    };

    const idLabel = loginType === 'Trainer' ? 'Trainer ID' : loginType === 'Admin' ? 'Admin ID' : 'User ID';

    return (
        <div className='login-wrapper'>
            <div className="loginframe container mt-9 p-4 rounded shadow">
                <form>
                    <h2 className="text-center mb-4" style={{ color: 'blue', fontSize: '1.5rem' }}>Login</h2>

                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel id="login-type-label">Login Type</InputLabel>
                        <Select
                            labelId="login-type-label"
                            value={loginType}
                            onChange={handleLoginTypeChange}
                            label="Login Type"
                        >
                            <MenuItem value="User">User</MenuItem>
                            <MenuItem value="Trainer">Trainer</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                        </Select>
                    </FormControl>

                    <div className="mb-3">
                        <TextField
                            id="id_field"
                            label={idLabel}
                            variant="standard"
                            fullWidth
                            onChange={handleChange}
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
                            onChange={handleChange}
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
    loginType: PropTypes.string.isRequired,
    setLoginType: PropTypes.func.isRequired,
};
