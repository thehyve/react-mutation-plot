// cbioportal-frontend/src/shared/components/lollipopMutationPlot/LollipopPlotNoTooltip.tsx

import * as React from 'react'
import PropTypes from 'prop-types'
import Lollipop, {lollipopSpec} from './components/Lollipop'
import Domain, {domainSpec} from './components/Domain'
import SVGAxis from './components/SVGAxis'
import Tooltip from './components/Tooltip'
import Legend from './components/Legend'

const LOLLIPOP_ID_CLASS_PREFIX = 'lollipop-'
const DOMAIN_ID_CLASS_PREFIX = 'domain-'

const xAxisCandidateTickIntervals = [50, 100, 200, 250, 500, 1000, 2500, 5000, 10000, 25000]
const yAxisCandidateTickIntervals = [1, 2, 5, 10, 20, 50, 100, 200, 500]
const lollipopZeroHeight = 10
const xAxisHeight = 30
const yAxisWidth = 50
const geneHeight = 14
const domainHeight = 24

class LollipopPlot extends React.Component {
  codonToX = (codon) => {
    return (codon / this.props.xMax) * this.props.vizWidth
  }

  countToHeight = count => {
    return lollipopZeroHeight + Math.min(1, (count / this.yMax())) * this.yAxisHeight()
  }

  geneX = () => {
    return yAxisWidth + 20
  }

  geneY = () => {
    return this.props.vizHeight - geneHeight + 30
  }

  domainY = () => {
    return this.geneY() - ((domainHeight - geneHeight) / 2)
  }

  domains = () => {
    const {domains} = this.props
    return domains ? domains.map((domain, index) => {
      const x = this.codonToX(domain.startCodon)
      const width = this.codonToX(domain.endCodon) - x
      return (
        <Domain
          id={'domain_' + index}
          key={index}
          x={this.geneX() + x}
          y={this.domainY()}
          width={width}
          height={domainHeight}
          color={domain.color}
          label={domain.label}
          tooltip={domain.tooltip}
          labelColor={domain.labelColor}
          spec={domain}
        />
      )
    }) : ''
  }

  lollipops = () => {
    const {lollipops, onLollipopClick} = this.props
    const hoverHeadRadius = 5
    return lollipops.map((lollipop, i) => {
      return (<Lollipop
        key={`${lollipop.codon}-${i}`}
        id={lollipop.id}
        x={this.geneX() + this.codonToX(lollipop.codon)}
        stickBaseY={this.geneY()}
        stickHeight={this.countToHeight(lollipop.count)}
        headRadius={2.8}
        hoverHeadRadius={hoverHeadRadius}
        label={lollipop.label}
        headColor={lollipop.color}
        tooltip={lollipop.tooltip}
        onClick={onLollipopClick}
      />
      )
    })
  }

  svgWidth = () => {
    return this.props.vizWidth + this.geneX() + 30
  }

  svgHeight = () => {
    return this.geneY() + domainHeight + xAxisHeight
  }

  getComponentIndex = (classes, classPrefix) => {
    const match = classes.split(/[\s]+/g).map(c => c.match(new RegExp(`^${classPrefix}(.*)$`)))
      .find(x => (x !== null))
    if (!match) {
      return null
    } else {
      return parseInt(match[1], 10)
    }
  }

  getDomainIndex = classes => {
    return this.getComponentIndex(classes, DOMAIN_ID_CLASS_PREFIX)
  }

  getLollipopIndex = classes => {
    return this.getComponentIndex(classes, LOLLIPOP_ID_CLASS_PREFIX)
  }

  yAxisHeight = () => {
    return this.props.vizHeight - domainHeight - lollipopZeroHeight
  }

  calculateTickInterval = (candidates, rangeSize, maxTickCount) => {
    let ret
    const tickInterval = candidates.find(c => ((rangeSize / c) < (maxTickCount - 1)))
    if (!tickInterval) {
      ret = 10
      while ((rangeSize / ret) > (maxTickCount - 1)) {
        ret *= 10
      }
    } else {
      ret = tickInterval
    }
    return ret
  }

