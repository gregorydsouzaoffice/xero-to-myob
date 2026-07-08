// Since we can't generate actual PDFs in this environment, we'll create HTML files instead

export async function downloadReport(reportType: string): Promise<void> {
  try {
    // Map report types to filenames
    const fileMap: Record<string, string> = {
      "trial-balance": "Comparative-Trial-Balance",
      "aged-receivable": "Comparative-Aged-Receivable",
      "aged-payable": "Comparative-Aged-Payable",
    }

    const fileName = fileMap[reportType]

    if (!fileName) {
      throw new Error(`Unknown report type: ${reportType}`)
    }

    // Create a link to download the HTML file directly
    const link = document.createElement("a")
    link.href = `/reports/${fileName}.html`
    link.download = `${fileName}.html` // Change extension to .html
    link.target = "_blank" // Open in new tab
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Show instructions to the user
    setTimeout(() => {
      alert("Report downloaded as HTML file. Please open it in your web browser to view the report.")
    }, 1000)
  } catch (error) {
    console.error("Error downloading report:", error)
    alert(`Error downloading report. Please try again later.`)
  }
}
