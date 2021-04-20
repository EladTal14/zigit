import { useMemo, useState } from 'react'
import { useTable, useSortBy, useGlobalFilter } from 'react-table'
import { Filter } from './Filter'

export function Table({ data }) {
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Score',
        accessor: 'score',
      },
      {
        Header: 'Duration in days',
        accessor: 'durationInDays',
      },
      {
        Header: 'Bugs count',
        accessor: 'bugsCount',
      },
      {
        Header: 'Made deadline',
        accessor: 'madeDadeline',
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter
  } = useTable({ columns, data }, useGlobalFilter, useSortBy)

  const { globalFilter } = state
  return (
    <>
      <Filter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    borderBottom: 'solid 3px red',
                    background: 'aliceblue',
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        border: 'solid 1px gray',
                        background: `${cell.row.original.score < 70 ? "red" : cell.row.original.score > 90 ? "green" : "yellow"}`,

                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
