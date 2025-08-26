import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ChannelBrandRelVO, ChannelBrandRelForm, ChannelBrandRelQuery } from '@/api/biz/channelBrandRel/types';

/**
 * 查询销售渠道品牌对应关系列表
 * @param query
 * @returns {*}
 */

export const listChannelBrandRel = (query?: ChannelBrandRelQuery): AxiosPromise<ChannelBrandRelVO[]> => {
  return request({
    url: '/biz/channelBrandRel/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询销售渠道品牌对应关系详细
 * @param id
 */
export const getChannelBrandRel = (id: string | number): AxiosPromise<ChannelBrandRelVO> => {
  return request({
    url: '/biz/channelBrandRel/' + id,
    method: 'get'
  });
};

/**
 * 新增销售渠道品牌对应关系
 * @param data
 */
export const addChannelBrandRel = (data: ChannelBrandRelForm) => {
  return request({
    url: '/biz/channelBrandRel',
    method: 'post',
    data: data
  });
};

/**
 * 修改销售渠道品牌对应关系
 * @param data
 */
export const updateChannelBrandRel = (data: ChannelBrandRelForm) => {
  return request({
    url: '/biz/channelBrandRel',
    method: 'put',
    data: data
  });
};

/**
 * 删除销售渠道品牌对应关系
 * @param id
 */
export const delChannelBrandRel = (id: string | number | Array<string | number>) => {
  return request({
    url: '/biz/channelBrandRel/' + id,
    method: 'delete'
  });
};
