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

  const handleCopySignature = () => {
    var emailLink = document.querySelector('#signature-container')
    if (!emailLink) return
    console.log(emailLink)

    var range = document.createRange()

    range.selectNode(emailLink)
    let selection = window.getSelection()
    if (!selection) return
    selection.addRange(range)

    try {
      // Now that we've selected the anchor text, execute the copy command
      var successful = document.execCommand('copy')
      var msg = successful ? 'successful' : 'unsuccessful'
      console.log('Copy email command was ' + msg)
    } catch (err) {
      console.log('Oops, unable to copy')
    }

    // selection = window.getSelection()
    // if (selection) selection.removeRange(range)
  }

  return (
    <div className={classes.root}>
      <Button variant="contained" onClick={handleCopySignature} color="primary">
        Copy
      </Button>

      <div onClickCapture={handleCopySignature}>
        {/* big selection area for copy/paste HTML */}
        <br />
        <br />
        &nbsp;
        <br />
        &nbsp;
        <br />
        &nbsp;
        <div
          id="signature-container"
          style={{ backgroundColor: 'transparent' }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        &nbsp;
        <br />
        &nbsp;
        <br />
        &nbsp;
        <br />
        &nbsp;
        <br />
      </div>
      <div className={classes.html}>
        <Button color="primary" variant="contained" onClick={() => setShowHTML(shown => !shown)}>
          {showHTML ? 'Hide' : 'Show'} HTML
        </Button>

        <p>Size: {html.length} bytes</p>

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
