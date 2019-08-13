import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import SignatureCreatorForm from '../creator/form'

const useStyles = makeStyles((theme: Theme) => ({}))

interface IHomeProps {}

const Home = (props: IHomeProps) => {
  const classes = useStyles()

  return <SignatureCreatorForm />
}

export default Home
