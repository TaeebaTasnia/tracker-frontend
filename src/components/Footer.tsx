export function Footer() {
  return (
    <footer className="px-4 pb-5 text-center text-[12px] text-white/45">
      <p>
        <span className="text-white/65">MGH Shipment Tracker</span>
        <span className="mx-2 text-white/25" aria-hidden="true">
          |
        </span>
        Freight Visibility Portal
      </p>
      <p className="mt-1 text-white/30">© {new Date().getFullYear()} MGH Group. All rights reserved.</p>
    </footer>
  )
}
