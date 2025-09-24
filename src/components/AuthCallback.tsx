import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '@/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;

      if (error) {
        console.error(error);
        navigate('/login', { replace: true });
        return;
      }

      if (data.session) {
        navigate('/', { replace: true });
      } else {
        const { data: sub } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            if (session) navigate('/login', { replace: true });
          },
        );
        return () => sub.subscription.unsubscribe();
      }
    });

    return () => {
      mounted = false;
    };
  }, [navigate]);

  return <div style={{ padding: 24 }}>로그인 처리 중…</div>;
}
