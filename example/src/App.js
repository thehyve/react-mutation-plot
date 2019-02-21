import React, {Component} from 'react'

import LollipopPlot from 'react-mutation-plot'
import {lollipops} from './mock/lollipops.json'
import {domains} from './mock/domains.json'

const mockData = {
  vizHeight: 130, // hardcoded
  vizWidth: 665, // hardcoded
  xMax: 1210, // protein length
  yMax: 23, // max #mutations
  hugoGeneSymbol: 'EGFR',
  lollipops: lollipops,
  domains: domains
}

const options = {
  displayDomainLabel: false,
  displayLegend: true,
  exportToPDF: true
}

const onLollipopClickHandler = (data) => {
  console.log('onLollipopClick', data)
}

export default class App extends Component {
  render() {
    return (
      <LollipopPlot
        domains={mockData.domains}
        lollipops={mockData.lollipops}
        vizWidth={mockData.vizWidth}
        vizHeight={mockData.vizHeight}
        hugoGeneSymbol={mockData.hugoGeneSymbol}
        xMax={mockData.xMax}
        yMax={mockData.yMax}
        onLollipopClick={onLollipopClickHandler}
        options={options}
      />
    )
  }
}
