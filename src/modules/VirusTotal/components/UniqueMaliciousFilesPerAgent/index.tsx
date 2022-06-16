import { useVirusTotal } from 'modules/VirusTotal/contexts/VirusTotalContext';
import { DonutChart } from 'modules/Shared/components/Charts';

const UniqueMaliciousFilesPerAgent = () => {
  const { uniqueMaliciousFilesPerAgent } = useVirusTotal();

  if (!uniqueMaliciousFilesPerAgent) return <></>;

  const { labels, series } = uniqueMaliciousFilesPerAgent;
  const options = {
    series,
    labels,
    title: { text: 'Most Affected Agents' },
  };

  return <DonutChart options={options} />;
};

export default UniqueMaliciousFilesPerAgent;
