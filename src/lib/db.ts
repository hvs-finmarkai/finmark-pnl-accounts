import { hashSync } from "bcryptjs"

export const USE_PRISMA = !!process.env.DATABASE_URL

interface DB {
  users: any[]
  clients: any[]
  projects: any[]
  employees: any[]
  transactions: any[]
  budgets: any[]
  contracts: any[]
  invoices: any[]
  cost_allocations: any[]
  notifications: any[]
  workflows: any[]
  reports: any[]
  integrations: any[]
}

let store: DB | null = null

export function getDb(): DB {
  if (!store) {
    store = createSeededData()
  }
  return store
}

function createSeededData(): DB {
  const passwordHash = hashSync("admin123", 10)

  const users = [
    { id: 1, email: "arjun@denave.com", name: "Arjun Mehta", password_hash: passwordHash, role: "admin", department: "Finance", is_active: 1 },
    { id: 2, email: "pooja@denave.com", name: "Pooja Nair", password_hash: passwordHash, role: "manager", department: "Operations", is_active: 1 },
    { id: 3, email: "rohan@denave.com", name: "Rohan Singh", password_hash: passwordHash, role: "manager", department: "Delivery", is_active: 1 },
    { id: 4, email: "sneha@denave.com", name: "Sneha Iyer", password_hash: passwordHash, role: "analyst", department: "Engineering", is_active: 1 },
    { id: 5, email: "vikram@denave.com", name: "Vikram Dev", password_hash: passwordHash, role: "analyst", department: "Engineering", is_active: 1 },
  ]

  const clients = [
    { id: 1, name: "TechCorp Inc.", industry: "Technology", region: "North America", status: "active", contract_value: 25600000, health_score: 92, contact_person: "John Smith", contact_email: "john@techcorp.com" },
    { id: 2, name: "Global Solutions Ltd.", industry: "Consulting", region: "Europe", status: "active", contract_value: 18700000, health_score: 88, contact_person: "Marie Laurent", contact_email: "marie@globalsol.com" },
    { id: 3, name: "InnovateX", industry: "Technology", region: "APAC", status: "active", contract_value: 15200000, health_score: 85, contact_person: "Wei Chen", contact_email: "wei@innovatex.com" },
    { id: 4, name: "HealthPlus", industry: "Healthcare", region: "North America", status: "active", contract_value: 12300000, health_score: 79, contact_person: "Sarah Johnson", contact_email: "sarah@healthplus.com" },
    { id: 5, name: "FidServe Global", industry: "Finance", region: "Europe", status: "at-risk", contract_value: 11700000, health_score: 62, contact_person: "Hans Mueller", contact_email: "hans@fidserve.com" },
    { id: 6, name: "EduMind", industry: "Education", region: "APAC", status: "at-risk", contract_value: 8600000, health_score: 58, contact_person: "Raj Patel", contact_email: "raj@edumind.com" },
  ]

  const projects = [
    { id: 1, name: "Website Redesign", client_id: 1, manager_id: 1, status: "in-progress", priority: "high", budget: 2400000, start_date: "2025-01-15", end_date: "2025-07-30", progress: 65, description: "Complete website redesign with new CMS" },
    { id: 2, name: "ERP Implementation", client_id: 4, manager_id: 2, status: "in-progress", priority: "critical", budget: 5600000, start_date: "2025-02-01", end_date: "2025-12-31", progress: 40, description: "SAP S/4HANA implementation" },
    { id: 3, name: "API Integration", client_id: 1, manager_id: 3, status: "completed", priority: "medium", budget: 1200000, start_date: "2024-10-01", end_date: "2025-03-15", progress: 100, description: "Third-party API integration suite" },
    { id: 4, name: "Cloud Migration", client_id: 2, manager_id: 4, status: "at-risk", priority: "high", budget: 3800000, start_date: "2025-03-01", end_date: "2025-09-30", progress: 55, description: "AWS cloud migration project" },
    { id: 5, name: "Data Migration", client_id: 6, manager_id: 5, status: "planning", priority: "medium", budget: 1500000, start_date: "2025-06-01", end_date: "2025-11-30", progress: 10, description: "Legacy data migration" },
    { id: 6, name: "Mobile App Dev", client_id: 3, manager_id: 3, status: "in-progress", priority: "high", budget: 3200000, start_date: "2025-04-01", end_date: "2025-10-15", progress: 35, description: "Cross-platform mobile app" },
    { id: 7, name: "UI/UX Design", client_id: 2, manager_id: 4, status: "completed", priority: "low", budget: 800000, start_date: "2024-11-01", end_date: "2025-02-28", progress: 100, description: "Design system and UX audit" },
    { id: 8, name: "Support Project", client_id: 5, manager_id: 2, status: "at-risk", priority: "medium", budget: 800000, start_date: "2024-12-01", end_date: "2025-06-30", progress: 70, description: "Ongoing technical support" },
  ]

  const employees = [
    { id: 1, name: "Arun Sharma", email: "arun@denave.com", department: "Engineering", role: "Senior Developer", salary: 180000, utilization: 95, status: "active", skills: "React,Node.js,TypeScript", project_id: 1, hire_date: "2022-03-15" },
    { id: 2, name: "Priya Verma", email: "priya@denave.com", department: "Engineering", role: "Backend Developer", salary: 150000, utilization: 88, status: "active", skills: "Python,FastAPI,PostgreSQL", project_id: 2, hire_date: "2022-06-01" },
    { id: 3, name: "Rohit Mehta", email: "rohit@denave.com", department: "Design", role: "UI/UX Designer", salary: 140000, utilization: 85, status: "active", skills: "Figma,React,CSS", project_id: 1, hire_date: "2023-01-10" },
    { id: 4, name: "Anita Desai", email: "anita@denave.com", department: "Operations", role: "Business Analyst", salary: 130000, utilization: 82, status: "active", skills: "Excel,SQL,Tableau", project_id: 4, hire_date: "2022-09-20" },
    { id: 5, name: "Karan Patel", email: "karan@denave.com", department: "Engineering", role: "DevOps Engineer", salary: 170000, utilization: 90, status: "active", skills: "AWS,Docker,Kubernetes", project_id: 4, hire_date: "2023-04-01" },
    { id: 6, name: "Meera Joshi", email: "meera@denave.com", department: "Engineering", role: "QA Engineer", salary: 120000, utilization: 78, status: "active", skills: "Selenium,Jest,Cypress", project_id: 6, hire_date: "2023-07-15" },
    { id: 7, name: "Amit Kumar", email: "amit@denave.com", department: "Engineering", role: "Frontend Developer", salary: 145000, utilization: 0, status: "bench", skills: "React,Vue,Angular", project_id: null, hire_date: "2022-11-01" },
    { id: 8, name: "Deepa Singh", email: "deepa@denave.com", department: "Data", role: "Data Analyst", salary: 135000, utilization: 0, status: "bench", skills: "Python,SQL,PowerBI", project_id: null, hire_date: "2023-09-01" },
    { id: 9, name: "Sanjay Rao", email: "sanjay@denave.com", department: "Engineering", role: "Full Stack Developer", salary: 160000, utilization: 72, status: "active", skills: "Next.js,Python,AWS", project_id: 5, hire_date: "2022-01-20" },
    { id: 10, name: "Neha Gupta", email: "neha@denave.com", department: "HR", role: "HR Manager", salary: 140000, utilization: 65, status: "active", skills: "Recruitment,HRMS,Compliance", project_id: null, hire_date: "2021-05-10" },
  ]

  const transactions: any[] = []
  let txId = 1
  const months = ["2025-01", "2025-02", "2025-03", "2025-04", "2025-05"]
  const revenueAmounts = [95000000, 102000000, 110000000, 118000000, 125800000]
  const expenseAmounts = [72000000, 76000000, 80000000, 85000000, 91100000]

  months.forEach((m, i) => {
    transactions.push({ id: txId++, date: `${m}-15`, description: `Monthly Revenue - ${m}`, category: "Revenue", type: "revenue", amount: revenueAmounts[i], client_id: null, project_id: null, status: "posted" })
    transactions.push({ id: txId++, date: `${m}-15`, description: `Payroll - ${m}`, category: "Payroll", type: "expense", amount: expenseAmounts[i] * 0.5, client_id: null, project_id: null, status: "posted" })
    transactions.push({ id: txId++, date: `${m}-15`, description: `Vendor Payments - ${m}`, category: "Vendor", type: "expense", amount: expenseAmounts[i] * 0.2, client_id: null, project_id: null, status: "posted" })
    transactions.push({ id: txId++, date: `${m}-15`, description: `Overheads - ${m}`, category: "Overheads", type: "expense", amount: expenseAmounts[i] * 0.13, client_id: null, project_id: null, status: "posted" })
    transactions.push({ id: txId++, date: `${m}-15`, description: `Travel - ${m}`, category: "Travel", type: "expense", amount: expenseAmounts[i] * 0.09, client_id: null, project_id: null, status: "posted" })
    transactions.push({ id: txId++, date: `${m}-15`, description: `Technology - ${m}`, category: "Technology", type: "expense", amount: expenseAmounts[i] * 0.05, client_id: null, project_id: null, status: "posted" })
    transactions.push({ id: txId++, date: `${m}-15`, description: `Others - ${m}`, category: "Others", type: "expense", amount: expenseAmounts[i] * 0.03, client_id: null, project_id: null, status: "posted" })
  })

  transactions.push({ id: txId++, date: "2025-05-10", description: "TechCorp - Website Redesign", category: "Project Revenue", type: "revenue", amount: 4200000, client_id: 1, project_id: 1, status: "posted" })
  transactions.push({ id: txId++, date: "2025-05-10", description: "HealthPlus - ERP Phase 1", category: "Project Revenue", type: "revenue", amount: 8500000, client_id: 4, project_id: 2, status: "posted" })
  transactions.push({ id: txId++, date: "2025-05-12", description: "Global Solutions - Cloud", category: "Project Revenue", type: "revenue", amount: 3200000, client_id: 2, project_id: 4, status: "posted" })
  transactions.push({ id: txId++, date: "2025-05-15", description: "InnovateX - Mobile App", category: "Project Revenue", type: "revenue", amount: 5100000, client_id: 3, project_id: 6, status: "posted" })

  const budgets = [
    { id: 1, category: "Revenue", department: "Overall", month: "2025-05", budgeted: 110200000, actual: 125800000 },
    { id: 2, category: "Payroll", department: "Engineering", month: "2025-05", budgeted: 35000000, actual: 38500000 },
    { id: 3, category: "Payroll", department: "Operations", month: "2025-05", budgeted: 8000000, actual: 7200000 },
    { id: 4, category: "Vendor", department: "Overall", month: "2025-05", budgeted: 15000000, actual: 18600000 },
    { id: 5, category: "Overheads", department: "Overall", month: "2025-05", budgeted: 10000000, actual: 12300000 },
    { id: 6, category: "Travel", department: "Overall", month: "2025-05", budgeted: 6000000, actual: 8400000 },
    { id: 7, category: "Technology", department: "Engineering", month: "2025-05", budgeted: 5000000, actual: 4200000 },
  ]

  const contracts = [
    { id: 1, client_id: 1, name: "Website Redesign Contract", value: 2400000, start_date: "2025-01-01", end_date: "2025-07-31", status: "active", type: "fixed" },
    { id: 2, client_id: 1, name: "Annual Support", value: 1200000, start_date: "2025-01-01", end_date: "2025-12-31", status: "active", type: "retainer" },
    { id: 3, client_id: 4, name: "ERP Implementation", value: 5600000, start_date: "2025-02-01", end_date: "2025-12-31", status: "active", type: "fixed" },
    { id: 4, client_id: 2, name: "Cloud Migration", value: 3800000, start_date: "2025-03-01", end_date: "2025-09-30", status: "active", type: "t&m" },
    { id: 5, client_id: 3, name: "Mobile App Development", value: 3200000, start_date: "2025-04-01", end_date: "2025-10-15", status: "active", type: "fixed" },
    { id: 6, client_id: 5, name: "Technical Support", value: 800000, start_date: "2024-12-01", end_date: "2025-06-30", status: "active", type: "retainer" },
  ]

  const invoices = [
    { id: 1, client_id: 1, project_id: 1, invoice_number: "INV-2025-001", amount: 800000, due_date: "2025-03-15", paid_date: "2025-03-10", status: "paid" },
    { id: 2, client_id: 1, project_id: 1, invoice_number: "INV-2025-012", amount: 800000, due_date: "2025-04-15", paid_date: "2025-04-12", status: "paid" },
    { id: 3, client_id: 1, project_id: 1, invoice_number: "INV-2025-025", amount: 800000, due_date: "2025-05-15", paid_date: null, status: "pending" },
    { id: 4, client_id: 4, project_id: 2, invoice_number: "INV-2025-008", amount: 1400000, due_date: "2025-04-01", paid_date: "2025-04-05", status: "paid" },
    { id: 5, client_id: 4, project_id: 2, invoice_number: "INV-2025-019", amount: 1400000, due_date: "2025-05-01", paid_date: null, status: "pending" },
    { id: 6, client_id: 2, project_id: 4, invoice_number: "INV-2025-015", amount: 950000, due_date: "2025-05-10", paid_date: null, status: "overdue" },
    { id: 7, client_id: 5, project_id: 8, invoice_number: "INV-2025-022", amount: 200000, due_date: "2025-05-20", paid_date: null, status: "pending" },
  ]

  const cost_allocations = [
    { id: 1, cost_center: "IT Infrastructure", driver: "Headcount", total_cost: 4800000, allocated_cost: 4200000, rule: "Per-employee allocation", department: "Engineering", status: "approved" },
    { id: 2, cost_center: "Office Space", driver: "Square Footage", total_cost: 3500000, allocated_cost: 3100000, rule: "Area-based allocation", department: "Operations", status: "approved" },
    { id: 3, cost_center: "HR Services", driver: "Headcount", total_cost: 2800000, allocated_cost: 2800000, rule: "Equal distribution", department: "HR", status: "approved" },
    { id: 4, cost_center: "Management Fee", driver: "Revenue %", total_cost: 6000000, allocated_cost: 5500000, rule: "Revenue-proportional", department: "Finance", status: "pending" },
    { id: 5, cost_center: "Training Budget", driver: "Department", total_cost: 1500000, allocated_cost: 1200000, rule: "Department budget cap", department: "All", status: "pending" },
    { id: 6, cost_center: "Software Licenses", driver: "Per User", total_cost: 2200000, allocated_cost: 2100000, rule: "Per-user license cost", department: "Engineering", status: "approved" },
  ]

  const notifications = [
    { id: 1, user_id: 1, type: "approval", title: "Invoice #INV-2025-025 requires approval", message: "Amount: ₹800,000 - From: TechCorp Inc.", is_read: 0, action_url: "/clients/billing", created_at: new Date(Date.now() - 5 * 60000).toISOString() },
    { id: 2, user_id: 1, type: "warning", title: "Project Phoenix margin dropped below 10%", message: "Current margin: 8.2%. Threshold: 10%", is_read: 0, action_url: "/projects", created_at: new Date(Date.now() - 60 * 60000).toISOString() },
    { id: 3, user_id: 1, type: "warning", title: "Budget exceeded in Cloud Migration", message: "Exceeded by: ₹980,000 (12.3%)", is_read: 0, action_url: "/pnl/budget", created_at: new Date(Date.now() - 120 * 60000).toISOString() },
    { id: 4, user_id: 1, type: "info", title: "New comment on ERP Implementation", message: "By Pooja Nair", is_read: 1, action_url: "/projects", created_at: new Date(Date.now() - 180 * 60000).toISOString() },
    { id: 5, user_id: 1, type: "success", title: "Data sync completed successfully", message: "All systems are up to date", is_read: 1, action_url: "/integrations", created_at: new Date(Date.now() - 300 * 60000).toISOString() },
    { id: 6, user_id: 1, type: "approval", title: "Budget revision request for Q3", message: "Submitted by Finance Team", is_read: 1, action_url: "/pnl/budget", created_at: new Date(Date.now() - 1440 * 60000).toISOString() },
    { id: 7, user_id: 1, type: "alert", title: "Integration error: Power BI", message: "Authentication token expired", is_read: 1, action_url: "/integrations", created_at: new Date(Date.now() - 2880 * 60000).toISOString() },
  ]

  const integrations = [
    { id: 1, name: "Salesforce CRM", category: "CRM", status: "connected", last_sync: new Date(Date.now() - 5 * 60000).toISOString(), records_synced: 12450, errors: 0 },
    { id: 2, name: "SAP S/4HANA", category: "ERP", status: "connected", last_sync: new Date(Date.now() - 15 * 60000).toISOString(), records_synced: 8920, errors: 0 },
    { id: 3, name: "BambooHR", category: "HRMS", status: "connected", last_sync: new Date(Date.now() - 30 * 60000).toISOString(), records_synced: 586, errors: 2 },
    { id: 4, name: "Jira Software", category: "Project Mgmt", status: "connected", last_sync: new Date(Date.now() - 10 * 60000).toISOString(), records_synced: 3420, errors: 0 },
    { id: 5, name: "Tally Prime", category: "Accounting", status: "connected", last_sync: new Date(Date.now() - 15 * 60000).toISOString(), records_synced: 15680, errors: 0 },
    { id: 6, name: "Azure AD", category: "SSO", status: "connected", last_sync: new Date(Date.now() - 120 * 60000).toISOString(), records_synced: 590, errors: 0 },
    { id: 7, name: "Power BI", category: "Analytics", status: "disconnected", last_sync: new Date(Date.now() - 4320 * 60000).toISOString(), records_synced: 0, errors: 5 },
    { id: 8, name: "Slack", category: "Communication", status: "connected", last_sync: new Date(Date.now() - 60000).toISOString(), records_synced: 0, errors: 0 },
  ]

  const workflows = [
    { id: 1, name: "Invoice Approval Workflow", description: "Auto-route invoices for approval based on amount", status: "active", created_by: 1, executions: 245, last_run: "2025-07-18" },
    { id: 2, name: "Budget Revision", description: "Handle budget change requests", status: "active", created_by: 1, executions: 38, last_run: "2025-07-17" },
    { id: 3, name: "New Employee Onboarding", description: "Automated onboarding workflow", status: "draft", created_by: 2, executions: 0, last_run: null },
  ]

  const reports = [
    { id: 1, name: "Board Summary", type: "board_summary", format: "pdf", schedule: "monthly", last_generated: "2025-07-15", status: "ready" },
    { id: 2, name: "P&L Report", type: "pnl", format: "pdf", schedule: "on_demand", last_generated: "2025-07-14", status: "ready" },
    { id: 3, name: "Client Profitability", type: "client_profitability", format: "excel", schedule: "on_demand", last_generated: "2025-07-12", status: "ready" },
    { id: 4, name: "Budget vs Actual", type: "budget", format: "pdf", schedule: "weekly", last_generated: "2025-07-10", status: "ready" },
    { id: 5, name: "Workforce Report", type: "workforce", format: "excel", schedule: "monthly", last_generated: "2025-07-08", status: "ready" },
    { id: 6, name: "Cash Flow Report", type: "cash_flow", format: "pdf", schedule: "on_demand", last_generated: "2025-07-05", status: "ready" },
  ]

  return { users, clients, projects, employees, transactions, budgets, contracts, invoices, cost_allocations, notifications, workflows, reports, integrations }
}
