import CustomLink from "../UI/Link/Link";
import { TextField } from "@mui/material";
import styles from "./form.module.scss";
import { FC, useState } from "react";
import Button from "../UI/Button/Button";

interface FormProps {
  main: string;
  secondary: string;
  handleClick: (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  ) => void;
  to: string;
}

const Form: FC<FormProps> = ({ main, secondary, handleClick, to }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleButtonClick = () => {
    handleClick(email, password, firstName, lastName);
  };

  return (
    <div className={styles.form}>
      {main === "Sign Up" ? (
        <>
          <div>
            <TextField
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="lastName"
              name="lastName"
              label="Last name"
              variant="outlined"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </>
      ) : (
        <></>
      )}

      <div>
        <TextField
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <Button type="primary" onClick={handleButtonClick}>
          {main}
        </Button>
      </div>
      <div>
        <CustomLink to={to}>{secondary}</CustomLink>
      </div>
    </div>
  );
};

export default Form;
