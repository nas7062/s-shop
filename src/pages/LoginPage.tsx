import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="min-w-[320px] w-1/2 mx-auto mt-20">
      <h2 className="bg-gray-100 py-4 text-xl font-semibold px-2">로그인</h2>
      <form className="flex flex-col gap-4 mt-4">
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
        <button className="border border-gray-700 bg-gray-700 transition duration-200 hover:bg-gray-900 text-white cursor-pointer px-2 py-2 rounded-md">
          로그인
        </button>
        <button className="border border-yellow-300 bg-yellow-300 hover:bg-yellow-400 transition duration-200 text-black cursor-pointer px-2 py-2 rounded-md">
          카카오 로그인
        </button>
        <div className="flex items-center">
          {/* flex-1로 남은 영역 차지 후 가운데 정렬 */}
          <p className="flex-1 text-center text-xs text-gray-500 ml-10">
            지금 바로 회원가입하고 더 많은 서비스를 이용해 보세요!
          </p>
          {/* 버튼은 오른쪽 끝 */}
          <button
            className="ml-auto text-sm  text-gray-500 cursor-pointer hover:text-gray-900"
            onClick={() => navigate('/signup')}
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}
