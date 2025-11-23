import { getVehicleData } from '@/utils/vehicleService';
import StreetrodClient from './StreetrodClient';

export default async function StreetrodPage() {
  const data = await getVehicleData('streetrod');

  if (!data) {
    return <div>Error loading data</div>;
  }

  return <StreetrodClient data={data} />;
}
