"use client";

import { 
  useState,
  useEffect
} from "react";

import {
  useAuth
} from "@clerk/nextjs";

// TODO: redirect application status page to here

const Application = () => {
  const [resume, setResume] = useState(null) //resume file
  const [resumeName, setResumeName] = useState(null) //resume file name
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phone: "",
    school: "",
    major: "",
    levelOfStudy: "",
    country: "",
    gender: "",
    race: "",
    numHackathons: "",
    socials: {},
    codeOfConduct: false,
    privacyPolicy: false,
    newsletter: false,
    eighteen: false
  })
  const { firstName, lastName, age, phone, school, major, levelOfStudy, country,
    gender, race, numHackathons, socials, codeOfConduct, privacyPolicy, newsletter, eighteen } = formData
  console.log(formData)

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
    .then(result => result.success && result && setFormData(result.data)) 
  }, [userId]);


  // TODO: handle social media field
  const makeHandleChange = key => event => {
    const { type, checked } = event.target;
    // handle checkboxes
    if (type == "checkbox") setUser({ ...formData, [key]: checked })
    // handle non-checkboxes
    else setFormData({ ...formData, [key]: event.target.value});
  };

  const handleFileChange = event => {
    setResume(event.target.files[0]);
    setResumeName(event.target.files[0].name)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resumeData = new FormData()
    resumeData.append("userId", userId)
    resumeData.append("userName", `${formData.firstName} ${formData.lastName}`)
    resumeData.append("resume", resume)

    const uploadResumeResponse = await fetch('/api/uploadResume', {
      method: 'POST',
      body: resumeData,
    });

    if (!uploadResumeResponse.ok) throw new Error("Uploading resume failed!")

    const saveApplicationResponse = await fetch("/api/saveApplication", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, ...formData }),
    })

    if (!saveApplicationResponse.ok) throw new Error("Saving application failed!")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        content={firstName}
        onChange={makeHandleChange("firstName")}
      />
      <br></br>
      <input
        type="file"
        accept=".pdf, .docx"
        onChange={handleFileChange}
      />
      <br></br>
      <button
        type="submit"
      >
      submit </button>
    </form>
  )
}

export default Application