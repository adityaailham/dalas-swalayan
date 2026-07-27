"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, User } from "lucide-react";

// --- Sub-Components (Clean Code Abstraction) ---

const BackgroundDecorations = () => (
  <>
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/20 rounded-full blur-[100px] pointer-events-none" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
  </>
);

const FormHeader = () => (
  <div className="text-center mb-10">
    <div className="w-16 h-16 bg-linear-to-br from-orange-400 to-orange-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30">
      <Lock className="w-8 h-8 text-white" />
    </div>
    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Selamat Datang</h1>
    <p className="text-gray-500 mt-2 text-sm font-medium">Masuk ke Panel Admin Dalas Swalayan</p>
  </div>
);

interface InputFieldProps {
  label: string;
  icon: React.ElementType;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  isPassword?: boolean;
  showPassword?: boolean;
  togglePassword?: () => void;
}

const InputField = ({ 
  label, icon: Icon, type, value, onChange, placeholder, isPassword, showPassword, togglePassword 
}: InputFieldProps) => (
  <div>
    <div className="flex justify-between items-center mb-2">
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">{label}</label>
    </div>
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      <input 
        type={type} 
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium text-gray-900 bg-gray-50/50 focus:bg-white"
      />
      {isPassword && (
        <button 
          type="button"
          onClick={togglePassword}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      )}
    </div>
  </div>
);

const SubmitButton = ({ isLoading }: { isLoading: boolean }) => (
  <button 
    type="submit"
    disabled={isLoading}
    className="w-full py-4 mt-4 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 text-white font-bold text-sm hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
  >
    {isLoading ? (
      <span className="flex items-center gap-2">
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Memproses...
      </span>
    ) : "Masuk"}
  </button>
);

// --- Main Component ---

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`/api/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      
      if (res.ok) {
        // Simpan token statis ke cookie agar bisa dibaca oleh Middleware Server-Side Next.js
        document.cookie = `admin_token=${data.token}; path=/; max-age=86400`; // Expire 1 hari
        router.push("/dashboard");
      } else {
        setErrorMsg(data.error || "Login gagal.");
      }
    } catch (err) {
      setErrorMsg("Koneksi ke server terputus.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      <BackgroundDecorations />

      <div className="bg-white w-full max-w-md rounded-[2rem] p-10 shadow-2xl relative z-10 border border-white/50 backdrop-blur-xl">
        <FormHeader />

        <form onSubmit={handleLogin} className="space-y-5">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-xs font-bold border border-red-100 text-center">
              {errorMsg}
            </div>
          )}

          <InputField 
            label="Username"
            icon={User}
            type="text"
            value={username}
            onChange={(e: any) => setUsername(e.target.value)}
            placeholder="Masukkan username"
          />

          <InputField 
            label="Password"
            icon={Lock}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            isPassword={true}
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
          />

          <SubmitButton isLoading={isLoading} />
        </form>
      </div>
    </div>
  );
}
