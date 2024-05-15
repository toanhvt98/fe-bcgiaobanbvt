import { useState } from "react";

// material-ui
import {
  Button,
  Divider,
  CardContent,
  Modal,
  Stack,
  Autocomplete,
  Box,
  CardHeader,
  Chip,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useOutletContext } from "react-router";
import countries from "../../data/countries";
import * as Yup from "yup";
import { Formik } from "formik";
// project-imports
import MainCard from "../../components/MainCard";
import { Add } from "iconsax-react";
// ==============================|| MODAL - BASIC ||============================== //

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

function useInputRef() {
  return useOutletContext();
}

// ==============================|| USER PROFILE - PERSONAL ||============================== //

export default function DaoTao_ModalThemCanBo({ isOpen, isClose }) {
  const handleChangeDay = (event, date, setFieldValue) => {
    setFieldValue(
      "dob",
      new Date(date.setDate(parseInt(event.target.value, 10)))
    );
  };

  const handleChangeMonth = (event, date, setFieldValue) => {
    setFieldValue(
      "dob",
      new Date(date.setMonth(parseInt(event.target.value, 10)))
    );
  };

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  const inputRef = useInputRef();
  return (
    <Modal
      open={isOpen}
      onClose={isClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <MainCard title="Thêm cán bộ" modal darkTitle content={false}>
        <Formik
          initialValues={{
            firstname: "Stebin",
            lastname: "Ben",
            email: "stebin.ben@gmail.com",
            dob: new Date("03-10-1993"),
            countryCode: "+91",
            contact: 9652364852,
            
            
            country: "US",
            
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            firstname: Yup.string()
              .max(255)
              .required("First Name is required."),
            lastname: Yup.string().max(255).required("Last Name is required."),
            email: Yup.string()
              .email("Invalid email address.")
              .max(255)
              .required("Email is required."),
            dob: Yup.date()
              .max(maxDate, "Age should be 18+ years.")
              .required("Date of birth is requird."),
            contact: Yup.number()
              .test(
                "len",
                "Contact should be exactly 10 digit",
                (val) => val?.toString().length === 10
              )
              .required("Phone number is required"),
            designation: Yup.string().required("Designation is required"),
            country: Yup.string().required("Country is required"),
            
          })}
          onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
            try {
              // dispatch(
              //   openSnackbar({
              //     open: true,
              //     message: "Personal profile updated successfully.",
              //     variant: "alert",
              //     alert: {
              //       color: "success",
              //     },
              //     close: false,
              //   })
              // );
              console.log("a");
              setStatus({ success: false });
              setSubmitting(false);
            } catch (err) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            touched,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <CardContent>
                <Box sx={{ p: 2.5 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="personal-first-name">
                          First Name
                        </InputLabel>
                        <TextField
                          fullWidth
                          id="personal-first-name"
                          value={values.firstname}
                          name="firstname"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="First Name"
                          autoFocus
                          inputRef={inputRef}
                        />
                        {touched.firstname && errors.firstname && (
                          <FormHelperText error id="personal-first-name-helper">
                            {errors.firstname}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="personal-last-name">
                          Last Name
                        </InputLabel>
                        <TextField
                          fullWidth
                          id="personal-last-name"
                          value={values.lastname}
                          name="lastname"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Last Name"
                        />
                        {touched.lastname && errors.lastname && (
                          <FormHelperText error id="personal-last-name-helper">
                            {errors.lastname}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="personal-email">
                          Email Address
                        </InputLabel>
                        <TextField
                          type="email"
                          fullWidth
                          value={values.email}
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          id="personal-email"
                          placeholder="Email Address"
                        />
                        {touched.email && errors.email && (
                          <FormHelperText error id="personal-email-helper">
                            {errors.email}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="personal-date">
                          Date of Birth (+18)
                        </InputLabel>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={2}
                        >
                          <Select
                            fullWidth
                            value={values.dob.getMonth().toString()}
                            name="dob-month"
                            onChange={(e) =>
                              handleChangeMonth(e, values.dob, setFieldValue)
                            }
                          >
                            <MenuItem value="0">January</MenuItem>
                            <MenuItem value="1">February</MenuItem>
                            <MenuItem value="2">March</MenuItem>
                            <MenuItem value="3">April</MenuItem>
                            <MenuItem value="4">May</MenuItem>
                            <MenuItem value="5">June</MenuItem>
                            <MenuItem value="6">July</MenuItem>
                            <MenuItem value="7">August</MenuItem>
                            <MenuItem value="8">September</MenuItem>
                            <MenuItem value="9">October</MenuItem>
                            <MenuItem value="10">November</MenuItem>
                            <MenuItem value="11">December</MenuItem>
                          </Select>
                          <Select
                            fullWidth
                            value={values.dob.getDate().toString()}
                            name="dob-date"
                            onBlur={handleBlur}
                            onChange={(e) =>
                              handleChangeDay(e, values.dob, setFieldValue)
                            }
                            MenuProps={MenuProps}
                          >
                            {[
                              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                              16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
                              28, 29, 30, 31,
                            ].map((i) => (
                              <MenuItem
                                key={i}
                                value={i}
                                disabled={
                                  (values.dob.getMonth() === 1 &&
                                    i >
                                      (values.dob.getFullYear() % 4 === 0
                                        ? 29
                                        : 28)) ||
                                  (values.dob.getMonth() % 2 !== 0 &&
                                    values.dob.getMonth() < 7 &&
                                    i > 30) ||
                                  (values.dob.getMonth() % 2 === 0 &&
                                    values.dob.getMonth() > 7 &&
                                    i > 30)
                                }
                              >
                                {i}
                              </MenuItem>
                            ))}
                          </Select>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              views={["year"]}
                              value={values.dob}
                              maxDate={maxDate}
                              onChange={(newValue) => {
                                setFieldValue("dob", newValue);
                              }}
                              sx={{ width: 1 }}
                            />
                          </LocalizationProvider>
                        </Stack>
                        {touched.dob && errors.dob && (
                          <FormHelperText error id="personal-dob-helper">
                            {errors.dob}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="personal-phone">
                          Phone Number
                        </InputLabel>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={2}
                        >
                          <Select
                            value={values.countryCode}
                            name="countryCode"
                            onBlur={handleBlur}
                            onChange={handleChange}
                          >
                            <MenuItem value="+91">+91</MenuItem>
                            <MenuItem value="1-671">1-671</MenuItem>
                            <MenuItem value="+36">+36</MenuItem>
                            <MenuItem value="(225)">(255)</MenuItem>
                            <MenuItem value="+39">+39</MenuItem>
                            <MenuItem value="1-876">1-876</MenuItem>
                            <MenuItem value="+7">+7</MenuItem>
                            <MenuItem value="(254)">(254)</MenuItem>
                            <MenuItem value="(373)">(373)</MenuItem>
                            <MenuItem value="1-664">1-664</MenuItem>
                            <MenuItem value="+95">+95</MenuItem>
                            <MenuItem value="(264)">(264)</MenuItem>
                          </Select>
                          <TextField
                            fullWidth
                            id="personal-contact"
                            value={values.contact}
                            name="contact"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="Contact Number"
                          />
                        </Stack>
                        {touched.contact && errors.contact && (
                          <FormHelperText error id="personal-contact-helper">
                            {errors.contact}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="personal-designation">
                          Designation
                        </InputLabel>
                        <TextField
                          fullWidth
                          id="personal-designation"
                          value={values.designation}
                          name="designation"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Designation"
                        />
                        {touched.designation && errors.designation && (
                          <FormHelperText
                            error
                            id="personal-designation-helper"
                          >
                            {errors.designation}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
                <CardHeader title="Address" />
                <Divider />
                <Box sx={{ p: 2.5 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="personal-addrees1">
                          Address 01
                        </InputLabel>
                        <TextField
                          multiline
                          rows={3}
                          fullWidth
                          id="personal-addrees1"
                          value={values.address}
                          name="address"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Address 01"
                        />
                        {touched.address && errors.address && (
                          <FormHelperText error id="personal-address-helper">
                            {errors.address}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="personal-addrees2">
                          Address 02
                        </InputLabel>
                        <TextField
                          multiline
                          rows={3}
                          fullWidth
                          id="personal-addrees2"
                          value={values.address1}
                          name="address1"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Address 02"
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="personal-country">
                          Country
                        </InputLabel>
                        <Autocomplete
                          id="personal-country"
                          fullWidth
                          value={
                            countries.filter(
                              (item) => item.code === values?.country
                            )[0]
                          }
                          onBlur={handleBlur}
                          onChange={(event, newValue) => {
                            setFieldValue(
                              "country",
                              newValue === null ? "" : newValue.code
                            );
                          }}
                          options={countries}
                          autoHighlight
                          isOptionEqualToValue={(option, value) =>
                            option.code === value?.code
                          }
                          getOptionLabel={(option) => option.label}
                          renderOption={(props, option) => (
                            <Box
                              component="li"
                              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                              {...props}
                            >
                              {option.code && (
                                <img
                                  loading="lazy"
                                  width="20"
                                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                  alt=""
                                />
                              )}
                              {option.label}
                              {option.code &&
                                `(${option.code}) ${option.phone}`}
                            </Box>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Choose a country"
                              name="country"
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: "new-password", // disable autocomplete and autofill
                              }}
                            />
                          )}
                        />
                        {touched.country && errors.country && (
                          <FormHelperText error id="personal-country-helper">
                            {errors.country}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="personal-state">State</InputLabel>
                        <TextField
                          fullWidth
                          id="personal-state"
                          value={values.state}
                          name="state"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="State"
                        />
                        {touched.state && errors.state && (
                          <FormHelperText error id="personal-state-helper">
                            {errors.state}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
              <Stack
                direction="row"
                spacing={1}
                justifyContent="flex-end"
                sx={{ px: 2.5, py: 2 }}
              >
                <Button
                  disabled={isSubmitting || Object.keys(errors).length !== 0}
                  type="submit"
                  variant="contained"
                >
                  Thêm
                </Button>
                <Button variant="contained" color="error" onClick={isClose}>
                  Hủy
                </Button>
              </Stack>
            </form>
          )}
        </Formik>

        {/* <Divider />
        <Stack
          direction="row"
          spacing={1}
          justifyContent="flex-end"
          sx={{ px: 2.5, py: 2 }}
        >
          <Button variant="contained" size="small">
            Thêm
          </Button>
          <Button variant="contained" size="small" onClick={isClose}>
            Hủy
          </Button>
        </Stack> */}
      </MainCard>
    </Modal>
  );
}
