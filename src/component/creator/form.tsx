import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Paper, TextField } from '@material-ui/core'
import { useDropzone } from 'react-dropzone'
import SignatureCreator from '.'
import Compressor from 'compressorjs'

const useStyles = makeStyles({
  avatarDrop: {
    display: 'block',
    padding: '1.2rem',
    border: '2px dashed #aaa',
    fontSize: '1.2rem',
    paddingLeft: 25,
    margin: '0.2rem 0 0.8rem 0.2rem',
    minWidth: 500,
  },
  creator: {
    margin: '1rem',
  },
  input: {
    width: 500,
    marginBottom: '1.5rem',
  },
})

interface ISignatureCreatorFormProps {
  defaultName?: string
  defaultPosition?: string
  defaultLiUrl?: string
  defaultBlogUrl?: string
  defaultGhUsername?: string
}

const compressionOpts = {
  quality: 0.8,
  maxWidth: 84,
  maxHeight: 84,
  convertSize: 4000, // png over 4k -> jpeg
}

const SignatureCreatorForm = ({
  defaultName,
  defaultPosition,
  defaultLiUrl,
  defaultBlogUrl,
  defaultGhUsername,
}: ISignatureCreatorFormProps) => {
  const classes = useStyles()
  const [imageFile, setImageFile] = React.useState<File>()
  const [name, setName] = React.useState(defaultName)
  const [position, setPosition] = React.useState(defaultPosition)
  const [liUrl, setLiUrl] = React.useState(defaultLiUrl)
  const [blogUrl, setBlogUrl] = React.useState(defaultBlogUrl)
  const [ghUrl, setGhUrl] = React.useState(defaultGhUsername)
  const [link1, setLink1] = React.useState<string>()
  const [link1Url, setLink1Url] = React.useState<string>()
  const [link2, setLink2] = React.useState<string>()
  const [link2Url, setLink2Url] = React.useState<string>()

  const onDrop = React.useCallback(
    acceptedFiles => {
      if (!acceptedFiles.length || !acceptedFiles[0]) return

      new Compressor(acceptedFiles[0], {
        ...compressionOpts,
        success: result => setImageFile(result as File),
      })
    },
    [setImageFile]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <Paper style={{ padding: 10 }}>
      <div>
        <TextField placeholder="Name" className={classes.input} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        <TextField placeholder="Position" className={classes.input} onChange={e => setPosition(e.target.value)} />
      </div>
      <div>
        <TextField placeholder="LinkedIn URL" className={classes.input} onChange={e => setLiUrl(e.target.value)} />
      </div>
      <div>
        <TextField placeholder="Blog URL" className={classes.input} onChange={e => setBlogUrl(e.target.value)} />
      </div>
      <div>
        <TextField placeholder="GitHub Username" className={classes.input} onChange={e => setGhUrl(e.target.value)} />
      </div>
      <div>
        <TextField placeholder="Link 1 Text" className={classes.input} onChange={e => setLink1(e.target.value)} />
        <TextField placeholder="Link 1 URL" className={classes.input} onChange={e => setLink1Url(e.target.value)} />
      </div>
      <div>
        <TextField placeholder="Link 2" className={classes.input} onChange={e => setLink2(e.target.value)} />
        <TextField placeholder="Link 2 URL" className={classes.input} onChange={e => setLink2Url(e.target.value)} />
      </div>

      <div {...getRootProps()} className={classes.avatarDrop}>
        {imageFile ? imageFile.name : ''}
        {isDragActive ? <p>Drop the files here...</p> : <p>Select avatar image file...</p>}
        <input {...getInputProps()} />
      </div>
      <hr />
      <div className={classes.creator}>
        <SignatureCreator
          imageFile={imageFile}
          name={name}
          position={position}
          linkedinUrl={liUrl}
          blogUrl={blogUrl}
          githubUsername={ghUrl}
          link1={link1 && link1Url ? { text: link1, url: link1Url } : undefined}
          link2={link2 && link2Url ? { text: link2, url: link2Url } : undefined}
        />
      </div>
    </Paper>
  )
}

export default SignatureCreatorForm
