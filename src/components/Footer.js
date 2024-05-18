'use client'
export default function Footer() {
    return (
        <footer>
            <div className="text-center border-t-2 p-3 border-sky-900 text-black bg-white">
                Designed & Developed by &nbsp;
                <a
                    href="https://www.educative.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-900 text-xl font-bold italic"
                >
                    Educative.io
                </a>
            </div>
        </footer>
    );
}