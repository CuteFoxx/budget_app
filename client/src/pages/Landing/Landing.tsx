import { Button } from "@/components/ui/button";
import { Link } from "react-router";

function Landing() {
  return (
    <div className="app-container flex flex-col items-center justify-center gap-2 mt-4">
      <Link to="/login">
        <Button>Login</Button>
      </Link>
      <Link to="/registration">
        <Button>Register</Button>
      </Link>
    </div>
  );
}

export default Landing;
