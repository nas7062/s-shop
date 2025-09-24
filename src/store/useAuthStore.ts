// src/store/useAuthStore.ts
import { create } from 'zustand';
import supabase from '@/supabase';
import type { Session, User } from '@supabase/supabase-js';

type UserInfo = {
  id: string;
  email: string | null;
  username?: string | null;
  phone?: string | null;
  address?: string | null;
};

type AuthState = {
  user: User | null;
  session: Session | null;
  profile: UserInfo | null;
  loading: boolean;
  error: string | null;
  hasInit: boolean; // 중복 방지

  // actions
  initAuth: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  signIn: (params: { email: string; password: string }) => Promise<void>;
  signInWithKakao: () => Promise<void>;
  signUp: (params: {
    email: string;
    password: string;
    username?: string;
    phone?: string;
    address?: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
};

async function ensureUserinfoRow(user: User) {
  const meta = (user.user_metadata ?? {}) as any;
  await supabase.from('userinfo').upsert(
    {
      id: user.id,
      email: user.email,
      username: meta.username ?? null,
      phone: meta.phone ?? null,
      address: meta.address ?? null,
    },
    { onConflict: 'id' },
  );
}

async function fetchProfile(userId: string): Promise<UserInfo | null> {
  const { data, error } = await supabase
    .from('userinfo')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) return null;
  return data as UserInfo;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  profile: null,
  loading: false,
  error: null,
  hasInit: false,

  initAuth: async () => {
    if (get().hasInit) return;
    set({ loading: true, error: null });

    //현재 세션
    const { data } = await supabase.auth.getSession();
    const session = data.session ?? null;
    const user = session?.user ?? null;
    set({ session, user, hasInit: true, loading: false });

    //프로필 미리 로드
    if (user) {
      await ensureUserinfoRow(user); // 없으면 생성
      const p = await fetchProfile(user.id);
      set({ profile: p });
    }

    // 상태 변화 리스너
    supabase.auth.onAuthStateChange(async (_event, newSession) => {
      const newUser = newSession?.user ?? null;
      set({ session: newSession ?? null, user: newUser });

      if (newUser) {
        await ensureUserinfoRow(newUser);
        const p = await fetchProfile(newUser.id);
        set({ profile: p });
      } else {
        set({ profile: null });
      }
    });
  },

  refreshProfile: async () => {
    const u = get().user;
    if (!u) return;
    const p = await fetchProfile(u.id);
    set({ profile: p });
  },

  signIn: async ({ email, password }) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      set({ loading: false, error: error.message });
      return;
    }
    const session = data.session!;
    const user = session.user;
    await ensureUserinfoRow(user);
    const p = await fetchProfile(user.id);
    set({ session, user, profile: p, loading: false, error: null });
  },

  signInWithKakao: async () => {
    // supabase가 자동 리다이렉트
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: 'profile_nickname account_email',
      },
    });
    if (error) set({ error: error.message });
  },

  signUp: async ({ email, password, username, phone, address }) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username, phone, address } }, // user_metadata
    });
    if (error) {
      set({ loading: false, error: error.message });
      return;
    }

    let s = (await supabase.auth.getSession()).data.session;
    if (!s) {
      const { data: s2, error: e2 } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (e2) {
        set({ loading: false, error: e2.message });
        return;
      }
      s = s2.session;
    }

    const user = s!.user;
    await ensureUserinfoRow(user);
    const p = await fetchProfile(user.id);

    set({ session: s!, user, profile: p, loading: false, error: null });
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null, user: null, profile: null, error: null });
  },
}));
