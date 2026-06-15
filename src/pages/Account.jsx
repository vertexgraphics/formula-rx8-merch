import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import PageLayout from "../components/PageLayout";

function Account() {
  const { user, loading } = useAuth();
  const [logos, setLogos] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLogos = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("approved_logos")
        .select("*")
        .order("submitted_at", { ascending: false });

      if (error) {
        setMessage(error.message);
        return;
      }

      setLogos(data || []);
    };

    fetchLogos();
  }, [user]);

  const handleDeleteLogo = async (logo) => {
  const confirmDelete = window.confirm(
    `Delete "${logo.logo_name}"? This cannot be undone.`
  );

  if (!confirmDelete) return;

  setMessage("");

  const { error: storageError } = await supabase.storage
    .from("logos")
    .remove([logo.logo_file_path]);

  if (storageError) {
    setMessage(storageError.message);
    return;
  }

  const { error: dbError } = await supabase
    .from("approved_logos")
    .delete()
    .eq("id", logo.id);

  if (dbError) {
    setMessage(dbError.message);
    return;
  }

  setLogos((current) =>
    current.filter((item) => item.id !== logo.id)
  );
};

  if (loading) {
    return <div className="page">Loading...</div>;
  }

  return (
    <PageLayout hero={<div className="auth-hero" />}>
      <div className="account-wrap">
        <div className="auth-card account-card">
          <h2>My Account</h2>

          {user ? (
            <>
              <p>
                <strong>Email:</strong> {user.email}
              </p>

              <Link to="/stickers/upload-logo" className="account-action">
                Submit New Logo
              </Link>
            </>
          ) : (
            <>
              <p>Please login to view your account.</p>
              <Link to="/login">Login</Link>
            </>
          )}
        </div>

        {user && (
          <div className="auth-card account-card">
            <h2>My Logo Submissions</h2>

            {message && <p className="auth-message">{message}</p>}

            {logos.length === 0 ? (
              <p>No logos submitted yet.</p>
            ) : (
              <div className="logo-list">
                {logos.map((logo) => (
                  <div className="logo-list-item" key={logo.id}>
                    <div>
                      <h3>{logo.logo_name}</h3>
                      <p>
                        Status:{" "}
                        <span className={`status-pill status-${logo.status}`}>
                          {logo.status}
                        </span>
                      </p>
                      <p>
                        Submitted:{" "}
                        {new Date(logo.submitted_at).toLocaleDateString()}
                      </p>
                      <button
  className="delete-logo-button"
  onClick={() => handleDeleteLogo(logo)}
>
  Delete Logo
</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
}

export default Account;