export default function LoginPage() {
  return (
    <div className="min-w-[320px] w-1/2 mx-auto">
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
        <button className="border border-gray-700 bg-gray-700 hover:bg-gray-900 text-white cursor-pointer px-2 py-2 rounded-md">
          로그인
        </button>
      </form>
    </div>
  );
}
