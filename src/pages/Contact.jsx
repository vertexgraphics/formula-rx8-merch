import { useState } from "react";
import { supabase } from "../lib/supabase";
import PageLayout from "../components/PageLayout";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.functions.invoke(
      "contact-form-handler",
      {
        body: formData,
      }
    );

    if (error) {
      setStatus("Failed to send enquiry.");
      return;
    }

    setStatus("Thank you for your enquiry. We'll get back to you shortly.");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <PageLayout hero={<div className="auth-hero" />}>
      <div className="auth-card">
        <h2>Contact Us</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Subject"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            required
          />

          <textarea
            placeholder="Message"
            rows="6"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
          />

          <button type="submit">Send Enquiry</button>
        </form>

        {status && <p>{status}</p>}
      </div>
    </PageLayout>
  );
}

export default Contact;