// pages/stake-info.tsx
import StakeInfoComponent from '../../components/stakeinfo';

export default function StakeInfoPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Staking Dashboard</h1>
      <StakeInfoComponent />
    </div>
  );
}