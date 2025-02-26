'use client'

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useEffect, useRef } from 'react'
import { StatSection } from '@/sanity/types/sanity.types'
import { HeaderStyle } from '../lib/headerStyle'
import clsx from 'clsx'
import { DarkModeWrapper } from '../lib/darkModeWrapper'

export function ClimbingNumber({
  numValue,
  decimals = 0,
}: {
  numValue: number
  decimals?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const start = Math.round(numValue * 0.5)

  const value = useMotionValue(start)
  const spring = useSpring(value, { damping: 30, stiffness: 100 })
  const display = useTransform(spring, (num) => num.toFixed(decimals))

  useEffect(() => {
    value.set(isInView ? numValue : start)
  }, [start, numValue, isInView, value])

  return <motion.span ref={ref}>{display}</motion.span>
}

export function StatSectionComponent({
    statSection
}: {
    statSection: StatSection
}) {
  const num_stats = statSection.stats?.length

  return (
    <DarkModeWrapper style={statSection.background}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <HeaderStyle header={statSection.header} style={statSection.background} />
          <dl className={`mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-${num_stats}`}>
            {statSection.stats?.map((stat, index) => (
              <DarkModeWrapper 
                key={index}
                style={statSection.background}
                className={clsx("flex flex-col p-8 bg-gray-50 data-[dark=true]:bg-white/5")}
              >
                <DarkModeWrapper
                  style={statSection.background}
                  className={clsx("text-sm/2 font-regular text-gray-600 data-[dark=true]:text-gray-300 mt-2")}
                >
                  {stat.statName}
                </DarkModeWrapper>
                <DarkModeWrapper
                  style={statSection.background} 
                  className={clsx("order-first text-4xl font-semibold tracking-tight line-height-1 text-gray-900 data-[dark=true]:text-white")}
                >
                  {stat.leadingUnit}
                  <ClimbingNumber numValue={stat.statValue as number} decimals={0} />
                  {stat.trailingUnit}
                </DarkModeWrapper>
              </DarkModeWrapper>
            ))}
          </dl>
        </div>
      </div>
    </DarkModeWrapper>
  )
}