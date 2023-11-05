import { useState, useRef } from "react";
import "./App.css";
import ReCAPTCHA from "react-google-recaptcha";

function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const submitForm = async (event) => {
    event.preventDefault();
    const captchaValue = refcaptcha.current.getValue();
    if (!captchaValue) {
      alert("Please verify the reCAPTCHA!");
    }
    else {
      const response = await fetch("http://localhost:8000/verify", {
        method: "POST",
        body: JSON.stringify({captchaValue}),
        headers: {
          "content-type": "application/json",
        }
      })
      const data = await response.json();
      if (data.success) {
        alert("Form submission successful!")
      }
      else {
        alert("reCAPTCHA validation failed!")
      }
      
    }
  }

  const refcaptcha = useRef();
  return (
    <div>
      <h1>Sign up for Newsletter</h1>
      <form onSubmit= {submitForm}>
        <input
          type="name"
          placeholder="Enter your mailId"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="email"
          placeholder="Enter your mailId"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <button type="submit">Sign Up</button>
        <ReCAPTCHA ref={refcaptcha} sitekey={process.env.REACT_APP_SITE_KEY} />
      </form>
    </div>
  );
}

export default App;
