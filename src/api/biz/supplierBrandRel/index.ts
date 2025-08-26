import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { SupplierBrandRelVO, SupplierBrandRelForm, SupplierBrandRelQuery } from '@/api/biz/supplierBrandRel/types';

/**
 * 查询供应商品牌对应关系列表
 * @param query
 * @returns {*}
 */

export const listSupplierBrandRel = (query?: SupplierBrandRelQuery): AxiosPromise<SupplierBrandRelVO[]> => {
  return request({
    url: '/biz/supplierBrandRel/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询供应商品牌对应关系详细
 * @param id
 */
export const getSupplierBrandRel = (id: string | number): AxiosPromise<SupplierBrandRelVO> => {
  return request({
    url: '/biz/supplierBrandRel/' + id,
    method: 'get'
  });
};

/**
 * 新增供应商品牌对应关系
 * @param data
 */
export const addSupplierBrandRel = (data: SupplierBrandRelForm) => {
  return request({
    url: '/biz/supplierBrandRel',
    method: 'post',
    data: data
  });
};

/**
 * 修改供应商品牌对应关系
 * @param data
 */
export const updateSupplierBrandRel = (data: SupplierBrandRelForm) => {
  return request({
    url: '/biz/supplierBrandRel',
    method: 'put',
    data: data
  });
};

/**
 * 删除供应商品牌对应关系
 * @param id
 */
export const delSupplierBrandRel = (id: string | number | Array<string | number>) => {
  return request({
    url: '/biz/supplierBrandRel/' + id,
    method: 'delete'
  });
};
