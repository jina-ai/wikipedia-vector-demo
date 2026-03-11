import { HTTPService } from 'civkit/http';
import { RetryAgent, Agent } from 'undici';

export class ElasticSearchAPI extends HTTPService {

    constructor(esNode: string, apiKey: string) {
        super(esNode);
        if (apiKey) {
            this.baseOptions.headers = {
                Accept: 'application/json',
                Authorization: `ApiKey ${apiKey}`,
            };
        }

        this.baseOptions.timeout = 180_000;
        this.baseOptions.dispatcher = new RetryAgent(new Agent(), {
            statusCodes: [429, 503, 500],
            maxRetries: 300,
            retryAfter: true,
            minTimeout: 1000,
        }) as any;
    }

}