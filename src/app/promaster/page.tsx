import { getVehicleData } from '@/utils/vehicleService';
import PromasterClient from './PromasterClient';

export default async function PromasterPage() {
  const data = await getVehicleData('promaster');

  if (!data) {
    return <div>Error loading data</div>;
  }

  return <PromasterClient data={data} />;
}
