import { retry } from 'civkit';
import { HTTPService } from 'civkit/http';
import { RetryAgent, Agent } from 'undici';


export interface JinaEmbeddingsResponse<T extends number[] | string = number[]> {
    model: string;
    object: string;
    usage: {
        total_tokens: number;
    };
    data: {
        object: string;
        index: number;
        embedding: T;
    }[];
}

export interface JinaReRankResponse {
    model: string;
    object: string;
    usage: {
        total_tokens: number;
    };
    results: { index: number; relevance_score: number; }[];
}


export class JinaEmbeddingsAPI extends HTTPService {

    constructor(apiKey: string) {
        super('https://api.jina.ai');
        if (apiKey) {
            this.baseOptions.headers = {
                Accept: 'application/json',
                Authorization: `Bearer ${apiKey}`,
            };
        }

        this.baseOptions.timeout = 180_000;
        this.baseOptions.dispatcher = new RetryAgent(new Agent(), {
            statusCodes: [429, 503],
            maxRetries: 60,
            retryAfter: true,
            minTimeout: 500,
        }) as any;
    }

    @retry(2)
    async embedText(texts: string[], model: string, task?: string) {
        const r = await this.postJson<JinaEmbeddingsResponse<string>>('/v1/embeddings', {
            model,
            task,
            truncate: true,
            normalized: true,
            embedding_type: 'base64',
            input: texts,
        });

        return r.data;
    }

    @retry(2)
    async reRankTexts(query: string, texts: string[], model: string) {
        const r = await this.postJson<JinaReRankResponse>('/v1/rerank', {
            model,
            query,
            top_n: texts.length,
            documents: texts,
            max_doc_length: 2048,
            truncate: true,
            return_documents: false,
        });

        return r.data;
    }

}
