export default function TailButton({caption, color, handleClick, style, fontStyle, disabled}) {
    const btnStyle = {
        'blue' : 'bg-blue-500 text-white font-bold rounded focus:outline-none focus:shadow-outline disabled:bg-opacity-40',
        'blueSmallText' : 'bg-blue-500 hover:bg-blue-700 text-white rounded focus:outline-none focus:shadow-outline'
    }

    const btColorHover = {
        
    }
    
    return (
        <button className={`inline-flex justify-center items-center
        ${style ? style : ''}
        ${btnStyle[color]} ${btColorHover[color]} rounded-lg
        transition duration-300 ${fontStyle? fontStyle : 'text-sm font-bold font-[NanumSquareR]'}
        `}
            onClick={handleClick}
            disabled = {disabled ? disabled : ""}
        >
            {caption}
        </button>
    )
}
