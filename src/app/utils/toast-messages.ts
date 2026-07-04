export const CUSTOMER_MESSAGES = {
  LOAD_ERROR: 'Failed to load customers',
  ADD_SUCCESS: 'Customer added successfully',
  ADD_ERROR: 'Failed to add customer',
  UPDATE_SUCCESS: 'Customer updated successfully',
  UPDATE_ERROR: 'Failed to update customer',
  DELETE_SUCCESS: 'Customer deleted successfully',
  DELETE_ERROR: 'Failed to delete customer',
  NOT_FOUND: 'Customer not found',
} as const;

export const ORDER_MESSAGES = {
  LOAD_ERROR: 'Failed to load orders',
  ADD_SUCCESS: 'Order created successfully',
  ADD_ERROR: 'Failed to create order',
  UPDATE_SUCCESS: 'Order updated successfully',
  UPDATE_ERROR: 'Failed to update order',
  DELETE_SUCCESS: 'Order deleted successfully',
  DELETE_ERROR: 'Failed to delete order',
  NOT_FOUND: 'Order not found',
} as const;
