import { DocumentSearch } from "@/components/document-search"
import { DocumentFilters } from "@/components/document-filters"
import { DocumentTable } from "@/components/document-table"

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold text-[#334155]">Documents</h1>
        <p className="text-muted-foreground">Manage and search through all your documents</p>
      </div>

      <DocumentSearch />
      <DocumentFilters />
      <DocumentTable />
    </div>
  )
}
