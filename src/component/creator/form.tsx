import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Paper, TextField, Typography, FormControlLabel } from '@material-ui/core'
import { useDropzone } from 'react-dropzone'
import SignatureCreator from '.'

const useStyles = makeStyles({
  avatarDrop: {
    display: 'block',
    padding: '1.2rem',
    border: '2px dashed #aaa',
    fontSize: '1.2rem',
    paddingLeft: 25,
    margin: '0.2rem 0 0.8rem 0.2rem',
    maxWidth: 500,
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

const SignatureCreatorForm = ({
  defaultName,
  defaultPosition,
  defaultLiUrl,
  defaultBlogUrl,
  defaultGhUsername,
}: ISignatureCreatorFormProps) => {
  const classes = useStyles()
  const [avatarFile, setAvatarFile] = React.useState<File>()
  const [name, setName] = React.useState(defaultName)
  const [position, setPosition] = React.useState(defaultPosition)
  const [liUrl, setLiUrl] = React.useState(defaultLiUrl)
  const [blogUrl, setBlogUrl] = React.useState(defaultBlogUrl)
  const [ghUrl, setGhUrl] = React.useState(defaultGhUsername)

  const onDrop = React.useCallback(
    acceptedFiles => {
      setAvatarFile(acceptedFiles[0])
    },
    [setAvatarFile]
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

      <div {...getRootProps()} className={classes.avatarDrop}>
        {avatarFile ? avatarFile.name : ''}
        {isDragActive ? <p>Drop the files here...</p> : <p>Select avatar image file...</p>}
        <input {...getInputProps()} />
      </div>
      <hr />
      <div className={classes.creator}>
        <SignatureCreator
          imageFile={avatarFile}
          name={name}
          position={position}
          linkedinUrl={liUrl}
          blogUrl={blogUrl}
          githubUsername={ghUrl}
        />
      </div>
    </Paper>
  )
}

export default SignatureCreatorForm
