import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { useState } from "react";

const CmForm = () => {
  // const isNonMobile = useMediaQuery("(min-width:600px)");
  const [status] = useState("Open");

  const handleFormSubmit = (values) => {
    const formData = {
      ...values,
      date: new Date().toISOString(),
      status,
    };
    console.log(formData);
  };

  return (
    <Box m="20px">
      <Header title="CREATE EXPERIENCE" subtitle="Share Your Experience" />

      <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap="20px">
              {/* Experience Selection Heading */}
              <Typography variant="h6" fontWeight='bold' fontSize={20}>How was your experience?</Typography>
              <Box display="flex" flexWrap="wrap" gap="10px">
                {experienceOptions.map((option) => (
                  <Button key={option.value} variant={values.experience === option.value ? "contained" : "outlined"} color="primary" onClick={() => setFieldValue("experience", option.value)} sx={{ fontSize: "1.2rem" }}>
                    {option.label}
                  </Button>
                ))}
              </Box>

              {/* Experience Details */}
              <TextField fullWidth variant="filled" multiline rows={4} label="Details of your experience" InputLabelProps={{ style: { fontSize: "1.2rem" } }} name="experienceDetails" value={values.experienceDetails} onChange={handleChange} onBlur={handleBlur} error={!!touched.experienceDetails && !!errors.experienceDetails} helperText={touched.experienceDetails && errors.experienceDetails} />

              {/* Impact Selection Heading */}
              <Typography variant="h6" fontWeight='bold' fontSize={20}>Impact</Typography>
              <Box display="flex" flexWrap="wrap" gap="10px">
                {impactOptions.map((option) => (
                  <Button key={option.value} variant={values.impact === option.value ? "contained" : "outlined"} color="primary" onClick={() => setFieldValue("impact", option.value)} sx={{ fontSize: "1.2rem" }}>
                    {option.label}
                  </Button>
                ))}
              </Box>

              {/* Attachments */}
              <Box sx={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "5px" , width: "40%"}}>
                <input type="file" name="attachments" multiple  />
              </Box>

              {/* Submit Button */}
              <Box display="flex" justifyContent="flex-end">
                <Button type="submit" color="secondary" variant="contained" sx={{ padding: "10px", fontSize: "1.2rem" , fontWeight:'bold' }}>Submit Experience</Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const experienceOptions = [
  { value: "Extremely Happy", label: "😃 Extremely Happy" },
  { value: "Happy", label: "😊 Happy" },
  { value: "Frustrated", label: "😠 Frustrated" },
  { value: "Extremely Frustrated", label: "😡 Extremely Frustrated" },
];

const impactOptions = [
  { value: "Revenue Impact", label: "Revenue Impact" },
  { value: "Business Show Stopper", label: "Business Show Stopper" },
  { value: "Customer Experience", label: "Customer Experience" },
];

const checkoutSchema = yup.object().shape({
  experience: yup.string().required("Experience selection is required"),
  experienceDetails: yup.string().max(500, "Maximum 500 characters").required("Details are required"),
  impact: yup.string().required("Impact selection is required"),
});

const initialValues = {
  experience: "",
  experienceDetails: "",
  impact: "",
  attachments: [],
};

export default CmForm;
