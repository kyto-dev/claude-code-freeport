export interface Profile {
  id: string
  display_name: string | null
  currency: string
  created_at: string
}

export interface Category {
  id: string
  user_id: string
  name: string
  emoji: string
  color: string
  budget: number | null
  sort_order: number
  created_at: string
}

export interface Invoice {
  id: string
  user_id: string
  storage_path: string | null
  file_name: string | null
  mime_type: string | null
  ai_raw_response: unknown
  ai_confidence: number | null
  status: 'pending' | 'confirmed' | 'error'
  created_at: string
}

export interface Transaction {
  id: string
  user_id: string
  invoice_id: string | null
  category_id: string
  merchant: string
  amount: number
  txn_date: string
  notes: string | null
  created_at: string
  // joined relation
  category?: Category
}

export interface ExtractedInvoiceData {
  merchant: string
  amount_clp: number
  date: string
  category: string
  notes: string | null
  confidence: number
}
