const UnitIcon = ({ width, height, fill, stroke_width, stroke_color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" 
        width={width ?? "24"}  
        height={height ?? "24"}  
        fill={ fill ?? "none" } 
        stroke={ stroke_color ?? "currentColor" } 
        strokeWidth={ stroke_width ?? "2" } 
        viewBox="0 0 24 24" 
        strokeLinecap="round" 
        strokeLinejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-ruler-3">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M19.875 8c.621 0 1.125 .512 1.125 1.143v5.714c0 .631 -.504 1.143 -1.125 1.143h-15.875a1 1 0 0 1 -1 -1v-5.857c0 -.631 .504 -1.143 1.125 -1.143h15.75z" />
            <path d="M9 8v2" />
            <path d="M6 8v3" />
            <path d="M12 8v3" />
            <path d="M18 8v3" />
            <path d="M15 8v2" />
    </svg>
)

export { UnitIcon }