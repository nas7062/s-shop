export default function TabReviews() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border rounded-xl p-4">
          <div className="text-sm text-gray-600">user{i}@mail.com</div>
          <div className="mt-1 text-yellow-500" aria-label="별점">
            {'★'.repeat(4)}
            {'☆'}
          </div>
          <p className="mt-2 text-gray-700">
            만족스럽습니다. 재구매 의사 있어요.
          </p>
        </div>
      ))}
    </div>
  );
}
