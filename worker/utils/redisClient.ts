import { Redis } from "ioredis";
import JSONCache from 'redis-json';

const client = new Redis() as any;

interface Data {
    status: string,
    id: string,
    stdout: string | undefined,
    stderr: string | undefined
}

const jsonCache = new JSONCache<any>(client, { prefix: 'data:' });

export const setData = async (data: any, id: string) => {
    try {
        const result = await jsonCache.set(`output:${id}`, data, { expire: 3600 }); //3600 seconds (1hrs);
    } catch (e: any) {
        throw e;
    }
}

export const getData = async (id: string) => {
    try {
        const result = await jsonCache.get(`output:${id}`);
        return result;
    } catch (e: any) {
        throw e;
    }
}