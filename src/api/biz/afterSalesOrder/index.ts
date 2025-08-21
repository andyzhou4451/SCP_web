import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { AfterSalesOrderVO, AfterSalesOrderForm, AfterSalesOrderQuery } from '@/api/biz/afterSalesOrder/types';

/**
 * 查询售后订单列表
 * @param query
 * @returns {*}
 */

export const listAfterSalesOrder = (query?: AfterSalesOrderQuery): AxiosPromise<AfterSalesOrderVO[]> => {
  return request({
    url: '/biz/afterSalesOrder/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询售后订单详细
 * @param id
 */
export const getAfterSalesOrder = (id: string | number): AxiosPromise<AfterSalesOrderVO> => {
  return request({
    url: '/biz/afterSalesOrder/' + id,
    method: 'get'
  });
};

/**
 * 新增售后订单
 * @param data
 */
export const addAfterSalesOrder = (data: AfterSalesOrderForm) => {
  return request({
    url: '/biz/afterSalesOrder',
    method: 'post',
    data: data
  });
};

/**
 * 修改售后订单
 * @param data
 */
export const updateAfterSalesOrder = (data: AfterSalesOrderForm) => {
  return request({
    url: '/biz/afterSalesOrder',
    method: 'put',
    data: data
  });
};

/**
 * 删除售后订单
 * @param id
 */
export const delAfterSalesOrder = (id: string | number | Array<string | number>) => {
  return request({
    url: '/biz/afterSalesOrder/' + id,
    method: 'delete'
  });
};
