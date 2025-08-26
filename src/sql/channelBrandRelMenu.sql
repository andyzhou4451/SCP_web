-- 菜单 SQL
insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values(${table.menuIds[0]}, '销售渠道品牌对应关系', '3', '1', 'channelBrandRel', 'biz/channelBrandRel/index', 1, 0, 'C', '0', '0', 'biz:channelBrandRel:list', '#', 103, 1, sysdate(), null, null, '销售渠道品牌对应关系菜单');

-- 按钮 SQL
insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values(${table.menuIds[1]}, '销售渠道品牌对应关系查询', ${table.menuIds[0]}, '1',  '#', '', 1, 0, 'F', '0', '0', 'biz:channelBrandRel:query',        '#', 103, 1, sysdate(), null, null, '');

insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values(${table.menuIds[2]}, '销售渠道品牌对应关系新增', ${table.menuIds[0]}, '2',  '#', '', 1, 0, 'F', '0', '0', 'biz:channelBrandRel:add',          '#', 103, 1, sysdate(), null, null, '');

insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values(${table.menuIds[3]}, '销售渠道品牌对应关系修改', ${table.menuIds[0]}, '3',  '#', '', 1, 0, 'F', '0', '0', 'biz:channelBrandRel:edit',         '#', 103, 1, sysdate(), null, null, '');

insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values(${table.menuIds[4]}, '销售渠道品牌对应关系删除', ${table.menuIds[0]}, '4',  '#', '', 1, 0, 'F', '0', '0', 'biz:channelBrandRel:remove',       '#', 103, 1, sysdate(), null, null, '');

insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values(${table.menuIds[5]}, '销售渠道品牌对应关系导出', ${table.menuIds[0]}, '5',  '#', '', 1, 0, 'F', '0', '0', 'biz:channelBrandRel:export',       '#', 103, 1, sysdate(), null, null, '');
