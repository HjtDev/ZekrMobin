import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';

const CustomSkeleton = (props) => {
    return (
        <Skeleton
            baseColor="#ffffff13"
            highlightColor="#1C2139"
            style={{borderRadius: "5rem"}}
            {...props}
        />
    )
}
export default CustomSkeleton
