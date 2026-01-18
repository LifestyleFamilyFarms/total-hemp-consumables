type CsvRow = Array<string | number | undefined | null>

const escapeValue = (value: string) => {
  const needsQuotes = /[",\n]/.test(value)
  const escaped = value.replace(/"/g, '""')
  return needsQuotes ? `"${escaped}"` : escaped
}

export const buildCsv = (headers: string[], rows: CsvRow[]) => {
  const headerLine = headers.map(escapeValue).join(",")
  const rowLines = rows.map((row) =>
    row
      .map((value) =>
        escapeValue(value === undefined || value === null ? "" : String(value))
      )
      .join(",")
  )

  return [headerLine, ...rowLines].join("\n")
}
