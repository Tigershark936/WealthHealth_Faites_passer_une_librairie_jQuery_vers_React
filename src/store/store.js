import { configureStore, combineReducers } from '@reduxjs/toolkit'
import employees from '../features/employees/employeesSlice'
import {
  persistStore,
  persistReducer,
  // Actions spéciales de redux-persist
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// Importation du reducer 
const rootReducer = combineReducers ({
  employees, 
})

// configuration de ma persistance
const persistConfig = {
  key: 'root', 
  version: 1,
  storage, 
  whitelist: ['employees']
}

// Création d'un persistReducer afin de se save et de réhydrate 
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Creation du store 
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    }),
})

// Le persistor qui va piloter la synchro du store vers le localStorage (<PersistGate>)
export const persistor = persistStore(store)


// Log pour mon redux sans utiliser mon outil redux du nav
store.subscribe(() => {
  const state = store.getState()
  console.log("Redux-persist State :", state)

  // Slice employees
  console.log("Employees :", state.employees)

  // Dernier employé ajouté dans le tableau
  const lastEmployee = state.employees.items[state.employees.items.length - 1]
  if (lastEmployee) {
    console.log("dernier employé -> ID :", lastEmployee.id)
  }
})