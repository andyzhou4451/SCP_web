-- 菜单 SQL
insert into sys_menu ( menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values( '外部订单交互日志', '1955527629561323522', '1', 'orderLog', 'biz/orderLog/index', 1, 0, 'C', '0', '0', 'biz:orderLog:list', '#', 103, 1, sysdate(), null, null, '外部订单交互日志菜单');

-- 按钮 SQL
insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values(${table.menuIds[1]}, '外部订单交互日志查询', ${table.menuIds[0]}, '1',  '#', '', 1, 0, 'F', '0', '0', 'biz:orderLog:query',        '#', 103, 1, sysdate(), null, null, '');

insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values(${table.menuIds[2]}, '外部订单交互日志新增', ${table.menuIds[0]}, '2',  '#', '', 1, 0, 'F', '0', '0', 'biz:orderLog:add',          '#', 103, 1, sysdate(), null, null, '');

insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values(${table.menuIds[3]}, '外部订单交互日志修改', ${table.menuIds[0]}, '3',  '#', '', 1, 0, 'F', '0', '0', 'biz:orderLog:edit',         '#', 103, 1, sysdate(), null, null, '');

insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values(${table.menuIds[4]}, '外部订单交互日志删除', ${table.menuIds[0]}, '4',  '#', '', 1, 0, 'F', '0', '0', 'biz:orderLog:remove',       '#', 103, 1, sysdate(), null, null, '');

insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_dept, create_by, create_time, update_by, update_time, remark)
values(${table.menuIds[5]}, '外部订单交互日志导出', ${table.menuIds[0]}, '5',  '#', '', 1, 0, 'F', '0', '0', 'biz:orderLog:export',       '#', 103, 1, sysdate(), null, null, '');
