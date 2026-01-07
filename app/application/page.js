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
    resume: "",
    socials: {},
    codeOfConduct: false,
    privacyPolicy: false,
    newsletter: false,
    eighteen: false
  })
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const resumeData = new FormData()
    // resumeData.append("userId", userId)
    // resumeData.append("userName", `${formData.firstName} ${formData.lastName}`)
    // resumeData.append("resume", resume)

    // const uploadResumeResponse = await fetch('/api/uploadResume', {
    //   method: 'POST',
    //   body: resumeData,
    // });

    // if (!uploadResumeResponse.ok) throw new Error("Uploading resume failed!")

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
      <button
        type="submit"
      >
      submit </button>
    </form>
  )
}

export default Application