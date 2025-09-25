import { popularProps } from '@/pages/SearchPage';

interface PopularListProps {
  popLoading: boolean;
  popular: popularProps[];
  onSelect: (raw: string) => void;
}

export default function PopularList({
  popLoading,
  popular,
  onSelect,
}: PopularListProps) {
  return (
    <section className="mt-6 w-1/2">
      <h3 className="font-semibold text-xl">인기 검색어</h3>
      {popLoading ? (
        <div>로딩 중…</div>
      ) : (
        <ul className="grid grid-cols-3 grid-rows-3 gap-1 mt-2">
          {popular.map((p, idx) => (
            <li key={p.keyword} className="w-full h-12">
              <button
                className="w-full h-full flex items-center  px-2rounded-lg hover:bg-gray-100 cursor-pointer text-sm font-semibold"
                onClick={() => onSelect(p.keyword)}
              >
                {idx + 1} {p.keyword}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
