'use client';

export default function Video() {
    return (
        <video
            controls
            className="pt-10 px-5 xl:px-[400px]"
            poster="poster.jpeg"
        >
            <source src="tabor5.webm" type="video/mp4" />
        </video>
    );
}
