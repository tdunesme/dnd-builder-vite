import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ArrowUp, ArrowDown, Eye } from 'lucide-react'
import { Link } from '@tanstack/react-router'

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'

import { useState } from 'react'
import type { SrdListItem } from '@/services/rules/spells.service'

type Props = {
  data: SrdListItem[]
}

export function SpellsTable({ data }: Props) {
  const [sorting, setSorting] = useState<SortingState>([])

  const columns: ColumnDef<SrdListItem>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'level',
      header: 'Level',
    },
    {
      id: 'actions',
      header: '',
      enableSorting: false,
      cell: ({ row }) => {
        const spell = row.original

        return (
          <Button variant="ghost" size="icon" asChild>
            <Link
              to="/rules/spells/$spellIndex"
              params={{ spellIndex: spell.index }}
            >
              <Eye className="size-4" />
            </Link>
          </Button>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <Table className="w-full">
      <TableHeader>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <TableHead
                key={header.id}
                className={header.column.getCanSort() ? 'cursor-pointer' : ''}
                onClick={header.column.getToggleSortingHandler()}
              >
                <div className="flex items-center gap-1">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() === 'asc' && (
                    <ArrowUp className="size-3" />
                  )}
                  {header.column.getIsSorted() === 'desc' && (
                    <ArrowDown className="size-3" />
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {table.getRowModel().rows.map(row => (
          <TableRow key={row.id} className="hover:bg-muted/50">
            {row.getVisibleCells().map(cell => (
              <TableCell key={cell.id} className="truncate">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
