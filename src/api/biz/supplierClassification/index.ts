import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { SupplierClassificationVO, SupplierClassificationForm, SupplierClassificationQuery } from '@/api/biz/supplierClassification/types';

/**
 * 查询供应商对应分类列表
 * @param query
 * @returns {*}
 */

export const listSupplierClassification = (query?: SupplierClassificationQuery): AxiosPromise<SupplierClassificationVO[]> => {
  return request({
    url: '/biz/supplierClassification/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询供应商对应分类详细
 * @param id
 */
export const getSupplierClassification = (id: string | number): AxiosPromise<SupplierClassificationVO> => {
  return request({
    url: '/biz/supplierClassification/' + id,
    method: 'get'
  });
};

/**
 * 新增供应商对应分类
 * @param data
 */
export const addSupplierClassification = (data: SupplierClassificationForm) => {
  return request({
    url: '/biz/supplierClassification',
    method: 'post',
    data: data
  });
};

/**
 * 修改供应商对应分类
 * @param data
 */
export const updateSupplierClassification = (data: SupplierClassificationForm) => {
  return request({
    url: '/biz/supplierClassification',
    method: 'put',
    data: data
  });
};

/**
 * 删除供应商对应分类
 * @param id
 */
export const delSupplierClassification = (id: string | number | Array<string | number>) => {
  return request({
    url: '/biz/supplierClassification/' + id,
    method: 'delete'
  });
};
