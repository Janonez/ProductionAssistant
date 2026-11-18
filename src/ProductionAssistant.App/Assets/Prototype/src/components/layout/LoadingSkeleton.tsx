// Remote tables reserve the same columns and row spacing as their loaded content.
export function RemoteTableSkeleton({ columns, details, rows = 4 }: { columns: string[]; details?: string[]; rows?: number }) {
  return <table className="remote-table-skeleton" aria-busy="true" aria-label="正在读取表格内容">
    <thead><tr>{columns.map((column, index) => <th key={index}>{column}{details && <small>{details[index]}</small>}</th>)}</tr></thead>
    <tbody>{Array.from({ length: rows }, (_, row) => <tr key={row}>{columns.map((_, column) => <td key={column}><span className="skeleton-block" aria-hidden="true">&nbsp;</span></td>)}</tr>)}</tbody>
  </table>
}
