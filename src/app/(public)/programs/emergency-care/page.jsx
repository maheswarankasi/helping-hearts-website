import EmergencyShortTermCare from '@/components/EmergencyShortTermCare';

export const metadata = {
  title: 'Emergency Care & Short-Term Care | Helping Hearts NGO',
  description:
    'Frontline street rescue, crisis medical triage, psychiatric emergency care, and Government Hospital Campus ECRCs across Tamil Nadu by Helping Hearts.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function EmergencyCarePage() {
  return <EmergencyShortTermCare />;
}
