'use client'; // ✅ 클라이언트 컴포넌트임을 명시

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';

export default function Providers({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
