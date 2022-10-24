import { article, IArticle } from '@demo/services/article'
import createSliceState from './common/createSliceState'
import { Message } from '@arco-design/web-react'
import { history } from '@demo/utils/history'
import { emailToImage } from '@demo/utils/emailToImage'
import {
  IBlockData,
  BlockManager,
  BasicType,
  JsonToMjml,
} from 'easy-email-core'
import { IEmailTemplate } from 'easy-email-editor'
import mjml from 'mjml-browser'

export function getAdaptor(data): IEmailTemplate {
  let content
  if (typeof data.content === 'string') {
    content = JSON.parse(data.content) as IBlockData
  } else {
    content = data.content as IBlockData
  }
  return {
    ...data,
    content,
    subject: data.title,
    subTitle: data.summary,
  }
}

export default createSliceState({
  name: 'template',
  initialState: null as IEmailTemplate | null,
  reducers: {
    set: (state, action) => {
      return action.payload
    },
  },
  effects: {
    // fetchByTemplateId: async (
    //   state,
    //   {
    //     id,
    //     userId,
    //   }: {
    //     id: number;
    //     userId: number;
    //   }
    // ) => {
    //   try {
    //     let data = await getTemplate(id);
    //     if (!data) {
    //       data = await article.getArticle(id, userId);
    //     }
    //     return getAdaptor(data);
    //   } catch (error) {
    //     history.replace('/');
    //     throw error;
    //   }
    // },
    fetchByTemplateId: async (
      state,
      data: {
        templateId: string
      }
    ) => {
      try {
        let res = await article.getArticle(data.templateId)
        return getAdaptor(res.result)
      } catch (error) {
        // history.replace('/')
        throw error
      }
    },
    fetchDefaultTemplate: async state => {
      return {
        subject: getTime(),
        subTitle: 'Nice to meet you!',
        content: BlockManager.getBlockByType(BasicType.PAGE).create({}),
      } as IEmailTemplate
    },
    // create: async (
    //   state,
    //   payload: {
    //     template: IEmailTemplate;
    //     success: (id: number, data: IEmailTemplate) => void;
    //   }
    // ) => {
    //   const picture = await emailToImage(payload.template.content);
    //   const data = await article.addArticle({
    //     picture,
    //     summary: payload.template.subTitle,
    //     title: payload.template.subject,
    //     content: JSON.stringify(payload.template.content),
    //   });
    //   payload.success(data.article_id, getAdaptor(data));
    //   return { ...data, ...payload.template };
    // },
    create: async (
      state,
      payload: {
        template: IEmailTemplate
        type: 'system' | 'my'
        success: (templateId: string, data: IEmailTemplate) => void
      }
    ) => {
      const templateId = await article.getId()
      let content = payload.template.content
      if (payload.type === 'my') {
        content = await format(payload.template.content, templateId)
      }
      const mjmlData = JsonToMjml({
        data: content,
        mode: 'production',
        context: payload.template.content,
      })
      const html = mjml(mjmlData).html
      const picture = await emailToImage(html)
      const query = {
        picture,
        summary: payload.template.subTitle,
        title: payload.template.subject,
        content: JSON.stringify(payload.template.content),
        html: window.btoa(unescape(encodeURIComponent(html))),
        mjml: window.btoa(unescape(encodeURIComponent(mjmlData))),
        landingPageId: templateId,
      }
      // console.log(b, null, 1);
      let res
      if (payload.type === 'system') {
        res = await article.addSystemLandingPage(query)
      } else {
        res = await article.saveAsLandingPage(query)
      }
      if (res.code != 0) {
        // Message.error(res.msg)
      } else {
        payload.success(res.result.templateId, getAdaptor(query))
      }
      return { templateId, ...payload.template }
    },
    saveCopyAs: async (
      state,
      payload: {
        originalLandingPageId: string
        from?: 'system' | 'my'
        template: IEmailTemplate
        success: (id: string, data: IEmailTemplate) => void
      }
    ) => {
      const templateId = await article.getId()
      let content = await format(payload.template.content, templateId)
      const mjmlData = JsonToMjml({
        data: content,
        mode: 'production',
        context: payload.template.content,
      })
      const html = mjml(mjmlData).html
      const picture = await emailToImage(html)
      const query = {
        picture,
        summary: payload.template.subTitle,
        title: payload.template.subject,
        content: JSON.stringify(payload.template.content),
        html: window.btoa(unescape(encodeURIComponent(html))),
        mjml: window.btoa(unescape(encodeURIComponent(mjmlData))),
        landingPageId: templateId,
        originalLandingPageId: payload.originalLandingPageId,
      }
      const res = await article.saveAsLandingPage(query)
      if (res.code != 0) {
        // Message.error(res.msg)
      } else {
        payload.success(res.result.templateId, getAdaptor(query))
      }
      return { templateId, ...payload.template }
    },
    // duplicate: async (
    //   state,
    //   payload: {
    //     article: {
    //       article_id: number
    //       user_id: number
    //     }
    //     success: (id: number) => void
    //   }
    // ) => {
    //   const source = await article.getArticle(
    //     payload.article.article_id,
    //     payload.article.user_id
    //   )
    //   const data = await article.addArticle({
    //     title: source.title,
    //     content: source.content.content,
    //     picture: source.picture,
    //     summary: source.summary,
    //   })
    //   payload.success(data.article_id)
    // },
    updateById: async (
      state,
      payload: {
        templateId: string
        from: 'system' | 'my'
        template: IEmailTemplate
        success: (templateId: string) => void
      }
    ) => {
      try {
        let content = payload.template.content
        if (payload.from === 'my') {
          content = await format(payload.template.content, payload.templateId)
        }
        const mjmlData = JsonToMjml({
          data: content,
          mode: 'production',
          context: payload.template.content,
        })
        const html = mjml(mjmlData).html
        const picture = await emailToImage(html)
        const query = {
          picture,
          summary: payload.template.subTitle,
          title: payload.template.subject,
          content: JSON.stringify(payload.template.content),
          html: window.btoa(unescape(encodeURIComponent(html))),
          mjml: window.btoa(unescape(encodeURIComponent(mjmlData))),
          templateId: payload.templateId,
        }
        let res: any
        console.log(payload.from)
        if (payload.from == 'system') {
          res = await article.editSystemLandingPage(query)
        } else {
          res = await article.editMyLandingPage(query)
        }
        if (res.code != 0) {
          // Message.error(res.msg)
        } else {
          payload.success(payload.templateId)
        }
      } catch (error: any) {
        if (error?.response?.status === 404) {
          throw {
            message: 'Cannot change the default template',
          }
        }
      }
    },
  },
})
function getTime() {
  const date = new Date()
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hour = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  // console.log(year, month, day)
  return [year, month, day].join('-') + ' ' + hour + ':' + minutes
}

