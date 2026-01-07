"use client";

import { 
  useState,
  useEffect
} from "react";

import {
  useAuth
} from "@clerk/nextjs";

import { 
  Autocomplete, 
  TextField, 
  Box, 
  Container, 
  Paper, 
  Typography, 
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormHelperText
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import ProfileHeader from "../profile/components/ProfileHeader";
import GradientDivider from "../profile/components/GradientDivider";

import universitiesList from "./universitiesList";
import majorsList from "./majorsList";
import countriesList from "./countriesList";

// TODO: redirect application status page to here

const Application = () => {
  const [resume, setResume] = useState(null) //resume file
  const [resumeName, setResumeName] = useState(null) //resume file name
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phone: "",
    school: "",
    schoolOther: "",
    major: "",
    levelOfStudy: "",
    country: "",
    gender: "",
    race: "",
    numHackathons: "",
    socials: {
      linkedin: "",
      github: "",
      website: "",
      devpost: "",
      other: ""
    },
    codeOfConduct: false,
    privacyPolicy: false,
    newsletter: false,
    eighteen: false
  })
  const { firstName, lastName, age, phone, school, schoolOther, major, levelOfStudy, country,
    gender, race, numHackathons, socials, codeOfConduct, privacyPolicy, newsletter, eighteen } = formData
  console.log(formData)

  // TODO: get email from clerk

  // get userId
  const { userId } = useAuth();
  console.log(userId);

  // get existing application
  useEffect(() => {
    if (!userId) return;
    fetch(`/api/getApplication?userId=${encodeURIComponent(userId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    // if result is successful && result is truthy then set result
    .then(result => {
      if (result.success && result && result.data) {
        const data = result.data;
        // If school is not in the universities list, treat it as "Other"
        if (data.school && !universitiesList.includes(data.school)) {
          data.schoolOther = data.school;
          data.school = "Other";
        }
        // Ensure schoolOther exists
        if (!data.schoolOther) {
          data.schoolOther = "";
        }
        // Handle socials - convert array or object to the expected structure
        if (Array.isArray(data.socials)) {
          // If it's an array, convert to object structure
          data.socials = {
            linkedin: "",
            github: "",
            website: "",
            devpost: "",
            other: ""
          };
        } else if (typeof data.socials === 'object' && data.socials !== null) {
          // If it's already an object, ensure all fields exist
          data.socials = {
            linkedin: data.socials.linkedin || "",
            github: data.socials.github || "",
            website: data.socials.website || "",
            devpost: data.socials.devpost || "",
            other: data.socials.other || ""
          };
        } else {
          // If it's a string or doesn't exist, initialize as empty object
          data.socials = {
            linkedin: "",
            github: "",
            website: "",
            devpost: "",
            other: ""
          };
        }
        // Convert numeric fields to strings for input fields
        if (typeof data.age === 'number') {
          data.age = String(data.age);
        }
        if (typeof data.numHackathons === 'number') {
          data.numHackathons = String(data.numHackathons);
        }
        setFormData(data);
      }
    }) 
  }, [userId]);


  const makeHandleChange = key => event => {
    const { type, checked, value } = event.target;
    // handle checkboxes
    if (type === "checkbox") {
      setFormData({ ...formData, [key]: checked });
    }
    // handle non-checkboxes (including Material-UI Select which uses event.target.value)
    else {
      setFormData({ ...formData, [key]: value });
      // Clear error when user starts typing
      if (errors[key]) {
        setErrors({ ...errors, [key]: "" });
      }
    }
  };

  const handleSchoolChange = (event, newValue) => {
    setFormData({ ...formData, school: newValue || "" });
    // Clear error when user selects a value
    if (errors.school) {
      setErrors({ ...errors, school: "" });
    }
  };

  const handleMajorChange = (event, newValue) => {
    setFormData({ ...formData, major: newValue || "" });
    // Clear error when user selects a value
    if (errors.major) {
      setErrors({ ...errors, major: "" });
    }
  };

  const handleSocialsChange = (platform) => (event) => {
    setFormData({
      ...formData,
      socials: {
        ...socials,
        [platform]: event.target.value
      }
    });
  };

  const validatePhone = (phoneNumber) => {
    // Remove all non-digit characters for validation
    const cleaned = phoneNumber.replace(/\D/g, '');
    // Check if it's a valid phone format (10 digits for US, or international format)
    // Allow formats like: (123) 456-7890, 123-456-7890, 1234567890, +1 1234567890, etc.
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    return phoneRegex.test(phoneNumber) && cleaned.length >= 10;
  };

  const validateForm = () => {
    const newErrors = {};

    // Age validation
    const ageNum = parseInt(age);
    if (!age || isNaN(ageNum) || ageNum < 18) {
      newErrors.age = "Age must be a number and at least 18";
    }

    // Phone validation
    if (!phone || !validatePhone(phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // School validation - must be from the list or "Other"
    if (!school) {
      newErrors.school = "Please select a school";
    } else if (!universitiesList.includes(school)) {
      newErrors.school = "Please select a school from the list";
    }
    // School validation - if "Other" is selected, schoolOther is required
    if (school === "Other" && !schoolOther.trim()) {
      newErrors.schoolOther = "Please enter the school name";
    }

    // Major validation - must be from the list
    if (!major) {
      newErrors.major = "Please select a major";
    } else if (!majorsList.includes(major)) {
      newErrors.major = "Please select a major from the list";
    }

    // NumHackathons validation
    const numHackathonsNum = parseInt(numHackathons);
    if (numHackathons && (isNaN(numHackathonsNum) || numHackathonsNum < 0)) {
      newErrors.numHackathons = "Number of hackathons must be a valid number";
    }

    // Required checkboxes
    if (!codeOfConduct) {
      newErrors.codeOfConduct = "You must agree to the code of conduct";
    }
    if (!privacyPolicy) {
      newErrors.privacyPolicy = "You must agree to the privacy policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = event => {
    setResume(event.target.files[0]);
    setResumeName(event.target.files[0].name)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      alert("Please fix the errors in the form before submitting.");
      return;
    }

    const resumeData = new FormData()
    resumeData.append("userId", userId)
    resumeData.append("userName", `${formData.firstName} ${formData.lastName}`)
    resumeData.append("resume", resume)

    const uploadResumeResponse = await fetch('/api/uploadResume', {
      method: 'POST',
      body: resumeData,
    });

    if (!uploadResumeResponse.ok) throw new Error("Uploading resume failed!")

    // Use schoolOther if "Other" is selected, otherwise use school
    const finalSchool = school === "Other" ? schoolOther : school;
    const finalFormData = { ...formData, school: finalSchool };

    const saveApplicationResponse = await fetch("/api/saveApplication", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, ...finalFormData }),
    })

    if (!saveApplicationResponse.ok) throw new Error("Saving application failed!")
  }

  const levelOfStudyOptions = ["freshman", "sophomore", "junior", "senior", "master", "others"];
  const genderOptions = ["male", "female", "other", "prefer not to say"];
  const raceOptions = [
    "American Indian or Alaska Native",
    "Asian",
    "Black or African American",
    "Hispanic or Latino",
    "Native Hawaiian or Other Pacific Islander",
    "White",
    "Middle Eastern or North African",
    "Multiracial / Two or more races",
    "Prefer not to say"
  ];

  return (
    <Box
      className="profile-page"
      sx={{ minHeight: "100dvh", pb: { xs: 3, sm: 6 } }}
    >
      <ProfileHeader />
      <GradientDivider />

      <Container maxWidth="md" sx={{ mt: { xs: 2, sm: 4 }, mb: 0 }}>
        <Paper className="hackusf-card" sx={{ borderRadius: 16, p: { xs: 3, sm: 4 }, mb: 4 }}>
          <Typography
            align="center"
            sx={{ mb: 3, fontSize: "1.5rem", fontWeight: 700 }}
          >
            Application Form
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 3 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={firstName}
                  onChange={makeHandleChange("firstName")}
                  required
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  value={lastName}
                  onChange={makeHandleChange("lastName")}
                  required
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 3 }}>
                <TextField
                  fullWidth
                  label="Age"
                  type="number"
                  value={age}
                  onChange={makeHandleChange("age")}
                  inputProps={{ min: 18 }}
                  error={!!errors.age}
                  helperText={errors.age}
                  required
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
                <TextField
                  fullWidth
                  label="Phone"
                  type="tel"
                  value={phone}
                  onChange={makeHandleChange("phone")}
                  placeholder="(123) 456-7890"
                  error={!!errors.phone}
                  helperText={errors.phone}
                  required
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Box>

              <Box>
                <Autocomplete
                  freeSolo={false}
                  options={universitiesList}
                  value={school || null}
                  onChange={handleSchoolChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="School"
                      placeholder="Type to search for a school"
                      error={!!errors.school}
                      helperText={errors.school}
                      required
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    />
                  )}
                  isOptionEqualToValue={(option, value) => option === value}
                />
                {school === "Other" && (
                  <TextField
                    fullWidth
                    label="School Name (Other)"
                    value={schoolOther}
                    onChange={makeHandleChange("schoolOther")}
                    error={!!errors.schoolOther}
                    helperText={errors.schoolOther}
                    required
                    sx={{ mt: 2, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                )}
              </Box>

              <Autocomplete
                freeSolo={false}
                options={majorsList}
                value={major || null}
                onChange={handleMajorChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Major"
                    placeholder="Type to search for a major"
                    error={!!errors.major}
                    helperText={errors.major}
                    required
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                )}
                isOptionEqualToValue={(option, value) => option === value}
              />

              <FormControl fullWidth required sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}>
                <InputLabel>Level of Study</InputLabel>
                <Select
                  value={levelOfStudy}
                  onChange={makeHandleChange("levelOfStudy")}
                  label="Level of Study"
                >
                  {levelOfStudyOptions.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth required sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}>
                <InputLabel>Country</InputLabel>
                <Select
                  value={country}
                  onChange={makeHandleChange("country")}
                  label="Country"
                >
                  {countriesList.map((countryOption) => (
                    <MenuItem key={countryOption} value={countryOption}>
                      {countryOption}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth required sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={gender}
                  onChange={makeHandleChange("gender")}
                  label="Gender"
                >
                  {genderOptions.map((genderOption) => (
                    <MenuItem key={genderOption} value={genderOption}>
                      {genderOption.charAt(0).toUpperCase() + genderOption.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}>
                <InputLabel>Race</InputLabel>
                <Select
                  value={race}
                  onChange={makeHandleChange("race")}
                  label="Race"
                >
                  {raceOptions.map((raceOption) => (
                    <MenuItem key={raceOption} value={raceOption}>
                      {raceOption}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Number of Hackathons"
                type="number"
                value={numHackathons}
                onChange={makeHandleChange("numHackathons")}
                inputProps={{ min: 0 }}
                error={!!errors.numHackathons}
                helperText={errors.numHackathons}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />

              <Box>
                <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                  Social Links (optional)
                </Typography>
                <Box sx={{ 
                  display: "grid", 
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 2 
                }}>
                  <TextField
                    fullWidth
                    label="LinkedIn"
                    value={socials.linkedin || ""}
                    onChange={handleSocialsChange("linkedin")}
                    placeholder="https://linkedin.com/in/yourprofile"
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                  <TextField
                    fullWidth
                    label="GitHub"
                    value={socials.github || ""}
                    onChange={handleSocialsChange("github")}
                    placeholder="https://github.com/yourusername"
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                  <TextField
                    fullWidth
                    label="Personal Website"
                    value={socials.website || ""}
                    onChange={handleSocialsChange("website")}
                    placeholder="https://yourwebsite.com"
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                  <TextField
                    fullWidth
                    label="Devpost"
                    value={socials.devpost || ""}
                    onChange={handleSocialsChange("devpost")}
                    placeholder="https://devpost.com/yourusername"
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  />
                  <TextField
                    fullWidth
                    label="Other"
                    value={socials.other || ""}
                    onChange={handleSocialsChange("other")}
                    placeholder="Any other social links"
                    sx={{ 
                      gridColumn: { xs: "1", sm: "1 / -1" },
                      "& .MuiOutlinedInput-root": { borderRadius: 2 } 
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <FormControl error={!!errors.codeOfConduct} required>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={codeOfConduct}
                        onChange={makeHandleChange("codeOfConduct")}
                      />
                    }
                    label="I agree to the MLH Code of Conduct (required)"
                  />
                  {errors.codeOfConduct && (
                    <FormHelperText>{errors.codeOfConduct}</FormHelperText>
                  )}
                </FormControl>

                <FormControl error={!!errors.privacyPolicy} required>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={privacyPolicy}
                        onChange={makeHandleChange("privacyPolicy")}
                      />
                    }
                    label="I agree to the MLH Privacy Policy (required)"
                  />
                  {errors.privacyPolicy && (
                    <FormHelperText>{errors.privacyPolicy}</FormHelperText>
                  )}
                </FormControl>

                <FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={newsletter}
                        onChange={makeHandleChange("newsletter")}
                      />
                    }
                    label="I authorize MLH to send me an email where I can further opt into the MLH Hacker, Events, or Organizer Newsletters (optional)"
                  />
                </FormControl>
              </Box>

              <Box>
                <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                  Resume
                </Typography>
                <Box
                  sx={{
                    border: "2px dashed",
                    borderColor: resume ? "#4A7BA7" : "#ccc",
                    borderRadius: 2,
                    p: 3,
                    textAlign: "center",
                    bgcolor: resume ? "rgba(74, 123, 167, 0.05)" : "transparent",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "#4A7BA7",
                      bgcolor: "rgba(74, 123, 167, 0.05)",
                    },
                  }}
                >
                  <input
                    type="file"
                    accept=".pdf, .docx"
                    onChange={handleFileChange}
                    id="resume-upload"
                    style={{ display: "none" }}
                  />
                  <label htmlFor="resume-upload">
                    <Button
                      component="span"
                      variant="outlined"
                      startIcon={<UploadFileIcon />}
                      sx={{
                        mb: resume ? 2 : 0,
                        borderColor: "#4A7BA7",
                        color: "#4A7BA7",
                        border: "2px solid",
                        borderRadius: 12,
                        px: 3,
                        py: 1,
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": {
                          borderColor: "#3E6B94",
                          bgcolor: "rgba(74, 123, 167, 0.1)",
                        },
                      }}
                    >
                      Choose File
                    </Button>
                  </label>
                  {resume && (
                    <Box sx={{ mt: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#4A7BA7",
                          fontWeight: 500,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 1,
                        }}
                      >
                        <UploadFileIcon sx={{ fontSize: 20 }} />
                        {resumeName || resume.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "#666", mt: 0.5, display: "block" }}
                      >
                        PDF or DOCX files only
                      </Typography>
                    </Box>
                  )}
                  {!resume && (
                    <Typography
                      variant="body2"
                      sx={{ color: "#666", mt: 2 }}
                    >
                      PDF or DOCX files only
                    </Typography>
                  )}
                </Box>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "#4A7BA7",
                  border: "2px solid var(--ink)",
                  borderRadius: 12,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  transition: "background-color 120ms ease",
                  "&:hover": {
                    bgcolor: "#3E6B94",
                  },
                }}
              >
                Submit Application
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  )
}
export default Application