import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ShoppeInfoVO, ShoppeInfoForm, ShoppeInfoQuery } from '@/api/biz/shoppeInfo/types';

/**
 * 查询店铺，管理各渠道下的店铺信息列表
 * @param query
 * @returns {*}
 */

export const listShoppeInfo = (query?: ShoppeInfoQuery): AxiosPromise<ShoppeInfoVO[]> => {
  return request({
    url: '/biz/shoppeInfo/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询店铺，管理各渠道下的店铺信息详细
 * @param id
 */
export const getShoppeInfo = (id: string | number): AxiosPromise<ShoppeInfoVO> => {
  return request({
    url: '/biz/shoppeInfo/' + id,
    method: 'get'
  });
};

/**
 * 新增店铺，管理各渠道下的店铺信息
 * @param data
 */
export const addShoppeInfo = (data: ShoppeInfoForm) => {
  return request({
    url: '/biz/shoppeInfo',
    method: 'post',
    data: data
  });
};

/**
 * 修改店铺，管理各渠道下的店铺信息
 * @param data
 */
export const updateShoppeInfo = (data: ShoppeInfoForm) => {
  return request({
    url: '/biz/shoppeInfo',
    method: 'put',
    data: data
  });
};

/**
 * 删除店铺，管理各渠道下的店铺信息
 * @param id
 */
export const delShoppeInfo = (id: string | number | Array<string | number>) => {
  return request({
    url: '/biz/shoppeInfo/' + id,
    method: 'delete'
  });
};
