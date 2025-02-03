import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { Table as TableType } from '@/sanity/types/sanity.types'

export function buildTable(table: TableType) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    {table.columns?.map((column) => (
                        <TableHeader key={column.header}>{column.header}</TableHeader>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {table.columns?.[0]?.cells?.map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {table.columns?.map((column, colIndex) => (
                            <TableCell key={`${rowIndex}-${colIndex}`}>
                                {column.cells?.[rowIndex]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}