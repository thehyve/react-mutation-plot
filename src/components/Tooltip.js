import * as React from 'react'
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types'

export const getTooltipContent = (tooltip) => {
  const header = (tooltip || {}).header ? `<div>${tooltip.header}</div>` : ''
  const body = (tooltip || {}).body ? `<div>${tooltip.body}</div>` : ''
  return (`<div>${header}${body}</div>`)
}

const getContentHandler = (dataTip) => {
  if (!dataTip) return ''
  return (dataTip)
}

const tooltip = (props) => {
  return (<ReactTooltip
    id={props.id}
    html={true}
    getContent={getContentHandler}
  />)
}

tooltip.propTypes = {
  id: PropTypes.string
}

export default tooltip
