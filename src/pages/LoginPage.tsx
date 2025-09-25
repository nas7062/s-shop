// pages/LoginPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginPage() {
  const navigate = useNavigate();

  const { user, loading, error, signIn, signInWithKakao } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 성공 시 라우팅
  useEffect(() => {
    if (user) navigate('/', { replace: true });
  }, [user, navigate]);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn({ email, password }); // 스토어가 세션/프로필 동기화 + userinfo upsert
  };

  return (
    <div className="min-w-[320px] w-full max-w-md mx-auto mt-20">
      <h2 className="bg-gray-100 py-4 text-xl font-semibold px-2 rounded-md">
        로그인
      </h2>

      <form className="flex flex-col gap-4 mt-4" onSubmit={onLogin}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-200 px-3 py-2 rounded-md"
          required
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-200 px-3 py-2 rounded-md"
          required
          autoComplete="current-password"
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer border border-gray-700 bg-gray-700 transition duration-200 hover:bg-gray-900 disabled:opacity-60 disabled:cursor-not-allowed text-white px-3 py-2 rounded-md"
        >
          {loading ? '로그인 중…' : '로그인'}
        </button>

        <button
          type="button"
          onClick={signInWithKakao}
          className="cursor-pointer border border-yellow-300 bg-yellow-300 hover:bg-yellow-400 transition duration-200 text-black px-3 py-2 rounded-md"
        >
          카카오 로그인
        </button>

        <div className="flex items-center">
          <p className="flex-1 text-center text-xs text-gray-500 ml-2">
            아직 계정이 없으신가요?
          </p>
          <a
            className="ml-auto text-sm text-gray-500 hover:text-gray-900"
            href="/terms"
          >
            회원가입
          </a>
        </div>
      </form>
    </div>
  );
}
