import { DropListOptionType } from "../../../storage/types"
import style from './DropLits.module.css'


type DropListProps = {
    options: Array<DropListOptionType>,
    className: string,
}

function DropList({ options, className }: DropListProps) {
    return (
        <div className={`${style.dropList} ${className}`}>
            {options.map((option) =>
                <p
                    key={option.id}
                    onClick={option.onClick}>
                    {option.value}
                </p>
            )}
        </div>
    )
}

export { DropList }