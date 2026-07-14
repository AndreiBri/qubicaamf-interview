import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Spinner from "../components/Spinner";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante il login");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="max-w-sm mx-auto p-4 mt-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Accedi</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitLogin();
        }}
        className="flex flex-col gap-4 bg-white rounded shadow-lg p-6"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="border border-gray-300 rounded px-3 py-2 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Nascondi password" : "Mostra password"}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
            >
              {showPassword ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button type="submit" disabled={loading} className="bg-gray-900 text-white rounded px-4 py-2 font-medium hover:bg-gray-800 disabled:opacity-50">
          {loading ? "Accesso in corso…" : "Accedi"}
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-4 text-center">
        Credenziali demo: <code className="bg-gray-100 px-1 rounded">mor_2314</code> / <code className="bg-gray-100 px-1 rounded">83r5^_</code>
      </p>
    </section>
  );
};

export default LoginPage;
