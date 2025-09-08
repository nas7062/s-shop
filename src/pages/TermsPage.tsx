import CheckBox from '@/components/checkBox';
import clsx from 'clsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TermsPage() {
  const navigate = useNavigate();
  const [agreements, setAgreements] = useState({
    all: false,
    privacy: false,
    delegate: false,
    terms: false,
  });

  const handleCheckChange = (id: string, value: boolean) => {
    // 전체 동의 선택 시, 모든 항목을 동일하게
    if (id === 'all') {
      setAgreements({
        all: value,
        privacy: value,
        delegate: value,
        terms: value,
      });
    } // 개별 항목 선택 시, 그 항목만 선택
    else {
      const newAgreements = { ...agreements, [id]: value };
      // 개별 항목들이 모두 true면 전체동의도 true로
      const allChecked =
        newAgreements.privacy && newAgreements.delegate && newAgreements.terms;
      setAgreements({ ...newAgreements, all: allChecked });
    }
  };
  return (
    <div className="min-w-[320px] w-1/2 mx-auto flex flex-col gap-4">
      <h2 className="bg-gray-100 py-4 text-xl font-semibold px-2">회원가입</h2>
      <div className="font-semibold text-xl">
        <h3>환영합니다!</h3>
        <h3>10012에 가입하시려면 약관에 동의해 주세요</h3>
      </div>
      <div className="flex flex-col gap-2">
        <CheckBox
          id="all"
          title="전체 동의"
          showButton={false}
          checked={agreements.all}
          onChange={handleCheckChange}
        />
        <CheckBox
          id="privacy"
          title="개인정보 수집 항목"
          showButton={true}
          checked={agreements.privacy}
          onChange={handleCheckChange}
        />
        <CheckBox
          id="delegate"
          title="개인정보 처리 위탁 동의"
          showButton={true}
          checked={agreements.delegate}
          onChange={handleCheckChange}
        />
        <CheckBox
          id="terms"
          title="이용 약관"
          showButton={true}
          checked={agreements.terms}
          onChange={handleCheckChange}
        />
      </div>
      <button
        disabled={!agreements.all}
        onClick={() => navigate('/signup')}
        className={clsx(
          'mt-6 h-14 rounded-xl border border-gray-600 bg-gray-600 text-white cursor-pointer hover:bg-gray-800',
          !agreements.all && 'cursor-not-allowed opacity-50 hover:bg-gray-600',
        )}
      >
        동의하고 회원가입하기
      </button>
    </div>
  );
}
