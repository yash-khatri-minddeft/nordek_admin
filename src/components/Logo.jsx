import React, { useState } from 'react'
import { HelpCircle } from 'react-feather'

export default function Logo({ srcs, alt, ...rest }) {
    const [, refresh] = useState(0)
    const [noIcon, setNoIcon] = useState(false)

    if (!noIcon && srcs) {
        return (
            <img
                {...rest}
                alt={alt}
                src={srcs}
                onError={() => {
                    setNoIcon(true)
                    refresh((i) => i + 1)
                }}
            />
        )
    }

    return <HelpCircle {...rest} />
}
