import React, { Component } from 'react'

class Link extends Component {
  render() {
    const { link: { description, url } } = this.props
    return (
      <div>
        <div>
          {description} <a href={`http://${url}`}>{url}</a>
        </div>
      </div>
    )
  }
}

export default Link