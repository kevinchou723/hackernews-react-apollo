import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Link from './Link'

const FEED_QUERY = gql`
  query {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`

class LinkList extends Component {
  render() {
    return (
      <Query query={FEED_QUERY}>
        {
          ({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>
            if (error) return <div>Error</div>
            const { feed: { links } } = data

            return (
              <div>
                {links.map(link => <Link key={link.id} link={link} />)}
              </div>
            )
          }
        }
      </Query>
    )
  }
}

export default LinkList