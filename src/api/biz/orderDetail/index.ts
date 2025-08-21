import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { OrderDetailVO, OrderDetailForm, OrderDetailQuery } from '@/api/biz/orderDetail/types';

/**
 * 查询订单明细列表
 * @param query
 * @returns {*}
 */

export const listOrderDetail = (query?: OrderDetailQuery): AxiosPromise<OrderDetailVO[]> => {
  return request({
    url: '/biz/orderDetail/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询订单明细详细
 * @param id
 */
export const getOrderDetail = (id: string | number): AxiosPromise<OrderDetailVO> => {
  return request({
    url: '/biz/orderDetail/' + id,
    method: 'get'
  });
};

/**
 * 新增订单明细
 * @param data
 */
export const addOrderDetail = (data: OrderDetailForm) => {
  return request({
    url: '/biz/orderDetail',
    method: 'post',
    data: data
  });
};

/**
 * 修改订单明细
 * @param data
 */
export const updateOrderDetail = (data: OrderDetailForm) => {
  return request({
    url: '/biz/orderDetail',
    method: 'put',
    data: data
  });
};

/**
 * 删除订单明细
 * @param id
 */
export const delOrderDetail = (id: string | number | Array<string | number>) => {
  return request({
    url: '/biz/orderDetail/' + id,
    method: 'delete'
  });
};
