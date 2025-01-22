import { useEffect } from "react";
import GenericLayout from "../components/common/Layout";
import SignInForm from "../components/common/LoginForm";
import { getToken } from "../utils/token";
import { useValidateQuery } from "../services/authServices";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useNavigate } from "react-router";
import { navigateUser } from "../utils/user";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = getToken();
  const { data: user, isLoading } = useValidateQuery(token, { skip: !token });
  async function setUser(user: any, token: string) {
    await dispatch(setCredentials({ user, token }));
    navigateUser(user, navigate);
  }
  useEffect(() => {
    //@ts-ignore
    if (user && token) {
      setUser(user, token);
    }
  }, [user]);
  return (
    <GenericLayout>
      <SignInForm />
    </GenericLayout>
  );
}

export default LoginPage;
