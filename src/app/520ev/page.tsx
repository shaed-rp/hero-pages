import { getVehicleData } from '@/utils/vehicleService';
import Peterbilt520evClient from './Peterbilt520evClient';

export default async function Peterbilt520evPage() {
  const data = await getVehicleData('peterbilt520ev');

  if (!data) {
    return <div>Error loading data</div>;
  }

  return <Peterbilt520evClient data={data} />;
}
