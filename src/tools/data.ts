/**
 * 处理body数据
 */
import { isObject } from './utils';

export function transformRequest(data:any):any{
    return isObject(data) ? JSON.stringify(data) : data;
}