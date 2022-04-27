import { Histogram } from 'modules/Shared/components/Charts';
import { AttacksByTechniqueMockFactory } from 'modules/Shared/helpers/factories';
import { ApexOptions } from 'apexcharts';

const AttacksByTechnique = () => {
  const { categories, series } = AttacksByTechniqueMockFactory();

  const options: ApexOptions = {
    title: {
      text: 'Attacks By Technique',
      style: {
        color: '#fff',
      },
    },
    chart: {
      stacked: true,
    },
    xaxis: {
      categories,
    },
    series,
  };

  return <Histogram options={options} />;
};

export default AttacksByTechnique;
