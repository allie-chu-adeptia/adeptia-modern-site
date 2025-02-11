'use client'

import { motion } from 'framer-motion'
import { Link } from '@/components/link'
import { ExpandedConnector } from '@/sanity/types/local.types'
import { image } from '@/sanity/image'

export function LinkedSubpageConnectorLogo({ connector, size }: { connector: ExpandedConnector, size: number }) {
    return (
        <motion.div
            initial="idle"
            whileHover="active"   
            variants={{
                idle: { scale: 1 },
                active: { scale: 1.05 }
            }}
            className="w-full h-full"
        >
            <Link href={`/connectors/${connector.slug}`} className="block w-full h-full">
                {connector.logo && (
                    <img 
                        src={image(connector.logo).size(size, size).url()}
                        alt={connector.name}
                        className="max-w-full max-h-full object-contain"
                    />
                )}
            </Link>
        </motion.div>
    )
}

export function LinkedHomepageConnectorLogo({ connector, size }: { connector: ExpandedConnector, size: number }) {
    return (
        <motion.div
            initial="idle"
            whileHover="active"   
            variants={{
                idle: { scale: 1 },
                active: { scale: 1.05 }
            }}
            className="w-full h-full"
        >
            <Link href={`/connectors`} className="block w-full h-full">
                {connector.logo && (
                    <img 
                        src={image(connector.logo).size(size, size).url()}
                        alt={connector.name}
                        className="max-w-full max-h-full object-contain"
                    />
                )}
            </Link>
        </motion.div>
    )
}