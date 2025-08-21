import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ShippingInfoVO, ShippingInfoForm, ShippingInfoQuery } from '@/api/biz/shippingInfo/types';

/**
 * 查询物流信息列表
 * @param query
 * @returns {*}
 */

export const listShippingInfo = (query?: ShippingInfoQuery): AxiosPromise<ShippingInfoVO[]> => {
  return request({
    url: '/biz/shippingInfo/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询物流信息详细
 * @param id
 */
export const getShippingInfo = (id: string | number): AxiosPromise<ShippingInfoVO> => {
  return request({
    url: '/biz/shippingInfo/' + id,
    method: 'get'
  });
};

/**
 * 新增物流信息
 * @param data
 */
export const addShippingInfo = (data: ShippingInfoForm) => {
  return request({
    url: '/biz/shippingInfo',
    method: 'post',
    data: data
  });
};

/**
 * 修改物流信息
 * @param data
 */
export const updateShippingInfo = (data: ShippingInfoForm) => {
  return request({
    url: '/biz/shippingInfo',
    method: 'put',
    data: data
  });
};

/**
 * 删除物流信息
 * @param id
 */
export const delShippingInfo = (id: string | number | Array<string | number>) => {
  return request({
    url: '/biz/shippingInfo/' + id,
    method: 'delete'
  });
};
