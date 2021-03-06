import LinkedInIcon from '../../asset/linkedIn'
import BlogIcon from '../../asset/blog'
import GitHubIcon from '../../asset/gh'
import htmlclean from 'htmlclean'
// import JBOverlay from '../../asset/jb'
// import avatarBg from '../../asset/avatarBorder'

export interface SignatureParams {
  name?: string
  position?: string
  linkedinUrl?: string
  blogUrl?: string
  githubUsername?: string
  link1?: SigLink
  link2?: SigLink
}

export interface IGenHTML extends SignatureParams {
  imageUrl?: string | null
}

// avatar bounding box size
const avatarSize = 84

export const generateSignatureHTML = ({
  imageUrl, // = 'https://placem.at/people',
  name = '',
  position = '',
  linkedinUrl,
  blogUrl,
  githubUsername,
  link1,
  link2,
}: IGenHTML): string => {
  const avatarCSS = `
  height: ${avatarSize}px;
  width: ${avatarSize}px;
  margin: 2px 8px 0 2px;
  object-fit: cover;
  `.replace(/(\s+)/g, ' ')

  const textCSS = `
  line-height: 21px;
  font-size: 17px;
  font-family: Trebuchet MS, Tahoma, Verdana, sans-serif;
  `.replace(/(\s+)/g, ' ')

  const linkedIn = linkedinUrl ? `<a href="${linkedinUrl}">${LinkedInIcon}</a>` : ''
  const blog = blogUrl ? `<a href="${blogUrl}" style="text-decoration: none;">${BlogIcon}</a>` : ''
  const github = githubUsername ? `<a href="https://github.com/${githubUsername}">${GitHubIcon}</a>` : ''

  const makeLink = (text: string, url: string) => `<div><a href="${url}">${text}</a></div>`
  const link1Html = link1 ? makeLink(link1.text, link1.url) : ''
  const link2Html = link2 ? makeLink(link2.text, link2.url) : ''

  const image = `<img src="${imageUrl}" style="${avatarCSS}" />`

  const html = htmlclean(
    `
    <table border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="${avatarSize}" rowspan="2">
          ${image}
        </td>
        <td style="${textCSS}">
          <div>Best Regards</div>
          <div style="font-weight: 600;">${name}</div>
          <div>${position} at <a href="https://jetbridge.com" style="color: #4378cb; text-decoration: none;">JetBridge</a></div>
          <div style="margin-top: 5px">${linkedIn} ${blog} ${github}</div>
          ${link1Html}
          ${link2Html}
        </td>
      </tr>
    </table>
  `,
    { removeAttributeQuotes: true }
  )

  return html
}

async function getDataUrl(file: File): Promise<string> {
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = (ev: any) => {
      if (!ev || !ev.target || !ev.target.result) reject()

      resolve(ev.target.result)
    }
    reader.readAsDataURL(file)
  })
}
