import Form from "../../components/Form/Form";
import { setUser } from "../../store/slices/userSlice";
import { LOGIN_ROUTE } from "../../components/Router/consts";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { useCreateUserMutation } from "../../store/usersApi";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();

  const handleSignUp = async (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  ) => {
    try {
      const response = await createUser({
        email,
        password,
        firstName,
        lastName,
      });
      if ("data" in response && response.data) {
        const user = response.data;
        dispatch(
          setUser({
            email: user.email,
            id: user.id,
            token: user.token,
          })
        );
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      main="Sign Up"
      secondary="Login"
      handleClick={handleSignUp}
      to={LOGIN_ROUTE}
    />
  );
};

export default SignUp;
