import * as React from 'react'
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types'

export const getTooltipContent = (tooltip) => {
  const header = (tooltip || {}).header ? `<div>${tooltip.header}</div>` : ''
  const body = (tooltip || {}).body ? `<div>${tooltip.body}</div>` : ''
  return (`<div>${header}${body}</div>`)
}

class Tooltip extends React.Component {
  componentDidUpdate() {
    ReactTooltip.rebuild()
  }

  getContentHandler = (dataTip) => {
    if (!dataTip) return ''
    return (dataTip)
  }

  render() {
    return (<ReactTooltip
      id={this.props.id}
      html={true}
      getContent={this.getContentHandler}
    />)
  }
}

Tooltip.propTypes = {
  id: PropTypes.string
}

export default Tooltip
