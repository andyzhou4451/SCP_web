import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { SupplierWarehouseRelVO, SupplierWarehouseRelForm, SupplierWarehouseRelQuery } from '@/api/biz/supplierWarehouseRel/types';

/**
 * 查询供应商与仓库关联列表
 * @param query
 * @returns {*}
 */

export const listSupplierWarehouseRel = (query?: SupplierWarehouseRelQuery): AxiosPromise<SupplierWarehouseRelVO[]> => {
  return request({
    url: '/biz/supplierWarehouseRel/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询供应商与仓库关联详细
 * @param id
 */
export const getSupplierWarehouseRel = (id: string | number): AxiosPromise<SupplierWarehouseRelVO> => {
  return request({
    url: '/biz/supplierWarehouseRel/' + id,
    method: 'get'
  });
};

/**
 * 新增供应商与仓库关联
 * @param data
 */
export const addSupplierWarehouseRel = (data: SupplierWarehouseRelForm) => {
  return request({
    url: '/biz/supplierWarehouseRel',
    method: 'post',
    data: data
  });
};

/**
 * 修改供应商与仓库关联
 * @param data
 */
export const updateSupplierWarehouseRel = (data: SupplierWarehouseRelForm) => {
  return request({
    url: '/biz/supplierWarehouseRel',
    method: 'put',
    data: data
  });
};

/**
 * 删除供应商与仓库关联
 * @param id
 */
export const delSupplierWarehouseRel = (id: string | number | Array<string | number>) => {
  return request({
    url: '/biz/supplierWarehouseRel/' + id,
    method: 'delete'
  });
};
