export type DealStatus = 'lead' | 'offer' | 'negotiation' | 'won' | 'lost';

export interface Assignee {
  initials: string;
  color: string;
}

export interface Deal {
  id: string;
  name: string;
  client: string;
  value: number;
  status: DealStatus;
  assignees: Assignee[];
  createdAt: string;
  description: string;
  tags: string[];
  position: number;
}

export interface ColumnConfig {
  id: DealStatus;
  label: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  dotClass: string;
  dropBg: string;
}

export const COLUMNS: ColumnConfig[] = [
  {
    id: 'lead',
    label: 'Lead',
    color: '#6C5CE7',
    badgeBg: 'bg-[#6C5CE7]/10',
    badgeText: 'text-[#6C5CE7]',
    dotClass: 'bg-[#6C5CE7]',
    dropBg: 'bg-[#6C5CE7]/5',
  },
  {
    id: 'offer',
    label: 'Offer',
    color: '#F59E0B',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-700',
    dotClass: 'bg-amber-400',
    dropBg: 'bg-amber-50',
  },
  {
    id: 'negotiation',
    label: 'Negotiation',
    color: '#22D3EE',
    badgeBg: 'bg-[#22D3EE]/10',
    badgeText: 'text-[#0891b2]',
    dotClass: 'bg-[#22D3EE]',
    dropBg: 'bg-[#22D3EE]/5',
  },
  {
    id: 'won',
    label: 'Won',
    color: '#10B981',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-700',
    dotClass: 'bg-emerald-400',
    dropBg: 'bg-emerald-50',
  },
  {
    id: 'lost',
    label: 'Lost',
    color: '#94A3B8',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-500',
    dotClass: 'bg-slate-300',
    dropBg: 'bg-slate-50',
  },
];

export const initialDeals: Deal[] = [
  {
    id: '1',
    name: 'Coachella 2025 Slot',
    client: 'Pulse Agency',
    value: 25000,
    status: 'lead',
    assignees: [{ initials: 'PA', color: '#6C5CE7' }, { initials: 'AK', color: '#22D3EE' }],
    createdAt: '2025-03-10',
    description: 'Headline slot inquiry for Coachella Valley Music and Arts Festival 2025.',
    tags: ['Festival', 'Headline'],
  },
  {
    id: '2',
    name: 'TechSummit Keynote',
    client: 'Innova Global',
    value: 12000,
    status: 'lead',
    assignees: [{ initials: 'IG', color: '#F59E0B' }],
    createdAt: '2025-03-12',
    description: 'Keynote performance slot at TechSummit Berlin.',
    tags: ['Corporate', 'Keynote'],
  },
  {
    id: '3',
    name: 'Wireless Festival Headline',
    client: 'Republic Records',
    value: 95000,
    status: 'lead',
    assignees: [{ initials: 'RR', color: '#6C5CE7' }, { initials: 'MT', color: '#10B981' }],
    createdAt: '2025-03-14',
    description: 'Wireless Festival headline slot — multi-night engagement.',
    tags: ['Festival', 'Multi-night'],
  },
  {
    id: '4',
    name: 'Paris Fashion Week Afterparty',
    client: 'Luxe Brands Co.',
    value: 45000,
    status: 'offer',
    assignees: [{ initials: 'LB', color: '#0F172A' }, { initials: 'SR', color: '#22D3EE' }],
    createdAt: '2025-03-08',
    description: 'Exclusive afterparty performance for Paris Fashion Week closing night.',
    tags: ['Fashion', 'Exclusive'],
  },
  {
    id: '5',
    name: 'Apple Music Live NYC',
    client: 'Apple Inc.',
    value: 220000,
    status: 'offer',
    assignees: [{ initials: 'AI', color: '#6C5CE7' }],
    createdAt: '2025-03-15',
    description: 'Live concert stream for Apple Music — Madison Square Garden.',
    tags: ['Streaming', 'Arena'],
  },
  {
    id: '6',
    name: 'European Fall Tour 2025',
    client: 'MKM Management',
    value: 180000,
    status: 'negotiation',
    assignees: [{ initials: 'MK', color: '#6C5CE7' }, { initials: 'EL', color: '#F59E0B' }, { initials: 'JT', color: '#10B981' }],
    createdAt: '2025-03-05',
    description: '12-city European tour — London, Paris, Berlin, Amsterdam, Barcelona.',
    tags: ['Tour', 'Multi-city'],
  },
  {
    id: '7',
    name: 'Ibiza Residency Summer',
    client: 'Pacha Group',
    value: 140000,
    status: 'negotiation',
    assignees: [{ initials: 'PG', color: '#22D3EE' }],
    createdAt: '2025-03-17',
    description: '8-week summer residency at Pacha Ibiza — June to August.',
    tags: ['Residency', 'Club'],
  },
  {
    id: '8',
    name: 'Vogue Cover Shoot',
    client: 'Condé Nast',
    value: 8500,
    status: 'won',
    assignees: [{ initials: 'CN', color: '#22D3EE' }],
    createdAt: '2025-02-20',
    description: 'Editorial cover shoot for Vogue UK March issue.',
    tags: ['Editorial', 'Press'],
  },
  {
    id: '9',
    name: 'Glastonbury Pyramid Stage',
    client: 'BBC Media',
    value: 320000,
    status: 'won',
    assignees: [{ initials: 'BB', color: '#0F172A' }, { initials: 'KL', color: '#6C5CE7' }],
    createdAt: '2025-02-15',
    description: 'Glastonbury Festival Pyramid Stage headline — Saturday night.',
    tags: ['Festival', 'Headline'],
  },
  {
    id: '10',
    name: 'Dubai Grand Opening',
    client: 'EMAAR Properties',
    value: 75000,
    status: 'lost',
    assignees: [{ initials: 'EM', color: '#94A3B8' }],
    createdAt: '2025-02-28',
    description: 'Grand opening performance for EMAAR luxury development Dubai.',
    tags: ['Corporate', 'International'],
  },
];

export const mockClients = [
  { id: 'c1', name: 'Pulse Agency', initials: 'PA', color: '#6C5CE7', deals: 3, revenue: 45000 },
  { id: 'c2', name: 'MKM Management', initials: 'MK', color: '#22D3EE', deals: 2, revenue: 180000 },
  { id: 'c3', name: 'BBC Media', initials: 'BB', color: '#0F172A', deals: 1, revenue: 320000 },
  { id: 'c4', name: 'Luxe Brands Co.', initials: 'LB', color: '#F59E0B', deals: 1, revenue: 45000 },
  { id: 'c5', name: 'Apple Inc.', initials: 'AI', color: '#6C5CE7', deals: 1, revenue: 220000 },
];

export function formatCurrency(value: number): string {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
  return `$${value}`;
}
