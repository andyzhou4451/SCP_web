import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ChannelClassificationVO, ChannelClassificationForm, ChannelClassificationQuery } from '@/api/biz/channelClassification/types';

/**
 * 查询渠道对应分类列表
 * @param query
 * @returns {*}
 */

export const listChannelClassification = (query?: ChannelClassificationQuery): AxiosPromise<ChannelClassificationVO[]> => {
  return request({
    url: '/biz/channelClassification/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询渠道对应分类详细
 * @param id
 */
export const getChannelClassification = (id: string | number): AxiosPromise<ChannelClassificationVO> => {
  return request({
    url: '/biz/channelClassification/' + id,
    method: 'get'
  });
};

/**
 * 新增渠道对应分类
 * @param data
 */
export const addChannelClassification = (data: ChannelClassificationForm) => {
  return request({
    url: '/biz/channelClassification',
    method: 'post',
    data: data
  });
};

/**
 * 修改渠道对应分类
 * @param data
 */
export const updateChannelClassification = (data: ChannelClassificationForm) => {
  return request({
    url: '/biz/channelClassification',
    method: 'put',
    data: data
  });
};

/**
 * 删除渠道对应分类
 * @param id
 */
export const delChannelClassification = (id: string | number | Array<string | number>) => {
  return request({
    url: '/biz/channelClassification/' + id,
    method: 'delete'
  });
};
