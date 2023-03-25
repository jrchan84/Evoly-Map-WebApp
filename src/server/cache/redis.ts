import { createClient, ClientClosedError } from 'redis';
import { Dataset } from '../../shared/models/dataset';

export class RedisCache {
    private client: any;

    constructor() {
        this.client = createClient({
            socket: {
                host: process.env.REDIS_HOST,
                port: parseInt(process.env.REDIS_PORT ?? '6379')
            },
            password: process.env.REDIS_PASSWORD
        });
    }

    public getDatasetFromCache(key: string): Promise<string[] | null> {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err: Error | null, result: string[] | null) => {
                if (err) {
                    reject(err);
                } else if (this.client.connected) {
                resolve(result);
                } else {
                    reject(new ClientClosedError());
                }
            });
        });
    }

    public setDatasetInCache(key: string, value: string[], ttl = 300): Promise<void> {
        return new Promise((resolve, reject) => {
        this.client.setex(key, ttl, value, (err: Error | null) => {
            if (err) {
                reject(err);
            } else if (this.client.connected) {
                resolve();
            } else {
                reject(new ClientClosedError());
            }
        });
        });
    }

    public getDatasetByIdFromCache(key: string): Promise<string | null> {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err: Error | null, result: string | null) => {
                if (err) {
                    reject(err);
                } else if (this.client.connected) {
                    resolve(JSON.parse(result!));
                } else {
                    reject(new ClientClosedError());
                }
            });
        });
    }

    public setDatasetByIdInCache(key: string, dataset: Dataset, ttl = 300): Promise<void> {
        return new Promise((resolve, reject) => {
        this.client.setex(key, ttl, JSON.stringify(dataset), (err: Error | null) => {
            if (err) {
                reject(err);
            } else if (this.client.connected) {
                resolve();
            } else {
                reject(new ClientClosedError());
            }
        });
        });
    }
}