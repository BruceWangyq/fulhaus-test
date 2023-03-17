import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Product } from "@/app/page"

interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const item = action.payload
      const existingItem = state.items.find((i) => i._id === item._id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...item, quantity: 1 })
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload)
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ _id: string; quantity: number }>
    ) => {
      const { _id, quantity } = action.payload
      const item = state.items.find((i) => i._id === _id)
      if (item) {
        item.quantity = quantity
      }
    },
  },
})

export const { addItem, removeItem, updateItemQuantity } = cartSlice.actions
export default cartSlice.reducer
