import { memo } from 'react';

import { ScannerContent } from '@/components/page/scanner/components/ScannerContent';
import { useScannerPageHook } from '@/components/page/scanner/hooks/useScannerPageHook';

const ScannerPage = memo(() => {
  return <ScannerContent {...useScannerPageHook()} />;
});

ScannerPage.displayName = 'ScannerPage';

export default ScannerPage;
