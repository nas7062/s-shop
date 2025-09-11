import clsx from 'clsx';

export const TABS = ['상품정보', '리뷰', '추천'] as const;
export type Tab = (typeof TABS)[number];

interface TabButtonsProps {
  selectedTab: string | null;
  setSelectedTab: (tab: Tab) => void;
}

export default function TabButtons({
  selectedTab,
  setSelectedTab,
}: TabButtonsProps) {
  return (
    <div className="grid grid-cols-3 text-center text-sm font-medium overflow-hidden rounded-t-2xl ">
      {TABS.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => setSelectedTab(tab)}
          className={clsx(
            'px-4 py-3 focus:outline-none transition-colors cursor-pointer',
            selectedTab === tab
              ? 'bg-white'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200',
          )}
          aria-current={selectedTab === tab ? 'page' : undefined}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
