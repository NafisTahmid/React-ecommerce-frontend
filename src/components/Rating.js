import React from 'react'

function Rating({ value, text, color }) {
  return (
    <div className="rating">
        <span>
            <i style={{ color }} className = {
                value >= 1 ? 'fa-solid fa-star'
                : value >= 0.5 ? 'fa-solid fa-star-half-alt'
                : 'fa-regular fa-star'
            }>
            </i>
        </span>
        <span>
            <i style={{ color }} className = {
                value >= 2 ? 'fa-solid fa-star'
                : value >= 1.5 ? 'fa-solid fa-star-half-alt'
                : 'fa-regular fa-star'
            }>
            </i>
        </span>
        <span>
            <i style={{ color }} className = {
                value >= 3 ? 'fa-solid fa-star'
                : value >= 2.5 ? 'fa-solid fa-star-half-alt'
                : 'fa-regular fa-star'
            }>
            </i>
        </span>
        <span>
            <i style={{ color }} className = {
                value >= 4 ? 'fa-solid fa-star'
                : value >= 3.5 ? 'fa-solid fa-star-half-alt'
                : 'fa-regular fa-star'
            }>
            </i>
        </span>

        <span>
            <i style={{ color }} className = {
                value >= 5 ? 'fa-solid fa-star'
                : value >= 4.5 ? 'fa-solid fa-star-half-alt'
                : 'fa-regular fa-star'
            }>
            </i>
        </span>
           
        <span>{text && text}</span>
    </div>
  )
}

export default Rating