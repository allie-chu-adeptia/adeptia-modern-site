import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

type Post = {
  excerpt: string;
  uri: string;
};

export default async function TestPage() {
    const client = new ApolloClient({
      uri: 'https://www.staging14.adeptia.com/graphql',
      cache: new InMemoryCache(),
    });
  
    const response = await client.query({
      query: gql`
        query NewQuery {
          posts {
            edges {
              node {
                excerpt
                uri
              }
            }
          }
        }
      `,
    });
  
    const posts = response.data.posts.edges.map(({ node }: { node: Post }) => node);

    console.log('posts', posts);
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {posts.map((post: Post) => {
          return (
            <div key={post.uri}>
              <h1>{post.excerpt}</h1>
            </div>
          )
        })}
      </div>
    );
  }