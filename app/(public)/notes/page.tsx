import { NotesPageContent } from "@/components/public/notes/notes-page-content"
import { createPageMetadata } from "@/lib/page-metadata"

export const metadata = createPageMetadata({
  title: "Notes",
  description: "Optional notes section for your product case study.",
  path: "/notes",
})

export default function NotesPage() {
  return (
    <div className="pt-24">
      <NotesPageContent />
    </div>
  )
}
