// import { JsonToMjml, IBlockData } from 'easy-email-core'
import services from '@demo/services'

export async function emailToImage(html: string) {
  // const mjml = (await import('mjml-browser')).default
  const html2canvas = (await import('html2canvas')).default
  const container = document.createElement('div')
  container.style.position = 'absolute'
  container.style.left = '-9999px'
  container.innerHTML = html
  document.body.appendChild(container)
  const blob = await new Promise<any>(resolve => {
    html2canvas(container, {
      useCORS: true,
      height: 1200,
    }).then(canvas => {
      // console.log(canvas)
      canvas.toBlob(resolve, 'png', 0.1)
    })
  })

  document.body.removeChild(container)
  // open(window.URL.createObjectURL(blob))
  try {
    const picture = await services.common.uploadByQiniu(blob)
    console.log(picture)
    return picture
  } catch (error) {
    return 'https://desk.braininfra.com/group1/M00/00/00/CmgYJWNQ-YCAHkmGAAAORybxSAw380.png'
  }
}
