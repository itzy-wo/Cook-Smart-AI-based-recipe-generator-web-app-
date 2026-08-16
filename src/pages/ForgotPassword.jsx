import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">

        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Forgot Password 🔑
        </h1>

        <p className="text-center text-slate-500 mb-8">
          Verify yourself using your secret question.
        </p>

        <form className="space-y-4">

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-xl px-4 py-3"
          />

          <select className="w-full border rounded-xl px-4 py-3">
            <option>Select your secret question</option>
            <option>What is your favorite fruit?</option>
            <option>What was your first pet's name?</option>
            <option>What is your favorite color?</option>
            <option>What is your dream destination?</option>
          </select>

          <input
            type="text"
            placeholder="Enter your secret answer"
            className="w-full border rounded-xl px-4 py-3"
          />

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl"
          >
            Verify
          </button>

        </form>

        <div className="text-center mt-6">
          <Link
            to="/login"
            className="text-green-600 hover:underline"
          >
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}