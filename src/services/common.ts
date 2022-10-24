import { request } from './axios.config'

const CLOUDINARY_URL = '/api/v2/dtc/schedule/systemUploadPic' //图片上传地址

export const common = {
  async uploadByQiniu(file: File | Blob): Promise<string> {
    console.log(file)
    const data = new FormData()
    data.append('uploadPic', file)
    data.append('extName', file.type.split('/')[1])

    const res: any = await request.post<string>(CLOUDINARY_URL, data)

    return res.result
  },

  uploadByUrl(url: string) {
    return request.get<string>('/upload/user/upload-by-url', {
      params: {
        url,
      },
    })
  },
  getMenu(): Promise<IAppMenuItem[]> {
    return Promise.resolve([
      {
        name: '数据模板',
        icon: 'bar-chart',
        isOpen: true,
        children: [
          {
            name: '数据模板',
            url: '/',
          },
        ],
      },
    ])
  },
  sendTestEmail(data: {
    toEmail: string
    subject: string
    html: string
    text: string
  }) {
    return request.post('/email/user/send', {
      to_email: data.toEmail,
      subject: data.subject,
      text: data.text,
      html: data.html,
    })
  },
}

export interface IAppMenuItem {
  name: string
  url?: string
  icon: string
  isOpen?: boolean
  children: IAppSubMenuItem[]
}

export interface IAppSubMenuItem {
  name: string
  url: string
  isOpen?: boolean
}
