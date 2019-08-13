import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import { SignatureParams, generateSignatureHTML } from './signatureGenerator'
import { Button } from '@material-ui/core'

interface ISignatureCreatorProps extends SignatureParams {
  imageFile?: File
  name?: string
  position?: string
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
    paddingTop: '0rem',
    borderTop: '1px dashed #922',
  },
  html: {
    borderTop: '1px dashed #922',
    marginTop: '0rem',
    paddingTop: '1rem',
  },
})

const SignatureCreator = ({ imageFile, ...sig }: ISignatureCreatorProps) => {
  const classes = useStyles()
  const [imageUrl, setImageUrl] = React.useState<string | null>('')
  const [showHTML, setShowHTML] = React.useState<boolean>(false)

  if (imageFile) {
    const reader = new FileReader()
    reader.addEventListener(
      'load',
      () => {
        console.log(reader.result)
        setImageUrl(String(reader.result))
      },
      false
    )

    reader.readAsDataURL(imageFile)
  }

  const html = React.useMemo(
    () =>
      generateSignatureHTML({
        ...sig,
        imageUrl,
      }),
    [sig, imageUrl]
  )

  return (
    <div className={classes.root}>
      <br />
      <br />
      <br />
      <br />
      <div style={{ backgroundColor: 'transparent' }} dangerouslySetInnerHTML={{ __html: html }} />
      <br />
      <br />
      <br />
      <br />

      <div className={classes.html}>
        <Button color="primary" variant="contained" onClick={() => setShowHTML(shown => !shown)}>
          {showHTML ? 'Hide' : 'Show'} HTML
        </Button>

        {showHTML && (
          <React.Fragment>
            <br />
            <br />
            <br />
            <div
              style={{ marginTop: '1rem', fontFamily: 'monospace', height: '9rem', width: '50rem', overflow: 'scroll' }}
            >
              {html}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default SignatureCreator
