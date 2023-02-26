import { useTheme } from "@emotion/react";
import { EditOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { Formik } from "formik";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { setLogin } from "state";

const registerSchema = yup.object().shape({
  firstname: yup.string().required("First Name is required."),
  lastname: yup.string().required("Last Name is required."),
  email: yup.string().email("Invalid E-mail").required("Email is required."),
  password: yup.string().required("Password is required."),
  location: yup.string().required("Location is required."),
  occupation: yup.string().required("Occupation is required."),
  picture: yup.string().required("Picture is required."),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid E-mail").required("Email is required."),
  password: yup.string().required("Password is required."),
});

const initialValuesRegister = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  // CONFIGS
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // PAGE INFORMATION STATES
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  // DISPLAY CONSTANTS
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const { palette } = useTheme();

  // FUNCTIONS

  // For handling Register API call
  const register = async (values, onSubmitProps) => {

    // Creation of form data for exporting form and multipart values
    const formData = new FormData();

    //   values.forEach((val) => {
    //         console.log(val) 
    //       formData.append(val, values[val])
    //   });

      for (let value in values) {
        formData.append(value, values[value])
    }    


    formData.append("picturePath", values.picture.name);
    console.log(formData)

    const userData = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      body: formData,
    });

    const userDataResponse = await userData.json();

    if (userDataResponse.error) {
        window.alert(userDataResponse.error)
    } else {
     onSubmitProps.resetForm();
        setPageType('login')
    }
  };

  // For handling Login API call
  const login = async (values, onSubmitProps) => {
      
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
        headers: {
          "Content-type": "application/json"
      },
      body: JSON.stringify(values),
    });

    const isLoggedIn = await loggedInResponse.json();

    if (isLoggedIn.error) {
        window.alert(isLoggedIn.error)
    } else {
      dispatch(setLogin(isLoggedIn));
      navigate("/");
    }
  };

  // For handling form submission
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": {
                gridColumn: isNonMobileScreen ? undefined : "span 4",
              },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  value={values.firstname}
                  name="firstname"
                  label="First Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    Boolean(touched.firstname) && Boolean(errors.firstname)
                  }
                  helperText={touched.firstname && errors.firstname}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  value={values.lastname}
                  name="lastname"
                  label="Last Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.lastname) && Boolean(errors.lastname)}
                  helperText={touched.lastname && errors.lastname}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  value={values.location}
                  name="location"
                  label="Location"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  value={values.occupation}
                  name="occupation"
                  label="Occupation"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 2" }}
                />

                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg, .jpeg, .png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlined />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              value={values.email}
              name="email"
              label="E-mail"
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />

            <TextField
              value={values.password}
              name="password"
              type="password"
              label="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* Buttons */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "none",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
