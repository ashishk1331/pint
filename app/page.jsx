"use client";
import Header from '../components/dev/Header'
import Footer from '../components/dev/Footer'
import Card from '../components/dev/Card'
import Editor from '../components/dev/Editor'

export default function Home() {
    return (
        <main
            className="container mx-auto flex min-h-screen flex-col items-center justify-between px-12"
        >
            <Header />
            <div className="w-full flex items-top gap-8">
                <Card />
                <Editor />
            </div>
            <Footer />
        </main>
    );
}
