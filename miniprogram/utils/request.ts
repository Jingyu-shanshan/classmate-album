import { RequestOptions } from '../types/request';

const BASE_URL = 'https://api.example.com'; // 替换为你的实际API地址

const request = (options: RequestOptions) => {
  return new Promise((resolve, reject) => {
    const { url, method = 'GET', data, header = {} } = options;
    
    wx.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      header: {
        'content-type': 'application/json',
        ...header,
      },
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else {
          reject(res);
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};

export const http = {
  get: (url: string, data?: any, header?: any) => 
    request({ url, method: 'GET', data, header }),
  
  post: (url: string, data?: any, header?: any) => 
    request({ url, method: 'POST', data, header }),
  
  put: (url: string, data?: any, header?: any) => 
    request({ url, method: 'PUT', data, header }),
  
  delete: (url: string, data?: any, header?: any) => 
    request({ url, method: 'DELETE', data, header })
}; 