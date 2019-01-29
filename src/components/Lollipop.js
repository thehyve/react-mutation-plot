import * as React from 'react'
import PropTypes from 'prop-types'
import {getTooltipContent} from './Tooltip'

export const lollipopSpec = PropTypes.shape({
  codon: PropTypes.number,
  count: PropTypes.number,
  label: PropTypes.shape({
    text: PropTypes.string,
    textAnchor: PropTypes.string,
    fontSize: PropTypes.number,
    fontFamily: PropTypes.string
  }),
  color: PropTypes.string
})

class Lollipop extends React.Component {
  headRadius = () => {
    return this.props.headRadius
  }

  circleX = () => {
    return this.props.x
  }

  circleY = () => {
    return this.props.stickBaseY - this.props.stickHeight
  }

  circleHitRect = () => {
    return {
      x: this.circleX() - this.props.hoverHeadRadius,
      y: this.circleY() - this.props.hoverHeadRadius,
      width: this.props.hoverHeadRadius * 2,
      height: this.props.hoverHeadRadius * 2
    }
  }

  render() {
    let label = null
    if (this.props.label) {
      label = (
        <text
          fill='#2E3436'
          style={{
            fontSize: this.props.label.fontSize || 10,
            fontFamily: this.props.label.fontFamily || 'arial'
          }}
          textAnchor={this.props.label.textAnchor || 'middle'}
          x={this.props.x}
          y={this.props.stickBaseY - this.props.stickHeight - this.props.headRadius - 5}
        >
          {this.props.label.text}
        </text>
      )
    }
    return (
      <g>
        <line
          strokeWidth='1'
          stroke={this.props.stickColor || '#BABDB6'}
          x1={this.props.x}
          x2={this.props.x}
          y1={this.props.stickBaseY}
          y2={this.props.stickBaseY - this.props.stickHeight}
        />
        <circle
          stroke='#BABDB6'
          strokeWidth='0.5'
          fill={this.props.headColor || '#000000'}
          r={this.headRadius()}
          cx={this.circleX()}
          cy={this.circleY()}
          data-tip={getTooltipContent(this.props.tooltip)}
          data-for='lollipopTooltip'
        />
        {label}
      </g>
    )
  }
}

Lollipop.propTypes = {
  x: PropTypes.number,
  stickBaseY: PropTypes.number,
  stickHeight: PropTypes.number,
  headRadius: PropTypes.number,
  hoverHeadRadius: PropTypes.number,
  headColor: PropTypes.string,
  stickColor: PropTypes.string,
  label: PropTypes.shape({
    text: PropTypes.string,
    textAnchor: PropTypes.string,
    fontSize: PropTypes.number,
    fontFamily: PropTypes.string
  }),
  tooltip: PropTypes.any
}

export default Lollipop
