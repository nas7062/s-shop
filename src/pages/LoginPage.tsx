// pages/LoginPage.tsx
import { useState } from 'react';
import supabase from '@/supabase';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error(error);
        return;
      }

      const user = data.user;
      if (user) {
        await supabase.from('userinfo').upsert(
          {
            id: user.id,
            email: user.email ?? email,
            // 카카오 등 OAuth로 로그인했던 적이 있다면 user_metadata에 들어있을 수 있음
            username: (user.user_metadata as any)?.username ?? undefined,
            phone: (user.user_metadata as any)?.phone ?? undefined,
            address: (user.user_metadata as any)?.address ?? undefined,
          },
          { onConflict: 'id' },
        );
      }

      navigate('/', { replace: true });
    } catch (err) {
      console.error(err);
      alert('로그인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 카카오 로그인
  const signInWithKakao = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: 'profile_nickname account_email',
        },
      });
      if (error) {
        console.error(error);
        alert('카카오 로그인 중 오류가 발생했습니다.');
      }
      // 리다이렉트는 supabase가 수행
    } catch (e) {
      console.error(e);
      alert('카카오 로그인 초기화에 실패했습니다.');
    }
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

        <button
          type="submit"
          disabled={loading}
          className="border border-gray-700 bg-gray-700 transition duration-200 hover:bg-gray-900 disabled:opacity-60 disabled:cursor-not-allowed text-white px-3 py-2 rounded-md"
        >
          {loading ? '로그인 중…' : '로그인'}
        </button>

        <button
          type="button"
          onClick={signInWithKakao}
          className="border border-yellow-300 bg-yellow-300 hover:bg-yellow-400 transition duration-200 text-black px-3 py-2 rounded-md"
        >
          카카오 로그인
        </button>

        <div className="flex items-center">
          <p className="flex-1 text-center text-xs text-gray-500 ml-2">
            아직 계정이 없으신가요?
          </p>
          <button
            type="button"
            className="ml-auto text-sm text-gray-500 hover:text-gray-900"
            onClick={() => navigate('/terms')}
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}