async function format(info, id) {
  console.log(id)
  info = JSON.parse(JSON.stringify(info))
  const promisArr: any[] = []
  function recursionReplaceHref(info) {
    const attributes = info.attributes || {}
    // console.log(attributes.href);
    if (attributes.href || attributes.href == '') {
      // 常规替换
      // console.log(attributes.href);
      if (attributes.href) {
        const p = article.getShortUrl({
          longURL: attributes.href,
          id,
          type: 'LANDINGPAGE',
        })
        promisArr.push(p)
        p.then(res => (attributes.href = res))
      }
    }
    if (info.type === 'advanced_social') {
      // 这个类型单独处理
      const elements = info.data?.value?.elements || []
      console.log(2)
      elements.forEach(i => {
        const p = article.getShortUrl({
          longURL: i.href,
          id,
          type: 'LANDINGPAGE',
        })
        promisArr.push(p)
        p.then(res => (i.href = res))
      })
    }
    if (/text/.test(info.type)) {
      // text里面可能会有a标签
      let content = info.data?.value?.content || ''
      const urlList = content.match(/(?<=href=")http[s?]\:\/\/\S+(?=")/gim) // null 或 数组
      // console.log(urlList)
      if (!urlList) return
      const promisArr1: any[] = []
      urlList.forEach((v, i) => {
        const p = article.getShortUrl({
          longURL: v,
          id,
          type: 'LANDINGPAGE',
        })
        promisArr.push(p)
        promisArr1.push(p)
      })
      Promise.all(promisArr1).then(res => {
        // Promise.all 会保证顺序, 数组的顺序
        const newUrlList = res.map(i => i.url)
        // console.log(newUrlList)
        // 根据链接分割成数组, 每一项后加加上替换好的链接, 再转成字符串
        info.data.value.content = content
          .split(/(?<=href=")http[s?]\:\/\/\S+(?=")/gim)
          .map((val, idx) => val + newUrlList[idx] || '')
          .join('')
      })
    }
    if (info.children && info.children.length) {
      // 递归
      info.children.forEach(i => {
        recursionReplaceHref(i)
      })
    }
  }
  recursionReplaceHref(info)
  await Promise.all(promisArr)
  return info
}
