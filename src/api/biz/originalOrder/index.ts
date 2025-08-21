import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { OriginalOrderVO, OriginalOrderForm, OriginalOrderQuery } from '@/api/biz/originalOrder/types';

/**
 * 查询原始销售订单列表
 * @param query
 * @returns {*}
 */

export const listOriginalOrder = (query?: OriginalOrderQuery): AxiosPromise<OriginalOrderVO[]> => {
  return request({
    url: '/biz/originalOrder/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询原始销售订单详细
 * @param id
 */
export const getOriginalOrder = (id: string | number): AxiosPromise<OriginalOrderVO> => {
  return request({
    url: '/biz/originalOrder/' + id,
    method: 'get'
  });
};

/**
 * 新增原始销售订单
 * @param data
 */
export const addOriginalOrder = (data: OriginalOrderForm) => {
  return request({
    url: '/biz/originalOrder',
    method: 'post',
    data: data
  });
};

/**
 * 修改原始销售订单
 * @param data
 */
export const updateOriginalOrder = (data: OriginalOrderForm) => {
  return request({
    url: '/biz/originalOrder',
    method: 'put',
    data: data
  });
};

/**
 * 删除原始销售订单
 * @param id
 */
export const delOriginalOrder = (id: string | number | Array<string | number>) => {
  return request({
    url: '/biz/originalOrder/' + id,
    method: 'delete'
  });
};
