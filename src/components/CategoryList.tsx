const Category = [
  '인기',
  '할인',
  '상의',
  '바지',
  '아우터',
  '신발',
  '가방',
  '패션소품',
];

export default function CategoryList() {
  return (
    <div className="space-x-1">
      {Category.map((cate) => (
        <button className="px-2 py-1 bg-gray-400 ">{cate}</button>
      ))}
    </div>
  );
}
