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
}: IGenHTML): string => {
  const avatarCSS = `
  x-border-radius: 100%;
  x-border: 2px #33a solid;
  height: ${avatarSize}px;
  width: ${avatarSize}px;
  margin: 2px 8px 0 2px;
  object-fit: cover;
  `.trimAll()

  const textCSS = `
  line-height: 21px;
  font-size: 17px;
  font-family: Trebuchet MS, Tahoma, Verdana, sans-serif;
  `.trimAll()

  // const liDataUrl = await getDataUrl(LinkedInIcon)

  const linkedIn = linkedinUrl ? `<a href="${linkedinUrl}">${LinkedInIcon}</a>` : ''
  const blog = blogUrl ? `<a href="${blogUrl}">${BlogIcon}</a>` : ''
  const github = githubUsername ? `<a href="https://github.com/${githubUsername}">${GitHubIcon}</a>` : ''

  const image = `<img src="${imageUrl}" style="${avatarCSS}" />`

  const html = htmlclean(
    `
    <table border="0" cellspacing="0" cellpadding="0" style="float:left;">
      <tr>
        <td width="${avatarSize}" rowspan="2">
          ${image}
        </td>
        <td style="${textCSS}">
          <div>Best Regards</div>
          <div style="font-weight: 600;">${name}</div>
          <div>${position} at <a href="https://jetbridge.com" style="color: #4378cb; text-decoration: underline;">JetBridge</a></div>
          <div style="margin-top: 5px">${linkedIn} ${blog} ${github}</div>
        </td>
      </tr>
    </table>
  `,
    { removeAttributeQuotes: true }
  )

  console.log('size', html.length)

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
