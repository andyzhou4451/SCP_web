-- 菜单 SQL
insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values(${table.menuIds[0]}, 'spu信息', '1957371730600726529', '1', 'goodsSpu', 'biz/goodsSpu/index', 1, 0, 'C', '0', '0', 'biz:goodsSpu:list', '#', 103, 1, sysdate(), null, null, 'spu信息菜单');

-- 按钮 SQL
insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values(${table.menuIds[1]}, 'spu信息查询', ${table.menuIds[0]}, '1',  '#', '', 1, 0, 'F', '0', '0', 'biz:goodsSpu:query',        '#', 103, 1, sysdate(), null, null, '');

insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values(${table.menuIds[2]}, 'spu信息新增', ${table.menuIds[0]}, '2',  '#', '', 1, 0, 'F', '0', '0', 'biz:goodsSpu:add',          '#', 103, 1, sysdate(), null, null, '');

insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values(${table.menuIds[3]}, 'spu信息修改', ${table.menuIds[0]}, '3',  '#', '', 1, 0, 'F', '0', '0', 'biz:goodsSpu:edit',         '#', 103, 1, sysdate(), null, null, '');

insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values(${table.menuIds[4]}, 'spu信息删除', ${table.menuIds[0]}, '4',  '#', '', 1, 0, 'F', '0', '0', 'biz:goodsSpu:remove',       '#', 103, 1, sysdate(), null, null, '');

insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values(${table.menuIds[5]}, 'spu信息导出', ${table.menuIds[0]}, '5',  '#', '', 1, 0, 'F', '0', '0', 'biz:goodsSpu:export',       '#', 103, 1, sysdate(), null, null, '');
