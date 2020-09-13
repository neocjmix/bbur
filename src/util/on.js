export const on = (type, handler) => e => e.detail.type === type && handler(e);
