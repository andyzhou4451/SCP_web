import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import {
  WarehouseInfoVO,
  WarehouseInfoForm,
  WarehouseInfoQuery,
  WarehouseSimpleQuery
} from '@/api/biz/warehouseInfo/types';

/**
 * 查询仓库，用于维护仓库信息列表
 * @param query
 * @returns {*}
 */

export const listWarehouseInfo = (query?: WarehouseInfoQuery): AxiosPromise<WarehouseInfoVO[]> => {
  return request({
    url: '/biz/warehouseInfo/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询仓库，用于维护仓库信息列表
 * @param query
 * @returns {*}
 */

export const listAllWarehouseInfo = (query?: WarehouseSimpleQuery): AxiosPromise<WarehouseInfoVO[]> => {
  return request({
    url: '/biz/warehouseInfo/all',
    method: 'post',
    data: query
  });
};

/**
 * 查询仓库，用于维护仓库信息详细
 * @param id
 */
export const getWarehouseInfo = (id: string | number): AxiosPromise<WarehouseInfoVO> => {
  return request({
    url: '/biz/warehouseInfo/' + id,
    method: 'get'
  });
};

/**
 * 新增仓库，用于维护仓库信息
 * @param data
 */
export const addWarehouseInfo = (data: WarehouseInfoForm) => {
  return request({
    url: '/biz/warehouseInfo',
    method: 'post',
    data: data
  });
};

/**
 * 修改仓库，用于维护仓库信息
 * @param data
 */
export const updateWarehouseInfo = (data: WarehouseInfoForm) => {
  return request({
    url: '/biz/warehouseInfo',
    method: 'put',
    data: data
  });
};

/**
 * 删除仓库，用于维护仓库信息
 * @param id
 */
export const delWarehouseInfo = (id: string | number | Array<string | number>) => {
  return request({
    url: '/biz/warehouseInfo/' + id,
    method: 'delete'
  });
};
