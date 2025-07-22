'use client';

import { Badge } from '@/components/ui/badge';

export default function OrderStatusBadge({ statuses }: { statuses: string[] }) {
  let displayStatus = 'Unknown';

  if (statuses.includes('Pending')) displayStatus = 'Pending';
  else if (statuses.includes('Preparing')) displayStatus = 'Preparing';
  else if (statuses.includes('Processing')) displayStatus = 'Processing';
  else if (statuses.every((s) => s === 'Delivered')) displayStatus = 'Delivered';

  let variant: 'default' | 'secondary' | 'outline' = 'outline';
  switch (displayStatus) {
    case 'Delivered':
      variant = 'default';
      break;
    case 'Preparing':
    case 'Processing':
      variant = 'secondary';
      break;
    case 'Pending':
    default:
      variant = 'outline';
      break;
  }

  return <Badge variant={variant}>{displayStatus}</Badge>;
}
