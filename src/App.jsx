import { Route, BrowserRouter, Routes } from "react-router-dom";
import useGlobalContext from "./hooks/useGlobalContext";
import { Navbar } from "./components/Utils";
import { Home, Profile, UpdateProfile,About } from "./components/main";
import {
  Login,
  Logout,
  Register,
  RequireAuth,
} from "./components/Authentication";

function App() {
  const { mode, access_token: token } = useGlobalContext();

  return (
    <main
      className={`font-vietnam bg-bkg text-content min-h-screen`}
      data-theme={mode}
    >
      <section className="container mx-auto">
        <BrowserRouter>
          {token && <Navbar />}
          <Routes>
            {/* public routes */}
            <Route exact path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* private routes */}
            <Route element={<RequireAuth />}>
              <Route exact path="/" element={<Home />} />
              <Route path="/logout" element={<Logout />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route path="/update/:id" element={<UpdateProfile />} />
              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </section>
    </main>
  );
}

export default App;
