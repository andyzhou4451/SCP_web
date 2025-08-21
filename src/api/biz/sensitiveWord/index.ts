import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { SensitiveWordVO, SensitiveWordForm, SensitiveWordQuery } from '@/api/biz/sensitiveWord/types';

/**
 * 查询敏感词管理列表
 * @param query
 * @returns {*}
 */

export const listSensitiveWord = (query?: SensitiveWordQuery): AxiosPromise<SensitiveWordVO[]> => {
  return request({
    url: '/biz/sensitiveWord/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询敏感词管理详细
 * @param id
 */
export const getSensitiveWord = (id: string | number): AxiosPromise<SensitiveWordVO> => {
  return request({
    url: '/biz/sensitiveWord/' + id,
    method: 'get'
  });
};

/**
 * 新增敏感词管理
 * @param data
 */
export const addSensitiveWord = (data: SensitiveWordForm) => {
  return request({
    url: '/biz/sensitiveWord',
    method: 'post',
    data: data
  });
};

/**
 * 修改敏感词管理
 * @param data
 */
export const updateSensitiveWord = (data: SensitiveWordForm) => {
  return request({
    url: '/biz/sensitiveWord',
    method: 'put',
    data: data
  });
};

/**
 * 删除敏感词管理
 * @param id
 */
export const delSensitiveWord = (id: string | number | Array<string | number>) => {
  return request({
    url: '/biz/sensitiveWord/' + id,
    method: 'delete'
  });
};
