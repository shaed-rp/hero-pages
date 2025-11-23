import { getVehicleData } from '@/utils/vehicleService';
import MorganWorkhorseClient from './MorganWorkhorseClient';

export default async function MorganWorkhorsePage() {
  const data = await getVehicleData('morganWh');

  if (!data) {
    return <div>Error loading data</div>;
  }

  return <MorganWorkhorseClient data={data} />;
}
