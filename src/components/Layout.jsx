import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header style={{ padding: '10px', backgroundColor: '#1E1E1E' }}>
        <nav>
          <Link to="/login">Login</Link> |{" "}
          <Link to="/register">Register</Link> |{" "}
          <Link to="/seat-selection">Seat Selection</Link>
        </nav>
      </header>
      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
