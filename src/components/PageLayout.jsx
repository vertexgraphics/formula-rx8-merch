import Navbar from "./Navbar";

function PageLayout({ hero, children }) {
  return (
    <div className="page">
      {hero}

      <Navbar />

      {children}
    </div>
  );
}

export default PageLayout;