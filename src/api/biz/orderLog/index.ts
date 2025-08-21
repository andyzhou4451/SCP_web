import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { OrderLogVO, OrderLogForm, OrderLogQuery } from '@/api/biz/orderLog/types';

/**
 * 查询外部订单交互日志列表
 * @param query
 * @returns {*}
 */

export const listOrderLog = (query?: OrderLogQuery): AxiosPromise<OrderLogVO[]> => {
  return request({
    url: '/biz/orderLog/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询外部订单交互日志详细
 * @param id
 */
export const getOrderLog = (id: string | number): AxiosPromise<OrderLogVO> => {
  return request({
    url: '/biz/orderLog/' + id,
    method: 'get'
  });
};

/**
 * 新增外部订单交互日志
 * @param data
 */
export const addOrderLog = (data: OrderLogForm) => {
  return request({
    url: '/biz/orderLog',
    method: 'post',
    data: data
  });
};

/**
 * 修改外部订单交互日志
 * @param data
 */
export const updateOrderLog = (data: OrderLogForm) => {
  return request({
    url: '/biz/orderLog',
    method: 'put',
    data: data
  });
};

/**
 * 删除外部订单交互日志
 * @param id
 */
export const delOrderLog = (id: string | number | Array<string | number>) => {
  return request({
    url: '/biz/orderLog/' + id,
    method: 'delete'
  });
};
