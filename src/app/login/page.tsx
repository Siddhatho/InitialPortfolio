import { AuthProvider } from "@/components/cms/AuthProvider";
import LoginForm from "@/components/cms/LoginForm";

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  );
}
