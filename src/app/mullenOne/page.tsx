import { getVehicleData } from '@/utils/vehicleService';
import MullenOneClient from './MullenOneClient';

export default async function MullenOnePage() {
  const data = await getVehicleData('mullenOne');

  if (!data) {
    return <div>Error loading data</div>;
  }

  return <MullenOneClient data={data} />;
}