  xAxisTickInterval = () => {
    return this.calculateTickInterval(xAxisCandidateTickIntervals, this.props.xMax, 16)
  }

  yAxisTickInterval = () => {
    return this.calculateTickInterval(yAxisCandidateTickIntervals, this.yMax(), 10)
  }

  calculateTicks = (tickInterval, rangeSize, labelEvenTicks) => {
    const ret = []
    let nextTick = tickInterval
    while (nextTick < rangeSize) {
      let label
      // add label only for the even ticks
      // but do not add label if it is too close to the end value
      if (labelEvenTicks && (rangeSize - nextTick > (2 * tickInterval) / 3) && (nextTick % (2 * tickInterval) === 0)) {
        label = nextTick + ''
      }
      ret.push({
        position: nextTick,
        label
      })
      nextTick += tickInterval
    }
    return ret
  }

  xTicks = () => {
    let ret = []
    // Start and end, always there
    ret.push({
      position: 0,
      label: '0'
    })
    ret.push({
      position: this.props.xMax,
      label: this.props.xMax + 'aa'
    })
    // Intermediate ticks, every other one labeled
    ret = ret.concat(this.calculateTicks(this.xAxisTickInterval(), this.props.xMax, true))
    return ret
  }

  yTicks = () => {
    let ret = []
    // Start and end, always there
    ret.push({
      position: 0,
      label: '0'
    })
    ret.push({
      position: this.yMax(),
      label: this.yMaxLabel()
    })
    // Intermediate ticks, unlabeled
    ret = ret.concat(this.calculateTicks(this.yAxisTickInterval(), this.yMax(), false))
    return ret
  }

  yMax = () => {
    return this.props.yMax || this.props.lollipops.reduce((max, next) => {
      return Math.max(max, next.count)
    }, 1)
  }

  yMaxLabel = () => {
    return (this.props.lollipops.find(lollipop => (lollipop.count > this.yMax())) ? '>= ' : '') + this.yMax()
  }

  render() {
    const {domains} = this.props
    return (
      <React.Fragment>
        <svg xmlns='http://www.w3.org/2000/svg' width={this.svgWidth() + 200} height={this.svgHeight()}
          className='lollipop-svgnode'>
          <rect
            fill='#FFFFFF'
            x={0}
            y={0}
            width={this.svgWidth()}
            height={this.svgHeight()}
          />
          <rect
            fill='#BABDB6'
            x={this.geneX()}
            y={this.geneY()}
            height={geneHeight}
            width={
              // the x-axis start from 0, so the rectangle size should be (width + 1)
              this.props.vizWidth + 1
            }
          />
          {this.lollipops()}
          {this.domains()}
          <Legend domains={domains} />
          <SVGAxis
            key='horz'
            x={this.geneX()}
            y={this.geneY() + geneHeight + 10}
            length={this.props.vizWidth}
            tickLength={7}
            rangeLower={0}
            rangeUpper={this.props.xMax}
            ticks={this.xTicks()}
          />
          <SVGAxis
            key='vert'
            x={this.geneX() - 10}
            y={this.geneY() - lollipopZeroHeight - this.yAxisHeight()}
            length={this.yAxisHeight()}
            tickLength={7}
            rangeLower={0}
            rangeUpper={this.yMax()}
            ticks={this.yTicks()}
            vertical={true}
            label={`# ${this.props.hugoGeneSymbol} Mutations`}
          />
        </svg>
        <Tooltip id='domainTooltip' />
        <Tooltip id='lollipopTooltip' />
      </React.Fragment>
    )
  }
}

LollipopPlot.propTypes = {
  lollipops: PropTypes.arrayOf(lollipopSpec),
  domains: PropTypes.arrayOf(domainSpec),
  vizWidth: PropTypes.number,
  vizHeight: PropTypes.number,
  xMax: PropTypes.number,
  yMax: PropTypes.number,
  hugoGeneSymbol: PropTypes.string,
  onLollipopClick: PropTypes.func
}

export default LollipopPlot
