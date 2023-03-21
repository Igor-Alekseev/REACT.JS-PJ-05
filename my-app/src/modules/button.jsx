import React from "react"

export default function Button({ ...props }) {
    return (
        <button
            className={props.className}
            disabled={props.disableBtn}
            onClick={props.onClick}>
            {props.label}
        </button>
    )
}