import { styled } from 'goober'
import React from 'react'
import ImageDiffMain from '~/features/image-diff/components/ImageDiffMain'
import GlobalStyles from '~/styles/global'

const Wrapper = styled('div')`
  width: 100%;
  max-width: 40rem;
  padding: 0 0.5rem;
  margin: 5rem auto;
`

const App = () => {
  return (
    <>
      <GlobalStyles />

      <Wrapper>
        <ImageDiffMain />
      </Wrapper>
    </>
  )
}

export default App
