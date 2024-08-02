import Link from 'next/link'

export default function Test2() {
    return (
        <span style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <span><Link href="/test">test</Link><Link href="/test2">test2</Link></span>
            test2
        </span>
    );

 }