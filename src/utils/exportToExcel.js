/**
 * Export data to Excel-compatible CSV file
 */

export const exportToCSV = (data, filename, columns) => {
  if (!data || data.length === 0) {
    alert('No data to export')
    return
  }

  // Get column headers
  const headers = columns ? columns.map(col => col.label) : Object.keys(data[0])
  const keys = columns ? columns.map(col => col.key) : Object.keys(data[0])

  // Build CSV content
  const csvContent = [
    headers.join(','),
    ...data.map(row =>
      keys.map(key => {
        let value = typeof key === 'function' ? key(row) : row[key]
        // Handle values that might contain commas or quotes
        if (value === null || value === undefined) value = ''
        value = String(value)
        if (value.includes(',') || value.includes('"') || value.includes('\n')) {
          value = `"${value.replace(/"/g, '""')}"`
        }
        return value
      }).join(',')
    )
  ].join('\n')

  // Create and trigger download
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Pre-defined export configurations
export const exportAgents = (agents, getAgentStats) => {
  const data = agents.map(agent => {
    const stats = getAgentStats(agent.id)
    return {
      name: agent.name,
      email: agent.email,
      phone: agent.phone,
      territory: agent.territory,
      status: agent.status,
      level: agent.level,
      hireDate: new Date(agent.hireDate).toLocaleDateString(),
      totalSales: stats.totalSales,
      totalRevenue: stats.totalRevenue,
      closeRate: stats.closeRate,
      streak: agent.streak
    }
  })

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'territory', label: 'Territory' },
    { key: 'status', label: 'Status' },
    { key: 'level', label: 'Level' },
    { key: 'hireDate', label: 'Hire Date' },
    { key: 'totalSales', label: 'Total Sales' },
    { key: 'totalRevenue', label: 'Total Revenue ($)' },
    { key: 'closeRate', label: 'Close Rate (%)' },
    { key: 'streak', label: 'Current Streak' }
  ]

  exportToCSV(data, 'agents_export', columns)
}

export const exportSales = (sales, agents) => {
  const data = sales.map(sale => {
    const agent = agents.find(a => a.id === sale.agentId)
    return {
      clientName: sale.clientName,
      agentName: agent?.name || 'Unknown',
      productType: sale.productType,
      premium: sale.premium,
      commission: sale.commission,
      closeDate: new Date(sale.closeDate).toLocaleDateString(),
      city: sale.location?.city || '',
      state: sale.location?.state || ''
    }
  })

  const columns = [
    { key: 'clientName', label: 'Client Name' },
    { key: 'agentName', label: 'Agent' },
    { key: 'productType', label: 'Product Type' },
    { key: 'premium', label: 'Premium ($)' },
    { key: 'commission', label: 'Commission ($)' },
    { key: 'closeDate', label: 'Close Date' },
    { key: 'city', label: 'City' },
    { key: 'state', label: 'State' }
  ]

  exportToCSV(data, 'sales_export', columns)
}

export const exportLeads = (leads, agents) => {
  const data = leads.map(lead => {
    const agent = agents.find(a => a.id === lead.assignedTo)
    return {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      status: lead.status,
      productInterest: lead.productInterest,
      estimatedValue: lead.estimatedValue,
      assignedTo: agent?.name || 'Unassigned',
      city: lead.location?.city || '',
      state: lead.location?.state || '',
      notes: lead.notes || ''
    }
  })

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'status', label: 'Status' },
    { key: 'productInterest', label: 'Product Interest' },
    { key: 'estimatedValue', label: 'Estimated Value ($)' },
    { key: 'assignedTo', label: 'Assigned Agent' },
    { key: 'city', label: 'City' },
    { key: 'state', label: 'State' },
    { key: 'notes', label: 'Notes' }
  ]

  exportToCSV(data, 'leads_export', columns)
}

export const exportApplications = (applications) => {
  const data = applications.map(app => ({
    firstName: app.firstName,
    lastName: app.lastName,
    email: app.email,
    phone: app.phone,
    experience: app.experience,
    licensed: app.licensed,
    message: app.message,
    submittedAt: new Date(app.submittedAt).toLocaleDateString(),
    status: app.status,
    hasResume: app.resumeName ? 'Yes' : 'No',
    resumeName: app.resumeName || ''
  }))

  const columns = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'experience', label: 'Sales Experience' },
    { key: 'licensed', label: 'Licensed?' },
    { key: 'message', label: 'Message' },
    { key: 'submittedAt', label: 'Submitted' },
    { key: 'status', label: 'Status' },
    { key: 'hasResume', label: 'Has Resume' },
    { key: 'resumeName', label: 'Resume File' }
  ]

  exportToCSV(data, 'applications_export', columns)
}
