import { Heart, Home, Search, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
type MenuItem = {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  path?: string;
};

const menu: MenuItem[] = [
  { label: '홈', icon: Home },
  { label: '장바구니', icon: ShoppingCart },
  { label: '좋아요', icon: Heart },
  { label: '마이', icon: User },
  { label: '', icon: Search, path: '/search' },
];

const mobileMenu: MenuItem[] = menu.filter((item) => item.icon !== Search);
export default function Header() {
  const [selected, setSelected] = useState('홈');
  const navigate = useNavigate();
  const selectedMenu = (item: MenuItem) => {
    setSelected(item.label);
    if (item.path) navigate(item.path);
  };
  return (
    <div className="flex justify-between items-center pb-10">
      <div>
        <h1 className="text-3xl sm:text-5xl tracking-widest font-bold cursor-pointer">
          10012
        </h1>
      </div>
      <div className=" hidden sm:block md:w-2/3 lg:w-1/2 xl:w-1/3">
        <nav className="flex justify-between font-semibold text-xl ">
          {menu.map((item) => (
            <button
              key={item.label}
              onClick={() => selectedMenu(item)}
              className="flex items-center cursor-pointer gap-1 px-3 py-2  transition-all duration-300 hover:bg-gray-100"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className=" sm:hidden fixed bottom-0 left-0 right-0 bg-gray-50 border text-gray-500 border-gray-200 font-semibold">
        <nav className="flex flex-row items-center justify-around">
          {mobileMenu.map((item) => (
            <button
              key={item.label}
              className={clsx(
                `flex flex-col items-center min-w-20   cursor-pointer gap-1 px-3 py-2  `,
                selected === item.label && 'text-black',
              )}
              onClick={() => selectedMenu(item)}
            >
              <item.icon className="w-6 h-6" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
