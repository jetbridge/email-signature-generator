import React from 'react'
import { storiesOf } from '@storybook/react'
import themeDecorator from '../../theme/storybookThemeDecorator'
import SignatureCreatorForm from './form'

storiesOf('Signature Creator', module)
  .addDecorator(themeDecorator)
  .add('Initial', () => (
    <SignatureCreatorForm
      defaultBlogUrl="https://spiegelmock.com"
      defaultGhUsername="revmischa"
      defaultLiUrl="https://www.linkedin.com/in/mischaspiegelmock/"
      defaultName="Mischa Spiegelmock"
      defaultPosition="Co-Founder"
    />
  ))
