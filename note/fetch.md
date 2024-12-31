## fetch 封装

```ts
interface RequestConfig<TData = unknown> extends Omit<RequestInit, 'body'> {
  params?: Record<string, string>
  data?: TData
}

// 统一接口规范，泛型TData使返回数据类型可配置
interface ApiResponse<TData> {
  code: number
  data: TData
  message: string
}

// 使用类支持多个服务
class Http {
  private baseURL: string

  constructor(baseURL: string = '') {
    this.baseURL = baseURL
  }

  async request<TResponse, TData = unknown>(
    endpoint: string,
    config: RequestConfig<TData> = {}
  ): Promise<ApiResponse<TResponse>> {
    const { params, data, headers = {}, method = 'GET', ...rest } = config

    // 处理 URL 参数
    const queryString = params ? `?${new URLSearchParams(params)}` : ''
    const url = `${this.baseURL}${endpoint}${queryString}`

    // 处理请求头
    const contentType = data ? { 'Content-Type': 'application/json' } : {}
    const finalHeaders = { ...contentType, ...headers } as HeadersInit

    // 统一错误处理
    try {
      const response = await fetch(url, {
        method,
        headers: finalHeaders,
        body: data ? JSON.stringify(data) : null,
        ...rest
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      return result as ApiResponse<TResponse>
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('An unknown error occurred')
    }
  }

  get<TResponse>(
    endpoint: string,
    config?: Omit<RequestConfig, 'data' | 'method'>
  ) {
    return this.request<TResponse>(endpoint, { ...config, method: 'GET' })
  }

  post<TResponse, TData = unknown>(
    endpoint: string,
    data?: TData,
    config?: Omit<RequestConfig, 'data' | 'method'>
  ) {
    return this.request<TResponse, TData>(endpoint, {
      ...config,
      data,
      method: 'POST'
    })
  }

  put<TResponse, TData = unknown>(
    endpoint: string,
    data?: TData,
    config?: Omit<RequestConfig, 'data' | 'method'>
  ) {
    return this.request<TResponse, TData>(endpoint, {
      ...config,
      data,
      method: 'PUT'
    })
  }

  delete<TResponse>(
    endpoint: string,
    config?: Omit<RequestConfig, 'data' | 'method'>
  ) {
    return this.request<TResponse>(endpoint, { ...config, method: 'DELETE' })
  }
}

// 创建实例
export const http = new Http(process.env.NEXT_PUBLIC_API_BASE_URL)

// 使用示例:

/*
interface User {
  id: number
  name: string
}

// GET 请求
const getUser = async (id: string) => {
  const response = await http.get<User>(`/users/${id}`)
  return response.data
}

// POST 请求
const createUser = async (userData: Partial<User>) => {
  const response = await http.post<User, Partial<User>>('/users', userData)
  return response.data
}
*/
```

## 支持 ISR

## swr 和 fetch
