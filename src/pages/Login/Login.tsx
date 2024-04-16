import Form from "../../components/Form/Form";
import { setUser } from "../../store/slices/userSlice";
import { SIGNUP_ROUTE } from "../../components/Router/consts";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { useSignInMutation } from "../../store/usersApi";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [signIn, { error }] = useSignInMutation();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await signIn({ email, password });
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
      } else if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      main="Login"
      secondary="Sign Up"
      handleClick={handleLogin}
      to={SIGNUP_ROUTE}
    />
  );
};

export default Login;
