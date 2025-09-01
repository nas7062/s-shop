export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-700 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 상단: 로고 & 메뉴 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gray-700 pb-6">
          <h1 className="text-lg font-bold ">10012</h1>
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#" className="hover:text-white transition">
              About
            </a>
            <a href="#" className="hover:text-white transition">
              Products
            </a>
            <a href="#" className="hover:text-white transition">
              Contact
            </a>
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
          </nav>
        </div>

        {/* 하단: 저작권 */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>© 2025 10012. All rights reserved.</p>
          <p>Designed with ❤️ by You</p>
        </div>
      </div>
    </footer>
  );
}
