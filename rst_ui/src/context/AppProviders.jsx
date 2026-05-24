import { AuthProvider } from "./AuthContext";

// import other providers here

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
        {children}
    </AuthProvider>
  );
};

export default AppProviders;