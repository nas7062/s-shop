import { Heart, Home, Search, ShoppingCart, User } from 'lucide-react';

type MenuItem = {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const menu: MenuItem[] = [
  { label: '홈', icon: Home },
  { label: '장바구니', icon: ShoppingCart },
  { label: '좋아요', icon: Heart },
  { label: '마이', icon: User },
  { label: '', icon: Search },
];
export default function Header() {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-5xl tracking-widest font-bold cursor-pointer">
          10012
        </h1>
      </div>
      <div className="w-1/3">
        <ul className="flex justify-between font-semibold text-xl ">
          {menu.map((item) => (
            <button
              key={item.label}
              className="flex items-center cursor-pointer gap-1 px-3 py-2  transition-all duration-500 hover:bg-gray-100"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
}
