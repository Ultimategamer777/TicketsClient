const DesactiveIcon = ({ width, height, fill }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            width={width ?? "24"}
            height={height ?? "24"}
            viewBox="0 0 24 24"
            fill={fill ?? "currentColor"}
            className="icon icon-tabler icons-tabler-filled icon-tabler-toggle-right">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M16 9a3 3 0 1 1 -3 3l.005 -.176a3 3 0 0 1 2.995 -2.824" />
            <path d="M16 5a7 7 0 0 1 0 14h-8a7 7 0 0 1 0 -14zm0 2h-8a5 5 0 1 0 0 10h8a5 5 0 0 0 0 -10" />
        </svg>
    )
}

export { DesactiveIcon }