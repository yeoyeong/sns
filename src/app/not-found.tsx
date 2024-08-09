import Link from "next/link"

export default function NotFound() {
  return (
    <div>
      <div>이 페이지는 존재하지 않습니다.</div>
      <Link href="/search">검색</Link>
    </div>
  )
}
