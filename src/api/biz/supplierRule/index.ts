import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { SupplierRuleVO, SupplierRuleForm, SupplierRuleQuery } from '@/api/biz/supplierRule/types';

/**
 * 查询供应商规则列表
 * @param query
 * @returns {*}
 */

export const listSupplierRule = (query?: SupplierRuleQuery): AxiosPromise<SupplierRuleVO[]> => {
  return request({
    url: '/biz/supplierRule/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询供应商规则详细
 * @param id
 */
export const getSupplierRule = (id: string | number): AxiosPromise<SupplierRuleVO> => {
  return request({
    url: '/biz/supplierRule/' + id,
    method: 'get'
  });
};

/**
 * 新增供应商规则
 * @param data
 */
export const addSupplierRule = (data: SupplierRuleForm) => {
  return request({
    url: '/biz/supplierRule',
    method: 'post',
    data: data
  });
};

/**
 * 修改供应商规则
 * @param data
 */
export const updateSupplierRule = (data: SupplierRuleForm) => {
  return request({
    url: '/biz/supplierRule',
    method: 'put',
    data: data
  });
};

/**
 * 删除供应商规则
 * @param id
 */
export const delSupplierRule = (id: string | number | Array<string | number>) => {
  return request({
    url: '/biz/supplierRule/' + id,
    method: 'delete'
  });
};
