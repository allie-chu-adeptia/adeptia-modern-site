'use client'

import { clsx } from 'clsx'
import { motion } from 'framer-motion'

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative">
      <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gradient-to-r from-white/15 from-[2px] to-[2px] bg-[length:12px_100%]" />
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-white/5 from-[2px] to-[2px] bg-[length:12px_100%] group-last:hidden" />
      {children}
    </div>
  )
}

function Logo({
  label,
  className,
  background = false,
}: {
  label: string
  className: string
  background?: boolean
}) {
  return (
    <div
      className={clsx(
        className,
        'absolute top-2 inline-flex items-center gap-2 px-3 py-1',
        'rounded-full text-gray-900 bg-[#F9FAFB] ring-1 ring-inset ring-[#6B7180]/10',
        'text-md/6 font-medium',
        background ? 'text-[#B9BCC4] text-sm/6 font-normal' : '',
        '[--move-x-from:-100%] [--move-x-to:calc(100%+100cqw)] [animation-iteration-count:infinite] [animation-name:move-x] [animation-play-state:running] [animation-timing-function:linear]',
      )}
    >
      <p>{label}</p>
    </div>
  )
}

function FirstMileDataGraphic() {
  return (
    <div aria-hidden="true" className="relative h-full overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-1 pt-8 [container-type:inline-size]">
        <Row>
          <Logo
            label="Claims Data"
            className="[animation-delay:-26s] [animation-duration:30s]"
          />
          <Logo
            label="Partner Performance Data"
            background={true}
            className="[animation-delay:-8s] [animation-duration:30s]"
          />
        </Row>
        <Row>
          <Logo
            label="Customer Records"
            className="[animation-delay:-40s] [animation-duration:40s]"
          />
          <Logo
            label="Live Event Data"
            background={true}
            className="[animation-delay:-20s] [animation-duration:40s]"
          />
        </Row>
        <Row>
          <Logo
            label="Legacy Systems Data"
            className="[animation-delay:-10s] [animation-duration:40s]"
          />
          <Logo
            label="Government Data"
            background={true}
            className="[animation-delay:-32s] [animation-duration:40s]"
          />
        </Row>
        <Row>
          <Logo
            label="Purchase Orders"
            className="[animation-delay:-45s] [animation-duration:45s]"
          />
          <Logo
            label="Qualitative Market Data"
            background={true}
            className="[animation-delay:-23s] [animation-duration:45s]"
          />
        </Row>
        <Row>
          <Logo
            label="QA Data"
            className="[animation-delay:-55s] [animation-duration:60s]"
          />
        </Row>
        <Row>
          <Logo
            label="Non-Digital Catalogs"
            className="[animation-delay:-9s] [animation-duration:40s]"
          />
          <Logo
            label="Quantitative Market Data"
            background={true}
            className="[animation-delay:-28s] [animation-duration:40s]"
          />
        </Row>
      </div>
    </div>
  )
}

export function FirstMileData({ dark }: { dark: boolean }) {
  return (
    <motion.div
    initial="active"
    animate="active" 
    variants={{ active: {} }}
    data-dark={dark ? 'true' : undefined}
    className={clsx(
      'group relative flex flex-col overflow-hidden rounded-lg py-8 my-8',
      'bg-gradient-to-b from-[#E1ECFF] via-[#B8CEF3] to-[#E1ECFF] shadow-xl ring-1 ring-black/5',
      'data-[dark]:bg-gray-800 data-[dark]:ring-white/15',
    )}
    >
      <div className="relative h-96 shrink-0">
        <FirstMileDataGraphic />
      </div>
    </motion.div>
  )
}
