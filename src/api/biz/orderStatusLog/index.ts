import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { OrderStatusLogVO, OrderStatusLogForm, OrderStatusLogQuery } from '@/api/biz/orderStatusLog/types';

/**
 * 查询订单状态变更日志列表
 * @param query
 * @returns {*}
 */

export const listOrderStatusLog = (query?: OrderStatusLogQuery): AxiosPromise<OrderStatusLogVO[]> => {
  return request({
    url: '/biz/orderStatusLog/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询订单状态变更日志详细
 * @param id
 */
export const getOrderStatusLog = (id: string | number): AxiosPromise<OrderStatusLogVO> => {
  return request({
    url: '/biz/orderStatusLog/' + id,
    method: 'get'
  });
};

/**
 * 新增订单状态变更日志
 * @param data
 */
export const addOrderStatusLog = (data: OrderStatusLogForm) => {
  return request({
    url: '/biz/orderStatusLog',
    method: 'post',
    data: data
  });
};

/**
 * 修改订单状态变更日志
 * @param data
 */
export const updateOrderStatusLog = (data: OrderStatusLogForm) => {
  return request({
    url: '/biz/orderStatusLog',
    method: 'put',
    data: data
  });
};

/**
 * 删除订单状态变更日志
 * @param id
 */
export const delOrderStatusLog = (id: string | number | Array<string | number>) => {
  return request({
    url: '/biz/orderStatusLog/' + id,
    method: 'delete'
  });
};
