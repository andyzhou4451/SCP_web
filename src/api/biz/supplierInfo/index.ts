import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { SupplierInfoVO, SupplierInfoForm, SupplierInfoQuery } from '@/api/biz/supplierInfo/types';

/**
 * 查询供应商信息列表
 * @param query
 * @returns {*}
 */

export const listSupplierInfo = (query?: SupplierInfoQuery): AxiosPromise<SupplierInfoVO[]> => {
  return request({
    url: '/biz/supplierInfo/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询供应商信息详细
 * @param id
 */
export const getSupplierInfo = (id: string | number): AxiosPromise<SupplierInfoVO> => {
  return request({
    url: '/biz/supplierInfo/' + id,
    method: 'get'
  });
};

/**
 * 新增供应商信息
 * @param data
 */
export const addSupplierInfo = (data: SupplierInfoForm) => {
  return request({
    url: '/biz/supplierInfo',
    method: 'post',
    data: data
  });
};

/**
 * 修改供应商信息
 * @param data
 */
export const updateSupplierInfo = (data: SupplierInfoForm) => {
  return request({
    url: '/biz/supplierInfo',
    method: 'put',
    data: data
  });
};

/**
 * 删除供应商信息
 * @param id
 */
export const delSupplierInfo = (id: string | number | Array<string | number>) => {
  return request({
    url: '/biz/supplierInfo/' + id,
    method: 'delete'
  });
};
