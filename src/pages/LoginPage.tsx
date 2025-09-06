export default function LoginPage() {
  return (
    <div>
      <h2 className="bg-gray-100 py-4 text-xl font-semibold">로그인</h2>
      <form className="flex flex-col px-4 gap-4 mt-4">
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
        <button>로그인</button>
      </form>
    </div>
  );
}
