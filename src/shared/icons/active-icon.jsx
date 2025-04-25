const ActiveIcon = ({ width, height, stroke_color, fill }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            width={width ?? "24"}
            height={height ?? "24"}
            viewBox="0 0 24 24"
            fill={fill ?? "none"}
            stroke={stroke_color ?? "currentColor"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-toggle-left">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M2 6m0 6a6 6 0 0 1 6 -6h8a6 6 0 0 1 6 6v0a6 6 0 0 1 -6 6h-8a6 6 0 0 1 -6 -6z" />
        </svg>
    )
}

export { ActiveIcon }