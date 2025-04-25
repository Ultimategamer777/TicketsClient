const CompaniesIcon = ({ width, height, fill, stroke_width, stroke_color }) => (
    <svg xmlns="http://www.w3.org/2000/svg"
        width={width ?? "24"}
        height={height ?? "24"}
        fill={fill ?? "none"}
        stroke={stroke_color ?? "currentColor"}
        strokeWidth={stroke_width ?? "2"}
        strokeLinecap="round"
        strokeLinejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-building">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 21l18 0" />
        <path d="M9 8l1 0" />
        <path d="M9 12l1 0" />
        <path d="M9 16l1 0" />
        <path d="M14 8l1 0" />
        <path d="M14 12l1 0" />
        <path d="M14 16l1 0" />
        <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16" />
    </svg>
)

export { CompaniesIcon }
