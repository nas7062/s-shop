import { Heart, LogIn, LogOut, Search, ShoppingCart, User } from 'lucide-react';
import { useMemo } from 'react';
import clsx from 'clsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

type MenuItem = {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  path?: string;
  onClick?: () => void;
  showOnMobile?: boolean;
};

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, signOut } = useAuthStore();

  const menu = useMemo<MenuItem[]>(() => {
    if (user) {
      return [
        {
          label: '장바구니',
          icon: ShoppingCart,
          path: '/cart',
          showOnMobile: true,
        },
        { label: '좋아요', icon: Heart, path: '/likes', showOnMobile: true },
        { label: '마이', icon: User, path: '/mypage', showOnMobile: true },
        { label: '', icon: Search, path: '/search', showOnMobile: false },
        {
          label: '로그아웃',
          icon: LogOut,
          onClick: async () => {
            await signOut();
            navigate('/login', { replace: true });
          },
          showOnMobile: true,
        },
      ];
    }
    return [
      { label: '로그인', icon: LogIn, path: '/login', showOnMobile: true },
      {
        label: '장바구니',
        icon: ShoppingCart,
        path: '/cart',
        showOnMobile: true,
      },
      { label: '좋아요', icon: Heart, path: '/likes', showOnMobile: true },
      { label: '마이', icon: User, path: '/mypage', showOnMobile: true }, // 비로그인 접근 시 가드에서 로그인으로 보내는 걸 권장
      { label: '', icon: Search, path: '/search', showOnMobile: false },
    ];
  }, [user, signOut, navigate]);

  const mobileMenu = menu.filter((m) => m.showOnMobile);

  const handleSelect = (item: MenuItem) => {
    if (item.onClick) return item.onClick();
    if (item.path) navigate(item.path);
  };

  const isActive = (path?: string) =>
    !!path && location.pathname.startsWith(path);

  return (
    <header className="flex justify-between items-center pb-10">
      <div className="flex items-center gap-3">
        <Link to="/">
          <h1 className="text-3xl sm:text-5xl tracking-widest font-bold cursor-pointer">
            10012
          </h1>
        </Link>
      </div>

      {/* Desktop nav */}
      <div className="hidden sm:block md:w-2/3 lg:w-1/2 xl:w-1/3">
        <nav className="flex justify-between font-semibold text-lg">
          {menu.map((item, i) => (
            <button
              key={`${item.label || 'search'}-${i}`}
              onClick={() => handleSelect(item)}
              className={clsx(
                'flex items-center gap-1 px-2 py-1 transition-all duration-300 hover:bg-gray-100 rounded-md cursor-pointer',
                isActive(item.path) && 'text-black',
              )}
              aria-label={item.label || '검색'}
            >
              <item.icon className="w-5 h-5" />
              {item.label && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile bottom nav */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-gray-50 border text-gray-500 border-gray-200 font-semibold">
        <nav className="flex flex-row items-center justify-around">
          {mobileMenu.map((item, i) => (
            <button
              key={`${item.label || 'icon'}-m-${i}`}
              className={clsx(
                'flex flex-col items-center min-w-20 gap-1 px-3 py-2',
                isActive(item.path) && 'text-black',
              )}
              onClick={() => handleSelect(item)}
              aria-label={item.label || '메뉴'}
            >
              <item.icon className="w-6 h-6" />
              {item.label && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
