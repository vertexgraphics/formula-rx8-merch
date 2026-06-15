import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import PageLayout from "../components/PageLayout";

function AdminLogoApprovals() {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [pendingLogos, setPendingLogos] = useState([]);
  const [approvedLogos, setApprovedLogos] = useState([]);
  const [message, setMessage] = useState("");

  const fetchLogos = async () => {
    const { data, error } = await supabase
      .from("approved_logos")
      .select("*")
      .in("status", ["pending", "approved"])
      .order("submitted_at", { ascending: false });

    if (error) {
      setMessage(error.message);
      return;
    }

    setPendingLogos((data || []).filter((logo) => logo.status === "pending"));
    setApprovedLogos((data || []).filter((logo) => logo.status === "approved"));
  };

  useEffect(() => {
    const checkAdminAndLoad = async () => {
      if (!user) return;

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error) {
        setMessage(error.message);
        return;
      }

      if (profile?.role === "admin") {
        setIsAdmin(true);
        fetchLogos();
      }
    };

    checkAdminAndLoad();
  }, [user]);

  const getSignedUrl = async (filePath) => {
    const { data, error } = await supabase.storage
      .from("logos")
      .createSignedUrl(filePath, 60);

    if (error) {
      setMessage(error.message);
      return null;
    }

    return data.signedUrl;
  };

  const handleView = async (logo) => {
    const signedUrl = await getSignedUrl(logo.logo_file_path);

    if (signedUrl) {
      window.open(signedUrl, "_blank");
    }
  };

  const handleDownload = async (logo) => {
    const { data, error } = await supabase.storage
      .from("logos")
      .download(logo.logo_file_path);

    if (error) {
      setMessage(error.message);
      return;
    }

    const blobUrl = URL.createObjectURL(data);
    const link = document.createElement("a");

    link.href = blobUrl;
    link.download = logo.logo_name;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(blobUrl);
  };

  const updateLogoStatus = async (logoId, status) => {
    setMessage("");

    const updateData = {
      status,
      approved_by: user.id,
    };

    if (status === "approved") {
      updateData.approved_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from("approved_logos")
      .update(updateData)
      .eq("id", logoId);

    if (error) {
      setMessage(error.message);
      return;
    }

    fetchLogos();
  };

  const LogoCard = ({ logo, showApprovalButtons }) => (
    <div className="logo-list-item" key={logo.id}>
      <h3>{logo.logo_name}</h3>

      <p>
        <strong>Customer ID:</strong> {logo.customer_id}
      </p>

      {logo.submitted_at && (
        <p>
          <strong>Submitted:</strong>{" "}
          {new Date(logo.submitted_at).toLocaleString()}
        </p>
      )}

      {logo.approved_at && (
        <p>
          <strong>Approved:</strong>{" "}
          {new Date(logo.approved_at).toLocaleString()}
        </p>
      )}

      {logo.notes && (
        <p>
          <strong>Notes:</strong> {logo.notes}
        </p>
      )}

      <div className="admin-actions">
        <button onClick={() => handleView(logo)}>View</button>
        <button onClick={() => handleDownload(logo)}>Download</button>

        {showApprovalButtons && (
          <>
            <button
              className="approve-button"
              onClick={() => updateLogoStatus(logo.id, "approved")}
            >
              Approve
            </button>

            <button
              className="reject-button"
              onClick={() => updateLogoStatus(logo.id, "rejected")}
            >
              Reject
            </button>
          </>
        )}
      </div>
    </div>
  );

  if (loading) {
    return <div className="page">Loading...</div>;
  }

  return (
    <PageLayout hero={<div className="auth-hero" />}>
      <div className="account-wrap">
        <div className="auth-card account-card">
          <h2>Logo Approvals</h2>

          {!user && <p>Please login to access admin approvals.</p>}

          {user && !isAdmin && (
            <p>You do not have permission to view this page.</p>
          )}

          {message && <p className="auth-message">{message}</p>}

          {user && isAdmin && (
            <div className="admin-logo-panels">
              <div className="admin-logo-panel">
                <h3>Waiting on Approval ({pendingLogos.length})</h3>

                {pendingLogos.length === 0 ? (
                  <p>No pending logos to review.</p>
                ) : (
                  <div className="logo-list">
                    {pendingLogos.map((logo) => (
                      <LogoCard
                        key={logo.id}
                        logo={logo}
                        showApprovalButtons={true}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="admin-logo-panel">
                <h3>Approved Logos ({approvedLogos.length})</h3>

                {approvedLogos.length === 0 ? (
                  <p>No approved logos yet.</p>
                ) : (
                  <div className="logo-list">
                    {approvedLogos.map((logo) => (
                      <LogoCard
                        key={logo.id}
                        logo={logo}
                        showApprovalButtons={false}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

export default AdminLogoApprovals;