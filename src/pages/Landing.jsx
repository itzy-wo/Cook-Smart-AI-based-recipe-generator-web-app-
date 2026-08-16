import { Link } from "react-router-dom";
export default function Landing() {
  
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center px-6">

      <h1 className="text-6xl font-black mb-4">
        🍳 CookSmart AI
      </h1>

      <p className="text-xl text-slate-300 mb-8 text-center max-w-xl">
        Cook smarter. Waste less. Let AI create recipes using the ingredients
        already in your kitchen.
      </p>

     <div className="flex gap-4 mt-6">
  <Link
    to="/login"
    className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-xl text-lg font-bold transition"
  >
    Login
  </Link>

  <Link
    to="/register"
    className="bg-white text-slate-900 hover:bg-slate-200 px-8 py-4 rounded-xl text-lg font-bold transition"
  >
    Register
  </Link>
</div>
    </div>
  );
}