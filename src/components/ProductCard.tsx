import image from '@/assets/top.png';
export default function ProductCard() {
  return (
    <div className="flex flex-col  bg-gray-50 rounded pb-4  ">
      <div className="flex justify-center items-center">
        <img src={image} alt="이미지" className="w-48 h-48" />
      </div>
      <div className="px-4">
        <p>title</p>
        <p>descript</p>
        <p>price</p>
      </div>
    </div>
  );
}
