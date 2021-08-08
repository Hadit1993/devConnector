import { useState } from "react";

import { useAuthActions } from "../../redux/actions/authActions";
import { useSelector } from "react-redux";
import { GlobalState } from "../../redux/reducers";
import { AuthState } from "../../redux/reducers/authReducer";
import TextFieldGroup from "../common/TextFieldGroup";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { registerUser } = useAuthActions();

  const { signupError } = useSelector<GlobalState, AuthState>(
    (state) => state.auth
  );

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 className="display-4 text-center">Sign Up</h1>

      <p className="lead text-center">Create your DevConnector account</p>

      <form
        style={{ width: "100%", maxWidth: 500, marginTop: 30 }}
        onSubmit={async (e) => {
          e.preventDefault();
          const newUser = { name, email, password, confirmPassword };

          await registerUser(newUser);
        }}
      >
        <TextFieldGroup
          value={name}
          type="text"
          error={signupError.name}
          placeHolder="Name"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <TextFieldGroup
          value={email}
          style={{ marginTop: 10 }}
          type="email"
          error={signupError.email}
          placeHolder="Email Address"
          name="email"
          info=" This site uses Gravatar so if you want a profile image, use a Gravatar
          email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <TextFieldGroup
          value={password}
          style={{ marginTop: 10 }}
          type="password"
          error={signupError.password}
          placeHolder="Password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <TextFieldGroup
          value={confirmPassword}
          style={{ marginTop: 10 }}
          type="password"
          error={signupError.confirmPassword}
          placeHolder="Confirm Password"
          name="password2"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />

        <input
          style={{ width: "100%" }}
          type="submit"
          className="btn btn-info btn-block mt-1"
        />
      </form>
    </div>
  );
}
