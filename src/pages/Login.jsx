import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary login until Supabase authentication is connected
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">

        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Welcome Back 👋
        </h1>

        <p className="text-center text-slate-500 mb-8">
          Login to continue using CookSmart AI
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block text-sm font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl"
          >
            Login
          </button>

        </form>

        <div className="flex justify-between mt-6 text-sm">

          <Link
            to="/forgot-password"
            className="text-green-600 hover:underline"
          >
            Forgot Password?
          </Link>

          <Link
            to="/register"
            className="text-green-600 hover:underline"
          >
            Register
          </Link>

        </div>

      </div>
    </div>
  );
}