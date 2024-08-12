import React from 'react'
import '../Styles/Preview.sass'

function Preview({ URL }: { URL: string }) {
    let isDarkmode = new URLSearchParams(window.location.search).get('theme') === 'dark'

    return (<div className={`Preview Dark`}>
        <div className="Preview__title">
            <h2>Preview</h2>
        </div>
        <div className="Preview__content">
            <div className="Preview__content__image">
                <img src={URL} />
            </div>
            <div className="Preview__content__button">
                <span
                    onClick={() => navigator.clipboard.writeText(URL)}
                    className="cursor-pointer"
                >Copy URL</span>
            </div>
        </div>
    </div>
    )
}

export default Preview