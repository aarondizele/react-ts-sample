import React from 'react'

export default function Section({ props }: JSX.Element) {
    return (
        <div className="section">
            {props.children}
        </div>
    )
}
