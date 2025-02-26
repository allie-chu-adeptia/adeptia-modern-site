import {createClient, defineLive} from 'next-sanity'
import { projectId, dataset } from '@/sanity/lib/env'
import { token } from '@/sanity/lib/token'

const client = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: 'vX', // Target the experimental API version
  stega: {studioUrl: '/studio'},
})



export const {sanityFetch, SanityLive} = defineLive({
  client,
  serverToken: token,
  browserToken: token,
})