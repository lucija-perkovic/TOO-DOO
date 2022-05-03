import React, { useContext } from "react";
import { Box, Button, FormControl, Paper, TextField } from "@mui/material";
import { UserDataRequest } from "../../../models/user";
import { Form, Formik } from "formik";
import * as yup from 'yup';
import { AuthContext } from "../../context/Auth/auth-context";
import { login } from "../../../services/BackendService";

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
    const initialValues = {
        email: '',
        password: ''
    }
    const auth = useContext(AuthContext);
    return (
        <Paper elevation={3} sx={{m:2, p:2}}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values: UserDataRequest, { resetForm }) => {
                login(values).then(res => auth.login(res.token, res.userId));
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
                            <Button type="submit" variant="contained" sx={{ m: 1, width: '25ch' }}>
                                Login
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Paper>

    )
}

export default Login;