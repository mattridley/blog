import React from 'react'
import { Link } from 'gatsby'
import { bs } from '../shevy'
import { inflect, v } from '../utils'

const RelatedPosts = ({ posts }) => (
  <div css={{ marginBottom: bs(2) }}>
    <div
      css={{
        fontFamily: v('fonts-catamaran'),
        fontWeight: 'bold',
        marginBottom: bs(0.5),
      }}
    >
      Related {inflect('Post', 'Posts', posts.length)}:
    </div>

    <div>
      {posts.map(({ slug, title }) => (
        <Link
          css={{ display: 'block', marginBottom: bs(0.5) }}
          key={slug}
          to={slug}
        >
          {title}
        </Link>
      ))}
    </div>
  </div>
)

export default RelatedPosts
