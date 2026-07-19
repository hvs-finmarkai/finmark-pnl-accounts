import { PrismaClient } from "@prisma/client"
import { hashSync } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  await prisma.auditLog.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.invoice.deleteMany()
  await prisma.contract.deleteMany()
  await prisma.transaction.deleteMany()
  await prisma.employee.deleteMany()
  await prisma.costAllocation.deleteMany()
  await prisma.budget.deleteMany()
  await prisma.workflow.deleteMany()
  await prisma.report.deleteMany()
  await prisma.integration.deleteMany()
  await prisma.project.deleteMany()
  await prisma.client.deleteMany()
  await prisma.organization.deleteMany()
  await prisma.user.deleteMany()

  const hash = hashSync("admin123", 10)

  const users = await Promise.all([
    prisma.user.create({ data: { email: "arjun@finmark.ai", name: "Arjun Mehta", passwordHash: hash, role: "admin", department: "Finance" } }),
    prisma.user.create({ data: { email: "pooja@finmark.ai", name: "Pooja Nair", passwordHash: hash, role: "manager", department: "Operations" } }),
    prisma.user.create({ data: { email: "rohan@finmark.ai", name: "Rohan Singh", passwordHash: hash, role: "manager", department: "Delivery" } }),
    prisma.user.create({ data: { email: "sneha@finmark.ai", name: "Sneha Iyer", passwordHash: hash, role: "analyst", department: "Engineering" } }),
    prisma.user.create({ data: { email: "vikram@finmark.ai", name: "Vikram Dev", passwordHash: hash, role: "analyst", department: "Engineering" } }),
  ])

  await prisma.organization.create({ data: { name: "Finmark.ai", industry: "IT Services", country: "India", currency: "INR" } })

  const clients = await Promise.all([
    prisma.client.create({ data: { name: "TechCorp Inc.", industry: "Technology", region: "North America", status: "active", contractValue: 25600000, healthScore: 92, contactPerson: "John Smith", contactEmail: "john@techcorp.com" } }),
    prisma.client.create({ data: { name: "Global Solutions Ltd.", industry: "Consulting", region: "Europe", status: "active", contractValue: 18700000, healthScore: 88, contactPerson: "Marie Laurent", contactEmail: "marie@globalsol.com" } }),
    prisma.client.create({ data: { name: "InnovateX", industry: "Technology", region: "APAC", status: "active", contractValue: 15200000, healthScore: 85, contactPerson: "Wei Chen", contactEmail: "wei@innovatex.com" } }),
    prisma.client.create({ data: { name: "HealthPlus", industry: "Healthcare", region: "North America", status: "active", contractValue: 12300000, healthScore: 79, contactPerson: "Sarah Johnson", contactEmail: "sarah@healthplus.com" } }),
    prisma.client.create({ data: { name: "FidServe Global", industry: "Finance", region: "Europe", status: "at_risk", contractValue: 11700000, healthScore: 62, contactPerson: "Hans Mueller", contactEmail: "hans@fidserve.com" } }),
    prisma.client.create({ data: { name: "EduMind", industry: "Education", region: "APAC", status: "at_risk", contractValue: 8600000, healthScore: 58, contactPerson: "Raj Patel", contactEmail: "raj@edumind.com" } }),
  ])

  const projects = await Promise.all([
    prisma.project.create({ data: { name: "Website Redesign", clientId: clients[0].id, managerId: users[0].id, status: "in_progress", priority: "high", budget: 2400000, startDate: new Date("2025-01-15"), endDate: new Date("2025-07-30"), progress: 65, description: "Complete website redesign with new CMS" } }),
    prisma.project.create({ data: { name: "ERP Implementation", clientId: clients[3].id, managerId: users[1].id, status: "in_progress", priority: "critical", budget: 5600000, startDate: new Date("2025-02-01"), endDate: new Date("2025-12-31"), progress: 40, description: "SAP S/4HANA implementation" } }),
    prisma.project.create({ data: { name: "API Integration", clientId: clients[0].id, managerId: users[2].id, status: "completed", priority: "medium", budget: 1200000, startDate: new Date("2024-10-01"), endDate: new Date("2025-03-15"), progress: 100, description: "Third-party API integration" } }),
    prisma.project.create({ data: { name: "Cloud Migration", clientId: clients[1].id, managerId: users[3].id, status: "at_risk", priority: "high", budget: 3800000, startDate: new Date("2025-03-01"), endDate: new Date("2025-09-30"), progress: 55, description: "AWS cloud migration" } }),
    prisma.project.create({ data: { name: "Data Migration", clientId: clients[5].id, managerId: users[4].id, status: "planning", priority: "medium", budget: 1500000, startDate: new Date("2025-06-01"), endDate: new Date("2025-11-30"), progress: 10, description: "Legacy data migration" } }),
    prisma.project.create({ data: { name: "Mobile App Dev", clientId: clients[2].id, managerId: users[2].id, status: "in_progress", priority: "high", budget: 3200000, startDate: new Date("2025-04-01"), endDate: new Date("2025-10-15"), progress: 35, description: "Cross-platform mobile app" } }),
    prisma.project.create({ data: { name: "UI/UX Design", clientId: clients[1].id, managerId: users[3].id, status: "completed", priority: "low", budget: 800000, startDate: new Date("2024-11-01"), endDate: new Date("2025-02-28"), progress: 100, description: "Design system audit" } }),
    prisma.project.create({ data: { name: "Support Project", clientId: clients[4].id, managerId: users[1].id, status: "at_risk", priority: "medium", budget: 800000, startDate: new Date("2024-12-01"), endDate: new Date("2025-06-30"), progress: 70, description: "Ongoing technical support" } }),
  ])

  await Promise.all([
    prisma.employee.create({ data: { name: "Arun Sharma", email: "arun@finmark.ai", department: "Engineering", role: "Senior Developer", salary: 180000, utilization: 95, status: "active", skills: "React,Node.js,TypeScript", projectId: projects[0].id, hireDate: new Date("2022-03-15") } }),
    prisma.employee.create({ data: { name: "Priya Verma", email: "priya@finmark.ai", department: "Engineering", role: "Backend Developer", salary: 150000, utilization: 88, status: "active", skills: "Python,FastAPI,PostgreSQL", projectId: projects[1].id, hireDate: new Date("2022-06-01") } }),
    prisma.employee.create({ data: { name: "Rohit Mehta", email: "rohit@finmark.ai", department: "Design", role: "UI/UX Designer", salary: 140000, utilization: 85, status: "active", skills: "Figma,React,CSS", projectId: projects[0].id, hireDate: new Date("2023-01-10") } }),
    prisma.employee.create({ data: { name: "Anita Desai", email: "anita@finmark.ai", department: "Operations", role: "Business Analyst", salary: 130000, utilization: 82, status: "active", skills: "Excel,SQL,Tableau", projectId: projects[3].id, hireDate: new Date("2022-09-20") } }),
    prisma.employee.create({ data: { name: "Karan Patel", email: "karan@finmark.ai", department: "Engineering", role: "DevOps Engineer", salary: 170000, utilization: 90, status: "active", skills: "AWS,Docker,Kubernetes", projectId: projects[3].id, hireDate: new Date("2023-04-01") } }),
    prisma.employee.create({ data: { name: "Meera Joshi", email: "meera@finmark.ai", department: "Engineering", role: "QA Engineer", salary: 120000, utilization: 78, status: "active", skills: "Selenium,Jest,Cypress", projectId: projects[5].id, hireDate: new Date("2023-07-15") } }),
    prisma.employee.create({ data: { name: "Amit Kumar", email: "amit@finmark.ai", department: "Engineering", role: "Frontend Developer", salary: 145000, utilization: 0, status: "bench", skills: "React,Vue,Angular", hireDate: new Date("2022-11-01") } }),
    prisma.employee.create({ data: { name: "Deepa Singh", email: "deepa@finmark.ai", department: "Data", role: "Data Analyst", salary: 135000, utilization: 0, status: "bench", skills: "Python,SQL,PowerBI", hireDate: new Date("2023-09-01") } }),
    prisma.employee.create({ data: { name: "Sanjay Rao", email: "sanjay@finmark.ai", department: "Engineering", role: "Full Stack Developer", salary: 160000, utilization: 72, status: "active", skills: "Next.js,Python,AWS", projectId: projects[4].id, hireDate: new Date("2022-01-20") } }),
    prisma.employee.create({ data: { name: "Neha Gupta", email: "neha@finmark.ai", department: "HR", role: "HR Manager", salary: 140000, utilization: 65, status: "active", skills: "Recruitment,HRMS,Compliance", hireDate: new Date("2021-05-10") } }),
  ])

  const months = ["2025-01", "2025-02", "2025-03", "2025-04", "2025-05"]
  const revenueAmts = [95000000, 102000000, 110000000, 118000000, 125800000]
  const expenseAmts = [72000000, 76000000, 80000000, 85000000, 91100000]

  for (let i = 0; i < months.length; i++) {
    const d = new Date(`${months[i]}-15`)
    await prisma.transaction.create({ data: { date: d, description: `Monthly Revenue - ${months[i]}`, category: "Revenue", type: "revenue", amount: revenueAmts[i] } })
    await prisma.transaction.create({ data: { date: d, description: `Payroll - ${months[i]}`, category: "Payroll", type: "expense", amount: expenseAmts[i] * 0.5 } })
    await prisma.transaction.create({ data: { date: d, description: `Vendor Payments - ${months[i]}`, category: "Vendor", type: "expense", amount: expenseAmts[i] * 0.2 } })
    await prisma.transaction.create({ data: { date: d, description: `Overheads - ${months[i]}`, category: "Overheads", type: "expense", amount: expenseAmts[i] * 0.13 } })
    await prisma.transaction.create({ data: { date: d, description: `Travel - ${months[i]}`, category: "Travel", type: "expense", amount: expenseAmts[i] * 0.09 } })
    await prisma.transaction.create({ data: { date: d, description: `Technology - ${months[i]}`, category: "Technology", type: "expense", amount: expenseAmts[i] * 0.05 } })
    await prisma.transaction.create({ data: { date: d, description: `Others - ${months[i]}`, category: "Others", type: "expense", amount: expenseAmts[i] * 0.03 } })
  }

  await prisma.transaction.create({ data: { date: new Date("2025-05-10"), description: "TechCorp - Website Redesign", category: "Project Revenue", type: "revenue", amount: 4200000, clientId: clients[0].id, projectId: projects[0].id } })
  await prisma.transaction.create({ data: { date: new Date("2025-05-10"), description: "HealthPlus - ERP Phase 1", category: "Project Revenue", type: "revenue", amount: 8500000, clientId: clients[3].id, projectId: projects[1].id } })
  await prisma.transaction.create({ data: { date: new Date("2025-05-12"), description: "Global Solutions - Cloud", category: "Project Revenue", type: "revenue", amount: 3200000, clientId: clients[1].id, projectId: projects[3].id } })
  await prisma.transaction.create({ data: { date: new Date("2025-05-15"), description: "InnovateX - Mobile App", category: "Project Revenue", type: "revenue", amount: 5100000, clientId: clients[2].id, projectId: projects[5].id } })

  await Promise.all([
    prisma.budget.create({ data: { category: "Revenue", department: "Overall", month: "2025-05", budgeted: 110200000, actual: 125800000 } }),
    prisma.budget.create({ data: { category: "Payroll", department: "Engineering", month: "2025-05", budgeted: 35000000, actual: 38500000 } }),
    prisma.budget.create({ data: { category: "Vendor", department: "Overall", month: "2025-05", budgeted: 15000000, actual: 18600000 } }),
    prisma.budget.create({ data: { category: "Overheads", department: "Overall", month: "2025-05", budgeted: 10000000, actual: 12300000 } }),
    prisma.budget.create({ data: { category: "Travel", department: "Overall", month: "2025-05", budgeted: 6000000, actual: 8400000 } }),
    prisma.budget.create({ data: { category: "Technology", department: "Engineering", month: "2025-05", budgeted: 5000000, actual: 4200000 } }),
  ])

  await Promise.all([
    prisma.contract.create({ data: { clientId: clients[0].id, name: "Website Redesign Contract", value: 2400000, startDate: new Date("2025-01-01"), endDate: new Date("2025-07-31"), status: "active", type: "fixed" } }),
    prisma.contract.create({ data: { clientId: clients[0].id, name: "Annual Support", value: 1200000, startDate: new Date("2025-01-01"), endDate: new Date("2025-12-31"), status: "active", type: "retainer" } }),
    prisma.contract.create({ data: { clientId: clients[3].id, name: "ERP Implementation", value: 5600000, startDate: new Date("2025-02-01"), endDate: new Date("2025-12-31"), status: "active", type: "fixed" } }),
    prisma.contract.create({ data: { clientId: clients[1].id, name: "Cloud Migration", value: 3800000, startDate: new Date("2025-03-01"), endDate: new Date("2025-09-30"), status: "active", type: "t&m" } }),
    prisma.contract.create({ data: { clientId: clients[2].id, name: "Mobile App Dev", value: 3200000, startDate: new Date("2025-04-01"), endDate: new Date("2025-10-15"), status: "active", type: "fixed" } }),
  ])

  await Promise.all([
    prisma.invoice.create({ data: { clientId: clients[0].id, projectId: projects[0].id, invoiceNumber: "INV-2025-001", amount: 800000, dueDate: new Date("2025-03-15"), paidDate: new Date("2025-03-10"), status: "paid" } }),
    prisma.invoice.create({ data: { clientId: clients[0].id, projectId: projects[0].id, invoiceNumber: "INV-2025-012", amount: 800000, dueDate: new Date("2025-04-15"), paidDate: new Date("2025-04-12"), status: "paid" } }),
    prisma.invoice.create({ data: { clientId: clients[0].id, projectId: projects[0].id, invoiceNumber: "INV-2025-025", amount: 800000, dueDate: new Date("2025-05-15"), status: "pending" } }),
    prisma.invoice.create({ data: { clientId: clients[3].id, projectId: projects[1].id, invoiceNumber: "INV-2025-008", amount: 1400000, dueDate: new Date("2025-04-01"), paidDate: new Date("2025-04-05"), status: "paid" } }),
    prisma.invoice.create({ data: { clientId: clients[1].id, projectId: projects[3].id, invoiceNumber: "INV-2025-015", amount: 950000, dueDate: new Date("2025-05-10"), status: "overdue" } }),
  ])

  await Promise.all([
    prisma.costAllocation.create({ data: { costCenter: "IT Infrastructure", driver: "Headcount", totalCost: 4800000, allocatedCost: 4200000, rule: "Per-employee allocation", department: "Engineering", status: "approved" } }),
    prisma.costAllocation.create({ data: { costCenter: "Office Space", driver: "Square Footage", totalCost: 3500000, allocatedCost: 3100000, rule: "Area-based allocation", department: "Operations", status: "approved" } }),
    prisma.costAllocation.create({ data: { costCenter: "HR Services", driver: "Headcount", totalCost: 2800000, allocatedCost: 2800000, rule: "Equal distribution", department: "HR", status: "approved" } }),
    prisma.costAllocation.create({ data: { costCenter: "Management Fee", driver: "Revenue %", totalCost: 6000000, allocatedCost: 5500000, rule: "Revenue-proportional", department: "Finance", status: "pending" } }),
    prisma.costAllocation.create({ data: { costCenter: "Training Budget", driver: "Department", totalCost: 1500000, allocatedCost: 1200000, rule: "Department budget cap", department: "All", status: "pending" } }),
  ])

  await Promise.all([
    prisma.notification.create({ data: { userId: users[0].id, type: "approval", title: "Invoice #INV-2025-025 requires approval", message: "Amount: ₹800,000 - From: TechCorp Inc.", actionUrl: "/clients/billing" } }),
    prisma.notification.create({ data: { userId: users[0].id, type: "warning", title: "Cloud Migration margin below threshold", message: "Current margin: 8.2%. Threshold: 10%", actionUrl: "/projects" } }),
    prisma.notification.create({ data: { userId: users[0].id, type: "warning", title: "Budget exceeded in Cloud Migration", message: "Exceeded by: ₹980,000 (12.3%)", actionUrl: "/pnl/budget" } }),
    prisma.notification.create({ data: { userId: users[0].id, type: "success", title: "Data sync completed", message: "All systems up to date", isRead: true, actionUrl: "/integrations" } }),
  ])

  await Promise.all([
    prisma.integration.create({ data: { name: "Salesforce CRM", category: "CRM", status: "connected", lastSync: new Date(), recordsSynced: 12450 } }),
    prisma.integration.create({ data: { name: "SAP S/4HANA", category: "ERP", status: "connected", lastSync: new Date(), recordsSynced: 8920 } }),
    prisma.integration.create({ data: { name: "BambooHR", category: "HRMS", status: "connected", lastSync: new Date(), recordsSynced: 586, errors: 2 } }),
    prisma.integration.create({ data: { name: "Jira Software", category: "Project Mgmt", status: "connected", lastSync: new Date(), recordsSynced: 3420 } }),
    prisma.integration.create({ data: { name: "Tally Prime", category: "Accounting", status: "connected", lastSync: new Date(), recordsSynced: 15680 } }),
    prisma.integration.create({ data: { name: "Power BI", category: "Analytics", status: "disconnected", recordsSynced: 0, errors: 5 } }),
  ])

  await Promise.all([
    prisma.report.create({ data: { name: "Board Summary", type: "board_summary", format: "pdf", schedule: "monthly", lastGenerated: new Date("2025-07-15") } }),
    prisma.report.create({ data: { name: "P&L Report", type: "pnl", format: "pdf", schedule: "on_demand", lastGenerated: new Date("2025-07-14") } }),
    prisma.report.create({ data: { name: "Client Profitability", type: "client_profitability", format: "excel", schedule: "on_demand", lastGenerated: new Date("2025-07-12") } }),
    prisma.report.create({ data: { name: "Budget vs Actual", type: "budget", format: "pdf", schedule: "weekly", lastGenerated: new Date("2025-07-10") } }),
    prisma.report.create({ data: { name: "Workforce Report", type: "workforce", format: "excel", schedule: "monthly", lastGenerated: new Date("2025-07-08") } }),
  ])

  await prisma.workflow.create({ data: { name: "Invoice Approval Workflow", description: "Auto-route invoices for approval based on amount", status: "active", createdBy: users[0].id, executions: 245, lastRun: new Date("2025-07-18"), nodes: JSON.stringify([{id:"1",type:"trigger",label:"Invoice Created",position:{x:250,y:50}},{id:"2",type:"condition",label:"Amount > 5L",position:{x:250,y:150}},{id:"3",type:"approval",label:"Manager Approval",position:{x:250,y:250}},{id:"4",type:"notification",label:"Notify Finance",position:{x:250,y:350}}]), edges: JSON.stringify([{id:"e1",source:"1",target:"2"},{id:"e2",source:"2",target:"3"},{id:"e3",source:"3",target:"4"}]) } })

  console.log("Seed completed successfully")
}

main().catch(console.error).finally(() => prisma.$disconnect())
