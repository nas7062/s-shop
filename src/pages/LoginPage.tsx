import supabase from '@/supabase';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  const signInWithKakao = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        // 로그인 후 돌아올 페이지 (Router에 콜백 페이지 필요)
        redirectTo: `${window.location.origin}/auth/callback`,
        // 이메일까지 받고 싶다면 아래 scope 사용 (카카오에서 권한 동의 필요)
        scopes: 'profile_nickname account_email',
      },
    });
    if (error) {
      console.error(error);
      alert('카카오 로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-w-[320px] w-1/2 mx-auto mt-20">
      <h2 className="bg-gray-100 py-4 text-xl font-semibold px-2">로그인</h2>

      <form
        className="flex flex-col gap-4 mt-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="아이디"
          className="border border-gray-200 px-2 py-2 rounded-md"
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="border border-gray-200 px-2 py-2 rounded-md"
        />

        {/* 일반 로그인 버튼은 아직 로직이 없으니 type="button"으로 임시 처리 */}
        <button
          type="button"
          className="border border-gray-700 bg-gray-700 hover:bg-gray-900 text-white px-2 py-2 rounded-md"
        >
          로그인
        </button>

        <button
          type="button"
          onClick={signInWithKakao}
          className="border border-yellow-300 bg-yellow-300 hover:bg-yellow-400 text-black px-2 py-2 rounded-md"
        >
          카카오 로그인
        </button>

        <div className="flex items-center">
          <p className="flex-1 text-center text-xs text-gray-500 ml-10">
            지금 바로 회원가입하고 더 많은 서비스를 이용해 보세요!
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
