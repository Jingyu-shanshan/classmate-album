export interface RequestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  header?: Record<string, string>;
}

export interface ResponseData<T = any> {
  code: number;
  data: T;
  message: string;
} 