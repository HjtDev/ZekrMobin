import React, { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const LazySection = ({
                         children,
                         rootMargin = '0px 0px',
                         minHeight = '100px',
                         delay = 1000
                     }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin,
        threshold: 0.3
    })

    const [ready, setReady] = useState(false)

    useEffect(() => {
        let timer
        if (inView) {
            if (delay > 0) {
                timer = setTimeout(() => setReady(true), delay)
            } else {
                setReady(true)
            }
        }
        return () => clearTimeout(timer)
    }, [inView, delay])

    return (
        <div ref={ref} style={{ minHeight }}>
            {ready ? (
                children
            ) : (
                <div className="d-flex justify-content-center align-items-center" style={{height: "400px"}}>
                    <div
                        className="loading"
                        style={{ textAlign: 'center', padding: '2rem' }}
                    >
                    </div>
                </div>
            )}
        </div>
    )
}

export default LazySection
