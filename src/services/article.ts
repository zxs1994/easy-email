import { request } from './axios.config'
import { USER } from '@demo/constants'

export declare interface Template {
  templateId?: string
  title: string
  summary: string
  mjml: string
  html: string
  content: string
  picture: string
  originalLandingPageId?: string
  landingPageId?: string
}

export const article = {
  // 修改 - 推荐主题
  async editSystemLandingPage(data: Template) {
    return request.post<IArticle>(
      '/api/v2/dtc/easy-mail/editSystemLandingPage',
      data
    )
  },

  // 修改 - 我的主题
  async editMyLandingPage(data: Template) {
    return request.post<IArticle>('/api/v2/dtc/easy-mail/editLandingPage', {
      ...data,
    })
  },

  // 引用 - 推荐主题
  async addLandingPage(data: Template) {
    return request.post<IArticle>('/api/v2/dtc/easy-mail/addLandingPage', {
      ...data,
    })
  },

  // 另存为 || 添加 - 我的主题
  async saveAsLandingPage(data: Template) {
    return request.post<IArticle>('/api/v2/dtc/easy-mail/saveAsLandingPage', {
      ...data,
    })
  },

  // 添加 - 推荐主题
  async addSystemLandingPage(data: Template) {
    return request.post<IArticle>(
      '/api/v2/dtc/easy-mail/addSystemLandingPage',
      data
    )
  },

  // 查询 - 模板
  async getArticle(templateId: number | string) {
    return request.get<IArticle>('/api/v2/dtc/easy-mail/getSystemLandingPage', {
      params: {
        templateId,
      },
    })
  },

  // 查询 - 我的主题
  // async getMyLandingPage(id: number | string): Promise<IArticle> {
  //   return request.get<IArticle>('/api/v2/dtc/easy-mail/getMyLandingPage', {
  //     params: {
  //       templateId: id,
  //     },
  //   })
  // },

  // 替换链接
  async getShortUrl(data: {
    longURL: string
    id: string
    type: string
  }): Promise<string> {
    try {
      return (
        await request.get<any>('/api/v2/dtc/easy-mail/getShortUrl', {
          params: data,
        })
      ).result.data
    } catch (e) {
      return data.longURL
    }
  },

  // 获取id
  async getId() {
    return (await request.get<string>('/api/v2/dtc/easy-mail/getId')).result
  },
}

export interface ListResponse<T> {
  list: T[]
  count: number
}

interface content {
  content: string
}

export interface IArticle {
  templateId: string
  subTitle: string
  subject: string
  updated_at: string
  created_at: string
  content: content
}
