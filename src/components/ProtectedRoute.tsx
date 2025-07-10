import { useAuth } from "../contexts/AuthContext";
import { LoginForm } from "./LoginForm";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, token } = useAuth();

  if (!user || !token) {
    return <LoginForm />;
  }

  return <>{children}</>;
};
