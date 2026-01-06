"use client";

import { 
  useState,
  useEffect
} from "react";

import {
  useAuth
} from "@clerk/nextjs";

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

  return (
    <div>
      <input
        onChange={makeHandleChange("firstName")}
      />
    </div>
  )
}

export default Application