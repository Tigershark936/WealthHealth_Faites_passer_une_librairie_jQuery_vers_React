import { createSlice, nanoid } from '@reduxjs/toolkit'

// ETAT INITIAL / qui va me servir à stockés mes employees 
const initialState = {
    items: [],
}

// Mon slice : name + initialState + actions
const slice = createSlice ({
    name: 'employees', 
    initialState, 
    reducers: {
        addEmployee: {
            prepare(employee) {
                return { payload: { id: nanoid(), ...employee } }
            },
            reducer(state, action){
                state.items.push(action.payload)
            },
        },
    },
})

export const { addEmployee } = slice.actions // l'exportation de l'action 
export default slice.reducer  // l'exportation du redecer pour le store