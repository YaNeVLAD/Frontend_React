import style from "./SlidePreview.module.css"

const EmptySlide = () => {
    return (
        <div className={style.slidePreview}>
            <span className={style.slidePreviewText}>Пустой</span>
        </div>
    )
}

export default EmptySlide
