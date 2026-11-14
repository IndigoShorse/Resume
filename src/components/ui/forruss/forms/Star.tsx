interface StarProps {
    className?: string;
}

export const Star: FC<StarProps> = ({className}) => {
    return <span className={`text-[size:.95em] text-red-600 ${className}`}>*</span>
}


