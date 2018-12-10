# react-mutation-plot

> A React based mutation lollipop plot.

[![NPM](https://img.shields.io/npm/v/react-mutation-plot.svg)](https://www.npmjs.com/package/react-mutation-plot) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-mutation-plot
```

## Usage

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

## License

MIT © [](https://github.com/)
