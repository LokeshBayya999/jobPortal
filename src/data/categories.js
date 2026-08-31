export const categories = [
  { id: 'software-dev', label: 'Software Development', remotiveCategory: 'software-dev' },
  { id: 'customer-support', label: 'Customer Support', remotiveCategory: 'customer-support' },
  { id: 'design', label: 'Design', remotiveCategory: 'design' },
  { id: 'marketing', label: 'Marketing', remotiveCategory: 'marketing' },
  { id: 'sales', label: 'Sales', remotiveCategory: 'sales' },
  { id: 'product', label: 'Product', remotiveCategory: 'product' },
  { id: 'finance-legal', label: 'Finance & Legal', remotiveCategory: 'finance-legal' },
  { id: 'writing', label: 'Writing', remotiveCategory: 'writing' },
]

export const findCategory = (id) => categories.find((c) => c.id === id)
