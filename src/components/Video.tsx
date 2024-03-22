'use client';

export default function Video() {
    return (
        <video
            controls
            className="pt-10 px-5 xl:px-[400px]"
            poster="poster.JPG"
        >
            <source src="tabor8.webm" type="video/mp4" />
        </video>
    );
}
