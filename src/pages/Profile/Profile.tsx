import { Button, CircularProgress } from "@mui/material";
import { removeUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks/use-auth";
import { useState, useEffect } from "react";
import { UserData } from "../../types/users";
import { useGetUserQuery } from "../../store/usersApi";
import styles from "./profile.module.scss";

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useAuth();
  const [user, setUser] = useState<UserData | undefined>(undefined);
  const { data, isFetching } = useGetUserQuery({ id });

  useEffect(() => {
    setUser(data);
  }, [isFetching]);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <div className={styles.profile}>
      {user && (
        <>
          {isFetching && <CircularProgress />}
          <h2>
            Welcome, {user.firstName} {user.lastName}
          </h2>
          <p>Email: {user.email}</p>
        </>
      )}
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Profile;
