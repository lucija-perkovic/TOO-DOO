import React, { useContext } from "react";
import { Box, Button, Card, FormControl, FormGroup, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from "@mui/material";
import { UserDataRequest, UserDataResponse } from "../../../models/user";
import { Form, Formik } from "formik";
import * as yup from 'yup';
import { AuthContext } from "../../context/Auth/auth-context";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { requestLoginUser } from "../../../actions/userActions";

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialValues = {
        email: '',
        password: ''
    }
    return (
        <Card>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={async (values: UserDataRequest, { resetForm }) => {
                await dispatch(requestLoginUser(values));
                resetForm();
            }}>
                {({ values, handleChange, handleSubmit, resetForm }) => (
                    <Form onSubmit={handleSubmit}>
                        <Box sx={{
                            display: 'flex',
                            flexFlow: 'column nowrap',
                            gap: '10px',
                            alignItems: 'center',
                            m: 2
                        }}>
                            <FormControl variant="standard">
                                <TextField
                                    id="outlined-adornment-email"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    margin="dense"
                                    label="Email"
                                    name="email"
                                />
                            </FormControl>

                            <FormControl variant="standard">
                                <TextField
                                    id="outlined-adornment-password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    margin="dense"
                                    label="Password"
                                    name="password"
                                />
                            </FormControl>
                            <Button type="submit" variant="contained" sx={{ m: 1, width: '25ch' }} onClick={() => navigate("/home")}>
                                Login
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Card>

    )
}

export default Login;