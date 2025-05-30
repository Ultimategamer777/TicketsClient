const AbrevationIcon = ({ width, height, fill, stroke_width, stroke_color }) => (
    <svg xmlns="http://www.w3.org/2000/svg"
        width={width ?? "24"}
        height={height ?? "24"}
        fill={fill ?? "none"}
        stroke={stroke_color ?? "currentColor"}
        strokeWidth={stroke_width ?? "2"}
        strokeLinecap="round"
        strokeLinejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-scissors">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6 7m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        <path d="M6 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        <path d="M8.6 8.6l10.4 10.4" />
        <path d="M8.6 15.4l10.4 -10.4" />
    </svg>
)

export { AbrevationIcon }