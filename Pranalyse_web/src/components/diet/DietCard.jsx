import React from 'react'

function DietCard({image="", title, heading}) {
  return (
    <div className="w-[280px] relative mt-4 overflow-visible translate-x-6">
      
      {/* 👇 THIS is what scales */}
      <div className="
        bg-white
        rounded-xl
        border-2 border-transparent
        shadow-md
        transition duration-300
        hover:scale-105
        hover:border-[#4B3A70]
        hover:shadow-[0_0_20px_rgba(255,255,255,0.8)]
        h-full
      ">
        
        {/* <div className="overflow-hidden rounded-t-xl">
          <img
            src={
              heading=="breakfast"?
              "https://img.freepik.com/free-photo/peaceful-view-morning-light_23-2148851764.jpg?semt=ais_incoming&w=740&q=80"
              :(
                heading=="midMorning"?
                "https://media.istockphoto.com/id/1209896553/photo/morning-walk-is-a-blessing-for-the-whole-day.jpg?s=612x612&w=0&k=20&c=HVFpS7xU8IWbiGfBwaSmjEnDKYa3iTgz34uXCCSqQMo="
                :(
                  heading=="lunch"?
                  "https://img.freepik.com/free-photo/low-angle-shot-green-leafed-tree-bright-sky_181624-19264.jpg?semt=ais_incoming&w=740&q=80"
                  :(
                    heading=="evening"?
                    "https://img.freepik.com/free-photo/beautiful-shot-sea-sunset_181624-58978.jpg?semt=ais_incoming&w=740&q=80"
                    :(
                      "https://thumbs.dreamstime.com/b/beautiful-night-sky-peaceful-background-blue-moon-falling-stars-clouds-glowing-horizon-elements-image-furnished-35701701.jpg"
                    )
                  )
                )
              )
            }
            className="w-full aspect-video object-cover"
          />
        </div> */}

        <div className="p-3">
          <p className="font-semibold text-lg text-gray-900">{heading.toUpperCase()}</p>
          <p className="font-light text-sm text-gray-900">{title}</p>
        </div>
      </div>
    </div>
  )
}

export default DietCard