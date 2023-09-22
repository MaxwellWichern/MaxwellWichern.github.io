import React from 'react'
import PropTypes from 'prop-types'

export default function PageHeader(props) {
  const { title, subtitle } = props

  return (
    <div>
      <h1>{title}</h1>
      {subtitle}
    </div>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string
}

PageHeader.defaultProps = {
  title: 'Page Title',
  subTitle: 'Page Subtitle'
}
