import exportFromJSON from 'export-from-json'

export function download (exportType,fileName, data) {
    exportFromJSON({ data, fileName, exportType })
  }

