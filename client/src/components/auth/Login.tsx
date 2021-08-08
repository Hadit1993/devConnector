import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuthActions } from "../../redux/actions/authActions";
import { GlobalState } from "../../redux/reducers";
import { AuthState } from "../../redux/reducers/authReducer";
import TextFieldGroup from "../common/TextFieldGroup";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser } = useAuthActions();

  const { loginError } = useSelector<GlobalState, AuthState>(
    (state) => state.auth
  );

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 className="display-4 text-center">Log In</h1>
      <p className="lead text-center">Sign in to your DevConnector account</p>
      <form
        style={{ maxWidth: 500, width: "100%" }}
        onSubmit={(e) => {
          e.preventDefault();
          const newUser = { email, password };
          loginUser(newUser);
        }}
      >
        <TextFieldGroup
          value={email}
          style={{ marginTop: 30 }}
          type="email"
          error={loginError.email}
          placeHolder="Email Address"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <TextFieldGroup
          value={password}
          style={{ marginTop: 10 }}
          type="password"
          error={loginError.password}
          placeHolder="Password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <input
          style={{ width: "100%" }}
          type="submit"
          className="btn btn-info btn-block mt-4"
        />
      </form>
    </div>
  );
}
