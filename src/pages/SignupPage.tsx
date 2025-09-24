import { useState } from 'react';
import supabase from '@/supabase';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const onSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== password2) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const { data: signUp, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username, phone, address } },
      });
      if (error) {
        console.error(error);
        return;
      }

      const user = signUp.user;
      const session = signUp.session;

      //userinfo에 user정보 저장
      if (user && session) {
        const { data: upserted, error: upsertErr } = await supabase
          .from('userinfo')
          .upsert(
            // 있으면 UPDATE, 없으면 INSERT
            { id: user.id, email, username, phone, address },
            { onConflict: 'id' },
          )
          .select()
          .single();

        if (upsertErr) {
          console.log(
            'RLS?',
            upsertErr.code,
            upsertErr.message,
            upsertErr.details,
            upsertErr.hint,
          );
          alert('프로필 저장 중 오류가 발생했습니다.');
          return;
        }
      } else return;
      navigate('/login', { replace: true });
    } catch (err) {
      console.error(err);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };
  return (
    <div className="min-w-[320px] w-1/2 mx-auto mt-20">
      <h2 className="bg-gray-100 py-4 text-xl font-semibold px-2">회원가입</h2>

      <form className="flex flex-col gap-4 mt-4" onSubmit={onSignUp}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-200 px-2 py-2 rounded-md"
          required
        />
        <input
          type="text"
          placeholder="이름"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-200 px-2 py-2 rounded-md"
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-200 px-2 py-2 rounded-md"
          required
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          className="border border-gray-200 px-2 py-2 rounded-md"
          required
        />
        <input
          type="text"
          placeholder="휴대폰번호"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border border-gray-200 px-2 py-2 rounded-md"
        />
        <input
          type="text"
          placeholder="주소"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border border-gray-200 px-2 py-2 rounded-md"
        />

        <button
          type="submit"
          className="border border-gray-700 bg-gray-700 transition duration-200 hover:bg-gray-900 text-white cursor-pointer px-2 py-2 rounded-md"
        >
          회원가입
        </button>

        <div className="flex items-center">
          <p className="flex-1 text-center text-xs text-gray-500 ml-10">
            지금 바로 로그인하고 더 많은 서비스를 이용해 보세요!
          </p>
          <button
            type="button"
            className="ml-auto text-sm text-gray-500 cursor-pointer hover:text-gray-900"
            onClick={() => navigate('/login')}
          >
            로그인
          </button>
        </div>
      </form>
    </div>
  );
}
