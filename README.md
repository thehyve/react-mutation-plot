# react-mutation-plot

> A light weight adaptation React based mutation lollipop plot from [cBioPortal frontend](https://github.com/cBioPortal/cbioportal-frontend).

[![NPM](https://img.shields.io/npm/v/react-mutation-plot.svg)](https://www.npmjs.com/package/react-mutation-plot) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![schermafbeelding 2019-02-01 om 16 31 44](https://user-images.githubusercontent.com/2835281/52132314-2a8a1b80-263f-11e9-98e7-56c757392b1c.png)

## Install

```bash
npm install --save react-mutation-plot
```

## Usage

Check the `/example` folder for a complete usage. 

```jsx
import React, { Component } from 'react'

import Lollipop from 'react-mutation-plot'

class Example extends Component {
  render () {
    return (
      <LollipopPlot
        domains={domains}
        lollipops={lollipops}
        vizWidth={vizWidth}
        vizHeight={vizHeight}
        hugoGeneSymbol={hugoGeneSymbol}
        xMax={xMax}
        yMax={yMax}
      />
    )
  }
}
```
