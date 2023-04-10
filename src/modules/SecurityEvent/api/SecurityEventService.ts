import AxiosClient from 'modules/Shared/services/AxiosClient';
import { IAlert, IEvent } from 'modules/Shared/interfaces';
import { ROUTES } from 'modules/Shared/constants/routes';
import { BaseService } from 'modules/Shared/services/BaseService';
import { IQueryParams } from 'modules/Shared/interfaces/IQueryParams';
import { IVulnerability } from 'modules/Vulnerability/interfaces';

const SecurityEventService = () => {
  const customEndpoints = {
    getByElasticsearchId: async ({
      elasticsearchId,
      initialDate,
      endDate,
    }: IQueryParams) =>
      (
        await AxiosClient.get<IAlert>(
          `${ROUTES.BRAGI.SECURITY_EVENT}/get_by_elasticsearch_id/${elasticsearchId}?initial_date=${initialDate}&end_date=${endDate}`
        )
      ).data,
    getEventsBelongingToAgent: async ({
      elasticsearchId,
      initialDate,
      endDate,
    }: IQueryParams) =>
      (
        await AxiosClient.post<IEvent[]>(
          `${ROUTES.BRAGI.SECURITY_EVENT}/get_events_belonging_to_agent/${elasticsearchId}`,
          {
            initialDate,
            endDate,
          }
        )
      ).data,
    getEventsByAgentAndVulnerability: async (
      agentId: string,
      vulnerability: IVulnerability
    ) =>
      (
        await AxiosClient.post<IEvent[]>(
          `${ROUTES.BRAGI.SECURITY_EVENT}/get_events_by_agent_and_vulnerability/${agentId}`,
          {
            ...vulnerability,
          }
        )
      ).data,
  };

  return {
    ...BaseService<IAlert>(ROUTES.BRAGI.SECURITY_EVENT),
    ...customEndpoints,
  };
};

export default SecurityEventService();
