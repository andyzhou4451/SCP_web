import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { AfterSalesOrderDetailVO, AfterSalesOrderDetailForm, AfterSalesOrderDetailQuery } from '@/api/biz/afterSalesOrderDetail/types';

/**
 * 查询售后订单明细列表
 * @param query
 * @returns {*}
 */

export const listAfterSalesOrderDetail = (query?: AfterSalesOrderDetailQuery): AxiosPromise<AfterSalesOrderDetailVO[]> => {
  return request({
    url: '/biz/afterSalesOrderDetail/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询售后订单明细详细
 * @param id
 */
export const getAfterSalesOrderDetail = (id: string | number): AxiosPromise<AfterSalesOrderDetailVO> => {
  return request({
    url: '/biz/afterSalesOrderDetail/' + id,
    method: 'get'
  });
};

/**
 * 新增售后订单明细
 * @param data
 */
export const addAfterSalesOrderDetail = (data: AfterSalesOrderDetailForm) => {
  return request({
    url: '/biz/afterSalesOrderDetail',
    method: 'post',
    data: data
  });
};

/**
 * 修改售后订单明细
 * @param data
 */
export const updateAfterSalesOrderDetail = (data: AfterSalesOrderDetailForm) => {
  return request({
    url: '/biz/afterSalesOrderDetail',
    method: 'put',
    data: data
  });
};

/**
 * 删除售后订单明细
 * @param id
 */
export const delAfterSalesOrderDetail = (id: string | number | Array<string | number>) => {
  return request({
    url: '/biz/afterSalesOrderDetail/' + id,
    method: 'delete'
  });
};
