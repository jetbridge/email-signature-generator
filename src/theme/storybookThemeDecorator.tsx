import * as React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { theme, primaryFont } from '.'
import useGlobalCSS from './globalCSS'

const withTheme = (story: any) =>
  React.createElement(() => {
    useGlobalCSS()

    return (
      <MuiThemeProvider theme={theme}>
        <link href={`https://fonts.googleapis.com/css?family=${primaryFont}:400,500&display=swap`} rel="stylesheet" />
        {story()}
      </MuiThemeProvider>
    )
  })

export default withTheme
