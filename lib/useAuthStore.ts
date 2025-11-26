import { create } from 'zustand'
import { auth } from './auth'

// const useBear = create((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
//   updateBears: (newBears) => set({ bears: newBears }),
// }))

type loading = true | false

const useAuthStore = create((set)=>({
    session : null,
    loading : false,
    fetchSession : async ()=>{
        try {
            set({loading : true})
            const new_session = await auth()
            set({session: new_session})
            set({loading : false})
        } catch (error) {
            console.error("error in fetchSession in ueAuthstore: ",error)
        }
    },
}))

export default useAuthStore;