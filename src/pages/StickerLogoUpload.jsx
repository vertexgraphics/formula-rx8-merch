import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import PageLayout from "../components/PageLayout";

function StickerLogoUpload() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [logoName, setLogoName] = useState("");
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!user) {
      setMessage("Please login before submitting a logo.");
      return;
    }

    if (!logoName.trim()) {
      setMessage("Please enter a logo name.");
      return;
    }

    if (!file) {
      setMessage("Please choose a logo file.");
      return;
    }

    setUploading(true);

    const safeLogoName = logoName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}/${Date.now()}-${safeLogoName}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("logos")
      .upload(filePath, file);

    if (uploadError) {
      setUploading(false);
      setMessage(uploadError.message);
      return;
    }

    const { error: dbError } = await supabase.from("approved_logos").insert({
      customer_id: user.id,
      logo_name: logoName.trim(),
      logo_file_path: filePath,
      original_filename: file.name,
      mime_type: file.type,
      status: "pending",
      notes: notes.trim() || null,
    });

    if (dbError) {
      setUploading(false);
      setMessage(dbError.message);
      return;
    }

    try {
      await supabase.functions.invoke("notify-logo-handler", {
        body: {
          logoName: logoName.trim(),
          customerName: user?.user_metadata?.full_name || user?.email || "",
          customerEmail: user?.email || "",
        },
      });
    } catch (err) {
      console.error("Failed to send admin logo notification:", err);
    }

    setUploading(false);
    navigate("/account");
  };

  if (loading) {
    return <div className="page">Loading...</div>;
  }

  return (
    <PageLayout hero={<div className="auth-hero" />}>
      <div className="auth-card">
        <h2>Submit Logo for Approval</h2>

        {!user ? (
          <>
            <p>Please login before submitting a logo.</p>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <form onSubmit={handleUpload}>
            <label>Logo / Team Name</label>
            <input
              type="text"
              value={logoName}
              onChange={(e) => setLogoName(e.target.value)}
              placeholder="Example: Smith Racing"
              required
            />

            <label>Logo File</label>
            <input
              type="file"
              accept=".svg,.pdf,.png,.jpg,.jpeg,.webp,.ai,.eps"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />

            <label>Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any extra details about this logo or sticker use"
            />

            <button type="submit" disabled={uploading}>
              {uploading ? "Uploading..." : "Submit for Approval"}
            </button>
          </form>
        )}

        {message && <p className="auth-message">{message}</p>}
      </div>
    </PageLayout>
  );
}

export default StickerLogoUpload;