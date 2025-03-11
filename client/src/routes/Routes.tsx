import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import App from "../App";
import Error from "../pages/Error/Error.tsx";
import Landing from "@/pages/Landing/Landing.tsx";
import Registration from "@/pages/Registration/Registration.tsx";
import Login from "@/pages/Login/Login.tsx";
import Overview from "@/pages/Overview/Overview.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route index path="/" element={<Landing />}></Route>
        <Route path="registration" element={<Registration />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="/app" element={<App />} errorElement={<Error />}>
        <Route index element={<Overview />} />
      </Route>
    </>
  )
);

export default router;
